import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  constructor() {
    this.loadStyle();
  }

  ngOnInit(): void {
  }

  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/plugins/select2/css/select2.min.css',
      '../../../../assets/plugins/select2/css/select2.min.js',
      '../../../../assets/js/global.js',
      '../../../../assets/user/css/material-design-iconic-font.min.css',
      '../../../../assets/js/jquery.min.js',

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
      '../../../../assets/user/css/main.css',
      '../../../../assets/plugins/select2/css/select2.min.css',

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