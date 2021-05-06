import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Admin area
import { AdminRoutingModule } from './area/admin/admin-routing.module';
import { AdminComponent } from './area/admin/admin.component';
import { AdminDashboardComponent } from './area/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './area/admin/home/home.component';
import { AddNewPropertyComponent } from './area/admin/property/addNew.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHomeComponent,
    AddNewPropertyComponent,
    AdminDashboardComponent
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
