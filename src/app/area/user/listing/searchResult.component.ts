import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoryModel } from 'src/app/models/category.model';
import { CityModel } from 'src/app/models/city.model';
import { CountryModel } from 'src/app/models/country.model';
import { PropertyModel } from 'src/app/models/property.model';
import { SettingModel } from 'src/app/models/setting.model';
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
  loadcities: CityModel[]
  categories: CategoryModel[] = [];
  formGroup: FormGroup;
  //index


  // Pagination 
  setting: SettingModel;

  isFilter = false;

  NoNum: number = 10;

  currentPage: number = 0;

  listingLength: number = 0;

  listingLengthArray = Array<string>();

  listingPerPage: number = 4;

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

  // test
  test: CountryModel


  constructor(
    private listingService: ListingService,
    private indexService: IndexService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {

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
      console.log(this.pg)
      if (this.pg == 'index') {
        this.isIndex = true;
      }
      if (this.pg == 'listing') {
        this.isIndex = false;
      }

      console.log(this.isIndex)
      this.loadData()

    });
  }
  getData() {
    if (this.pg == 'index') {
      this.activatedRoute.paramMap.subscribe(params => {
        this.formGroup.value.keyword = params.get('keyword');
        this.formGroup.value.country = params.get('countryId');
        this.formGroup.value.category = params.get('categoryId');
        this.keyword = params.get('keyword');
        this.countryId = params.get('countryId') as any as number;
        this.categoryId = params.get('categoryId') as any as number;
        console.log('key 1 : ' + this.formGroup.value.keyword + ' | ' + params.get('keyword'))
      })
    }
    if (this.pg == 'listing') {
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
        this.keyword = params.get('keyword');
        this.countryId = params.get('countryId') as any as number;
        this.categoryId = params.get('categoryId') as any as number;
        this.city = params.get('city') as any as number;
        this.type = params.get('type') as any as string;
        this.area = params.get('area') as any as number;
        this.bed = params.get('bed') as any as number;
        this.room = params.get('room') as any as number;
        this.price = params.get('price') as any as number;


      })
    }
    this.searchListing(1);
  }

  searchListing(page: number) {
    if (this.isIndex == true) {
      this.listingService.searchPropertyCount(this.keyword, this.categoryId, this.countryId).then(
        res => {
          console.log(' length Search : ' + res)
          this.listingLength = res;
          this.setPagination();
          this.listingService.searchProperty(this.keyword, this.categoryId, this.countryId, page).then(
            res => {
              this.listing = res
            },
            err => {
              console.log(err)
            });
        },
        err => {
          console.log(err)
        });
    }
    else if (this.isIndex == false) {
      this.listingService.searchPropertyListingCount(
        this.keyword,
        this.categoryId,
        this.countryId,
        this.city,
        this.type,
        this.area,
        this.bed,
        this.room,
        this.price).then(
          res => {
            console.log(' length Search : ' + res)
            this.listingLength = res;
            this.setPagination();
            this.listingService.searchPropertyListing(
              this.keyword,
              this.categoryId,
              this.countryId,
              this.city,
              this.type,
              this.area,
              this.bed,
              this.room,
              this.price,
              page
            ).then(
              res => {
                this.listing = res
              },
              err => {
                console.log(err)
              });
          },
          err => {
            console.log(err)
          });
    }
  }
  loadcity(event: any) {
    console.log("countryId : " + event.target.value);
    // var countryId = event.target.value as number

    // var temp = this.loadcountries.filter( c => c.countryId == countryId)[0] ;
    // this.loadallcities = temp.cities
  }
  loadData() {
    this.listingService.getSetting().then(
      res => {
        this.setting = res
        this.listingPerPage = res.numProperty;
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
    this.indexService.loadcategories().then(
      res => {
        this.categories = res
      },
      err => {
        console.log(err)
      });
    this.getData();

  }

  minusPage() {
    this.currentPage--;
    if (this.isIndex == true) {
      this.listingService.searchProperty(this.keyword, this.categoryId, this.countryId, this.currentPage).then(
        res => {
          this.listing = res
        },
        err => {
          console.log(err)
        });
    } else {
      this.listingService.searchPropertyListing(
        this.keyword,
        this.categoryId,
        this.countryId,
        this.city,
        this.type,
        this.area,
        this.bed,
        this.room,
        this.price,
        this.currentPage
      ).then(
        res => {
          this.listing = res
        },
        err => {
          console.log(err)
        });
    }
  }

  plusPage() {
    this.currentPage++;
    if (this.isIndex == true) {
      this.listingService.searchProperty(this.keyword, this.categoryId, this.countryId, this.currentPage).then(
        res => {
          this.listing = res
        },
        err => {
          console.log(err)
        });
    } else {
      this.listingService.searchPropertyListing(
        this.keyword,
        this.categoryId,
        this.countryId,
        this.city,
        this.type,
        this.area,
        this.bed,
        this.room,
        this.price,
        this.currentPage
      ).then(
        res => {
          this.listing = res
        },
        err => {
          console.log(err)
        });
    }
  }

  searchBtn() {
    this.isFilter = true;
    // this.sortFilterNews();
    // this.filterNewsPerPage(1);
  }

  executeNewsPerPage(page: number) {
    this.currentPage = page;
    if (this.isIndex == true) {
      this.listingService.searchProperty(this.formGroup.value.keyword, this.formGroup.value.category, this.formGroup.value.country, this.currentPage).then(
        res => {
          this.listing = res
        },
        err => {
          console.log(err)
        });
    } else {
      this.listingService.searchPropertyListing(
        this.formGroup.value.keyword,
        this.formGroup.value.category,
        this.formGroup.value.country,
        this.formGroup.value.city,
        this.formGroup.value.type,
        this.formGroup.value.area,
        this.formGroup.value.bed,
        this.formGroup.value.room,
        this.formGroup.value.price,
        this.currentPage
      ).then(
        res => {
          this.listing = res
        },
        err => {
          console.log(err)
        });
    }
  }
  setPagination() {
    this.listingPer = Math.ceil(this.listingLength / this.listingPerPage);
    console.log("listingPer : " + this.listingPer);
    this.listingLengthArray = new Array(this.listingPer);
    this.currentPage = 1;
  }
}