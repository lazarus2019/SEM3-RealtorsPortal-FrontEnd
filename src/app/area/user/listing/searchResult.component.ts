import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryModel } from 'src/app/models/category.model';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel } from 'src/app/models/country.model';
import { PropertyModel } from 'src/app/models/property.model';
import { IndexService } from 'src/app/services/user/index.service';
import { ListingService } from 'src/app/services/user/listing.service';
import { ShareFormService } from 'src/app/services/user/shareFormSearchData';

@Component({
  templateUrl: './searchResult.component.html'
})
export class ResultComponent implements OnInit {


  listing: PropertyModel[];
  loadcountries: CountryModel[];
  loadallcities: CityModel[]
  categories: CategoryModel[] = [];
  formGroup: FormGroup;
  //index
  keyword: string
  categoryId: number
  country: string
  pg: string



  constructor(
    private listingService: ListingService,
    private indexService: IndexService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.loadData();

    this.formGroup = this.formBuilder.group({
      keyword: '',
      country: 'all',
      city: 'all',
      category: 'all',
      type: 'all',
      area: 1,
      bed: 0,
      room: 0,
      price: 1
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.pg = params.get('pg');
    })
    if (this.pg == 'index') {
      this.activatedRoute.paramMap.subscribe(params => {
        this.formGroup.value.keyword = params.get('keyword');
        this.formGroup.value.country = params.get('country');
        this.formGroup.value.category = params.get('cate');
        
      })
      this.listingService.searchProperty(this.formGroup.value.keyword, this.formGroup.value.category, this.formGroup.value.country).then(
        res => {
          this.listing = res
        },
        err => {
          console.log(err)
        });
    }
    else if ( this.pg == 'listing') {
      this.activatedRoute.paramMap.subscribe(params => {
        
        this.formGroup.value.keyword = params.get('keyword');
        this.formGroup.value.country = params.get('country');
        this.formGroup.value.category = params.get('category');
        this.formGroup.value.city = params.get('city');
        this.formGroup.value.type = params.get('type');
        this.formGroup.value.area = params.get('area');
        this.formGroup.value.bed = params.get('bed');
        this.formGroup.value.room = params.get('room');
        this.formGroup.value.price = params.get('price');

      })
      this.listingService.searchPropertyListing(
        this.formGroup.value.keyword,
         this.formGroup.value.category, 
         this.formGroup.value.country,
         this.formGroup.value.city ,
         this.formGroup.value.type ,
         this.formGroup.value.area , 
         this.formGroup.value.bed ,
         this.formGroup.value.room ,
         this.formGroup.value.price 
         ).then(
        res => {
          this.listing = res
        },
        err => {
          console.log(err)
        });

    }

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

    
      this.indexService.loadcategories().then(
        res => {
          this.categories = res
        },
        err => {
          console.log(err)
        });
    
  }
}