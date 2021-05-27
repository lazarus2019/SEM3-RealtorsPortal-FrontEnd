import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyModel } from 'src/app/models/property.model';
import { SellerProfileModel } from 'src/app/models/sellerProfile.models';
import { DetailService } from 'src/app/services/user/detail.service';

@Component({
  templateUrl: './detail.component.html'
})
export class DetailsComponent implements OnInit {

  sellerId: SellerProfileModel;
  propertyId : PropertyModel[] = [] ;
  memberId : number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private detailService : DetailService
  ){}
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.memberId = Number.parseInt(params.get('Id'));
        console.log("agentId : " + this.memberId);
      })
      
      
      this.detailService.loadSellerId(this.memberId).then(
        res => {
          this.sellerId = res       
        },
        err => {
          console.log(err)
        });

      this.detailService.loadPropertyId(this.memberId).then(
        res => {
          this.propertyId = res;
        },
        err => {
          console.log(err)
        }
      )
      
    }
    
}