import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './area/admin/admin.component';
import { AdminDashboardComponent } from './area/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './area/admin/home/home.component';
import { AddNewPropertyComponent } from './area/admin/property/addNew.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children:
      [
        { path: '', component: AdminDashboardComponent }
      ]
  },
  {
    path: 'admin', component: AdminComponent,
    children:
      [
        { path: 'dashboard', component: AdminDashboardComponent },
        { path: 'home', component: AdminHomeComponent },
        { path: 'addNew', component: AddNewPropertyComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
