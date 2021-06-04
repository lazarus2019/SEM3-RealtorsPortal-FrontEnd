import { NgImageSliderModule } from 'ng-image-slider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Module
import { AppRoutingModule } from './app-routing.module';
import { AdminRoutingModule } from './area/admin/admin-routing.module';
import { UserRoutingModule } from './area/user/user-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { EditPropertyComponent } from './area/admin/property/editProperty.component';
import { AddNewService } from './services/addNewService';
import { AdminService } from './services/adminService.service';
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
import { PropertyComponent } from './area/user/single-property/property.component';
import { UserComponent } from './area/user/user.component';
import { DetailsComponent } from './area/user/phonebook/detail/detail.component';
import { AboutUsComponent } from './area/user/aboutUs/aboutUs.component';
import { NewsComponent } from './area/user/news/news.component';
import { CategoryComponent } from './area/user/category/category.component';
import { AdminNewsComponent } from './area/admin/news/addNews.component';
import { AdminManageNewsComponent } from './area/admin/news/manageNews.component';
import { NewsCategoryAPIService } from './services/admin/newsCategory/newsCategoryAPI.service';
import { ImageService } from './services/admin/image/imageService.service';
import { AdminEditNewsComponent } from './area/admin/news/editNews.component';
import { PublicService } from './services/publicService.service';
import { AdminFAQComponent } from './area/admin/faq/faq.component';
import { FAQAPIService } from './services/admin/faq/faqAPI.service';
import { InvoiceService } from './services/invoice.service';
import { LoginComponent } from './area/user/login/login.component';
import { RegistrationComponent } from './area/user/registration/registration.component';
import { ForgetPasswordComponent } from './area/user/forgotPassword/forgetPassword.component';
import { AccountService } from './services/account.service';
import { AuthInterceptor } from './authenticate/auth.interceptor';
import { ResetPasswordComponent } from './area/user/forgotPassword/resetPassword.component';
import { ConfirmEmailComponent } from './area/user/confirmEmail/confirmEmail.component';
import { SuccessRegistrationComponent } from './area/user/registration/successRegistration.component';
import { AddressService } from './services/address.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MailBoxAPIService } from './services/admin/mailbox/mailboxAPI.service';
import { SettingAPIService } from './services/admin/setting/settingAPI.service';
import { CategoryService } from './services/category.service';
import { ReportsService } from './services/reports.service';
import { PropertyService } from './services/property.service';
import { MemberAPIService } from './services/member/memberAPI.service';
import { IndexService } from './services/user/index.service';
import { SellerService } from './services/user/seller.service';
import { FindSellerService } from './services/user/findseller.service';
import { DetailService } from './services/user/detail.service';
import { NewsPropertyService } from './services/user/newsproperty.service';
import { AboutUsService } from './services/user/aboutus.service';
import { ShareFormService } from './services/user/shareFormSearchData';
import { SettingUserService } from './services/user/setting.service';
import { NewsUserService } from './services/user/news.service';
import { MailboxUserService } from './services/user/mailbox.service';
import { ListingService } from './services/user/listing.service';
import { FAQUserService } from './services/user/faqapi.service';
import { MyCategoryComponent } from './area/user/tagHelper/mycategory.component';
import { UserService } from './services/user.service';
import { ResultComponent } from './area/user/listing/searchResult.component';
import { NewsPropertyComponent } from './area/user/newsproperty/newsproperty.component';
import { NewsCategoryComponent } from './area/user/newscategory/newscategory.component';


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
    AdminManageInvoiceAdPackageComponent,
    ReportComponent,
    ProfileComponent,
    EditPropertyComponent,
    AdminNewsComponent,
    AdminManageNewsComponent,
    AdminEditNewsComponent,
    AdminFAQComponent,

    // User area
    UserComponent,
    IndexComponent,
    ListingComponent,
    ContactComponent,
    PropertyComponent,
    AboutUsComponent,
    AgentComponent,
    SellerComponent,
    ListingComponent,
    ContactComponent,
    DetailsComponent,
    NewsComponent,
    CategoryComponent,
    NewsPropertyComponent,
    NewsCategoryComponent,

    //login-Registration
    LoginComponent,
    RegistrationComponent,
    SuccessRegistrationComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ConfirmEmailComponent,
    MyCategoryComponent,
    ResultComponent,
    

  ],
  imports: [
    BrowserModule,
    // Load form module để truyền dữ liệu
    // Http Client module
    ReactiveFormsModule,
    FormsModule,
    // 
    HttpClientModule,
    // Add routing module
    AppRoutingModule,

    // Admin module
    AdminRoutingModule,

    // User module
    UserRoutingModule,
    CommonModule,

    NoopAnimationsModule,
    NgImageSliderModule,

  ],
  providers: [
    // Admin Services
    AddNewService,
    AdminService,
    NewsAPIService,
    ImageService,
    PublicService,
    NewsCategoryAPIService,
    FAQAPIService,
    InvoiceService,
    AddressService,
    AccountService,
    MailBoxAPIService,
    MemberAPIService,
    ReportsService,
    SettingAPIService,
    CategoryService,
    InvoiceService,
    UserService,

    // T.Anh
    AddNewService,
    AdminService,
    PropertyService,
    SellerService,
    FindSellerService,
    DetailService,
    NewsPropertyService,
    AboutUsService,
    PublicService,
    ShareFormService,
    SettingUserService,
    NewsUserService,
    MailboxUserService,
    ListingService,
    FAQUserService,
    IndexService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
