import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { AnalyticsService, ModelDetailsResponse } from '../../services/analytics.service';

Chart.register(...registerables);

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('featuresChart') private chartCanvas!: ElementRef<HTMLCanvasElement>;

  public modelDetails: ModelDetailsResponse | null = null;
  public isLoading = true;
  public errorMessage: string | null = null;
  private chart: Chart | undefined;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.fetchModelDetails();
  }

  ngAfterViewInit(): void {
    // El gráfico se renderiza después de que la vista esté inicializada
  }

  fetchModelDetails(): void {
    this.isLoading = true;
    this.analyticsService.getModelDetails().subscribe({
      next: (data) => {
        this.modelDetails = data;
        this.isLoading = false;
        // Esperamos al siguiente ciclo para asegurarnos que el canvas exista
        setTimeout(() => this.renderChart(), 0);
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar los detalles del modelo.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  renderChart(): void {
    if (!this.modelDetails || !this.chartCanvas) return;

    const featureImportances = this.modelDetails.feature_importances;
    const labels = Object.keys(featureImportances);
    const data = Object.values(featureImportances);

    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Importancia',
          data: data,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y', // Hace que el gráfico de barras sea horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Puntuación de Importancia'
            }
          }
        }
      }
    };
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
        this.chart = new Chart(ctx, chartConfig);
    }
  }
}
