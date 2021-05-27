import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PropertyModel } from 'src/app/models/property.model';
import { ListingService } from 'src/app/services/user/listing.service';
import { ShareFormService } from 'src/app/services/user/shareFormSearchData';

@Component({
  templateUrl: './searchResult.component.html'
})
export class ResultComponent implements OnInit {


  listing: PropertyModel[];
  formGroup: FormGroup ;
  keyword: string
  categoryId: number
  country: string

  constructor(
    private listingService: ListingService,
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
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.keyword = params.get('keyword');
      this.categoryId = Number.parseInt(params.get('cate'));
      this.country = params.get('country');
    })


    this.listingService.searchProperty(this.keyword, this.categoryId, this.country).then(
      res => {
        this.listing = res
      },
      err => {
        console.log(err)
      });
  }

  search() {

  }

}