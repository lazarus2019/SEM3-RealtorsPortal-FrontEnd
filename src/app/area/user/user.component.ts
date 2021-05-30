import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  constructor(private router: Router) {
    this.loadScripts();
    this.loadStyle();
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


  authenticated(){
    if (localStorage.getItem('token') != null)
      return true;
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
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
