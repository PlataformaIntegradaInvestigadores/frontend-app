import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Debate} from "../entities/debate.interface";
import {map, Observable, Observer} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DebateService {

  private apiUrl = `${environment.apiUrl}/v1/groups/`;

  constructor(private http: HttpClient) { }

  // Obtiene los datos del debate
  getDebates(groupId: string): Observable<Debate[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Añade el token
      'Content-Type': 'application/json'
    });
  
    if (!groupId || groupId.trim() === '') {
      console.error('El groupId es inválido:', groupId);
      throw new Error('El groupId es requerido para obtener los debates.');
    }
  
    const url = `${this.apiUrl}${groupId}/debates/`; // Construye la URL
    console.log('URL de la API para getDebates:', url);
  
    return this.http.get<Debate[]>(url, { headers });
  }
  
  

  createDebate(groupId: string, debate: Debate | undefined): Observable<Debate> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Debate>(`${this.apiUrl}${groupId}/debates/`, debate, { headers });
  }

  // Verificar si existe un debate
  getDebateDetails(groupId: string, debateId: number): Observable<Debate> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}${groupId}/debates/${debateId}/`;
    return this.http.get<Debate>(url, { headers });
  }

  // Validar si el debate está abierto
  validateDebateStatus(groupId: string, debateId: number): Observable<{ is_open: boolean }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}${groupId}/debates/${debateId}/validate-status/`;
    return this.http.get<{ detail: string }>(url, { headers} ).pipe(
      map(response => ({ is_open: response.detail === 'El debate está abierto.' })) // Devuelve un objeto con is_open
    );
  }
}
