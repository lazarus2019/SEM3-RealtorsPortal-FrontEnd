import { SettingModel } from './../../../shared/setting.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category.model';
import { CountryModel } from 'src/app/models/country.model';
import { NewCategoryModel } from 'src/app/models/newcategory.model';
import { PopularLocations } from 'src/app/models/popularLocation.model';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';
import { PublicService } from 'src/app/services/publicService.service';
import { UserService } from 'src/app/services/user.service';
import { IndexService } from 'src/app/services/user/index.service';
import { NewsUserService } from 'src/app/services/user/news.service';
import { ShareFormService } from 'src/app/services/user/shareFormSearchData';

@Component({
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  topproperty: PropertyModel[] = [];
  loadpopularlocation: PopularLocations[] = [];
  countries: CountryModel[] = [];
  categories: CategoryModel[] = [];
  formSearch: FormGroup;
  newcategory: NewCategoryModel[] = [];
  setting: SettingModel;

  constructor(
    private indexService: IndexService,
    private formBuilder: FormBuilder,
    private shareFormSearchData : ShareFormService ,
    private newsService: NewsUserService,
    private publicService: PublicService,
    private userService: UserService,
  ) { }


  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      keyword: ['', [Validators.minLength(3)]],
      category: 0,
      country: 0
    })

    this.indexService.loadtopproperty().then(
      res => {
        this.topproperty = res
      },
      err => {
        console.log(err)
      });

    this.indexService.loadpopularlocation().then(
      res => {
        this.loadpopularlocation = res
      },
      err => {
        console.log(err)
      });
    this.indexService.loadcountries().then(
      res => {
        this.countries = res
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

      this.getNewsPerPage(1);

      this.userService.getSetting().then(
        res => {
          this.setting = res
        },
        err => {
          console.log(err)
        }
      )
  }
  readMoreFunc(message: string, length: number) {
    if(message.length > length) {
      return message.substr(0, length) + '...';
    }
    else return message
  }
  save() {
    //var data =  this.formSearch.value ;
    console.log("key : " + this.formSearch.value.keyword) ;
    console.log("cate : " + this.formSearch.value.category) ;
    console.log("country : " + this.formSearch.value.country) ;
    var data = [ this.formSearch.value.keyword , this.formSearch.value.category , this.formSearch.value.country] ; 
    console.log( data[0]) ;
    console.log( data[1]) ;
    console.log( data[2]) ;
    //this.shareFormSearchData.sendData(data) ; 
    
  }

  getNewsPerPage(page: number) {
    this.newsService.loadAllNews(page, 6).then(
      res => {
        this.newcategory = res;
      },
      err => {
        alert("Connection error, please reset server and refresh this page");
      }
    )
  }

  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("news", imageName);
  }
  
}