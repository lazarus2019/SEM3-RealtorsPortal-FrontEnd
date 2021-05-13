import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Module
import { AppRoutingModule } from './app-routing.module';
import { AdminRoutingModule } from './area/admin/admin-routing.module';
import { UserRoutingModule } from './area/user/user-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Admin area
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
import { AdminManageInvoiceAdPackageComponent } from './area/admin/invoice/manageInvoiceAdPackage.component';
import { SettingComponent } from './area/admin/setting/setting.component';
import { TemplateComponent } from './area/admin/template/template.component';
import { AddNewService } from './services/addNewService';
import { TestComponent } from './area/admin/testing/testing.component';
import { AdminService } from './services/adminService.service';
import { UserManageInvoiceComponent } from './area/admin/invoice/userManageInvoice.component';
import { AdminManageInvoiceComponent } from './area/admin/invoice/adminManageInvoice.component';
import { InvoiceTemplateComponent } from './area/admin/invoice/invoiceTemplate.component';
import { ReportComponent } from './area/admin/reports/reports.component';
import { ProfileComponent } from './area/admin/profile/profile.component';

// Admin Services
import { NewsAPIService } from './services/admin/news/newsAPI.service';


// User area
import { ContactComponent } from './area/user/contact/contact.component';
import { IndexComponent } from './area/user/index/index.component';
import { ListingComponent } from './area/user/listing/listing.component';
import { AgentComponent } from './area/user/phonebook/agent/agent.component';
import { SellerComponent } from './area/user/phonebook/seller/seller.component';
import { AddPropertyComponent } from './area/user/single-property/add_property/addproperty.component';
import { PropertyComponent } from './area/user/single-property/property.component';
import { UserComponent } from './area/user/user.component';
import { DetailsComponent } from './area/user/phonebook/detail/detail.component';
import { AboutUsComponent } from './area/user/aboutUs/aboutUs.component';
import { NewsComponent } from './area/user/news/news.component';
import { CategoryComponent } from './area/user/category/category.component';
import { AdminNewsComponent } from './area/admin/news/addNew.component';
import { AdminManageNewsComponent } from './area/admin/news/manageNews.component';
import { NewsCategoryAPIService } from './services/admin/newsCategory/newsCategoryAPI.service';


@NgModule({
  declarations: [
    AppComponent,

    // Admin area
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
    AdminManageInvoiceAdPackageComponent,
    SettingComponent,
    UserManageInvoiceComponent,
    AdminManageInvoiceComponent,
    AdminManageInvoiceAdPackageComponent,
    InvoiceTemplateComponent,
    ReportComponent,
    ProfileComponent,
    AdminNewsComponent,
    AdminManageNewsComponent,

    // Template component
    TemplateComponent,

    // Testing component
    TestComponent,

    // User area
    UserComponent,
    IndexComponent,
    ListingComponent,
    ContactComponent,
    PropertyComponent,
    AboutUsComponent,
    AddPropertyComponent,
    AgentComponent,
    SellerComponent,
    ListingComponent,
    ContactComponent,
    DetailsComponent,
    NewsComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    // Load form module để truyền dữ liệu
    FormsModule,
    // Http Client module
    ReactiveFormsModule,
    // 
    HttpClientModule,
    // Add routing module
    AppRoutingModule,

    // Admin module
    AdminRoutingModule,

    // User module
    UserRoutingModule
  ],
  providers: [
    AddNewService,
    AdminService,
    NewsAPIService,
    NewsCategoryAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
