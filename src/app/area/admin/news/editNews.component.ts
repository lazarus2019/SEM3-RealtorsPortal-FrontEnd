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
import { PublicService } from 'src/app/services/publicService.service';
import { SettingAPIService } from 'src/app/services/admin/setting/settingAPI.service';

// Declare custom function
declare var alertFunction: any;
declare var getTinyMCEContent: any;

@Component({
  templateUrl: './editNews.component.html'
})
export class AdminEditNewsComponent implements OnInit {

  url: string = "";

  // Upload images
  urls = new Array<string>();

  numberImage: number = 0;

  successImage: number = 0;

  imageForm: FormData[] = [];

  galleryNews: NewsImageAPI[] = [];

  listImageDelete = new Array<Object>();

  // Setting

  maxImage: number = 0;

  // Declare news

  currentNews: NewsAPI = new NewsAPI;

  newsId: number = 0;

  // Form content
  formEditNewsGroup: FormGroup = new FormGroup({});

  // Category
  allNewsCategory: NewsCategoryAPI[] = [];

  newCategoryId: number = 0;

  constructor(
    // Declare form builder
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,

    // Declare services
    private newsAPIService: NewsAPIService,
    private newsCategoryAPIService: NewsCategoryAPIService,
    private imageService: ImageService,
    private publicService: PublicService,
    private settingAPIService: SettingAPIService,
  ) {
    this.loadScripts();
  }

  ngOnInit() {
    // Load Categories
    this.loadAllNewsCategory();
    // Load setting
    this.getMaxNewsImage();

    var id = this.route.snapshot.paramMap.get('newsId');

    if (id != null) {
      // set id from query to newsId
      this.newsId = parseInt(id);
      this.getCurrentNews(this.newsId);
    } else {
      alertFunction.error("Doesn't receive any data!");
    }


    // Form group
    this.formEditNewsGroup = this.formBuilder.group({
      title: new FormControl("", [Validators.required, Validators.minLength(5)]),
      description: new FormControl(""),
      categoryId: new FormControl("", [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formEditNewsGroup.controls[controlName].hasError(errorName)
  }

  public validateControl = (controlName: string) => {
    return this.formEditNewsGroup.controls[controlName].invalid && this.formEditNewsGroup.controls[controlName].touched
  }

  getMaxNewsImage() {
    this.settingAPIService.getMaxNewsImage().then(
      res => {
        this.maxImage = res;
      },
      err => {
        alertFunction.error("Can not get max image setting!")
      }
    )
  }

  updateNews() {
    if (this.galleryNews.length + this.urls.length > 0) {
      var news: NewsOrgAPI = this.formEditNewsGroup.value;
      news.description = getTinyMCEContent();
      news.newsId = this.newsId;
      this.newsAPIService.updateNews(news).then(
        res => {
          this.uploadImage(news.newsId.toString());
          this.deleteImage();
          alertFunction.success("Update news succeeded!");
          this.router.navigate(['/admin/manageNews']);
        },
        err => {
          alertFunction.error("Please try again!")
        }
      )
    } else {
      alertFunction.error("Must have at least 1 photo in your post!");
    }
  }

  addNewsCategory(categoryName: string) {
    if (categoryName.trim.length > 5) {
      var myCategory: NewsCategoryAPI = new NewsCategoryAPI;
      myCategory.name = categoryName;
      myCategory.isShow = true;
      this.newsCategoryAPIService.createNewsCategory(myCategory).then(
        res => {
          this.newCategoryId = res;
          this.loadAllNewsCategory();
          alertFunction.success("Your new category had saved!")
        },
        err => {
          alertFunction.error("Can not create new category!")
        }
      )
    } else {
      alertFunction.error("category name must at least 5 characters!")
    }
  }

  detectFiles(event: any) {
    let files = event.target.files;
    // Maximum 5 file each news/post
    if (this.urls.length + files.length > this.maxImage) {
      alertFunction.error(`You are only allowed to upload a maximum of ${this.maxImage} files!`);
    } else {
      if (files) {
        if (files.length > this.maxImage) {
          alertFunction.error(`You are only allowed to upload a maximum of ${this.maxImage} files at a time!`);
        } else {
          for (let file of files) {
            let status = this.imageService.validate(file);
            if (status == null) {
              let fileUpload = new FormData();
              fileUpload.append('file', file, file.name);
              this.imageForm.push(fileUpload);
              let reader = new FileReader();
              reader.onload = (e: any) => {
                this.urls.push(e.target.result)
              }
              reader.readAsDataURL(file);
            } else {
              alertFunction.error(status);
            }
          }
        }
      }
    }
  }

  deleteImageStore(index: number) {
    this.urls.splice(index, 1);
    this.imageForm.splice(index, 1);
  }

  deleteGalleryImage(index: number) {
    let image = new NewsImageAPI();
    image = this.galleryNews[index];
    this.galleryNews.splice(index, 1);
    this.listImageDelete.push(image);
  }

  deleteImage() {
    for (var delImage of this.listImageDelete) {
      let image = Object.values(delImage);
      this.imageService.deleteImage(image[2], image[5], "news").then(
        res => {
        },
        err => {
          alertFunction.error("Can not delete file in database and folder wwwroot");
        }
      )
    }
  }

  uploadImage(newsId: string) {
    this.successImage = 0;
    this.numberImage = this.imageForm.length;

    for (var image of this.imageForm) {
      this.imageService.uploadImage(newsId, "news", image).then(
        res => {
          this.successImage++;
          if (this.successImage === this.numberImage) {
            this.imageForm = [];
            this.urls = [];
          }
        },
        err => {
          alertFunction.error("Can't upload your gallery, please try it again.");
        }
      )
    }
  }

  loadAllNewsCategory() {
    this.newsCategoryAPIService.findAllNewsCategory().then(
      res => {
        this.allNewsCategory = res;
        if (this.newCategoryId != 0) {
          this.formEditNewsGroup.get("categoryId")?.setValue(this.newCategoryId.toString());
        } else {
          this.formEditNewsGroup.get("categoryId")?.setValue(this.allNewsCategory[0].newsCategoryId);
        }
      },
      err => {
        alertFunction.error("Connection error, please reset server and refresh this page");
      }
    )
  }

  getCurrentNews(newsId: number) {
    this.getGalleryNews(newsId);
    this.newsAPIService.findNews(newsId).then(
      res => {
        this.currentNews = res;
        this.formEditNewsGroup.get("title")?.setValue(this.currentNews.title);
        
        this.formEditNewsGroup.get("description")?.setValue(this.currentNews.description);
        this.formEditNewsGroup.get("categoryId")?.setValue(this.currentNews.categoryId);
      },
      err => {
        alertFunction.error("Can not get news form url!");
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

  // Alert
  test_success_alert() {
    alertFunction.success("new");
  }

  test_error_alert() {
    alertFunction.error("new");
  }

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
}
