import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewsAPI } from 'src/app/models/news/news.model';
import { NewsOrgAPI } from 'src/app/models/news/newsOrg.model';
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';
import { NewsAPIService } from 'src/app/services/admin/news/newsAPI.service';
import { NewsCategoryAPIService } from 'src/app/services/admin/newsCategory/newsCategoryAPI.service';

// Declare custom function
declare var generateUrlFunction: any;
declare var alertFunction: any;
declare var getTinyMCEContent: any;

@Component({
  templateUrl: './addNew.component.html'
})
export class AdminNewsComponent implements OnInit {

  url: string = "";
  currentNews: NewsAPI = new NewsAPI;

  formAddNewGroup: FormGroup = new FormGroup({});

  allNewsCategory: NewsCategoryAPI[] = [];

  constructor(
    // Declare form builder
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,

    // Declare services
    private newsAPIService: NewsAPIService,
    private newsCategoryAPIService: NewsCategoryAPIService
  ) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('newsId');
    if(id!=null){
      this.getNews(parseInt(id));
    }

    // Load Categories
    this.loadAllNewsCategory();


    this.formAddNewGroup = this.formBuilder.group({
      title: "",
      description: "",
      createdDate: new Date(),
      status: false,
      categoryId: 0
    });

  }

  ngAfterViewInit() {
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

      '../../../../assets/plugins/tinymce/jquery.tinymce.min.js',
      '../../../../assets/plugins/tinymce/tinymce.min.js',
      '../../../../assets/plugins/tinymce/init-tinymce.js',
      '../../../../assets/plugins/jquery.filer/js/jquery.filer.min.js',
      '../../../../assets/plugins/jquery.filer/js/temp.js',
      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js',
      '../../../../assets/js/jquery.generateUrl.js',
      '../../../../assets/js/jquery.tinymce.js',

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      let jquery = document.createElement('script');
      jquery.type = 'text/javascript';
      jquery.src = dynamicScripts[i];
      this.elementRef.nativeElement.appendChild(jquery);
    }
  }

  loadAllNewsCategory() {
    this.newsCategoryAPIService.findAllNewsCategory().then(
      res => {
        this.allNewsCategory = res;
      },
      err => {
        alertFunction.error("Connection error, please reset server and refresh this page");
      }
    )
  }

  addNews(buttonType: string) {
    var news: NewsOrgAPI = this.formAddNewGroup.value;
    news.description = getTinyMCEContent();
    // Set status: public for news
    if (buttonType == 'public') {
      news.status = true;
    }
    if (buttonType == 'draft') {
      news.status = false;
    }
    this.newsAPIService.createNews(news).then(
      res => {
        alertFunction.success("Add news succeeded!");
        this.router.navigate(['/admin/manageNews']);
      },
      err => {
        alertFunction.error("Please try again!")
      }
    )
  }

  getNews(newsId:number){
    this.newsAPIService.findNews(newsId).then(
      res =>{
        this.currentNews = res;
        alert(this.currentNews.title)
      },
      err =>{
        alertFunction.error("This query is cancel cause cant get any data!");
      }
    )
  }

  updateNews(newsId:number){
    var news: NewsOrgAPI = this.formAddNewGroup.value;
    news.description = getTinyMCEContent();
    news.id = newsId;
    this.newsAPIService.updateNews(news).then(
      res => {
        alertFunction.success("Update news succeeded!");
        this.router.navigate(['/admin/manageNews']);
      },
      err => {
        alertFunction.error("Please try again!")
      }
    )
  }

  // Generate title to url when title change
  generateUrl(e: any) {
    this.url = generateUrlFunction.convertToSlug(e.target.value);
  }

  // Alert
  test_success_alert() {
    alertFunction.success("new");
  }

  test_error_alert() {
    alertFunction.error("new");
  }
}