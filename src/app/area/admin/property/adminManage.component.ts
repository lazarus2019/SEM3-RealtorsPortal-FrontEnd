import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from '../../../shared/property.model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RoleService } from 'src/app/services/role.service';
import { CategoryService } from 'src/app/services/category.service';
import { StatusService } from 'src/app/services/status.service';
import { Category } from '../../../shared/category.model';
import { Status } from '../../../shared/status.model';
import { Image } from '../../../shared/image.model';
import { PublicService } from 'src/app/services/publicService.service';
import { MailRequest } from 'src/app/shared/mailrequest.model';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
declare var alertFunction: any;

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
    private publicService: PublicService,
    private accountService: AccountService
  ) {
    this.loadStyle();
    this.loadScripts();
  }

  // Pagination 
  isFilter = false;

  NoNum: number = 10;

  currentPage: number = 0;

  PropertyLength: number = 0;

  PropertyLengthArray = Array<string>();

  PropertyPerPage: number = 10;

  PropertyPer: number = 0;

  //allPropertyLength: number = 0;

  properties: Property[] = [];

  property: Property = new Property();

  searchFormGroup: FormGroup;

  mailRequest: MailRequest;

  thumbnail: string;

  categories: Category[] = [];

  statuses: Status[] = [];

  images: Image[] = [];

  emailFormGroup: FormGroup;

  ngOnInit(): void {
    //get data
    this.loadData();

    //get status
    this.statusService.getAllStatus().subscribe((statuses) => {
      this.statuses = statuses;
    });

    //get category
    this.categoryService.getAllCategory().then(
      res => {
        this.categories = res;
      },
      err => {
        alertFunction.error("Can not get category");
      }
    )

    //configure searchFromGroup
    this.searchFormGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      partners: new FormControl('', [Validators.required]),
      categoryId: new FormControl('all', [Validators.required]),
      statusId: new FormControl('all', [Validators.required]),
    });

    //get emailRequest to sendMail
    this.emailFormGroup = this.formBuilder.group({
      email: '',
      subject: '',
      content: ''
    });
  }

  loadData() {
    this.propertyService.getAllProperty().subscribe((result) => {
      this.properties.length = result;
      this.setPagination();
      this.getAllPropertyPage(1);
      
    });
  }


  minusPage() {
    this.currentPage--;
    if (!this.isFilter) {
      this.getAllPropertyPage(this.currentPage);
    } else {
      this.searchPage(this.currentPage);
    }
  }

  plusPage() {
    this.currentPage++;
    if (!this.isFilter) {
      this.getAllPropertyPage(this.currentPage);
    } else {
      this.searchPage(this.currentPage);
    }
  }

  onSearch() {
    this.isFilter = true;
    this.search();
    this.searchPage(1);
  }

  executePropertyPerPage(page: number) {
    this.currentPage = page;
    if (!this.isFilter) {
      this.getAllPropertyPage(this.currentPage);
    } else {
      this.searchPage(this.currentPage);
    }
  }

  getAllPropertyPage(page: number) {
    this.propertyService.getAllPropertyPage(page).subscribe((properties) => {
      this.properties = properties;
      console.table(this.properties)
    })
  }

  setPagination() {
    this.PropertyLength = this.properties.length;
    this.PropertyPer = Math.ceil(this.PropertyLength / this.PropertyPerPage);
    this.PropertyLengthArray = new Array(this.PropertyPer);
    this.currentPage = 1;
  }

  search() {
    var title = this.searchFormGroup.get('title').value;
    var partners = this.searchFormGroup.get('partners').value;
    var categoryId = this.searchFormGroup.get('categoryId').value;
    var statusId = this.searchFormGroup.get('statusId').value;

    if (title == '') {
      title = '.all';
    }
    if (partners == '') {
      partners = '.all';

    }
    this.propertyService.search(title, partners, categoryId, statusId).subscribe(result => {
      this.properties.length = result;
      this.setPagination();
    });
  }

  searchPage(page: number) {
    var title = this.searchFormGroup.get('title').value;
    var partners = this.searchFormGroup.get('partners').value;
    var categoryId = this.searchFormGroup.get('categoryId').value;
    var statusId = this.searchFormGroup.get('statusId').value;

    if (title == '') {
      title = '.all';
    }
    if (partners == '') {
      partners = '.all';

    }
    this.propertyService.searchPage(title, partners, categoryId, statusId, page).subscribe(properties => {
      this.properties = properties;
    });
  }

  sendAlert() {
    this.mailRequest = this.emailFormGroup.value;
    this.accountService.SendEmail(this.mailRequest).subscribe(() => {
      alertFunction.success("Send Email", "Email was sent!");
    });
  }

  onDetails(propertyId: number) {
    this.propertyService.getPropertyById(propertyId).subscribe((property) => {
      this.property = property;
      //this.images = property.images;
      this.getGallery(propertyId);
    });
  }

  onCheck(propertyId: number) {
    this.propertyService.getPropertyById(propertyId).subscribe((property) => {
      this.property = property;
      //this.images = this.getGallery(propertyId);
      this.getGallery(propertyId);
    });
  }

  onPublic(property: Property) {
    //change status to update
    if (property != null) {
      property.statusId = 1;
    }
    Swal.fire({
      title: 'Public property!',
      text: 'Are you sure you want to public property?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //update action        
        this.propertyService.updateStatus(property).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Public successful!',
            showConfirmButton: false,
            timer: 2000
          });
          //reload page
          this.loadData();
        });
      }
    })
  }

  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("property", imageName);
  }

  getGallery(propertyId: number) {
    this.propertyService.getGallery(this.property.propertyId).subscribe(images => {
      this.images = images;
    })
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
