import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesDashboardComponent } from './container/employees-dashboard.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { DepFilterComponent } from './components/dep-filter/dep-filter.component';

const routes: Routes = [{ path: '', component: EmployeesDashboardComponent }];

@NgModule({
  declarations: [EmployeesDashboardComponent, EmployeesTableComponent, DepFilterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
})
export class DashboardModule {}
