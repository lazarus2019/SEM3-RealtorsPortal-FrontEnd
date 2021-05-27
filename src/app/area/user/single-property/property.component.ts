import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyModel } from 'src/app/models/property.model';
import { ListingService } from 'src/app/services/user/listing.service';

@Component({
  templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit {
  propertyId : number
  property : PropertyModel 
  constructor(
    private activatedRoute: ActivatedRoute,
    private listingService : ListingService

  ) {
    this.loadScripts();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.propertyId = Number.parseInt(params.get('propertyId'));
      console.log("propertyId : " + this.propertyId);
    }) 

    
    this.listingService.propertyDetail(this.propertyId).then(
      res => {
        this.property = res
      },
      err => {
        console.log(err)
      }
    );  
  }
  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/user/js/jquery.start.js',

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }

}