import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AdsPackageService } from 'src/app/services/ads-package.service';
import { AdsPackage } from '../../../shared/adsPackage.model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from '../../../shared/invoice.model';
import { AdsPackageDetail } from 'src/app/shared/adsPackageDetail.model';
declare let paypal: any;
declare var alertFunction: any;

@Component({
  templateUrl: './adPackage.component.html'
})
export class AdminAdPackageComponent implements OnInit, AfterViewChecked {

  constructor(private adsPackageService: AdsPackageService, private formBuilder: FormBuilder, private invoiceService: InvoiceService) {
    this.loadStyle();
    this.loadScripts();
  }
  // Pagination 
  isFilter = false;

  NoNum: number = 10;

  currentPage: number = 0;

  adPackageLength: number = 0;

  adPackageLengthArray = Array<string>();

  adPackagePerPage: number = 10;

  adsPackagePer: number = 0;

  adsPackages: AdsPackage[] = [];

  adsPackage: AdsPackage;

  adsPackageDetail: AdsPackageDetail = new AdsPackageDetail();

  searchFormGroup: FormGroup;

  invoice: Invoice = new Invoice();

  addScript: boolean;

  finalAmount: number;

  maxPrice: number;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: "AakB4_t1T0Z4GIA6xLpJuH6LZibLqiq-cwFAEqiza41WEjaFtvyxdBzcATViWF7tG7PvS0tUhbCDTO3J", //clientID
      production: "2"
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.adsPackage.price, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.invoice.name = payment.payer.payer_info.first_name + ' ' + payment.payer.payer_info.last_name;
        this.invoice.created = payment.create_time;
        this.invoice.paymentMethod = payment.payer.payment_method;
        this.invoice.paymentCard = payment.payer.payer_info.payer_id;
        this.invoice.paymentCode = payment.id;
        this.invoice.packageId = this.adsPackage.packageId;
        this.invoice.total = this.adsPackage.price;
        this.adsPackageDetail.packageId = this.adsPackage.packageId;

        if (payment != null) {
          var userId = localStorage.getItem('userId');
          this.invoiceService.createInvoice(userId, this.invoice).subscribe(() => {
            this.adsPackageService.createAdsPackageDetail(this.adsPackageDetail, userId).subscribe(() => {
              alertFunction.payment();
            });
          }, err => {
            alertFunction.error("Failed", "Can't pay now, please try again!");
          });
        }
      })
    }
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout');
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scriptTagElement = document.createElement('script');
      scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    })
  }

  ngOnInit(): void {
    //Get Ad package
    this.loadData();

    //Get max price
    this.adsPackageService.getMaxPrice().subscribe(maxPrice => {
      this.maxPrice = maxPrice;
    })

    //configure searchFormGroup
    this.searchFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  buyBow(adsPackage: AdsPackage) {
    this.adsPackage = adsPackage;
  }


  loadData() {
    this.adsPackageService.getAllAdsPackageForSalePage().subscribe((result) => {
      this.adsPackages.length = result;
      this.setPagination();
      this.getAllAdsPackageForSalePagePerPage(1);
    });
  }


  minusPage() {
    this.currentPage--;
    if (!this.isFilter) {
      this.getAllAdsPackageForSalePagePerPage(this.currentPage);
    } else {
      this.searchPage(this.currentPage);
    }
  }

  plusPage() {
    this.currentPage++;
    if (!this.isFilter) {
      this.getAllAdsPackageForSalePagePerPage(this.currentPage);
    } else {
      this.searchPage(this.currentPage);
    }
  }

  onSearch() {
    this.isFilter = true;
    this.search();
    this.searchPage(1);
  }

  executeAdPackagePerPage(page: number) {
    this.currentPage = page;
    if (!this.isFilter) {
      this.getAllAdsPackageForSalePagePerPage(this.currentPage);
    } else {
      this.searchPage(this.currentPage);
    }
  }

  getAllAdsPackageForSalePagePerPage(page: number) {
    this.adsPackageService.getAllAdsPackageForSalePagePerPage(page).subscribe((adsPackages) => {
      this.adsPackages = adsPackages;
    })
  }

  setPagination() {
    this.adPackageLength = this.adsPackages.length;
    this.adsPackagePer = Math.ceil(this.adPackageLength / this.adPackagePerPage);
    this.adPackageLengthArray = new Array(this.adsPackagePer);
    this.currentPage = 1;
  }

  search() {
    var price = this.searchFormGroup.get('price').value;
    var name = this.searchFormGroup.get('name').value;
    if (price == '') {
      price = '.all';
    }
    if (name == '') {
      name = '.all';
    }
    var status = 'true';
    this.adsPackageService.search(name, status, price).subscribe(result => {
      this.adsPackages.length = result;
      this.setPagination();
    });
  }

  searchPage(page: number) {
    var price = this.searchFormGroup.get('price').value;
    var name = this.searchFormGroup.get('name').value;
    if (price == '') {
      price = '.all';
    }
    if (name == '') {
      name = '.all';
    }
    var status = 'true';
    this.adsPackageService.searchPage(name, status, price, page).subscribe(adsPackages => {
      this.adsPackages = adsPackages;
    });
  }

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
}
