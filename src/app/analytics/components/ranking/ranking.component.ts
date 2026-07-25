import { Component, OnInit } from '@angular/core';
import { AnalyticsService, RankingItem } from '../../services/analytics.service';
// Importamos los íconos de FontAwesome para el ordenamiento
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public allRankingData: RankingItem[] = [];
  public filteredRankingData: RankingItem[] = [];
  
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  
  private searchTerm: string = '';

  // Propiedades para la paginación
  public p: number = 1;
  public itemsPerPage: number = 15;

  // Propiedades para el ordenamiento
  public sortColumn: keyof RankingItem = 'rank';
  public sortDirection: 'asc' | 'desc' = 'asc';

  // Iconos para la UI
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.fetchRankingData();
  }

  fetchRankingData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.analyticsService.getRanking().subscribe({
      next: (response) => {
        this.allRankingData = response.ranking;
        this.filteredRankingData = [...this.allRankingData]; // Usamos una copia para el ordenamiento
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'No se pudo cargar el ranking de afiliaciones.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.p = 1; // Reseteamos la página a 1 en cada búsqueda
    this.filterData();
  }

  private filterData(): void {
    if (!this.searchTerm) {
      this.filteredRankingData = [...this.allRankingData];
    } else {
      this.filteredRankingData = this.allRankingData.filter(item => 
        item.affiliation_name.toLowerCase().includes(this.searchTerm)
      );
    }
    // Mantenemos el orden actual después de filtrar
    this.sortData(this.sortColumn, true);
  }

  /**
   * Ordena los datos de la tabla por la columna seleccionada.
   * @param column La columna por la que se va a ordenar.
   * @param keepDirection Si es true, no invierte la dirección (útil para mantener el orden al filtrar).
   */
  sortData(column: keyof RankingItem, keepDirection: boolean = false): void {
    if (!keepDirection) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    }

    this.filteredRankingData.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
