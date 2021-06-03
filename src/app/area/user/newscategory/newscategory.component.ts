import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewCategoryModel } from 'src/app/models/newcategory.model';
import { NewsCategoryModel } from 'src/app/models/newscategory.model';
import { PublicService } from 'src/app/services/publicService.service';
import { NewsUserService } from 'src/app/services/user/news.service';
import { SettingUserService } from 'src/app/services/user/setting.service';

@Component({
  templateUrl: './newscategory.component.html'
})
export class NewsCategoryComponent implements OnInit {

  numberId: number;
  id : number = 1;
  alls : string = "all";

  newcategory: NewCategoryModel[];


  constructor(
    private publicService: PublicService,
    private newsService: NewsUserService,
    private activatedRoute: ActivatedRoute,

  ) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.numberId = Number.parseInt(params.get('Id'));
     // this.getGalleryNews(this.numberId);
    })
    this.loadAll();
    
   
  }

  loadAll(){
    this.newsService.searchAllNews(this.id, this.alls, this.numberId).then(
      res => {
        this.newcategory = res;
      },
      err => {
        alert("This query is cancel cause cant get any data!");
      }
    )
  }
  

  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("news", imageName);
  }

}