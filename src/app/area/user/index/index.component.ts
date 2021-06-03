import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category.model';
import { CountryModel } from 'src/app/models/country.model';
import { PopularLocations } from 'src/app/models/popularLocation.model';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';
import { IndexService } from 'src/app/services/user/index.service';
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

  constructor(
    private indexService: IndexService,
    private formBuilder: FormBuilder,
    private shareFormSearchData : ShareFormService 
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
  }
  readMoreFunc(message: string) {
    if(message.length > 25) {
      return message.substr(0, 25) + '...';
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


}