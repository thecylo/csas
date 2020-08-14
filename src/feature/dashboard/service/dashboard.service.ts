import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/shared/models/employee-model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.base_url}employees`);
  }

  deleteEmployee(id: number): Observable<object> {
    if (id) {
      return this.http.delete(`${environment.base_url}employees/${id}`);
    }
  }
}
