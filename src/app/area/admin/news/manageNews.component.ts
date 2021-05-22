import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { NewsAPI } from 'src/app/models/news/news.model';
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';
import { NewsImageAPI } from 'src/app/models/newsImage/newsImage.model';
import { NewsAPIService } from 'src/app/services/admin/news/newsAPI.service';
import { NewsCategoryAPIService } from 'src/app/services/admin/newsCategory/newsCategoryAPI.service';
import { PublicService } from 'src/app/services/publicService.service';

// Declare custom function
declare var alertFunction: any;
declare var myFunc: any;

@Component({
  templateUrl: './manageNews.component.html'
})
export class AdminManageNewsComponent implements OnInit {

  allNews: NewsAPI[] = [];

  statusRecords: string = "";

  allNewsCategory: NewsCategoryAPI[] = [];
  
  currentNews: NewsAPI = new NewsAPI;

  galleryNews: NewsImageAPI[] = [];

  formSearchNews: FormGroup = new FormGroup({});

  constructor(
    // Declare form builder
    private formBuilder: FormBuilder,
    private router: Router,
    // Declare services
    private newsAPIService: NewsAPIService,
    private newsCategoryAPIService: NewsCategoryAPIService,
    private publicService: PublicService
  ) {
    this.loadStyle();
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
      '../../../../assets/js/jquery.sweetalert.js',
      '../../../../assets/js/jquery.slidercustom.js',
      // '../../../../assets/plugins/owlcarousel/owl.carousel.js',
      // '../../../../assets/js/jquery.owlcarousel.js',
      

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }

  loadStyle() {
    const dynamicStyles = [
      '../../../../assets/css/style.slidercustom.css',
      // '../../../../assets/plugins/owlcarousel/owl.carousel.min.css',
    ];
    for (let i = 0; i < dynamicStyles.length; i++) {
      const node = document.createElement('link');
      node.href = dynamicStyles[i];
      node.type = 'text/css';
      node.rel = "stylesheet";
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  ngOnInit() {

    this.formSearchNews = this.formBuilder.group({
      title: "",
      categoryName: "all",
      status: "all"
    });

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

  loadAllNewsCategory() {
    this.newsCategoryAPIService.findAllNewsCategory().then(
      res => {
        this.allNewsCategory = res;
      },
      err => {

      }
    )
  }

  sortFilterNews() {
    var inputSearch = this.formSearchNews.value;
    if(inputSearch.title == ""){
      inputSearch.title = ".all";
    }

    this.newsAPIService.sortFilterNews(inputSearch.title, inputSearch.categoryName, inputSearch.status).then(
      res => {
        this.allNews = res;
      },
      err => {
        alertFunction.error("This query is cancel cause cant get any data!");
      }
    )
  }

  deleteNews(news: NewsAPI) {
    console.log(news.newsId);
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

  // Preview news start
  
  viewNews(newsId: number) {
    this.newsAPIService.findNews(newsId).then(
      res => {
        this.currentNews = res;
        this.getGalleryNews(newsId);
      },
      err => {
        alertFunction.error("This query is cancel cause cant get any data!");
      }
    )
  }

  getGalleryNews(newsId:number){
    this.newsAPIService.getGalleryNews(newsId).then(
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

  // Preview news end

  editNews(news: NewsAPI) {
    this.router.navigate(['/admin/editNews', news.newsId]);
  }

  // Alert
  test_success_alert() {
    alertFunction.success("new");
  }

  test_error_alert() {
    alertFunction.error("new");
  }

}
