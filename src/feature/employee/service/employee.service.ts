import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/shared/models/employee-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${environment.base_url}employees/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${environment.base_url}employees/${id}`, employee);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${environment.base_url}employees`, employee);
  }
}
