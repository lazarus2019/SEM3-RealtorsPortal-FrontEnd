import { AuthGuard } from 'src/app/authenticate/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewService } from 'src/app/services/addNewService';

// Admin components
import { AdminAdPackageComponent } from './adpackage/adPackage.component';
import { AdminManageAdPackageComponent } from './adpackage/manageAdPackage.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminGalleryComponent } from './gallery/gallery.component';
import { AdminManageInvoiceComponent } from './invoice/adminManageInvoice.component';
import { InvoiceTemplateComponent } from './invoice/invoiceTemplate.component';
import { AdminManageInvoiceAdPackageComponent } from './invoice/manageInvoiceAdPackage.component';
import { UserManageInvoiceComponent } from './invoice/userManageInvoice.component';
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
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'mailbox', component: AdminMailBoxComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'addNew', component: AddNewPropertyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Agent.'] } },
  { path: 'gallery', component: AdminGalleryComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'adPackage', component: AdminAdPackageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'adminManage', component: AdminManagePropertyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'userManage', component: UserManagePropertyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'manageMember', component: AdminManageMemberComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'manageAdPackage', component: AdminManageAdPackageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'manageInvoice', component: AdminManageInvoiceAdPackageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'template', component: TemplateComponent },
  { path: 'userManageInvoice', component: UserManageInvoiceComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'adminManageInvoice', component: AdminManageInvoiceComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'manageInvoiceAdPackage', component: AdminManageInvoiceAdPackageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'invoiceTemplate', component: InvoiceTemplateComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }