import { Component } from '@angular/core';
declare var alertFunction: any;

@Component({
  templateUrl: './dashboard.component.html',
})
export class AdminDashboardComponent {
  constructor() {
    this.loadScripts();
  }

  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/js/jquery.counterup.js'

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }

  test_success_alert(){
    alertFunction.success();
  }
  
  test_error_alert(){
    alertFunction.error();
  }
}
