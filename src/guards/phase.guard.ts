import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TopicService } from 'src/app/consensus/domain/services/TopicDataService.service';

@Injectable({
  providedIn: 'root'
})
export class PhaseGuard implements CanActivate {
  constructor(private router: Router, private topicService: TopicService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canActivate called'); // Añadido para depuración
    const groupId = route.parent?.paramMap.get('groupId');
    const expectedPhase = route.data['expectedPhase'];
    console.log('route paramMap:', route.paramMap); // Añadido para depuración

    if (!groupId) {
      console.error('Group ID is missing in route parameters');
      this.router.navigate(['/somewhere-else']);
      return false;
    }
    
    console.log('Fetching user phase for groupId:', groupId); // Añadido para depuración
    return new Promise<boolean>((resolve) => {
      this.topicService.getUserCurrentPhase(groupId).subscribe(
        (response) => {
          console.log('API response:', response); // Añadido para depuración
          const userPhase = response.phase;
          if (userPhase >= expectedPhase) {
            console.log('User phase is sufficient, allowing access'); // Añadido para depuración
            resolve(true);
          } else {
            let redirectPhase: string;
            switch(userPhase) {
              case 0:
                redirectPhase = 'recommend-topics';
                break;
              case 1:
                redirectPhase = 'valuation';
                break;
              case 2:
                redirectPhase = 'decision';
                break;
              default:
                redirectPhase = 'recommend-topics';
                break;
            }
            console.log('User phase is insufficient, redirecting to:', redirectPhase); // Añadido para depuración
            this.router.navigate([`/profile/${route.parent?.parent?.params['id']}/my-groups/${groupId}/consensus/${redirectPhase}`]);
            resolve(false);
          }
        },
        (error) => {
          console.error('Error fetching user phase:', error);
          this.router.navigate(['/somewhere-else']);
          resolve(false);
        }
      );
    });
  }
}
