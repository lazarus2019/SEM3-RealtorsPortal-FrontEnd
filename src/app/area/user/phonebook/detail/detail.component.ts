import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyModel } from 'src/app/models/property.model';
import { SellerProfileModel } from 'src/app/models/sellerProfile.models';
import { PublicService } from 'src/app/services/publicService.service';
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
    private detailService : DetailService,
    private publicService: PublicService,
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

    getUrlImage(folderName: string, imageName: string) {
      return this.publicService.getUrlImage( folderName,imageName);
    }
    
    readMoreFunc(message: string) {
      if(message.length > 25) {
        return message.substr(0, 25) + '...';
      }
      else return message
    }
}