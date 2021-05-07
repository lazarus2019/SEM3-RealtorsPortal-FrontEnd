import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAdPackageComponent } from './adpackage/adPackage.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminGalleryComponent } from './gallery/gallery.component';
import { AdminHomeComponent } from './home/home.component';
import { AdminMailBoxComponent } from './mailbox/mailbox.component';
import { AddNewPropertyComponent } from './property/addNew.component';
import { AdminManagePropertyComponent } from './property/adminManage.component';
import { UserManagePropertyComponent } from './property/userManage.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'home', component: AdminHomeComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'mailbox', component: AdminMailBoxComponent },
  { path: 'addNew', component: AddNewPropertyComponent },
  { path: 'gallery', component: AdminGalleryComponent },
  { path: 'adPackage', component: AdminAdPackageComponent },
  { path: 'adminManage', component: AdminManagePropertyComponent },
  { path: 'userManage', component: UserManagePropertyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }