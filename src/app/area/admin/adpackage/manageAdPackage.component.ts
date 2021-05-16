import { Component, OnInit } from '@angular/core';
import { AdsPackageService } from 'src/app/services/ads-package.service';
import { AdsPackage } from '../shared/adsPackage.model';
declare var alertFunction: any;

@Component({
  templateUrl: './manageAdPackage.component.html',
  styleUrls: ['./manageAdPackage.component.css']
})
export class AdminManageAdPackageComponent implements OnInit {

  constructor(private adsPackageService: AdsPackageService) {
    this.loadScripts();
  }

  adsPackages: AdsPackage[] = [];
  adsPackage: AdsPackage;

  ngOnInit(): void {
    //Get Ad package
    this.adsPackageService.getAllAdsPackage().subscribe(adsPackages => {
      this.adsPackages = adsPackages;
    });
  }

  onEdit(adsPackage){
    this.adsPackage = adsPackage;
    console.table(this.adsPackage);
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

  deleteAlert() {
    var title = "Delete ads package!";
    var content = "Are you sure you want to delete ads package?";
    alertFunction.delete(title, content);
  }
}
