import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.css']
})
export class AnalyticsDashboardComponent {
  activeTab: 'proyeccion' | 'comparador' | 'ranking' | 'modelo' = 'proyeccion';

  setActiveTab(tab: 'proyeccion' | 'comparador' | 'ranking' | 'modelo') {
    this.activeTab = tab;
  }
}
