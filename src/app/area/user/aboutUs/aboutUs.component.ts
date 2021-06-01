import { Component, OnInit } from '@angular/core';
import { FAQAPI } from 'src/app/models/faq/faq.model';
import { FAQService } from 'src/app/services/admin/faq/faqAPI.service';

// Declare custom function
declare var alertFunction: any;

@Component({
  templateUrl: './aboutUs.component.html'
})
export class AboutUsComponent implements OnInit {

  // Declare FAQ Component
  listFAQ: FAQAPI[] = [];

  constructor(
    // Services
    private faqService: FAQService
  ) {
    this.loadScripts();
  }

  ngOnInit(): void {
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

  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
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