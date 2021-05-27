import { Component, OnInit } from '@angular/core';
import { NewCategoryModel } from 'src/app/models/newcategory.model';
import { PublicService } from 'src/app/services/publicService.service';
import { NewsService } from 'src/app/services/user/news.service';

@Component({
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {

    newcategory : NewCategoryModel[] = [];
    constructor(
      private publicService: PublicService,
      private newsService : NewsService
    ){}
    ngOnInit(): void {
      this.newsService.loadnewproperty().then(
        res => {
            this.newcategory = res
        }, err => {
            console.log(err); 
        }
      )
    }
    
    getUrlImage(imageName:string){
      return this.publicService.getUrlImage("news", imageName);
    }
}