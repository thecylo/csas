import { DashboardService } from './dashboard.service';
import { TestBed } from '@angular/core/testing';
import { Departments } from 'src/shared/enums/departments';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/shared/models/employee-model';
import { first } from 'rxjs/operators';
describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  test('should get all employees via GET', () => {
    const dummyEmpl = [
      new Employee(1, 'John', 'Doe', Departments.IT, 'joe.doe@dummy.com'),
      new Employee(2, 'Bill', 'Kill', Departments.Marketing, 'bill.kill@dummy.com'),
    ];

    service.getEmployees().subscribe((empls) => {
      expect(empls.length).toBe(2);
      expect(empls).toEqual(dummyEmpl);
    });

    const request = httpMock.expectOne(`${environment.base_url}employees`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyEmpl);
  });

  test('should delete employee with id 1 DELETE ', () => {
    const dummyEmpl = [
      new Employee(1, 'John', 'Doe', Departments.IT, 'joe.doe@dummy.com'),
      new Employee(2, 'Bill', 'Kill', Departments.Marketing, 'bill.kill@dummy.com'),
    ];
    service
      .deleteEmployee(1)
      .pipe(first())
      .subscribe((empl) => expect(dummyEmpl.length).toBe(1));

    const request = httpMock.expectOne(`${environment.base_url}employees/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush(dummyEmpl);
  });
});
