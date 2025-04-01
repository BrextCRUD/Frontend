import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'https://brextcrud-api-g2dhcpgsfmbzere9.brazilsouth-01.azurewebsites.net/api/city'; // Asegúrate de que este URL sea correcto

  constructor(private http: HttpClient) { }

  getAll(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  getById(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${id}`);
  }

  create(city: City): Observable<City> {
    return this.http.post<string>(this.apiUrl, city, { responseType: 'text' as 'json' }).pipe(
      map(response => {
        try {
          return JSON.parse(response) as City;
        } catch (e) {
          console.warn('La respuesta no es un JSON válido. Se recibe como texto:', response);
          return { name: response } as City;
        }
      }),
      catchError((error) => {
        console.error('Error al crear la región:', error);
        return throwError(() => error);
      })
    );
  }

  update(city: City): Observable<City> {
    return this.http.put<City>(`${this.apiUrl}/${city.id}`, city).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
