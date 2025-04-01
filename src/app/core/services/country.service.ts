import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = 'https://brextcrud-api-g2dhcpgsfmbzere9.brazilsouth-01.azurewebsites.net/api/country'; // Asegúrate de que este URL sea correcto

  constructor(private http: HttpClient) { }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/${id}`);
  }

  create(country: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  update(country: Country): Observable<Country> {
    return this.http.put<Country>(`${this.apiUrl}/${country.id}`, country).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
