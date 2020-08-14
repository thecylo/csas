import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy,
} from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { Employee } from 'src/shared/models/employee-model';
import { first, timeout } from 'rxjs/operators';
import { NotificationsService } from 'src/shared/components/notification/service/notifications.service';
import { NotificationTypes } from 'src/shared/enums/notification-types';
import { DialogComponent } from 'src/shared/components/dialog/dialog.component';
import { DialogTypes } from 'src/shared/enums/dialog-types';
import { Subscription } from 'rxjs';
import { Departments } from 'src/shared/enums/departments';
@Component({
  selector: 'app-employees-dashboard',
  styles: [
    '.card{border: none !important}',
    '.header__row{display:flex; justify-content: space-between}',
  ],
  template: `
    <div class="card">
      <div class="card__header">
        <div class="header__row">
          <h1 class="header__headline">Employees</h1>
          <button class="button--primary" routerLink="/employee">
            New Employee
          </button>
        </div>

        <p class="card__subline">
          You can find list of all employees in the company and also filter them by departments.
        </p>
      </div>
      <div class="card__content" #dialog>
        <app-employees-table
          [empl]="employees"
          (delete)="deleteEmployee($event)"
        ></app-employees-table>
        <app-dep-filter (filterKey)="filter($event)"></app-dep-filter>
        <app-employees-table
          [empl]="filteredEmployees"
          (delete)="deleteEmployee($event)"
        ></app-employees-table>
      </div>
    </div>
  `,
})
export class EmployeesDashboardComponent implements OnInit, OnDestroy {
  employees: Employee[];
  filteredEmployees: Employee[];
  output: Subscription;

  @ViewChild('dialog', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private dashboardService: DashboardService,
    private notificationService: NotificationsService,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.updateData(true);
  }

  deleteEmployee(id: number) {
    this.removeDialog(id);
  }

  removeDialog(id?: number): void {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(DialogComponent);
    const componentRef = this.entry.createComponent(factory);
    const empl = this.employees.filter((x) => x.id === id)[0];
    componentRef.instance.buttons = ['Cancel', 'Delete'];
    componentRef.instance.title = 'Delete employee?';
    componentRef.instance.message = `Are you sure you want to delete employee ${empl.firstName} ${empl.lastName} ?`;
    componentRef.instance.type = DialogTypes.Alert;
    this.output = componentRef.instance.confirm.subscribe((resp: boolean) => {
      if (resp) {
        this.dashboardService
          .deleteEmployee(id)
          .pipe(first(), timeout(2000))
          .subscribe(
            () => {},
            (err) => {
              console.error(err);
              this.errMsg();
            },
            () => {
              this.notificationService.createNotification(
                'Employee deleted!!',
                'Employee was successfully deleted!',
                NotificationTypes.Success
              );
              const dep = this.employees.filter((x) => x.id === id)[0];
              this.updateData(false, dep.department);
            }
          );
      }
    });
  }

  ngOnDestroy() {
    if (this.output) {
      this.output.unsubscribe();
    }
  }

  private errMsg(): void {
    this.notificationService.createNotification(
      'Something went wrong!',
      'There was an error. Please contact support.',
      NotificationTypes.Alert
    );
  }

  private updateData(notification: boolean, dep?: Departments): void {
    this.dashboardService
      .getEmployees()
      .pipe(first(), timeout(2000))
      .subscribe(
        (resp: Employee[]) => {
          if (resp.length) {
            this.employees = [...resp];
            this.filter(dep);
          }
        },
        (error) => {
          console.error(error);
          this.errMsg();
        },
        () =>
          notification &&
          this.notificationService.createNotification(
            'Loaded data successfully!',
            'Loaded all data from server successfully',
            NotificationTypes.Success
          )
      );
  }

  filter(department: Departments): void {
    this.filteredEmployees = [...this.employees.filter((x) => x.department === department)];
  }
}
