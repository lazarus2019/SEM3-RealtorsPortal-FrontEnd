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
import { AdminHomeComponent } from './area/admin/home/home.component';
import { AdminMailBoxComponent } from './area/admin/mailbox/mailbox.component';
import { AddNewPropertyComponent } from './area/admin/property/addNew.component';
import { AdminManagePropertyComponent } from './area/admin/property/adminManage.component';
import { UserManagePropertyComponent } from './area/admin/property/userManage.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHomeComponent,
    AddNewPropertyComponent,
    AdminDashboardComponent,
    AdminMailBoxComponent,
    AdminGalleryComponent,
    AdminAdPackageComponent,
    AdminManagePropertyComponent,
    UserManagePropertyComponent
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
