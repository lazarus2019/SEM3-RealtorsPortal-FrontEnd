import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryModel } from 'src/app/models/category.model';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel } from 'src/app/models/country.model';
import { PropertyModel } from 'src/app/models/property.model';
import { RegionModel } from 'src/app/models/region.model';
import { SettingModel } from 'src/app/models/setting.model';
import { IndexService } from 'src/app/services/user/index.service';
import { ListingService } from 'src/app/services/user/listing.service';
import { ShareFormService } from 'src/app/services/user/shareFormSearchData';

@Component({
  templateUrl: './listing.component.html'
})
export class ListingComponent implements OnInit {

  listing: PropertyModel[];

  loadregions: RegionModel[];
  loadcities: CityModel[];
  loadcountries: CountryModel[];
  loadallcities: CityModel[];
  categories: CategoryModel[] = [];
  formGroup: FormGroup;

  // Pagination 
  setting : SettingModel;

  isFilter = false;

  NoNum: number = 10;

  currentPage: number = 0;

  listingLength: number = 0;

  listingLengthArray = Array<string>();

  listingPerPage: number = 4;

  listingPer: number = 0;

  allNewsLength: number = 0;

  constructor(
    private listingService: ListingService,
    private indexService: IndexService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {

    this.loadData();
    this.formGroup = this.formBuilder.group({
      keyword: '',
      country: 0,
      city: 0,
      category: 0,
      type: 'all',
      area: 0,
      bed: 0,
      room: 0,
      price: 0
    });
  }
  readMoreFunc(message: string) {
    if(message.length > 25) {
      return message.substr(0, 25) + '...';
    }
    else return message
  }
  loadcity(event: any) {
    console.log("countryId : " + event.target.value);
    this.listingService.loadcity(event.target.value).then(
      res => {
        this.loadallcities = res
      },
      err => {
        console.log(err)
      });
  }
  search() {

  }



  loadData() {
    this.listingService.getSetting().then(
      res => {
        this.setting = res 
        this.listingPerPage = res.numProperty ; 
      },
      err => {
        console.log(err) 
      });
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
    this.listingService.getListingCount().then(
      res => {
        console.log('res : ' + res) 
        //this.listing.length = res;
        this.listingLength = res;
        this.setPagination();
        this.getAllListing(1);
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


  minusPage() {
    this.currentPage--;
    if (!this.isFilter) {
      this.getAllListing(this.currentPage);
    } else {
      // this.filterNewsPerPage(this.currentPage);
    }
  }

  plusPage() {
    this.currentPage++;
    if (!this.isFilter) {
      this.getAllListing(this.currentPage);
    } else {
      // this.filterNewsPerPage(this.currentPage);
    }
  }

  searchBtn() {
    this.isFilter = true;
    // this.sortFilterNews();
    // this.filterNewsPerPage(1);
  }

  executeNewsPerPage(page: number) {
    this.currentPage = page;
    if (!this.isFilter) {
      this.getAllListing(this.currentPage);
    } else {
      // this.filterNewsPerPage(this.currentPage);
    }
  }
  setPagination() {    
    this.listingPer = Math.ceil(this.listingLength / this.listingPerPage);
    console.log( "listingPer : " + this.listingPer);
    this.listingLengthArray = new Array(this.listingPer);
    this.currentPage = 1;
  }
  getAllListing(page: number) {
    this.listingService.getAllListing(page).then(
      res => {
        this.listing = res;  
      },
      err => {
        console.log(err)
      });
  }

 

}