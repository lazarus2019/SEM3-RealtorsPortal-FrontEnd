import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './area/admin/admin.component';
import { AdminAddAdPackageComponent } from './area/admin/adpackage/addAdPackage.component';
import { AdminAdPackageComponent } from './area/admin/adpackage/adPackage.component';
import { AdminManageAdPackageComponent } from './area/admin/adpackage/manageAdPackage.component';
import { AdminDashboardComponent } from './area/admin/dashboard/dashboard.component';
import { AdminGalleryComponent } from './area/admin/gallery/gallery.component';
import { AdminMailBoxComponent } from './area/admin/mailbox/mailbox.component';
import { AdminManageMemberComponent } from './area/admin/member/manageMember.component';
import { AddNewPropertyComponent } from './area/admin/property/addNew.component';
import { AdminManagePropertyComponent } from './area/admin/property/adminManage.component';
import { UserManagePropertyComponent } from './area/admin/property/userManage.component';

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
        { path: 'addNew', component: AddNewPropertyComponent },
        { path: 'mailbox', component: AdminMailBoxComponent },
        { path: 'gallery', component: AdminGalleryComponent },
        { path: 'adPackage', component: AdminAdPackageComponent },
        { path: 'adminManage', component: AdminManagePropertyComponent },
        { path: 'userManage', component: UserManagePropertyComponent },
        { path: 'manageMember', component: AdminManageMemberComponent },
        { path: 'manageAdPackage', component: AdminManageAdPackageComponent },
        { path: 'addAdPackage', component: AdminAddAdPackageComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
