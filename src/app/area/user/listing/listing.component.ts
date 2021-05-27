import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryModel } from 'src/app/models/category.model';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel } from 'src/app/models/country.model';
import { PropertyModel } from 'src/app/models/property.model';
import { RegionModel } from 'src/app/models/region.model';
import { IndexService } from 'src/app/services/user/index.service';
import { ListingService } from 'src/app/services/user/listing.service';
import { ShareFormService } from 'src/app/services/user/shareFormSearchData';

@Component({
  templateUrl: './listing.component.html'
})
export class ListingComponent implements OnInit {

  listing: PropertyModel[];
  loadregions: RegionModel[];
  loadcities: CityModel[]
  loadcountries: CountryModel[];
  loadallcities: CityModel[] ;
  categories: CategoryModel[] = [];
  formGroup: FormGroup;

  constructor(
    private listingService: ListingService,
    private indexService: IndexService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      keyword: '',
      country: 'all',
      city: 'all',
      category: 0,
      type: 'all',
      area: 0,
      bed: 0,
      room: 0,
      price: 0
    });
    this.loadData() ;


  }

  loadcity(countryId: string) {
    console.log("countryId : " + this.formGroup.value.country);
    this.listingService.loadcity(this.formGroup.value.country).then(
      res => {
        this.loadcities = res
      },
      err => {
        console.log(err)
      });
  }
  search() {

  }
  loadData() {
    this.listingService.loadallcity().then(
      res => {
        this.loadallcities = res
      },
      err => {
        console.log(err)
      });

    this.indexService.loadcountries().then(
      res => {
        this.loadcountries = res
      },
      err => {
        console.log(err)
      });

    this.listingService.getAllListing().then(
      res => {
        this.listing = res
      },
      err => {
        console.log(err)
      });
      this.indexService.loadcategories().then(
        res => {
          this.categories = res
        },
        err => {
          console.log(err)
        });
    
  }

}