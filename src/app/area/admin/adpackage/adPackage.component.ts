import { Component } from '@angular/core';

@Component({
  templateUrl: './adPackage.component.html'
})
export class AdminAdPackageComponent {
  constructor() {
    this.loadStyle();
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
