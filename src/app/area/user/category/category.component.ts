import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyModel } from 'src/app/models/property.model';
import { CategoryService } from 'src/app/services/user/category.service';

@Component({
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
    categoryId : number ;
    propertybycategory : PropertyModel[] ; 
    propertyLength : number

    constructor(
      private categoryService : CategoryService,
      private activatedRoute: ActivatedRoute
    ) {}
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.categoryId = Number.parseInt(params.get('Id'));
        console.log("propertyId : " + this.categoryId);
        this.loadData() ;
      })
      
    }
    loadData() {
      this.categoryService.propertybycategory(this.categoryId).then(
        res => {
          this.propertybycategory = res ;
          this.propertyLength = this.propertybycategory.length;
        },
        err => {
          console.log(err)
        });
    }
    
}