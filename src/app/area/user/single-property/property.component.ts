import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit {
    ngOnInit(): void {
    }
    
    constructor() {
      this.loadScripts();
   }
  
    // Method to dynamically load JavaScript
    loadScripts() {
  
      // This array contains all the files/CDNs
      const dynamicScripts = [
        '../../../../assets/user/js/jquery.start.js',
  
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