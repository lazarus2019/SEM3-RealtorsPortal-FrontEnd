import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { NewsAPI } from 'src/app/models/news/news.model';
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';
import { NewsAPIService } from 'src/app/services/admin/news/newsAPI.service';
import { NewsCategoryAPIService } from 'src/app/services/admin/newsCategory/newsCategoryAPI.service';

// Declare custom function
declare var alertFunction: any;
declare var myFunc:any;

@Component({
  templateUrl: './manageNews.component.html'
})
export class AdminManageNewsComponent implements OnInit {

  allNews: NewsAPI[] = [];
  statusRecords:string = "";
  allNewsCategory: NewsCategoryAPI[] = [];
  currentNews: NewsAPI = new NewsAPI;

  constructor(
    private router: Router,
    // Declare services
    private newsAPIService: NewsAPIService,
    private newsCategoryAPIService: NewsCategoryAPIService
  ) {
    this.loadScripts();
  }

  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/js/modernizr.min.js',
      '../../../../assets/js/jquery.min.js',
      '../../../../assets/js/moment.min.js',

      '../../../../assets/js/popper.min.js',
      '../../../../assets/js/bootstrap.min.js',

      '../../../../assets/js/detect.js',
      '../../../../assets/js/fastclick.js',
      '../../../../assets/js/jquery.blockUI.js',
      '../../../../assets/js/jquery.nicescroll.js',

      '../../../../assets/js/jquery.goToTop.js',
      '../../../../assets/plugins/datatables/datatables.min.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',

      '../../../../assets/data/data_datatables.js',
      '../../../../assets/js/jquery.dataTable.js',

      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js'

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }

  ngOnInit() {

    // Load Categories
    this.loadAllNewsCategory();

    // Load data
    this.loadAllNews();
    

  }



  loadAllNews() {
    // this.newsAPIService.getAllNews().subscribe((val)=>{
    //   this.allNews = val,
    //   console.table(this.allNews)
    // });

    this.newsAPIService.findAllNews().then(
      res => {
        this.allNews = res;
      },
      err => {
        this.statusRecords = "Connection error, please reset server and refresh this page";
        alertFunction.error(this.statusRecords);
      }
    )
  }

  loadAllNewsCategory(){
    this.newsCategoryAPIService.findAllNewsCategory().then(
      res => {
        this.allNewsCategory = res;
      },
      err =>{

      }
    )
  }

  deleteNews(news: NewsAPI) {
    console.log(news.id);
    console.log(myFunc(alertFunction.yesNo().callBackFunc()));
    
    // if (myFunc(alertFunction.yesNo())) {
      // console.log("true")
      // this.newsAPIService.deleteNew(news).then(
      //   res => {
      //     this.test_success_alert();
      //     this.loadAllNews();
      //   },
      //   err => {
      //     this.test_error_alert();
      //   }
      // )
    // }
  }

  viewNews(newsId:number){
    this.newsAPIService.findNews(newsId).then(
      res =>{
        this.currentNews = res;
      },
      err =>{
        alertFunction.error("This query is cancel cause cant get any data!");
      }
    )
  }

  editNews(news:NewsAPI){
    this.router.navigate(['/admin/news', news.id]);
  }

  // Alert
  test_success_alert() {
    alertFunction.success("new");
  }

  test_error_alert() {
    alertFunction.error("new");
  }

}
