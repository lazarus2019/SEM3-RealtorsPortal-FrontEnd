import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './forgetPassword.component.html'
})
export class ForgetPasswordComponent implements OnInit {

  constructor() {
    this.loadStyle();
  }

  ngOnInit(): void {
  }

  loadStyle() {
    const dynamicStyles = [
      '../../../../assets/user/css/main.css',
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