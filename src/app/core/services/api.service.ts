import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  constructor(private http: HttpClient) {}

  getAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  getById(url: string, id: number): Observable<T> {
    return this.http.get<T>(`${url}/${id}`);
  }

  create(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data);
  }

  update(url: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, data);
  }

  delete(url: string, id: number): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }
}
