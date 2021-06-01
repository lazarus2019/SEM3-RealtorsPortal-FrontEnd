import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { NewsAPI } from 'src/app/models/news/news.model';
import { NewsOrgAPI } from 'src/app/models/news/newsOrg.model';
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';
import { NewsImageAPI } from 'src/app/models/newsImage/newsImage.model';
import { NewsAPIService } from 'src/app/services/admin/news/newsAPI.service';
import { NewsCategoryAPIService } from 'src/app/services/admin/newsCategory/newsCategoryAPI.service';
import { PublicService } from 'src/app/services/publicService.service';
import Swal from 'sweetalert2';

// Declare custom function
declare var alertFunction: any;
declare var myFunc: any;

@Component({
  templateUrl: './manageNews.component.html'
})
export class AdminManageNewsComponent implements OnInit {

  // Pagination 
  isFilter = false;

  NoNum: number = 10;

  currentPage: number = 0;

  newsLength: number = 0;

  newsLengthArray = Array<string>();

  newsPerPage: number = 10;

  newsPer: number = 0;

  allNewsLength: number = 0;

  // News Data

  allNews: NewsAPI[] = [];

  allNewsCategory: NewsCategoryAPI[] = [];

  currentNews: NewsAPI = new NewsAPI;

  galleryNews: NewsImageAPI[] = [];

  formSearchNews: FormGroup = new FormGroup({});

  // Change Status
  formStatus: FormGroup = new FormGroup({});

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
    // Load Categories
    this.loadAllNewsCategory();

    // Load data
    this.loadAllNews();

    this.formSearchNews = this.formBuilder.group({
      title: "",
      categoryName: "all",
      status: "all",
      sortDate: "all"
    });

    this.formStatus = this.formBuilder.group({
      newsId: 0,
      status: ''
    })

  }

  loadAllNews() {
    // this.newsAPIService.getAllNews().subscribe((val)=>{
    //   this.allNews = val,
    //   console.table(this.allNews)
    // });

    this.newsAPIService.findAllNews().then(
      res => {
        this.allNews.length = res;
        this.setPagination();
        this.getNewsPerPage(1);
      },
      err => {
        alertFunction.error("Connection error, please reset server and refresh this page");
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
    this.newsAPIService.getNewsPerPage(page).then(
      res => {
        this.allNews = res;
      },
      err => {
        alertFunction.error("Connection error, please reset server and refresh this page");
      }
    )
  }

  setPagination() {
    this.newsLength = this.allNews.length;
    this.newsPer = Math.ceil(this.newsLength / this.newsPerPage);
    this.newsLengthArray = new Array(this.newsPer);
    this.currentPage = 1;
  }



  sortFilterNews() {
    var inputSearch = this.formSearchNews.value;
    if (inputSearch.title == "") {
      inputSearch.title = ".all";
    }
    this.newsAPIService.getAllFilterNews(inputSearch.title, inputSearch.categoryName, inputSearch.status, inputSearch.sortDate).then(
      res => {
        this.allNews.length = res;
        this.setPagination();
      },
      err => {
        alertFunction.error("This query is cancel cause cant get any data!");
      }
    )
  }

  filterNewsPerPage(page: number) {
    var inputSearch = this.formSearchNews.value;
    if (inputSearch.title == "") {
      inputSearch.title = ".all";
    }
    this.newsAPIService.filterNewsPerPage(page, inputSearch.title, inputSearch.categoryName, inputSearch.status, inputSearch.sortDate).then(
      res => {
        this.allNews = res;
      },
      err => {
        alertFunction.error("This query is cancel cause cant get any data!");
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


  deleteNews(news: NewsAPI) {
    Swal.fire({
      title: 'Delete news!',
      text: 'Are you sure you want to delete this news?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //delete action
        this.newsAPIService.deleteNews(news).then(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Delete successful!',
              showConfirmButton: false,
              timer: 2000
            });
            this.loadAllNews();
          },
          err => {
            alertFunction.error("Can not delete news!");
          }
        )
      };
    });
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

  getGalleryNews(newsId: number) {
    this.newsAPIService.getGalleryNews(newsId).then(
      res => {
        this.galleryNews = res;
      },
      err => {
        alertFunction.error("This query is cancel cause cant get news gallery");
      }
    )
  }

  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("news", imageName);
  }

  // Preview news end

  updateStatus() {
    var news: NewsOrgAPI = this.formStatus.value;
    this.newsAPIService.updateStatus(news).then(
      res => {
        alertFunction.success("All changes had saved!");
        this.loadAllNews();
      },
      err => {
        alertFunction.error("Can not change your news status!");
      }
    )
  }

  sendNewsInfo(newsId: number, status: string) {
    this.formStatus.get("newsId")?.setValue(newsId);
    this.formStatus.get("status")?.setValue(status);
  }

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
