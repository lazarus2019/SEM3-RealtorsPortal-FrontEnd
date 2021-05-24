import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from 'SEM3-RealtorsPortal-FrontEnd/src/app/area/user/category/category.component';
import { CategoryModel } from 'src/app/models/category.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  categories : CategoryModel[] ;

  constructor(
    private userService : UserService,
  ) {
    this.loadScripts();
    this.loadStyle();
    this.userService.getAllCategory().then(
      res => {
        this.categories = res
        },
      err => {
        console.log(err)
      }
    );
  }

  ngOnInit(): void {    

  }



  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../assets/user/js/jquery-3.3.1.min.js',
      '../../../assets/user/js/jquery.waypoints.min.js',
      '../../../assets/user/js/jquery.countup.js',
      '../../../assets/user/js/owl.carousel.js',
      '../../../assets/user/js/jquery.magnific-popup.min.js',
      '../../../assets/user/js/bootstrap.min.js',
      '../../../assets/user/js/jquery.start.js',
      '../../../assets/user/js/jquery.goToTop.js',

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
      '../../../assets/user/css/style-starter.css',

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
