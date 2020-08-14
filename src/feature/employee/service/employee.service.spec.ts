import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { Employee } from 'src/shared/models/employee-model';
import { Departments } from 'src/shared/enums/departments';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { newArray } from '@angular/compiler/src/util';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());
  test('should create employee service', () => {
    expect(service).toBeTruthy();
  });

  test('should get one employee via GET', () => {
    const dummyEmpl = [
      new Employee(1, 'John', 'Doe', Departments.IT, 'joe.doe@dummy.com'),
      new Employee(2, 'Bill', 'Kill', Departments.Marketing, 'bill.kill@dummy.com'),
    ];

    service.getEmployee(2).subscribe((empls) => {
      expect(empls.id).toBe(2);
    });

    const request = httpMock.expectOne(`${environment.base_url}employees/2`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyEmpl);
  });

  test('should update employee via PUT', () => {
    const dummyEmpl = [new Employee(1, 'John', 'Doe', Departments.IT, 'joe.doe@dummy.com')];
    const updatedEmpl = new Employee(1, 'Honza', 'Doe', Departments.IT, 'honza.doe@dummy.com');
    service.updateEmployee(1, updatedEmpl).subscribe((empl) => {
      expect(empl.firstName).toEqual('Honza');
    });

    const request = httpMock.expectOne(`${environment.base_url}employees/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(dummyEmpl);
  });

  test('should create new employee via POST', () => {
    const newEmpl = new Employee(null, 'Radek', 'Doe', Departments.IT, 'radek.doe@dummy.com');
    service.createEmployee(newEmpl).subscribe((empl) => {
      expect(empl.firstName).toBe('Radek');
    });

    const request = httpMock.expectOne(`${environment.base_url}employees`);
    expect(request.request.method).toBe('POST');
    request.flush(newEmpl);
  });
});
