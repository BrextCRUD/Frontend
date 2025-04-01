import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = 'https://brextcrud-api-g2dhcpgsfmbzere9.brazilsouth-01.azurewebsites.net/api/city'; 

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, city);
  }

  updateCity(city: City): Observable<City> {
      return this.http.put<City>(`${this.apiUrl}/${city.id}`, city);
    }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
