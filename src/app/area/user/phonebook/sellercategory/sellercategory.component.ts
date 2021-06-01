import { Component, OnInit } from '@angular/core';
import { SellerProfileModel } from 'src/app/models/sellerProfile.models';
import { SellerService } from 'src/app/services/user/seller.service';

@Component({
  templateUrl: './sellercategory.component.html'
})
export class SellerCategoryComponent implements OnInit {

  sellers: SellerProfileModel[] = [];
  constructor(
    private sellerService: SellerService
  ) { }

 
  ngOnInit(): void {
    // this.sellerService.loadseller().then(
    //   res => {
    //     this.sellers = res
    //     console.log(this.sellers[0].memberId) ;
    //   },
    //   err => {
    //     console.log(err)
    //   });
  }

}