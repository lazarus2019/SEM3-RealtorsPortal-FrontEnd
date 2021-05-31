import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Module
import { AppRoutingModule } from './app-routing.module';
import { AdminRoutingModule } from './area/admin/admin-routing.module';
import { UserRoutingModule } from './area/user/user-routing.module';

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
//import { TestComponent } from './area/admin/testing/testing.component';
import { AdminService } from './services/adminService.service';
import { UserManageInvoiceComponent } from './area/admin/invoice/userManageInvoice.component';
import { AdminManageInvoiceComponent } from './area/admin/invoice/adminManageInvoice.component';
import { InvoiceTemplateComponent } from './area/admin/invoice/invoiceTemplate.component';
import { ReportComponent } from './area/admin/reports/reports.component';
import { ProfileComponent } from './area/admin/profile/profile.component';

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
import { LoginComponent } from './area/user/login/login.componet';
import { PropertyService } from './services/property.service';
import { HttpClientModule } from '@angular/common/http';
import { IndexService } from './services/user/index.service';
import { ListingService } from './services/user/listing.service';
import { SafePipe } from './pipe/safeUrl.pipe';
import { UserService } from './services/user.service';
import { CategoryService } from './services/user/category.service';
import { ShareFormService } from './services/user/shareFormSearchData';
import { ResultComponent } from './area/user/listing/searchResult.component';
import { MailboxService } from './services/user/mailbox.service';
import { NgImageSliderModule } from 'ng-image-slider';
import { MyCategoryComponent } from './area/user/tagHelper/mycategory.component';


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
    AdminManageMemberComponent,
    AdminManageAdPackageComponent,
    AdminManageInvoiceAdPackageComponent,
    SettingComponent,
    UserManagePropertyComponent,
    UserManageInvoiceComponent,
    AdminManageInvoiceComponent,
    AdminManageInvoiceAdPackageComponent,
    InvoiceTemplateComponent,
    ReportComponent,
    ProfileComponent,

    // Template component
    TemplateComponent,

    // Testing component
    //TestComponent,

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
    CategoryComponent,
    LoginComponent,
    ResultComponent,

    //TagHelper
    MyCategoryComponent,

    //Pipe 
    SafePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Load form module để truyền dữ liệu
    FormsModule,
    // 
    ReactiveFormsModule,
    // Add routing module
    AppRoutingModule,

    // Admin module
    AdminRoutingModule,

    // User module
    UserRoutingModule,

    HttpClientModule,

    //image 
    NgImageSliderModule
  ],
  providers: [
    AddNewService,
    AdminService,
    PropertyService,
    IndexService,
    ListingService,
    UserService,
    CategoryService,
    ShareFormService , 
    MailboxService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
