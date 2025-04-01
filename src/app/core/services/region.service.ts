import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private apiUrl = 'https://brextcrud-api-g2dhcpgsfmbzere9.brazilsouth-01.azurewebsites.net/api/region'; // Asegúrate de que este URL sea correcto

  constructor(private http: HttpClient) { }

  getAll(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl);
  }

  getById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.apiUrl}/${id}`);
  }

  create(region: Region): Observable<Region> {
    return this.http.post<string>(this.apiUrl, region, { responseType: 'text' as 'json' }).pipe(
      map(response => {
        try {
          return JSON.parse(response) as Region;
        } catch (e) {
          console.warn('La respuesta no es un JSON válido. Se recibe como texto:', response);
          return { name: response } as Region;
        }
      }),
      catchError((error) => {
        console.error('Error al crear la región:', error);
        return throwError(() => error);
      })
    );
  }

  update(region: Region): Observable<Region> {
    return this.http.put<Region>(`${this.apiUrl}/${region.id}`, region).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
