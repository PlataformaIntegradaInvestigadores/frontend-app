import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables, ChartConfiguration } from 'chart.js'; // Importamos ChartConfiguration
import { AnalyticsService, ComparisonResponse } from '../../services/analytics.service';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

Chart.register(...registerables);

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.css']
})
export class ComparatorComponent implements OnInit, OnDestroy {
  @ViewChild('comparisonChart') private chartCanvas!: ElementRef<HTMLCanvasElement>;

  public allAffiliations: string[] = [];
  public filteredAffiliations: string[] = [];
  public comparedAffiliations: string[] = [];
  public searchTerm: string = '';
  
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  public showDropdown: boolean = false;

  private chart: Chart | undefined;
  private subscriptions = new Subscription();
  
  private colors = ['#3B82F6', '#16A34A', '#F97316', '#9333EA', '#E11D48', '#FBBF24'];

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.chart?.destroy();
  }

  private loadInitialData(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.analyticsService.getAffiliations().subscribe({
        next: (response) => {
          this.allAffiliations = response.affiliations;
          this.filteredAffiliations = [...this.allAffiliations];
          if (this.allAffiliations.length >= 2) {
            // Por defecto, seleccionamos dos afiliaciones que sabemos que tienen datos
            this.comparedAffiliations = ["Universidad de Guayaquil", "Universidad San Francisco de Quito"];
            this.fetchAndRenderComparison();
          } else {
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errorMessage = 'No se pudo cargar la lista de afiliaciones.';
          this.isLoading = false;
          console.error(err);
        }
      })
    );
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.showDropdown = true;
    if (!term) {
      this.filteredAffiliations = [...this.allAffiliations];
      return;
    }
    this.filteredAffiliations = this.allAffiliations.filter(aff =>
      aff.toLowerCase().includes(term.toLowerCase())
    );
  }

  addAffiliation(affiliation: string): void {
    if (!this.comparedAffiliations.includes(affiliation) && this.comparedAffiliations.length < 6) {
      this.comparedAffiliations.push(affiliation);
      this.fetchAndRenderComparison();
    }
    this.searchTerm = '';
    this.filteredAffiliations = [];
    this.showDropdown = false;
  }

  removeAffiliation(affiliationToRemove: string): void {
    this.comparedAffiliations = this.comparedAffiliations.filter(aff => aff !== affiliationToRemove);
    this.fetchAndRenderComparison();
  }

  private fetchAndRenderComparison(): void {
    if (this.comparedAffiliations.length === 0) {
      this.chart?.destroy();
      this.chart = undefined;
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;

    this.subscriptions.add(
      this.analyticsService.getComparison(this.comparedAffiliations, 15).pipe(
        catchError(err => {
          this.errorMessage = 'Error al obtener los datos de comparación.';
          console.error(err);
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          setTimeout(() => this.renderChart(response), 0);
        }
        this.isLoading = false;
      })
    );
  }

  private renderChart(response: ComparisonResponse): void {
    if (!this.chartCanvas) return;

    if (!response.results || response.results.length === 0) {
      this.errorMessage = "No se encontraron datos históricos para las afiliaciones seleccionadas.";
      if (this.chart) {
        this.chart.destroy();
        this.chart = undefined;
      }
      return;
    }
    this.errorMessage = null;

    const allYears = new Set<number>();
    response.results.forEach(res => res.data.forEach(dp => allYears.add(dp.year)));
    const labels = Array.from(allYears).sort();

    const datasets = response.results.map((result, index) => {
      const dataMap = new Map(result.data.map(p => [p.year, p.publications]));
      const chartData = labels.map(year => dataMap.get(year) || null);
      
      return {
        label: result.affiliation_name,
        data: chartData,
        borderColor: this.colors[index % this.colors.length],
        backgroundColor: this.colors[index % this.colors.length] + '80',
        tension: 0.1,
        fill: false,
        pointRadius: 4, // Hacemos los puntos un poco más visibles
        pointHoverRadius: 6
      };
    });

    // ===== CAMBIO PRINCIPAL AQUÍ =====
    // Eliminamos la lógica que cambiaba a 'bar' y forzamos siempre 'line'.
    const chartConfig: ChartConfiguration = {
      type: 'line', // Siempre será un gráfico de líneas
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Año' } },
          y: { title: { display: true, text: 'Número de Publicaciones' }, beginAtZero: true }
        },
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    };
    // ===================================

    if (this.chart) {
      this.chart.destroy();
    }
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, chartConfig);
    }
  }
}
