import { AuthGuard } from 'src/app/authenticate/auth.guard';
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
import { EditPropertyComponent } from './property/editProperty.component';

// Admin Services

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin', 'Admin'] } },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin', 'Admin'] } },
  { path: 'addProperty', component: AddNewPropertyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'editProperty/:propertyId', component: EditPropertyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'mailbox', component: AdminMailBoxComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin', 'Admin'] } },
  //{ path: 'gallery', component: AdminGalleryComponent },
  { path: 'adPackage', component: AdminAdPackageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'adminManage', component: AdminManagePropertyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },
  { path: 'userManage', component: UserManagePropertyComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] } },
  { path: 'manageMember', component: AdminManageMemberComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },
  { path: 'manageAdPackage', component: AdminManageAdPackageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },
  { path: 'manageInvoice', component: AdminManageInvoiceAdPackageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },
  //{ path: 'template', component: TemplateComponent },
  //{ path: 'invoiceTemplate', component: InvoiceTemplateComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },
  { path: 'manageInvoiceAdPackage', component: AdminManageInvoiceAdPackageComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },
  { path: 'reports', component: ReportComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { permittedRoles: ['SuperAdmin'] } },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }