import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../feature/dashboard/dashboard.module').then(
        (dashboard) => dashboard.DashboardModule
      ),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('../feature/employee/employee.module').then((employee) => employee.EmployeeModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
