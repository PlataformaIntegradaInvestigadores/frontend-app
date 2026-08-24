import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { RankingComponent } from './ranking.component';
import { AnalyticsService, RankingItem } from '../../services/analytics.service';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let analyticsServiceSpy: jasmine.SpyObj<AnalyticsService>;

  const items: RankingItem[] = [
    {
      rank: 2,
      affiliation_name: 'ESPOL',
      current_year_publications: 10,
      predicted_next_year_publications: 12,
      growth: 2,
      growth_percentage: 20,
    },
    {
      rank: 1,
      affiliation_name: 'PUCE',
      current_year_publications: 5,
      predicted_next_year_publications: 6,
      growth: 1,
      growth_percentage: 20,
    },
  ];

  beforeEach(() => {
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['getRanking']);
    analyticsServiceSpy.getRanking.and.returnValue(of({ ranking: items }));

    TestBed.configureTestingModule({
      declarations: [RankingComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AnalyticsService, useValue: analyticsServiceSpy }],
    });
    component = TestBed.createComponent(RankingComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchRankingData', () => {
    it('populates both data arrays and stops loading on success', () => {
      component.fetchRankingData();
      expect(component.allRankingData).toEqual(items);
      expect(component.filteredRankingData).toEqual(items);
      expect(component.filteredRankingData).not.toBe(component.allRankingData);
      expect(component.isLoading).toBeFalse();
    });

    it('sets an error message and stops loading on failure', () => {
      spyOn(console, 'error');
      analyticsServiceSpy.getRanking.and.returnValue(throwError(() => new Error('boom')));
      component.fetchRankingData();
      expect(component.errorMessage).toBe('No se pudo cargar el ranking de afiliaciones.');
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('onSearch', () => {
    beforeEach(() => component.fetchRankingData());

    it('filters case-insensitively by affiliation name and resets to page 1', () => {
      component.p = 3;
      const input = document.createElement('input');
      input.value = 'espol';
      component.onSearch({ target: input } as unknown as Event);
      expect(component.p).toBe(1);
      expect(component.filteredRankingData.map((r) => r.affiliation_name)).toEqual(['ESPOL']);
    });

    it('shows everything again for an empty search term', () => {
      const input = document.createElement('input');
      input.value = '';
      component.onSearch({ target: input } as unknown as Event);
      expect(component.filteredRankingData.length).toBe(2);
    });
  });

  describe('sortData', () => {
    beforeEach(() => component.fetchRankingData());

    it('toggles to descending on the first call, since sortColumn already defaults to "rank"', () => {
      component.sortData('rank');
      expect(component.sortDirection).toBe('desc');
      expect(component.filteredRankingData.map((r) => r.rank)).toEqual([2, 1]);
    });

    it('toggles back to ascending on a second call to the same column', () => {
      component.sortData('rank');
      component.sortData('rank');
      expect(component.sortDirection).toBe('asc');
      expect(component.filteredRankingData.map((r) => r.rank)).toEqual([1, 2]);
    });

    it('resets to ascending when switching to a new column', () => {
      component.sortData('rank'); // now desc
      component.sortData('affiliation_name');
      expect(component.sortDirection).toBe('asc');
      expect(component.sortColumn).toBe('affiliation_name');
      expect(component.filteredRankingData.map((r) => r.affiliation_name)).toEqual([
        'ESPOL',
        'PUCE',
      ]);
    });

    it('keeps the current direction when keepDirection is true', () => {
      component.sortDirection = 'desc';
      component.sortColumn = 'rank';
      component.sortData('rank', true);
      expect(component.sortDirection).toBe('desc');
    });
  });
});
