import { Component, OnInit } from '@angular/core';
import { AdsPackageService } from 'src/app/services/ads-package.service';
import { AdsPackage } from '../../../shared/adsPackage.model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

declare var alertFunction: any;

@Component({
  templateUrl: './manageAdPackage.component.html',
  styleUrls: ['./manageAdPackage.component.css']
})
export class AdminManageAdPackageComponent implements OnInit {

  constructor(private adsPackageService: AdsPackageService, private formBuilder: FormBuilder) {
    this.loadScripts();
    this.loadStyle();
  }

  adsPackages: AdsPackage[] = [];

  adsPackage: AdsPackage;

  addFormGroup: FormGroup;

  editFormGroup: FormGroup;

  searchFormGroup: FormGroup;

  maxPrice: number;

  ngOnInit(): void {
    //Get Ad package
    this.loadData();

    //Get max price
    this.adsPackageService.getMaxPrice().subscribe(maxPrice => {
      this.maxPrice = maxPrice;
      console.log(maxPrice);
    })

    //configure searchFormGroup
    this.searchFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });

    //configure addFromGroup
    this.addFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: '',
      description: '',
      postNumber: '',
      period: '',
    });

    //configure editFromGroup
    this.editFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: '',
      description: '',
      postNumber: '',
      period: '',
    });
  }

  loadData(){
    this.adsPackageService.getAllAdsPackage().subscribe(adsPackages => {
      this.adsPackages = adsPackages;
    });
  }

  search() {
    //var price = this.searchFormGroup.get('price').value;
    //var name = this.searchFormGroup.get('name').value;

  }

  onEdit(adsPackageId: number) {
    //get data by id
    this.adsPackageService.getAdsPackageById(adsPackageId).subscribe(adsPackage => {
      //this.adsPackage = adsPackage;
      this.editFormGroup.get('name').setValue(adsPackage.nameAdPackage);
      this.editFormGroup.get('price').setValue(adsPackage.price);
      this.editFormGroup.get('description').setValue(adsPackage.description);
      this.editFormGroup.get('postNumber').setValue(adsPackage.postNumber);
      this.editFormGroup.get('period').setValue(adsPackage.period);
      console.log("testttt newwww");
    })

  }

  onSubmitEdit() {

  }

  onSubmitAdd() {

  }

  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/js/jquery.range.js'
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
      '../../../../assets/css/pricing-tables.css'
    ];
    for (let i = 0; i < dynamicStyles.length; i++) {
      const node = document.createElement('link');
      node.href = dynamicStyles[i];
      node.type = 'text/css';
      node.rel = "stylesheet";
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  lockAlert(adsPackage: AdsPackage) {
    //change status to update
    if (adsPackage != null) {
      adsPackage.statusBuy = false;
      console.log(adsPackage.statusBuy);
    }

    Swal.fire({
      title: 'Lock Ads Package!',
      text: 'Are you sure you want to lock ads package?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //update action   
        this.adsPackageService.updateStatus(adsPackage).subscribe();

        Swal.fire({
          icon: 'success',
          title: 'Lock successful!',
          showConfirmButton: false,
          timer: 1500
        });
        //reload page
        this.ngOnInit();
      }
    })
  }
  unlockAlert(adsPackage: AdsPackage) {
    //change status to update
    if (adsPackage != null) {
      adsPackage.statusBuy = true;
      console.log(adsPackage.statusBuy);
    }

    Swal.fire({
      title: 'Unlock Ads Package!',
      text: 'Are you sure you want to unlock ads package?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        //update action   
        this.adsPackageService.updateStatus(adsPackage).subscribe();

        Swal.fire({
          icon: 'success',
          title: 'Unlock successful!',
          showConfirmButton: false,
          timer: 1500
        });
        //reload page
        this.ngOnInit();
      }
    })
  }

  deleteAlert(packageId: number) {
    Swal.fire({
      title: 'Delete ads package!',
      text: 'Are you sure you want to delete ads package?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //delete action
        this.adsPackageService.deleteAdsPackage(packageId).subscribe();
        Swal.fire({
          icon: 'success',
          title: 'Delete successful!',
          showConfirmButton: false,
          timer: 1500
        });
        //reload page
        this.ngOnInit();
      }
    })
  }
}
