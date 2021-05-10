import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyComponent } from './single-property/property.component';

// User components


const routes: Routes = [
  { path: '', component:  IndexComponent},
  {path: 'single-property', component: PropertyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }