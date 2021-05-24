import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PropertyModel } from 'src/app/models/property.model';
import { ListingService } from 'src/app/services/user/listing.service';
import { ShareFormService } from 'src/app/services/user/shareFormSearchData';

@Component({
  templateUrl: './listing.component.html'
})
export class ListingComponent implements OnInit {

  private valueFromChildSubscription: Subscription;
  listing: PropertyModel[];
  formGroup: FormGroup ;
  keyword : string 
  categoryId : number 
  country : string 

  constructor(
    private listingService: ListingService,
    private shareData : ShareFormService ,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

 
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      keyword: '',
      location: '',
      region: '',
      type: '',
      area: 0,
      bed: 0,
      room: 0,
      price: 0
    });

    this.listingService.getAllListing().then(
      res => {
        this.listing = res
      },
      err => {
        console.log(err)
      });
      
    this.activatedRoute.paramMap.subscribe(params => {
      this.keyword = params.get('keyword') ; 
      this.categoryId = Number.parseInt(params.get('cate'));
      this.country = params.get('country') ; 
    })

    if(this.keyword != null || this.categoryId != NaN || this.country != null) {
      this.listingService.searchProperty(this.keyword,this.categoryId,this.country).then(
      res => {
        this.listing = res
      },
      err => {
        console.log(err)
      });
    }
    else {
      
    }
    
  }

  search() {
    
  }

}