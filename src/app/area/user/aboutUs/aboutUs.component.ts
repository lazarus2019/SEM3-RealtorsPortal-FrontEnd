import { Component, OnInit } from '@angular/core';
import { SellerProfileModel } from 'src/app/models/sellerProfile.models';
import { SettingModel } from 'src/app/models/setting.model';
import { AboutUsService } from 'src/app/services/user/aboutus.service';

@Component({
  templateUrl: './aboutUs.component.html'
})
export class AboutUsComponent implements OnInit {

  agents: SellerProfileModel[] = [];
  setting: SettingModel[] = [];
  constructor(
    private aboutUsService: AboutUsService
  ) { }
  ngOnInit(): void {
    this.aboutUsService.loadagentAU().then(
      res => {
        this.agents = res
      }, err => {
        console.log(err);
      }
    )

    this.aboutUsService.loadsetting().then(
      res => {
        this.setting = res
      }, err => {
        console.log(err);
      }
    )
  }

}