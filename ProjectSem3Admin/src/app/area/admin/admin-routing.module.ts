import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewService } from 'src/app/services/addNewService';

// Admin components
import { AdminAdPackageComponent } from './adpackage/adPackage.component';
import { AdminManageAdPackageComponent } from './adpackage/manageAdPackage.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminGalleryComponent } from './gallery/gallery.component';
import { AdminManageInvoiceAdPackageComponent } from './invoice/manageInvoiceAdPackage.component';
import { AdminMailBoxComponent } from './mailbox/mailbox.component';
import { AdminManageMemberComponent } from './member/manageMember.component';
import { ProfileComponent } from './profile/profile.component';
import { AddNewPropertyComponent } from './property/addNew.component';
import { AdminManagePropertyComponent } from './property/adminManage.component';
import { UserManagePropertyComponent } from './property/userManage.component';
import { ReportComponent } from './reports/reports.component';
import { SettingComponent } from './setting/setting.component';
import { TemplateComponent } from './template/template.component';

// Admin Services

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'mailbox', component: AdminMailBoxComponent },
  { path: 'addNew', component: AddNewPropertyComponent, canActivate: [AddNewService] },
  { path: 'gallery', component: AdminGalleryComponent },
  { path: 'adPackage', component: AdminAdPackageComponent },
  { path: 'adminManage', component: AdminManagePropertyComponent },
  { path: 'userManage', component: UserManagePropertyComponent },
  { path: 'manageMember', component: AdminManageMemberComponent },
  { path: 'manageAdPackage', component: AdminManageAdPackageComponent },
  { path: 'manageInvoice', component: AdminManageInvoiceAdPackageComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'manageInvoiceAdPackage', component: AdminManageInvoiceAdPackageComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'profile', component: ProfileComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }