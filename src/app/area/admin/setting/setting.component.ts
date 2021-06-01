import { SettingAPI } from './../../../models/setting/setting.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingAPIService } from 'src/app/services/admin/setting/settingAPI.service';
import { ImageService } from 'src/app/services/admin/image/imageService.service';
import { PublicService } from 'src/app/services/publicService.service';
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';
import { NewsCategoryAPIService } from 'src/app/services/admin/newsCategory/newsCategoryAPI.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Category } from 'src/app/shared/category.model';

// Declare custom function
declare var alertFunction: any;

@Component({
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {

  // Setting

  mySetting: SettingAPI = new SettingAPI();

  tempPhone: string = '';

  listPhone = new Array<string>();

  tempEmail: string = '';

  listEmail = new Array<string>();

  fileThumbnailWebsiteUpload: FormData[] = [];

  fileThumbnailAboutUsUpload: FormData[] = [];

  fileThumbnailHomeUpload: FormData[] = [];

  urlThumbnailWebsite: string = "";

  urlThumbnailAboutUs: string = "";

  urlThumbnailHome: string = "";

  // News Category
  allNewsCategory: NewsCategoryAPI[] = [];

  oldCategoryName: string = "";

  newsCategoryId: number = 0;

  // Property Category
  allPropertyCategory: Category[] = [];

  oldPropertyName: string = "";

  propertyCategoryId: number = 0;

  // Setting form
  formSettingGroup: FormGroup = new FormGroup({});

  constructor(
    // Declare formBuilder
    private formBuilder: FormBuilder,

    // Declare services
    private publicService: PublicService,
    private settingAPIService: SettingAPIService,
    private newsCategoryAPIService: NewsCategoryAPIService,
    private categoryService: CategoryService,
    private imageService: ImageService,

  ) {
    this.loadScripts();
  }

  ngOnInit() {

    this.getSetting();

    this.loadAllNewsCategory();

    this.getAllCategory();

    this.formSettingGroup = this.formBuilder.group({
      settingId: 0,
      numTopProperty: 0,
      numPopularLocation: 0,
      numNews: 0,
      numPopularAgent: 0,
      numProperty: 0,
      numSatisfiedCustomer: 0,
      numMaxImageProperty: 0,
      numMaxImageNews: 0,
      phone: "0000000000",
      email: "",
      address: "",
      description: "",
      services: "",
      aboutUsTitle: "",
      thumbnailWebsite: "",
      thumbnailAboutUs: "",
      thumbnailHome: "",
      reviews: ""
    });
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
      '../../../../assets/js/jquery.blockUI.js',
      '../../../../assets/js/jquery.nicescroll.js',

      '../../../../assets/js/jquery.goToTop.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',

      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js',

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }

  getSetting() {
    this.settingAPIService.getSetting().then(
      res => {
        this.mySetting = res;
        if (this.mySetting.email !== null && this.mySetting.phone !== null) {
          this.listEmail = this.mySetting.email.split(",");
          this.listPhone = this.mySetting.phone.split(",");
        }
        this.formSettingGroup.get("numTopProperty")?.setValue(this.mySetting.numTopProperty);
        this.formSettingGroup.get("numPopularLocation")?.setValue(this.mySetting.numPopularLocation);
        this.formSettingGroup.get("numNews")?.setValue(this.mySetting.numNews);
        this.formSettingGroup.get("numPopularAgent")?.setValue(this.mySetting.numPopularAgent);
        this.formSettingGroup.get("numProperty")?.setValue(this.mySetting.numProperty);
        this.formSettingGroup.get("numSatisfiedCustomer")?.setValue(this.mySetting.numSatisfiedCustomer);
        this.formSettingGroup.get("numMaxImageProperty")?.setValue(this.mySetting.numMaxImageProperty);
        this.formSettingGroup.get("numMaxImageNews")?.setValue(this.mySetting.numMaxImageNews);
        this.formSettingGroup.get("address")?.setValue(this.mySetting.address);
        this.formSettingGroup.get("description")?.setValue(this.mySetting.description);
      },
      err => {
        alertFunction.error("Can not get any setting data!")
      }
    )
  }

  // Load category

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

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe((result) => {
      this.allPropertyCategory = result;
    });
  }

  // Update setting

  updateWebsiteSetting() {
    var setting: SettingAPI = new SettingAPI;
    setting.description = this.formSettingGroup.get("description")?.value;
    setting.address = this.formSettingGroup.get("address")?.value;
    setting.email = this.listEmail.toString();
    setting.phone = this.listPhone.toString();
    console.table(setting);
    if (setting.email !== "" && setting.phone !== "") {
      this.settingAPIService.updateWebsiteSetting(setting).then(
        res => {
          alertFunction.success("All your changes are saved!");
        },
        err => {
          alertFunction.error("Can not update your setting!");
        }
      )
    } else {
      alertFunction.error("Website info must have at least 1 email & 1 phone!")
    }
  }

  updateAdminSetting() {
    var setting: SettingAPI = new SettingAPI;
    setting.numMaxImageNews = this.formSettingGroup.get("numMaxImageNews")?.value;
    setting.numMaxImageProperty = this.formSettingGroup.get("numMaxImageProperty")?.value;
    console.table(setting);
    this.settingAPIService.updateAdminSetting(setting).then(
      res => {
        alertFunction.success("All your admin settings are saved!");
      },
      err => {
        alertFunction.error("Can not update your setting!");
      }
    )

  }

  updateUserSetting() {
    var setting: SettingAPI = new SettingAPI;
    setting.numNews = this.formSettingGroup.get("numNews")?.value;
    setting.numProperty = this.formSettingGroup.get("numProperty")?.value;
    setting.numPopularLocation = this.formSettingGroup.get("numPopularLocation")?.value;
    setting.numPopularAgent = this.formSettingGroup.get("numPopularAgent")?.value;
    setting.numSatisfiedCustomer = this.formSettingGroup.get("numSatisfiedCustomer")?.value;
    setting.numTopProperty = this.formSettingGroup.get("numTopProperty")?.value;
    console.table(setting);
    this.settingAPIService.updateUserSetting(setting).then(
      res => {
        if (this.fileThumbnailWebsiteUpload.length > 0) {
          this.updateThumbnailWebsite();
        }
        if (this.fileThumbnailAboutUsUpload.length > 0) {
          this.updateThumbnailAboutUs();
        }
        if (this.fileThumbnailHomeUpload.length > 0) {
          this.updateThumbnailHome();
        }
        alertFunction.success("All your user settings are saved!");
      },
      err => {
        alertFunction.error("Can not update your setting!");
      }
    )


  }

  // Thumbnail setting

  updateThumbnailWebsite() {
    this.imageService.uploadSingle("ThumbnailWebsite", "user", this.fileThumbnailWebsiteUpload[0]).then(
      res => {
        this.imageService.deleteSingle(this.mySetting.thumbnailWebsite, "user").then(
          res => { },
          err => {
            alertFunction.error("Can not delete your old Thumbnail Website - wwwroot!");
          }
        )
      },
      err => {
        alertFunction.error("Can not update your Thumbnail Website!");
      }
    )
  }

  updateThumbnailAboutUs() {
    this.imageService.uploadSingle("ThumbnailAboutUs", "user", this.fileThumbnailAboutUsUpload[0]).then(
      res => {
        this.imageService.deleteSingle(this.mySetting.thumbnailAboutUs, "user").then(
          res => { },
          err => {
            alertFunction.error("Can not delete your old Thumbnail About Us - wwwroot!");
          }
        )
      },
      err => {
        alertFunction.error("Can not update your Thumbnail About Us!");
      }
    )
  }

  updateThumbnailHome() {
    this.imageService.uploadSingle("ThumbnailHome", "user", this.fileThumbnailHomeUpload[0]).then(
      res => {
        this.imageService.deleteSingle(this.mySetting.thumbnailHome, "user").then(
          res => { },
          err => {
            alertFunction.error("Can not delete your old Thumbnail Home - wwwroot!");
          }
        )
      },
      err => {
        alertFunction.error("Can not update your Thumbnail lHome!");
      }
    )
  }

  // News Category Start

  addNewsCategory(categoryName: string) {
    var myCategory: NewsCategoryAPI = new NewsCategoryAPI;
    myCategory.name = categoryName;
    myCategory.isShow = true;
    this.newsCategoryAPIService.createNewsCategory(myCategory).then(
      res => {
        this.loadAllNewsCategory();
        alertFunction.success("Your new category had saved!")
      },
      err => {
        alertFunction.error("Can not create new category!")
      }
    )
  }

  deleteNewsCategory(newsCategoryId: number) {
    Swal.fire({
      title: 'Delete new category!',
      text: 'Are you sure you want to delete this news category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //delete action
        this.newsCategoryAPIService.deleteNewsCategory(newsCategoryId).then(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Delete successful!',
              showConfirmButton: false,
              timer: 2000
            });
            this.oldCategoryName = "";
            this.newsCategoryId = 0;
            this.loadAllNewsCategory();
          },
          err => {
            alertFunction.error("Can not delete your news category!");
          }
        )
      };
    });

  }

  updateNewsCategory(categoryName: string) {
    var updateCategory: NewsCategoryAPI = new NewsCategoryAPI;
    updateCategory.name = categoryName;
    updateCategory.newsCategoryId = this.newsCategoryId;
    this.newsCategoryAPIService.updateNewsCategory(updateCategory).then(
      res => {
        alertFunction.success("Your change had saved!");
        this.oldCategoryName = "";
        this.newsCategoryId = 0;
        this.loadAllNewsCategory();
      },
      err => {
        alertFunction.error("Can not update your news category!");
      }
    )
  }

  sendNewsCategoryId(event: any) {
    this.newsCategoryId = event.target.value;
    this.newsCategoryAPIService.findNewsCategory(this.newsCategoryId).then(
      res => {
        this.oldCategoryName = res.name;
      },
      err => {
        alertFunction.error("Can not get your news category!");
      }
    )
  }

  // News Category End

  // Property Category Start

  addPropertyCategory(categoryName: string) {
    var myCategory: Category = new Category;
    myCategory.name = categoryName;
    myCategory.isShow = true;
    this.categoryService.createCategory(myCategory).then(
      res => {
        this.getAllCategory();
        alertFunction.success("Your new category had saved!")
      },
      err => {
        alertFunction.error("Can not create new category!")
      }
    )
  }

  deletePropertyCategory(newsCategoryId: number) {
    Swal.fire({
      title: 'Delete new property!',
      text: 'Are you sure you want to delete this property category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //delete action
        this.categoryService.deleteCategory(newsCategoryId).then(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Delete successful!',
              showConfirmButton: false,
              timer: 2000
            });
            this.oldPropertyName = "";
            this.propertyCategoryId = 0;
            this.getAllCategory();
          },
          err => {
            alertFunction.error("Can not delete your news category!");
          }
        )
      };
    });
  }

  updatePropertyCategory(categoryName: string) {
    var updateCategory: Category = new Category;
    updateCategory.name = categoryName;
    updateCategory.categoryId = this.propertyCategoryId;
    this.categoryService.updateCategory(updateCategory).then(
      res => {
        alertFunction.success("Your change had saved!");
        this.oldPropertyName = "";
        this.propertyCategoryId = 0;
        this.getAllCategory();
      },
      err => {
        alertFunction.error("Can not update your news category!");
      }
    )
  }

  sendPropertyCategoryId(event: any) {
    this.propertyCategoryId = event.target.value;
    this.categoryService.findCategory(this.propertyCategoryId).then(
      res => {
        this.oldPropertyName = res.name;
      },
      err => {
        alertFunction.error("Can not get your news category!");
      }
    )
  }

  // Property Category End

  // Add - Remove Email & Phone Start

  addPhone() {
    if (this.tempPhone.trim() !== '') {
      this.listPhone.push(this.tempPhone);
      this.tempPhone = '';
    } else {
      alertFunction.error("Your input can not empty")
    }
  }

  addEmail() {
    if (this.tempEmail.trim() !== '') {
      this.listEmail.push(this.tempEmail);
      this.tempEmail = '';
    } else {
      alertFunction.error("Your input can not empty")
    }
  }

  deletePhone(index: number) {
    this.listPhone.splice(index, 1);
  }

  deleteEmail(index: number) {
    this.listEmail.splice(index, 1);
  }

  // Add - Remove Email & Phone End

  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("user", imageName);
  }

  detectFiles(event: any, thumbnailName: string) {
    let files = event.target.files;
    if (files) {
      let status = this.imageService.validate(files[0]);
      if (status == null) {
        let fileTemp = new FormData();
        fileTemp.append('file', files[0], files[0].name);
        let reader = new FileReader();
        switch (thumbnailName) {
          case "thumbnailWebsite":
            this.fileThumbnailWebsiteUpload[0] = fileTemp;
            reader.onload = (e: any) => {
              this.urlThumbnailWebsite = e.target.result;
            }
            break;
          case "thumbnailAboutUs":
            this.fileThumbnailAboutUsUpload[0] = fileTemp;
            reader.onload = (e: any) => {
              this.urlThumbnailAboutUs = e.target.result;
            }
            break;
          case "thumbnailHome":
            this.fileThumbnailHomeUpload[0] = fileTemp;
            reader.onload = (e: any) => {
              this.urlThumbnailHome = e.target.result;
            }
            break;
        }

        reader.readAsDataURL(files[0]);
      } else {
        alertFunction.error(status);
      }
    }
  }
}
