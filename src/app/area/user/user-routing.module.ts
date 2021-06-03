import { DetailsComponent } from './phonebook/detail/detail.component';
import { IndexComponent } from './index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyComponent } from './single-property/property.component';
import { ListingComponent } from './listing/listing.component';
import { SellerComponent } from './phonebook/seller/seller.component';
import { AgentComponent } from './phonebook/agent/agent.component';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { NewsComponent } from './news/news.component';
import { CategoryComponent } from './category/category.component';
import { ResultComponent } from './listing/searchResult.component';
import { NewsPropertyComponent } from './newsproperty/newsproperty.component';
import { NewsCategoryComponent } from './newscategory/newscategory.component';


// User components


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'single-property', component: PropertyComponent },
  { path: 'searchproperty', component: ResultComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'contact', component: ListingComponent },
  { path: 'member-details', component: DetailsComponent },
  { path: 'sellers', component: SellerComponent },
  { path: 'agents', component: AgentComponent },
  { path: 'news', component: NewsComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'newPropertyMember', component: NewsPropertyComponent },
  { path: 'newsCategory', component: NewsCategoryComponent },
  { path: 'detailMember', component: DetailsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }