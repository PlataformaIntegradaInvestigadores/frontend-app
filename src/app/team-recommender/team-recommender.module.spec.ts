import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TeamRecommenderModule } from './team-recommender.module';
import { TeamRecommenderRoutingModule } from './team-recommender-routing.module';
import { TeamBuilderPageComponent } from './presentation/pages/team-builder-page/team-builder-page.component';

describe('TeamRecommenderModule', () => {
  it('creates the feature module', () => {
    expect(new TeamRecommenderModule()).toBeTruthy();
  });

  it('routes the empty path to the team builder page', () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TeamRecommenderRoutingModule],
    });
    const router = TestBed.inject(Router);
    const route = router.config.find((r) => r.path === '');
    expect(route?.component).toBe(TeamBuilderPageComponent);
    expect(new TeamRecommenderRoutingModule()).toBeTruthy();
  });
});
