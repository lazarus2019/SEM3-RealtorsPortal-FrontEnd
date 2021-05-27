import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageModel } from 'src/app/models/image.model';
import { NewCategoryModel } from 'src/app/models/newcategory.model';
import { PublicService } from 'src/app/services/publicService.service';
import { NewsService } from 'src/app/services/user/news.service';
import { NewsPropertyService } from 'src/app/services/user/newsproperty.service';

declare var alertFunction: any;

@Component({
  templateUrl: './newsproperty.component.html'
})
export class NewsPropertyComponent implements OnInit {

    newPropertyId : NewCategoryModel;
    memberId : number;
    galleryNews: ImageModel[];

    constructor(
      private activatedRoute: ActivatedRoute,
      private newPropertyService : NewsPropertyService,
      private publicService: PublicService
    ){}
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.memberId = Number.parseInt(params.get('Id'));
      })

      this.newPropertyService.loadPropertyId(this.memberId).then(
        res => {
          this.newPropertyId = res;
          this.getGalleryNews(this.newPropertyId.newsId);
        },
        err => {
          console.log(err)
        }
      )
    }

    getGalleryNews(newsId:number){
      this.newPropertyService.getGalleryNews(newsId).then(
        res=>{
          this.galleryNews = res;
        },
        err=>{
          alertFunction.error("This query is cancel cause cant get news gallery");
        }
      )
    }
  
    getUrlImage(imageName:string){
      return this.publicService.getUrlImage("news", imageName);
    }
    
}