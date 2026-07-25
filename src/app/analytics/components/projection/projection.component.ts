import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables, ChartConfiguration, ChartDataset, TooltipItem } from 'chart.js';
import { AnalyticsService, ProjectionResponse, DataPoint } from '../../services/analytics.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

Chart.register(...registerables);

type CustomChartDataset = ChartDataset<'line', (number | null)[]> & {
  customPointType?: string[];
};

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit, OnDestroy {
  @ViewChild('projectionChart') private chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  public affiliations: string[] = [];
  public filteredAffiliations: string[] = [];
  public selectedAffiliation: string = '';
  public affiliationSearchTerm: string = '';
  
  public projectionYears: number = 5;
  public hypotheticalAuthors: number = 350;
  
  public kpi = {
    lastActualYear: 0,
    lastActualPubs: 0,
    firstPredictedYear: 0,
    firstPredictedPubs: 0,
    growth: 0,
    growthPercent: 0
  };

  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  public showDropdown: boolean = false;

  private searchSubject = new Subject<string>();
  private sliderSubject = new Subject<{ years: number; authors: number }>();
  private subscriptions = new Subscription();
  private chart: Chart | undefined;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.handleSearchInput();
    this.handleSliderInput();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.chart?.destroy();
  }

  private loadInitialData(): void {
    this.isLoading = true;
    this.analyticsService.getAffiliations().pipe(
      tap(response => {
        this.affiliations = response.affiliations;
        this.filteredAffiliations = [...this.affiliations]; 
        if (this.affiliations.length > 0) {
          this.selectAffiliation("Universidad de Guayaquil"); // Seleccionamos una con datos por defecto
        }
      }),
      switchMap(response => {
        if (response.affiliations.length > 0) {
          return this.analyticsService.getProjection("Universidad de Guayaquil", this.projectionYears);
        }
        return of(null);
      }),
      catchError(err => {
        this.errorMessage = 'No se pudieron cargar los datos iniciales.';
        console.error(err);
        return of(null);
      })
    ).subscribe(projection => {
      if (projection) {
        setTimeout(() => this.updateDashboard(projection), 0);
      }
      this.isLoading = false;
    });
  }

  private handleSearchInput(): void {
    this.subscriptions.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(term => {
        if (!term) {
          this.filteredAffiliations = [...this.affiliations];
        } else {
          this.filteredAffiliations = this.affiliations.filter(aff => 
            aff.toLowerCase().includes(term.toLowerCase())
          );
        }
      })
    );
  }
  
  private handleSliderInput(): void {
    this.subscriptions.add(
        this.sliderSubject.pipe(
            debounceTime(500) // Un pequeño debounce para no saturar de peticiones
        ).subscribe(values => {
            this.fetchProjectionData();
        })
    );
  }

  onSearch(term: string): void {
    this.affiliationSearchTerm = term;
    this.showDropdown = true;
    this.searchSubject.next(term);
  }

  onSliderChange(): void {
      this.sliderSubject.next({ years: this.projectionYears, authors: this.hypotheticalAuthors });
  }

  selectAffiliation(affiliation: string): void {
    this.selectedAffiliation = affiliation;
    this.affiliationSearchTerm = affiliation;
    this.showDropdown = false;
    this.fetchProjectionData();
  }

  fetchProjectionData(): void {
    if (!this.selectedAffiliation) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.subscriptions.add(
      this.analyticsService.getProjection(this.selectedAffiliation, this.projectionYears, this.hypotheticalAuthors).pipe(
        catchError(err => {
          this.errorMessage = `Error al obtener la proyección para ${this.selectedAffiliation}.`;
          console.error(err);
          this.isLoading = false;
          return of(null);
        })
      ).subscribe(projection => {
        if (projection) {
          setTimeout(() => this.updateDashboard(projection), 0);
        }
        this.isLoading = false;
      })
    );
  }

  private updateDashboard(projection: ProjectionResponse): void {
    this.updateKPIs(projection.data);
    this.renderChart(projection);
  }

  private updateKPIs(data: DataPoint[]): void {
    const lastActual = data.filter(d => d.type === 'actual').pop();
    const firstPredicted = data.filter(d => d.type === 'predicted')[0];

    if (lastActual && firstPredicted) {
      const growth = firstPredicted.publications - lastActual.publications;
      this.kpi = {
        lastActualYear: lastActual.year,
        lastActualPubs: lastActual.publications,
        firstPredictedYear: firstPredicted.year,
        firstPredictedPubs: firstPredicted.publications,
        growth: growth,
        growthPercent: lastActual.publications > 0 ? (growth / lastActual.publications) * 100 : 0
      };
    } else {
      // Reseteamos los KPIs si no hay datos
      this.kpi = { lastActualYear: 0, lastActualPubs: 0, firstPredictedYear: 0, firstPredictedPubs: 0, growth: 0, growthPercent: 0 };
    }
  }

  private renderChart(projection: ProjectionResponse): void {
    if (!this.chartCanvas) return;

    const labels = projection.data.map(d => d.year);
    const actualData = projection.data.filter(d => d.type === 'actual');
    const predictedData = projection.data.filter(d => d.type === 'predicted');

    const datasets: CustomChartDataset[] = [
      {
        label: 'Histórico',
        data: actualData.map(d => d.publications),
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1,
        customPointType: actualData.map(() => 'actual')
      },
      {
        label: 'Predicción',
        data: [
          ...Array(actualData.length - 1).fill(null), 
          actualData[actualData.length-1]?.publications, 
          ...predictedData.map(d => d.publications)
        ],
        borderColor: 'rgb(22, 163, 74)',
        borderDash: [5, 5],
        tension: 0.1,
        customPointType: [...Array(actualData.length).fill('actual'), ...predictedData.map(() => 'predicted')]
      }
    ];

    const chartData = {
      labels: labels,
      datasets: datasets
    };

    // ===== LA CORRECCIÓN CLAVE ESTÁ AQUÍ =====
    // Siempre destruimos el gráfico anterior si existe.
    if (this.chart) {
      this.chart.destroy();
    }
    // =======================================
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { title: { display: true, text: 'Año' } },
            y: { title: { display: true, text: 'Número de Publicaciones' }, beginAtZero: true }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context: TooltipItem<'line'>) => {
                  let label = context.dataset.label || '';
                  if (label) { label += ': '; }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y;
                  }
                  
                  const customDataset = context.dataset as CustomChartDataset;
                  const type = customDataset.customPointType?.[context.dataIndex];
                  if (type) {
                    return `${label} (${type})`;
                  }
                  return label;
                }
              }
            }
          }
        }
      });
    }
  }
}
