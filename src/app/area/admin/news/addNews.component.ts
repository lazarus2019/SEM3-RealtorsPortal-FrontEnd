import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsOrgAPI } from 'src/app/models/news/newsOrg.model';
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';
import { NewsCategoryAPIService } from 'src/app/services/admin/newsCategory/newsCategoryAPI.service';
import { NewsAPIService } from 'src/app/services/admin/news/newsAPI.service';
import { ImageService } from 'src/app/services/admin/image/imageService.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { SettingAPIService } from 'src/app/services/admin/setting/settingAPI.service';

// Declare custom function
declare var generateUrlFunction: any;
declare var alertFunction: any;
declare var getTinyMCEContent: any;

@Component({
  templateUrl: './addNews.component.html'
})
export class AdminNewsComponent implements OnInit {

  url: string = "";

  // Upload images
  urls = new Array<string>();

  imageForm: FormData[] = [];

  numberImage: number = 0;

  successImage: number = 0;

   // Setting

   maxImage:number = 0;

  // Form content
  formAddNewGroup: FormGroup = new FormGroup({});

  // Category
  allNewsCategory: NewsCategoryAPI[] = [];

  newCategoryId:number = 0;

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
    private imageService: ImageService,
    private settingAPIService: SettingAPIService,
  ) {
    this.loadScripts();
  }

  ngOnInit() {

    // Load Categories
    this.loadAllNewsCategory();
    // Load setting
    this.getMaxNewsImage();

    this.formAddNewGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl(''),
      createdDate: new Date(),
      status: "",
      categoryId: new FormControl('1', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formAddNewGroup.controls[controlName].hasError(errorName)
  }

  public validateControl = (controlName: string) => {
    return this.formAddNewGroup.controls[controlName].invalid && this.formAddNewGroup.controls[controlName].touched
  }




  getMaxNewsImage(){
    this.settingAPIService.getMaxNewsImage().then(
      res=>{
        this.maxImage = res;
      },
      err=>{
        alertFunction.error("Can not get max image setting!")
      }
    )
  }


  loadAllNewsCategory() {
    this.newsCategoryAPIService.findAllNewsCategory().then(
      res => {
        this.allNewsCategory = res;
        if(this.newCategoryId != 0){
          this.formAddNewGroup.get("categoryId")?.setValue(this.newCategoryId.toString());
        }else{
          this.formAddNewGroup.get("categoryId")?.setValue(this.allNewsCategory[0].newsCategoryId);
        }
      },
      err => {
        alertFunction.error("Connection error, please reset server and refresh this page");
      }
    )
  }

  addNews(buttonType: string) {
    if(this.imageForm.length > 0){
      var news: NewsOrgAPI = this.formAddNewGroup.value;
      news.description = getTinyMCEContent();
      // Set status: public or draft for news
      news.status = buttonType;
      this.newsAPIService.createNews(news).then(
        res => {
          this.uploadImage(res.toString());
        },
        err => {
          alertFunction.error("Please try again!")
        }
      )
    }else{
      alertFunction.error("You have to upload at least 1 photo!");
    }

  }

  addNewsCategory(categoryName: string) {
    if(categoryName.trim.length > 5){
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
    }else{
      alertFunction.error("category name must at least 5 characters!")
    }

  }

  // FUNCTION UPLOAD GALLERY START

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

  deleteImage(index: number) {
    this.urls.splice(index, 1);
    this.imageForm.splice(index, 1);
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
            alertFunction.success("Add news success!");
            this.router.navigate(['/admin/manageNews']);
          }
        },
        err => {
          alertFunction.error("Can't upload your gallery, please try it again.");
        }
      )
    }
  }

  // FUNCTION UPLOAD GALLERY END

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
      '../../../../assets/js/jquery.lightBox.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',
      '../../../../assets/plugins/counterup/jquery.counterup.min.js',


      '../../../../assets/data/data_charts_dashboard.js',
      '../../../../assets/plugins/tinymce/jquery.tinymce.min.js',
      '../../../../assets/plugins/tinymce/tinymce.min.js',
      '../../../../assets/plugins/tinymce/init-tinymce.js',
      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js',
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
