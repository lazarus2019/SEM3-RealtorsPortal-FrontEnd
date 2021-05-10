import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './area/admin/admin.component';
import { AdminAdPackageComponent } from './area/admin/adpackage/adPackage.component';
import { AdminManageAdPackageComponent } from './area/admin/adpackage/manageAdPackage.component';
import { AdminDashboardComponent } from './area/admin/dashboard/dashboard.component';
import { AdminGalleryComponent } from './area/admin/gallery/gallery.component';
import { AdminManageInvoiceAdPackageComponent } from './area/admin/invoice/manageInvoiceAdPackage.component';
import { AdminMailBoxComponent } from './area/admin/mailbox/mailbox.component';
import { AdminManageMemberComponent } from './area/admin/member/manageMember.component';
import { AddNewPropertyComponent } from './area/admin/property/addNew.component';
import { AdminManagePropertyComponent } from './area/admin/property/adminManage.component';
import { UserManagePropertyComponent } from './area/admin/property/userManage.component';
import { TemplateComponent } from './area/admin/template/template.component';
import { SettingComponent } from './area/admin/setting/setting.component';
import { UserManageInvoiceComponent } from './area/admin/invoice/userManageInvoice.component';
import { AdminManageInvoiceComponent } from './area/admin/invoice/adminManageInvoice.component';
import { InvoiceTemplateComponent } from './area/admin/invoice/invoiceTemplate.component';
import { ReportComponent } from './area/admin/reports/reports.component';
import { IndexComponent } from './area/user/index/index.component';
import { UserComponent } from './area/user/user.component';
import { PropertyComponent } from './area/user/single-property/property.component';
import { ProfileComponent } from './area/admin/profile/profile.component';

const routes: Routes = [
  
  // Default Component
  {
    path: '', component: UserComponent,
    children:
      [
        // { path: '', component: AdminDashboardComponent }
        { path: '', component: IndexComponent }
      ]
  },

  // User Components
  {
    path: 'user', component: UserComponent,
    children:
      [
        { path: '', component: IndexComponent },
        {path: 'single-property', component: PropertyComponent}
      ]
  },

  // Admin Components
  {
    path: 'admin', component: AdminComponent,
    children:
      [
        { path: '', component: AdminDashboardComponent },
        { path: 'dashboard', component: AdminDashboardComponent },
        { path: 'addNew', component: AddNewPropertyComponent },
        { path: 'mailbox', component: AdminMailBoxComponent },
        { path: 'gallery', component: AdminGalleryComponent },
        { path: 'adPackage', component: AdminAdPackageComponent },
        { path: 'adminManage', component: AdminManagePropertyComponent },
        { path: 'userManage', component: UserManagePropertyComponent },
        { path: 'manageMember', component: AdminManageMemberComponent },
        { path: 'manageAdPackage', component: AdminManageAdPackageComponent },
        { path: 'manageInvoice', component: AdminManageInvoiceAdPackageComponent },
        { path: 'setting', component: SettingComponent },
        { path: 'template', component: TemplateComponent },
        { path: 'userManageInvoice', component: UserManageInvoiceComponent },
        { path: 'adminManageInvoice', component: AdminManageInvoiceComponent },
        { path: 'invoiceTemplate', component: InvoiceTemplateComponent },
        { path: 'manageInvoiceAdPackage', component: AdminManageInvoiceAdPackageComponent },
        { path: 'reports', component: ReportComponent },
        { path: 'profile', component: ProfileComponent },
      ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
