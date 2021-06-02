import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FAQAPI } from 'src/app/models/faq/faq.model';
import { FAQAPIService } from 'src/app/services/admin/faq/faqAPI.service';
import Swal from 'sweetalert2';

// Declare custom function
declare var alertFunction: any;

@Component({
  templateUrl: './faq.component.html'
})
export class AdminFAQComponent implements OnInit {

  // Declare FAQ Component
  listFAQ: FAQAPI[] = [];

  currentFAQ: FAQAPI = new FAQAPI;

  // Form content
  formFAQGroup: FormGroup = new FormGroup({});
  constructor(
    // Declare form builder
    private formBuilder: FormBuilder,
    // Services
    private faqService: FAQAPIService
  ) {
    // this.loadScripts();
  }

  // // Method to dynamically load JavaScript
  // loadScripts() {

  //   // This array contains all the files/CDNs
  //   const dynamicScripts = [
  //     '../../../../assets/js/modernizr.min.js',
  //     '../../../../assets/js/jquery.min.js',
  //     '../../../../assets/js/moment.min.js',

  //     '../../../../assets/js/popper.min.js',
  //     '../../../../assets/js/bootstrap.min.js',

  //     '../../../../assets/js/detect.js',
  //     '../../../../assets/js/jquery.blockUI.js',
  //     '../../../../assets/js/jquery.nicescroll.js',

  //     '../../../../assets/js/jquery.dataTable.js',
  //     '../../../../assets/js/jquery.goToTop.js',
  //     '../../../../assets/plugins/datatables/datatables.min.js',

  //     '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',

  //     '../../../../assets/data/data_datatables.js',

  //     '../../../../assets/plugins/jquery.filer/js/jquery.filer.min.js',
  //     '../../../../assets/plugins/jquery.filer/js/temp.js',
  //     '../../../../assets/plugins/sweetalert/sweetalert.min.js',
  //     '../../../../assets/js/jquery.sweetalert.js'

  //   ];
  //   for (let i = 0; i < dynamicScripts.length; i++) {
  //     const node = document.createElement('script');
  //     node.src = dynamicScripts[i];
  //     node.type = 'text/javascript';
  //     node.async = false;
  //     document.body.appendChild(node);
  //   }
  // }

  ngOnInit() {
    this.formFAQGroup = this.formBuilder.group({
      title: new FormControl("", [Validators.required, Validators.minLength(5)]),
      description: new FormControl("", [Validators.required, Validators.minLength(20)])
    });

    // Get and show all FAQ from database
    this.getAllFAQ();
  }

  getAllFAQ() {
    this.faqService.getAllFAQ().then(
      res => {
        this.listFAQ = res;
      },
      err => {
        alertFunction.error("Can not get all faq!");
      }
    )
  }

  viewToEditFAQ(faqId: number) {
    this.faqService.findFAQ(faqId).then(
      res => {
        this.currentFAQ = res;
        this.formFAQGroup.get("title")?.setValue(this.currentFAQ.title);
        this.formFAQGroup.get("description")?.setValue(this.currentFAQ.description);
      },
      err => {
        alertFunction.error("Can not get faq to edit!");
      }
    )
  }

  resetCurrentFAQ() {
    this.currentFAQ = new FAQAPI;
    this.formFAQGroup.get("title")?.setValue(this.currentFAQ.title);
    this.formFAQGroup.get("description")?.setValue(this.currentFAQ.description);
  }

  addFAQ(){
    let faq:FAQAPI = this.formFAQGroup.value;
    this.faqService.createFAQ(faq).then(
      res=>{
        alertFunction.success("You just add a new FAQ!");
        this.getAllFAQ();
      },
      err =>{
        alertFunction.error("Can not add new FAQ!");        
      }
    )
  }

  deleteFAQ(faqId: number){
    Swal.fire({
      title: 'Delete news!',
      text: 'Are you sure you want to delete this news?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //delete action
        this.faqService.deleteFAQ(faqId).then(
          res=>{
            Swal.fire({
              icon: 'success',
              title: 'Delete successful!',
              showConfirmButton: false,
              timer: 2000
            });
            this.getAllFAQ();
          },
          err =>{
            alertFunction.error("Can not delete this FAQ!");
          }
        )
      };
    });

  }

  updateFAQ(faqId:number){
    let faq:FAQAPI = this.formFAQGroup.value;
    faq.faqId = faqId;
    this.faqService.updateFAQ(faq).then(
      res=>{
        alertFunction.success("Your FAQ had been updated!");
        this.getAllFAQ();
      },
      err=>{
        alertFunction.error("Can not update your FAQ!");
      }
    )
  }

  // Alert
  test_success_alert() {
    alertFunction.success("new");
  }

  test_error_alert() {
    alertFunction.error("new");
  }
}
