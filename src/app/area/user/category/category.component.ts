import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel } from 'src/app/models/country.model';
import { PropertyModel } from 'src/app/models/property.model';
import { SettingModel } from 'src/app/models/setting.model';
import { CategoryService } from 'src/app/services/user/category.service';
import { IndexService } from 'src/app/services/user/index.service';
import { ListingService } from 'src/app/services/user/listing.service';

@Component({
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
    
    propertybycategory : PropertyModel[] ; 
    propertyLength : number

    listing: PropertyModel[];
    loadcountries: CountryModel[];
    loadallcities: CityModel[]
    loadcities: CityModel[]
    categories: CategoryModel[] = [];
    formGroup: FormGroup;
    // Pagination 
  setting: SettingModel;

  isFilter = false;

  NoNum: number = 10;

  currentPage: number = 0;

  listingLength: number = 0;

  listingLengthArray = Array<string>();

  listingPerPage: number = 0;

  listingPer: number = 0;

  allNewsLength: number = 0;

  // search 
  keyword: string
  categoryId: number
  countryId: number
  city: number
  type: string
  area: number
  bed: number
  room: number
  price: number
  pg: string
  isIndex: boolean;


    constructor(
      private categoryService : CategoryService,
      private activatedRoute: ActivatedRoute,
      private listingService : ListingService , 
      private indexService : IndexService , 
      private formBuilder : FormBuilder 
    ) {}
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {                  
        this.categoryId = params.get('Id') as any as number;          
        this.setDataFormSearch() 
        this.loadData() ;
      }) 
    }
    getData() {      
        this.activatedRoute.paramMap.subscribe(params => {                  
          this.categoryId = params.get('category') as any as number;          
          this.setDataFormSearch()
        })     
    }
    setDataFormSearch(){
        this.formGroup = this.formBuilder.group({
          keyword: '',
          country: 0,
          city: 0,
          category: this.categoryId,
          type: 'all',
          area: 1,
          bed: 0,
          room: 0,
          price: 1
        }) 
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
        this.setDataFormSearch() ;
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
      this.categoryService.propertybycategorycount(this.categoryId).then(
        res => {
          console.log('res of categoryId : ' + res) 
          console.log('categoryId : ' + this.categoryId) 
          //this.listing.length = res;
          this.listingLength = res;
          this.setPagination();
          this.getCategoryListing( 1 );
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
        this.getCategoryListing(this.currentPage);
      } else {
        // this.filterNewsPerPage(this.currentPage);
      }
    }
  
    plusPage() {
      this.currentPage++;
      if (!this.isFilter) {
        this.getCategoryListing(this.currentPage);
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
        this.getCategoryListing(this.currentPage);
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
    getCategoryListing(page: number) {
      this.categoryService.propertybycategory(this.categoryId , page).then(
        res => {
          this.propertybycategory = res ;
          this.propertyLength = this.propertybycategory.length;
        },
        err => {
          console.log(err) 
        });
    }
  }