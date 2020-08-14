import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/shared/models/employee-model';
import { EmployeeService } from '../service/employee.service';
import { first, finalize } from 'rxjs/operators';
import { NotificationsService } from 'src/shared/components/notification/service/notifications.service';
import { NotificationTypes } from 'src/shared/enums/notification-types';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: ['.card{border: none!important;max-width: 48rem;margin: auto;}'],
})
export class EmployeeComponent implements OnInit {
  id: number;
  btnMsg: string;
  employee: Employee;
  view: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    if (this.router.url.indexOf('view') > -1) {
      this.view = true;
    }
    this.route.params.subscribe((route) => {
      if (route.id) {
        this.btnMsg = 'Save';
        this.id = Number(route.id);
        this.getEmployee(this.id);
      } else {
        this.btnMsg = 'Create';
      }
    });
  }

  save(): void {}

  createUpdate(employee: Employee): void {
    if (this.id) {
      this.employeeService
        .updateEmployee(this.id, employee)
        .pipe(
          first(),
          finalize(() => {
            this.router.navigate(['dashboard']);
            this.notificationService.createNotification(
              'Update successful!',
              'The employee was updated successfully!',
              NotificationTypes.Success
            );
          })
        )
        .subscribe();
    } else {
      this.employeeService
        .createEmployee(employee)
        .pipe(
          first(),
          finalize(() => {
            this.router.navigate(['dashbaord']);
            this.notificationService.createNotification(
              'Created!',
              'The employee was created successfully!',
              NotificationTypes.Success
            );
          })
        )
        .subscribe();
    }
  }

  private getEmployee(id: number): void {
    this.employeeService
      .getEmployee(id)
      .pipe(first())
      .subscribe((resp) => (this.employee = resp));
  }
}
