import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddAdPackageComponent } from './adpackage/addAdPackage.component';
import { AdminAdPackageComponent } from './adpackage/adPackage.component';
import { AdminManageAdPackageComponent } from './adpackage/manageAdPackage.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminGalleryComponent } from './gallery/gallery.component';
import { AdminMailBoxComponent } from './mailbox/mailbox.component';
import { AdminManageMemberComponent } from './member/manageMember.component';
import { AddNewPropertyComponent } from './property/addNew.component';
import { AdminManagePropertyComponent } from './property/adminManage.component';
import { UserManagePropertyComponent } from './property/userManage.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'mailbox', component: AdminMailBoxComponent },
  // { path: 'addNew', component: AddNewPropertyComponent, canActivate: [addNewService] },
  { path: 'gallery', component: AdminGalleryComponent },
  { path: 'adPackage', component: AdminAdPackageComponent },
  { path: 'adminManage', component: AdminManagePropertyComponent },
  { path: 'userManage', component: UserManagePropertyComponent },
  { path: 'manageMember', component: AdminManageMemberComponent },
  { path: 'manageAdPackage', component: AdminManageAdPackageComponent },
  { path: 'addAdPackage', component: AdminAddAdPackageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }