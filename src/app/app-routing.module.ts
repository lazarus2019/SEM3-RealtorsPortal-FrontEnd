import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './area/admin/admin.component';
import { AdminAddAdPackageComponent } from './area/admin/adpackage/addAdPackage.component';
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
import { AdminSettingComponent } from './area/admin/setting/adminSetting.component';
import { TestComponent } from './area/admin/testing/testing.component';
import { UserManageInvoiceComponent } from './area/admin/invoice/userManageInvoice.component';
import { AdminManageInvoiceComponent } from './area/admin/invoice/adminManageInvoice.component';
import { InvoiceTemplateComponent } from './area/admin/invoice/invoiceTemplate.component';
import { ReportComponent } from './area/admin/reports/reports.component';

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
        { path: 'addAdPackage', component: AdminAddAdPackageComponent },
        { path: 'manageInvoice', component: AdminManageInvoiceAdPackageComponent },
        { path: 'adminSetting', component: AdminSettingComponent },
        {path: 'template', component: TemplateComponent},
        {path: 'adminSetting', component: AdminSettingComponent},
        { path: 'userManageInvoice', component: UserManageInvoiceComponent },
        { path: 'adminManageInvoice', component: AdminManageInvoiceComponent },
        { path: 'invoiceTemplate', component: InvoiceTemplateComponent },
        { path: 'manageInvoiceAdPackage', component: AdminManageInvoiceAdPackageComponent },
        { path: 'reports', component: ReportComponent },
      ]
  },
  { path: 'testing', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
