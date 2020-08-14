import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeComponent } from './container/employee.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  {
    path: ':id',
    component: EmployeeComponent,
    children: [{ path: 'view', component: EmployeeComponent }],
  },
];

@NgModule({
  declarations: [EmployeeComponent, EmployeeFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EmployeeComponent],
})
export class EmployeeModule {}
