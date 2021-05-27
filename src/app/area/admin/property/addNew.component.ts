import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/imageService.service';
import { Property } from '../../../shared/property.model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PropertyService } from 'src/app/services/property.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../shared/category.model';
declare var alertFunction: any;
declare var getTinyMCEContent: any;

@Component({
  templateUrl: './addNew.component.html'
})
export class AddNewPropertyComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private propertyService: PropertyService,
    private categoryService: CategoryService
  ) {
    this.loadScripts();
  }
  urls = new Array<string>();

  imageForm: FormData[] = [];

  numberImage: number = 0;

  successImage: number = 0;

  property: Property;

  categories: Category[] = [];

  addFormGroup: FormGroup;

  public ngOnInit(): void {
    //get category 
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    });
    //configure addFromGroup
    this.addFormGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      roomNumber: new FormControl('', [Validators.required]),
      bedNumber: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  createProperty() {
    this.property = this.addFormGroup.value;
    this.property.cityId = "kr_south_seo";
    this.property.description = getTinyMCEContent();
    this.propertyService.createProperty(this.property).subscribe(propertyId => {
      console.log("pId: " + propertyId);
      this.uploadImage(propertyId.toString());
      alertFunction.success("Add New Property", "Successfully added!")
    }
    );
  }

  uploadImage(propertyId: string) {
    this.successImage = 0;
    this.numberImage = this.imageForm.length;
    for (var image of this.imageForm) {
      this.imageService.uploadImage(propertyId, "property", image).then(
        res => {
          this.successImage++;
          if (this.successImage === this.numberImage) {
            this.imageForm = [];
            this.urls = [];
            alertFunction.success("Upload gallery success!")
          }
        },
        err => {
          alertFunction.error("Can't upload your gallery, please try it again.");
        }
      )
    }
  }

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
      '../../../../assets/js/jquery.lightBox.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',
      '../../../../assets/plugins/counterup/jquery.counterup.min.js',


      '../../../../assets/data/data_charts_dashboard.js',
      '../../../../assets/plugins/tinymce/jquery.tinymce.min.js',
      '../../../../assets/plugins/tinymce/tinymce.min.js',
      '../../../../assets/plugins/tinymce/init-tinymce.js',
      '../../../../assets/plugins/jquery.filer/js/jquery.filer.min.js',
      '../../../../assets/plugins/jquery.filer/js/temp.js',
      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js',
      '../../../../assets/js/jquery.tinymce.js',

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }

}
