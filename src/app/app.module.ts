import { AdminAdPackageComponent } from './area/admin/adpackage/adPackage.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AdminManageAdPackageComponent } from './area/admin/adpackage/manageAdPackage.component';
import { AdminAddAdPackageComponent } from './area/admin/adpackage/addAdPackage.component';

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
    AdminAddAdPackageComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
