import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/imageService.service';
import { Property } from '../../../shared/property.model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PropertyService } from 'src/app/services/property.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../../shared/category.model';
import { Image } from '../../../shared/image.model';
import { PublicService } from 'src/app/services/publicService.service';
import { Region } from 'src/app/shared/region.model';
import { Country } from 'src/app/shared/country.model';
import { City } from 'src/app/shared/city.model';
import { AddressService } from 'src/app/services/address.service';
import { Router } from '@angular/router';
declare var alertFunction: any;

@Component({
  templateUrl: './editProperty.component.html'
})
export class EditPropertyComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private propertyService: PropertyService,
    private categoryService: CategoryService,
    private publicService: PublicService,
    private addressService: AddressService
  ) {
    this.loadScripts();
  }
  urls = new Array<string>();

  imageForm: FormData[] = [];

  categories: Category[] = [];

  numberImage: number = 0;

  successImage: number = 0;

  updateProperty: Property;

  property: Property;

  editFormGroup: FormGroup;

  gallery: Image[] = [];

  listImageDelete = new Array<Object>();

  regions: Region[];

  countries: Country[];

  cities: City[];

  public ngOnInit(): void {
    //get data from userManage component
    this.property = history.state;

    //get region
    this.getAllRegion();

    //get category 
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories;
    });

    //configure addFromGroup
    this.editFormGroup = this.formBuilder.group({
      propertyId: new FormControl(this.property.propertyId, [Validators.required]),
      title: new FormControl(this.property.title, [Validators.required]),
      regionId: new FormControl(this.property.cityCountryRegionId, [Validators.required]),
      countryId: new FormControl(this.property.citycountryId, [Validators.required]),
      cityId: new FormControl(this.property.cityId, [Validators.required]),
      address: new FormControl(this.property.address, [Validators.required]),
      type: new FormControl(this.property.type, [Validators.required]),
      categoryId: new FormControl(this.property.categoryId, [Validators.required]),
      price: new FormControl(this.property.price, [Validators.required]),
      area: new FormControl(this.property.area, [Validators.required]),
      roomNumber: new FormControl(this.property.roomNumber, [Validators.required]),
      bedNumber: new FormControl(this.property.bedNumber, [Validators.required]),
      description: new FormControl(this.property.description, [Validators.required]),
    });
    //get gallery image
    this.getGallery(this.property.propertyId);
  }

  onChangeRegion(regionId: any) {
    this.addressService.getAllCountry(regionId.target.value).subscribe(countries => {
      this.countries = countries;
    })
  }

  onChangeCountry(countryId: any) {
    this.addressService.getAllCity(countryId.target.value).subscribe(cities => {
      this.cities = cities;
    })
  }

  getAllRegion() {
    this.addressService.getAllRegion().subscribe(region => {
      this.regions = region;
    })
  }

  editProperty() {
    this.updateProperty = this.editFormGroup.value;
    console.log(this.editFormGroup.get('cityId').value);
    this.updateProperty.memberId = this.property.memberId;
    this.updateProperty.statusId = this.property.statusId;
    this.propertyService.updateProperty(this.updateProperty).subscribe(() => {
      this.uploadImage();
      if (this.listImageDelete != null) {
        this.deleteImage();
      }
      alertFunction.success("Update Property", "Successfully updated");
    }
    );
    this.router.navigateByUrl('/admin/userManage')
  }

  uploadImage() {
    this.successImage = 0;
    this.numberImage = this.imageForm.length;

    for (var image of this.imageForm) {
      this.imageService.uploadImage(this.property.propertyId.toString(), "property", image).then(
        res => {
          this.successImage++;
          if (this.successImage === this.numberImage) {
            this.imageForm = [];
            this.urls = [];
            //alertFunction.success("Upload gallery success!");
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

  deleteImageStore(index: number) {
    this.urls.splice(index, 1);
    this.imageForm.splice(index, 1);
  }

  deleteGalleryImage(index: number) {
    let image = new Image();
    image = this.gallery[index];
    this.gallery.splice(index, 1);
    this.listImageDelete.push(image);
  }

  deleteImage() {
    for (var delImage of this.listImageDelete) {
      let image = Object.values(delImage);
      console.table(image);
      this.imageService.deleteImage(image[2], image[5], "property").then(
        res => {
        },
        err => {
          alertFunction.error("Can not delete file in database and folder wwwroot!");
        }
      )
    }
  }

  getGallery(propertyId: number) {
    this.propertyService.getGallery(propertyId).subscribe(images => {
      this.gallery = images;
    })
  }

  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("property", imageName);
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
