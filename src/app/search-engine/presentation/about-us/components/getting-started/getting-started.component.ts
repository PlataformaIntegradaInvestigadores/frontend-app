import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface Collaborator {
  name: string;
  role: string;
}

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  collaborators: Collaborator[] = [
    {
      name: 'Ing. Fernando Sangopanta',
      role: 'Contributed with the information retrieval system'
    },
    {
      name: 'Ing. Joffre Condor',
      role: 'Contributed with the analytic tool'
    },
    {
      name: 'Ing. Danny Cabrera',
      role: 'Contributed with  the academic interation space'
    },
    {
      name: 'Ing. Rommel Masabanda',
      role: 'Contributed with the decision support (consensus workshop)'
    },
    {
      name: 'Ing. Mateo Morales',
      role: 'Contributed with the Voting & Consensus Module (consensus workshop)'
    },
    {
      name: 'Ing. Jorge Cordero',
      role: 'Contributed with the Debate & Discussion Module (consensus workshop)'
    },
    {
      name: 'Ing. Marco Quichimbo',
      role: 'Contributed with improving the search engine model'
    },
  ];

  ngOnInit() {
    // Escucha los eventos de navegación
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        if (currentUrl.includes('/collaborators')) {
          // Desplaza hacia el elemento con el id 'collaborators'
          this.viewportScroller.scrollToAnchor('collaborators');
        }
      });
  }
}
