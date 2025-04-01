import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private apiUrl = 'https://brextcrud-api-g2dhcpgsfmbzere9.brazilsouth-01.azurewebsites.net/api/region'; 

  constructor(private http: HttpClient) { }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl);
  }

  addRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.apiUrl, region);
  }

  deleteRegion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
