import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {
  rootURL: string = environment.apiCentinela;
  constructor(private httpClient: HttpClient) { }
}
