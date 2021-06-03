import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewCategoryModel } from 'src/app/models/newcategory.model';
import { NewsCategoryModel } from 'src/app/models/newscategory.model';
import { PublicService } from 'src/app/services/publicService.service';
import { NewsUserService } from 'src/app/services/user/news.service';
import { SettingUserService } from 'src/app/services/user/setting.service';

@Component({
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {

  // Pagination 
  isFilter = false;

  currentPage: number = 0;

  newsLength: number = 0;

  newsLengthArray = Array<string>();

  newsPerPage: number = 6;

  newsPer: number = 0;

  allNewsLength: number = 0;

  formSearchNews : FormGroup;

  categoryIds : NewsCategoryModel[];

  newcategory: NewCategoryModel[] = [];
  
  newcategorycount: number;
  constructor(
    private publicService: PublicService,
    private newsService: NewsUserService,
    private settingService: SettingUserService,
    private formBuilder: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.loadAllNews();
    this.newsService.loadAllNewsCategory().then(
      res => {
        this.categoryIds = res
      },
      err => {
        console.log(err)
      });
    this.formSearchNews = this.formBuilder.group({
      keyword: ['', [Validators.minLength(3)]],
      category: ['Select Category']});
  }

  loadAllNews() {
    this.newsService.loadAllNewsCount().then(
      res => {
        this.newcategorycount = res;
        this.setPagination();
        this.getNewsPerPage(1);
      }, err => {
        console.log(err);
      }
    )
  }

  minusPage() {
    this.currentPage--;
    if (!this.isFilter) {
      this.getNewsPerPage(this.currentPage);
    } else {
      this.filterNewsPerPage(this.currentPage);
    }
  }

  plusPage() {
    this.currentPage++;
    if (!this.isFilter) {
      this.getNewsPerPage(this.currentPage);
    } else {
      this.filterNewsPerPage(this.currentPage);
    }
  }

  searchBtn() {
    this.isFilter = true;
    this.sortFilterNews();
    this.filterNewsPerPage(1);
  }

  executeNewsPerPage(page: number) {
    this.currentPage = page;
    if (!this.isFilter) {
      this.getNewsPerPage(this.currentPage);
    } else {      
      this.filterNewsPerPage(this.currentPage);
    }
  }

  getNewsPerPage(page: number) {
    this.newsService.loadAllNews(page, this.newsPerPage).then(
      res => {
        this.newcategory = res;
      },
      err => {
        alert("Connection error, please reset server and refresh this page");
      }
    )
  }

  setPagination() {
    this.newsLength = this.newcategorycount;
    this.newsPer = Math.ceil(this.newsLength / this.newsPerPage);
    this.newsLengthArray = new Array(this.newsPer);
    this.currentPage = 1;
  }

  // ham lay so luong ket qua
  sortFilterNews(){    
    var inputSearch = this.formSearchNews.value;
    if (inputSearch.keyword == "") {
      inputSearch.keyword = "all";
    }
    this.newsService.searchNewsResult(inputSearch.keyword, inputSearch.category).then(
      res => {
        this.newcategory.length = res;
        this.setPagination();
      },
      err => {
        alert("This query is cancel cause cant get any data!");
      }
    )
  }

  // ham qua trang
  filterNewsPerPage(page:number){
    var inputSearch = this.formSearchNews.value;
    if (inputSearch.keyword == "") {
      inputSearch.keyword = "all";
    }
    console.log(page);
    console.log(inputSearch.keyword);
    console.log(inputSearch.category);
    this.newsService.searchAllNews(page, inputSearch.keyword, inputSearch.category).then(
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

  readMoreFunc(message: string) {
    if(message.length > 60) {
      return message.substr(0, 60) + '...';
    }
    else return message
  }

}