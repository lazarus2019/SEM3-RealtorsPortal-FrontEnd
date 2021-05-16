import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/imageService.service';
import { Property } from '../shared/property.model';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PropertyService } from 'src/app/services/property.service';
declare var alertFunction: any;

@Component({
  templateUrl: './addNew.component.html'
})
export class AddNewPropertyComponent implements OnInit {

  constructor(private imageService: ImageService, private formBuilder: FormBuilder, private propertyService: PropertyService) {
    this.loadScripts();
  }
  property: Property;
  urls = new Array<string>();
  listImage = new Array<Object>();
  addFormGroup: FormGroup;

  public ngOnInit(): void {
    //get data from userManage component
    this.property = history.state;
    //configure addFromGroup
    this.addFormGroup = this.formBuilder.group({
      title: '',
      region: '',
      country: '',
      city: '',
      address: '',
      type: '',
      category: '',
      price: '',
      area: '',
      roomNumber: '',
      bedNumber: '',
      content: '',
      files: this.listImage
  });
  }

  addNewProperty(){
    this.property = this.addFormGroup.value;
    console.table(this.property);
    for(var i =0; i < this.property.propertyImagePath.length; i++){
      console.log("image" +this.property.propertyImagePath[i]);
    }
    this.propertyService.addNewProperty(this.property).subscribe();
  }

  detectFiles(event: any) {
    let files = event.target.files;
    // Maximum 5 file each news/post
    if(this.urls.length + files.length > 5){
      alertFunction.error("You are only allowed to upload a maximum of 5 files!");
    }else{
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

  deleteImage(index: number){
    this.urls.splice(index, 1);
    this.listImage.splice(index, 1);
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
