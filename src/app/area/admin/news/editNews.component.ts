import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsAPI } from 'src/app/models/news/news.model';
import { NewsOrgAPI } from 'src/app/models/news/newsOrg.model';
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';
import { NewsCategoryAPIService } from 'src/app/services/admin/newsCategory/newsCategoryAPI.service';
import { NewsAPIService } from 'src/app/services/admin/news/newsAPI.service';
import { ImageService } from 'src/app/services/admin/image/imageService.service';
import { NewsImageAPI } from 'src/app/models/newsImage/newsImage.model';
import { HttpClient, HttpEventType } from '@angular/common/http';

// Declare custom function
declare var generateUrlFunction: any;
declare var alertFunction: any;
declare var getTinyMCEContent: any;

@Component({
  templateUrl: './editNews.component.html'
})
export class AdminEditNewsComponent implements OnInit {

  url: string = "";

  // Upload images
  urls = new Array<string>();

  listImage = new Array<Object>();

  newsGallery: NewsImageAPI[] = [];

  currentNews: NewsAPI = new NewsAPI;

  // Form content
  formAddNewGroup: FormGroup = new FormGroup({});

  // Category
  allNewsCategory: NewsCategoryAPI[] = [];


  constructor(
    // Declare form builder
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,

    // Declare services
    private newsAPIService: NewsAPIService,
    private newsCategoryAPIService: NewsCategoryAPIService,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('newsId');
    if (id != null) {
      this.getNews(parseInt(id));
    }

    // Load Categories
    this.loadAllNewsCategory();


    this.formAddNewGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl(''),
      createdDate: new Date(),
      status: "",
      categoryId: new FormControl('all', [Validators.required])
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

  get title() { return this.formAddNewGroup.get('title') }
  get categoryId() { return this.formAddNewGroup.get('categoryId') }

  detectFiles(event: any) {
    let files = event.target.files;
    // Maximum 5 file each news/post
    if (this.urls.length + files.length > 5) {
      alertFunction.error("You are only allowed to upload a maximum of 5 files!");
    } else {
      if (files) {
        if (files.length > 5) {
          alertFunction.error("You are only allowed to upload a maximum of 5 files at a time!");
        } else {
          for (let file of files) {
            let status = this.imageService.validate(file);
            if (status == null) {
              this.listImage.push(file)
              let reader = new FileReader();
              reader.onload = (e: any) => {
                this.urls.push(e.target.result)
              }
              reader.readAsDataURL(file);
            } else {
              alertFunction.error(status);
            }
          }
          // console.table(this.listImage);
        }
      }
    }
  }

  deleteImage(index: number) {
    this.urls.splice(index, 1);
    this.listImage.splice(index, 1);
  }

  uploadImage(listImage: any, newsId: number) {
    for (let image of listImage) {
      let newsImage = new NewsImageAPI;
      newsImage.name = image.name;
      this.newsGallery.push(newsImage);
    }
  }

  public uploadFile = (files:any) => {
    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('http://localhost:65320/api/upload', formData, { reportProgress: true, observe: 'events' }).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        alert("Upload success");
      }
    })
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
    news.status = buttonType;
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

  getNews(newsId: number) {
    this.newsAPIService.findNews(newsId).then(
      res => {
        this.currentNews = res;
        alert(this.currentNews.title)
      },
      err => {
        alertFunction.error("This query is cancel cause cant get any data!");
      }
    )
  }

  updateNews(newsId: number) {
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
