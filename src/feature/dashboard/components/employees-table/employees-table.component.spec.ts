import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesTableComponent } from './employees-table.component';
import { Departments } from 'src/shared/enums/departments';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('EmployeesTableComponent', () => {
  let component: EmployeesTableComponent;
  let fixture: ComponentFixture<EmployeesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesTableComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: () => of(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create employees table', () => {
    expect(component).toBeTruthy();
  });

  test('should set pageSize to 1 and return page number 1 with 1 record with first name John', () => {
    component.empl = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        department: Departments.IT,
        email: 'john.doe@dummy.com',
      },
      {
        id: 2,
        firstName: 'Mark',
        lastName: 'Doe',
        department: Departments.IT,
        email: 'mark.doe@dummy.com',
      },
    ];
    component.pageSize = 1;
    fixture.detectChanges();
    component.setPage(1, 1);
    fixture.detectChanges();
    expect(component.employees.length).toBe(1);
    expect(component.employees[0].firstName).toEqual('John');
  });
});
