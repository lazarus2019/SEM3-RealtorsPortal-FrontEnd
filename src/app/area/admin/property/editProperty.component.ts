import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/admin/image/imageService.service';
declare var alertFunction: any;

@Component({
  templateUrl: './editProperty.component.html'
})
export class EditPropertyComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

  propertyId: number = 0;


  public ngOnInit(): void {
    //get data from userManage component
    var id = this.route.snapshot.paramMap.get('propertyId');
    console.log(id);
    if (id != null) {
      // set id from query to newsId
      this.propertyId = parseInt(id);
      this.getPropertyById(this.propertyId);
    } else {
      alertFunction.error("Doesn't receive any data!");
    }



    //get category 
    this.categoryService.getAllCategory().then(
      res => {
        this.categories = res;
      },
      err => {
        alertFunction.error("Can not get category");
      }
    )

    //configure addFromGroup
    this.editFormGroup = this.formBuilder.group({
      propertyId: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      regionId: new FormControl('', [Validators.required]),
      countryId: new FormControl('', [Validators.required]),
      cityId: new FormControl('', [Validators.required]),
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

  getPropertyById(propertyId: number) {
    this.propertyService.getPropertyById(propertyId).subscribe(property => {
      this.property = property;
      if (property != null) {
        //get region
        this.getAllRegion();
        this.getGallery(this.property.propertyId);
      }
    });
  }

  onChangeRegion(regionId: any) {
    this.addressService.getAllCountry(regionId.target.value).subscribe(countries => {
      this.countries = countries;
    })
  }

  getAllCountryCity(regionId: number) {
    this.addressService.getAllCountry(regionId).subscribe(countries => {
      this.countries = countries;
      if (this.countries.length > 0) {
        this.editFormGroup.get('countryId').setValue(this.property.cityCountryId);
      }
      this.addressService.getAllCity(this.property.cityCountryId).subscribe(cities => {
        this.cities = cities;
        if (this.cities.length > 0) {
          this.editFormGroup.get('cityId').setValue(this.property.cityId);
        }
      })
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
      if (this.regions.length > 0) {
        this.editFormGroup.get('regionId').setValue(this.property.cityCountryRegionId);
      }
      this.getAllCountryCity(this.property.cityCountryRegionId);
      this.editFormGroup.get('title').setValue(this.property.title);
      this.editFormGroup.get('address').setValue(this.property.address);
      this.editFormGroup.get('type').setValue(this.property.type);
      this.editFormGroup.get('categoryId').setValue(this.property.categoryId);
      this.editFormGroup.get('price').setValue(this.property.price);
      this.editFormGroup.get('area').setValue(this.property.area);
      this.editFormGroup.get('roomNumber').setValue(this.property.roomNumber);
      this.editFormGroup.get('bedNumber').setValue(this.property.bedNumber);
      this.editFormGroup.get('description').setValue(this.property.description);
    })
  }

  editProperty() {
    this.property.title = this.editFormGroup.get('title').value;
    this.property.address = this.editFormGroup.get('address').value;
    this.property.type = this.editFormGroup.get('type').value;
    this.property.categoryId = this.editFormGroup.get('categoryId').value;
    this.property.price = this.editFormGroup.get('price').value;
    this.property.area = this.editFormGroup.get('area').value;
    this.property.roomNumber = this.editFormGroup.get('roomNumber').value;
    this.property.bedNumber = this.editFormGroup.get('bedNumber').value;
    this.property.description = this.editFormGroup.get('description').value;
    this.property.cityId = this.editFormGroup.get('cityId').value;

    //this.property = this.property.memberId;
    //this.property = this.property.statusId;
    console.table(this.property);
    this.propertyService.updateProperty(this.property).subscribe(() => {
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
