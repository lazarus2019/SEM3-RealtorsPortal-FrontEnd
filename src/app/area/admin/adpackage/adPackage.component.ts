import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AdsPackageService } from 'src/app/services/ads-package.service';
import { AdsPackage } from '../../../shared/adsPackage.model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from '../../../shared/invoice.model';
declare let paypal: any;
declare var alertFunction: any;

@Component({
  templateUrl: './adPackage.component.html'
})
export class AdminAdPackageComponent implements OnInit, AfterViewChecked {

  constructor(private adsPackageService: AdsPackageService, private formBuilder: FormBuilder, private invoiceService: InvoiceService) {
    this.loadScripts();
    this.loadStyle();
  }

  adsPackages: AdsPackage[] = [];

  adsPackage: AdsPackage;

  searchFormGroup: FormGroup;

  invoice: Invoice;

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
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.table(payment);
        console.log("cart: " + payment.id);
        console.log("cart: " + payment.create_time);
        console.log("payerID: " + payment.payer.payer_info.payer_id);
        console.log("method: " + payment.payer.method);
        console.log("name: " + payment.payer.payer_info.first_name);
        console.log("name: " + payment.payer.payer_info.last_name);
        console.log("name: " + this.finalAmount);
        this.invoice.name = payment.payer.payer_info.first_name + " " + payment.payer.payer_info.last_name;
        this.invoice.created = payment.create_time;
        this.invoice.total = this.finalAmount;
        this.invoice.paymentMethod = payment.payer.method;
        this.invoice.paymentCard = payment.payer.payer_info.payer_id;
        this.invoice.paymentCode = payment.id;
        this.invoiceService.createInvoice(this.invoice).subscribe();
        alertFunction.payment();
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
    this.adsPackageService.getAllAdsPackageForSalePage().subscribe(adsPackages => {
      this.adsPackages = adsPackages;
    });
    
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
  }

  buyBow(price: number) {
    this.finalAmount = price;
  }

  search() {
    //var price = this.searchFormGroup.get('price').value;
    //var name = this.searchFormGroup.get('name').value;

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
