import { Component, OnInit } from '@angular/core';
import { PopularLocations } from 'src/app/models/popularLocation.model';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';
import { HomeService } from 'src/app/services/user/index.service';

@Component({
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  topproperty: PropertyModel[] = [];
  loadpopularlocation: PopularLocations[] = [];

  constructor(
    private homeService: HomeService
  ) { } 


  ngOnInit() {
    this.homeService.loadtopproperty().then(
      res => {
        this.topproperty = res
      },
      err => {
        console.log(err)
      });


    this.homeService.loadpopularlocation().then(
      res => {
        this.loadpopularlocation = res
      },
      err => {
        console.log(err)
      });

  }


}