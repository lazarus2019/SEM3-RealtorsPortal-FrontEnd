import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from '../../../shared/property.model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../../../shared/role.model';
import { CategoryService } from 'src/app/services/category.service';
import { StatusService } from 'src/app/services/status.service';
import { Category } from '../../../shared/category.model';
import { Status } from '../../../shared/status.model';
import { Image } from '../../../shared/image.model';
import { PublicService } from 'src/app/services/publicService.service';

@Component({
  templateUrl: './adminManage.component.html'
})
export class AdminManagePropertyComponent implements OnInit {

  constructor(
    private propertyService: PropertyService, 
    private formBuilder: FormBuilder, 
    private roleService: RoleService,
    private categoryService: CategoryService,
    private statusService: StatusService,
    private publicService: PublicService
    ) {
    this.loadStyle();
    this.loadScripts();
  }

  properties: Property[] = [];

  property: Property = new Property();

  searchFormGroup: FormGroup;

  roles: Role[] = [];

  categories: Category[] = [];

  statuses: Status[] = [];

  images: Image[] = [];

  ngOnInit(): void {
    //get member
    this.propertyService.getAllProperty().subscribe((properties) => {
      this.properties = properties;
    });

    //get role
    this.roleService.getAllRole().subscribe((roles) => {
      this.roles = roles;
    });

    //get status
    this.statusService.getAllStatus().subscribe((statuses) => {
      this.statuses = statuses;
    });

    //get category
    this.categoryService.getAllCategory().subscribe((categories) => {
      this.categories = categories;
    });

    //configure searchFromGroup
    this.searchFormGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      roleId: new FormControl('all', [Validators.required]),
      categoryId: new FormControl('all', [Validators.required]),
      statusId: new FormControl('all', [Validators.required]),
    });
  }

  search(){
    var title = this.searchFormGroup.get('title').value;
    var roleId = this.searchFormGroup.get('roleId').value;
    var categoryId = this.searchFormGroup.get('categoryId').value;
    var statusId = this.searchFormGroup.get('statusId').value;
    if(title == ''){
      title = '.all';
    }
    this.propertyService.search(title, roleId, categoryId, statusId).subscribe(properties => {
      this.properties = properties;
    });
  }

  onDetails(propertyId: number) {
    this.propertyService.getPropertyById(propertyId).subscribe((property) => {
      this.property = property;
      this.getGallery(propertyId);
    });
  }

  getGallery(propertyId: number){
    this.propertyService.getGallery(propertyId).subscribe(images => {
      this.images = images;
    })
  }

  getUrlImage(imageName:string){
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
      '../../../../assets/plugins/datatables/datatables.min.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',
      '../../../../assets/plugins/counterup/jquery.counterup.min.js',

      '../../../../assets/data/data_datatables.js',
      '../../../../assets/js/jquery.dataTable.js',

      '../../../../assets/data/data_charts_dashboard.js',
      '../../../../assets/plugins/tinymce/jquery.tinymce.min.js',
      '../../../../assets/plugins/tinymce/tinymce.min.js',
      '../../../../assets/plugins/tinymce/init-tinymce.js',
      '../../../../assets/plugins/jquery.filer/js/jquery.filer.min.js',
      '../../../../assets/plugins/jquery.filer/js/temp.js',
      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js',
      '../../../../assets/plugins/owlcarousel/owl.carousel.min.js',
      '../../../../assets/js/jquery.owlcarousel.js',

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
      '../../../../assets/plugins/owlcarousel/slideimage.css',
      '../../../../assets/css/style.css'
    ];
    for (let i = 0; i < dynamicStyles.length; i++) {
      const node = document.createElement('link');
      node.href = dynamicStyles[i];
      node.type = 'text/css';
      node.rel = "stylesheet";
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
