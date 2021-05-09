import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Admin area
import { AdminRoutingModule } from './area/admin/admin-routing.module';
import { AdminComponent } from './area/admin/admin.component';
import { AdminDashboardComponent } from './area/admin/dashboard/dashboard.component';
import { AdminGalleryComponent } from './area/admin/gallery/gallery.component';
import { AdminMailBoxComponent } from './area/admin/mailbox/mailbox.component';
import { AddNewPropertyComponent } from './area/admin/property/addNew.component';
import { AdminManagePropertyComponent } from './area/admin/property/adminManage.component';
import { UserManagePropertyComponent } from './area/admin/property/userManage.component';
import { AdminManageMemberComponent } from './area/admin/member/manageMember.component';
import { AdminAdPackageComponent } from './area/admin/adpackage/adPackage.component';
import { AdminManageAdPackageComponent } from './area/admin/adpackage/manageAdPackage.component';
import { AdminAddAdPackageComponent } from './area/admin/adpackage/addAdPackage.component';
import { AdminManageInvoiceAdPackageComponent } from './area/admin/invoice/manageInvoiceAdPackage.component';
import { AdminSettingComponent } from './area/admin/setting/adminSetting.component';
import { TemplateComponent } from './area/admin/template/template.component';
import { AddNewService } from './services/addNewService';
import { TestComponent } from './area/admin/testing/testing.component';
import { AdminService } from './services/adminService.service';
import { UserManageInvoiceComponent } from './area/admin/invoice/userManageInvoice.component';
import { AdminManageInvoiceComponent } from './area/admin/invoice/adminManageInvoice.component';
import { InvoiceTemplateComponent } from './area/admin/invoice/invoiceTemplate.component';
import { ReportComponent } from './area/admin/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddNewPropertyComponent,
    AdminDashboardComponent,
    AdminMailBoxComponent,
    AdminGalleryComponent,
    AdminAdPackageComponent,
    AdminManagePropertyComponent,
    UserManagePropertyComponent,
    AdminManageMemberComponent,
    AdminManageAdPackageComponent,
    AdminAddAdPackageComponent,
    AdminManageInvoiceAdPackageComponent,
    AdminSettingComponent,
    AdminSettingComponent,
    UserManageInvoiceComponent,
    AdminManageInvoiceComponent,
    AdminManageInvoiceAdPackageComponent,
    InvoiceTemplateComponent,
    ReportComponent,
    TemplateComponent,
    TestComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    // Load form module để truyền dữ liệu
    FormsModule,
    // 
    ReactiveFormsModule,
    // Add routing module
    AppRoutingModule,
  ],
  providers: [
    AddNewService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
