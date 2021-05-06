import { Component } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  constructor() {
    this.loadScripts();
    this.loadStyle();
  }

  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../assets/js/modernizr.min.js',
      '../../../assets/js/jquery.min.js',
      '../../../assets/js/moment.min.js',

      '../../../assets/js/popper.min.js',
      '../../../assets/js/bootstrap.min.js',

      '../../../assets/js/detect.js',
      '../../../assets/js/fastclick.js',
      '../../../assets/js/jquery.blockUI.js',
      '../../../assets/js/jquery.nicescroll.js',

      '../../../assets/js/admin.js',
      '../../../assets/plugins/chart.js/Chart.min.js',
      '../../../assets/plugins/datatables/datatables.min.js',

      '../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',
      '../../../assets/plugins/counterup/jquery.counterup.min.js',

      '../../../assets/data/data_datatables.js',

      '../../../assets/data/data_charts_dashboard.js',
      '../../../assets/plugins/tinymce/jquery.tinymce.min.js',
      '../../../assets/plugins/tinymce/tinymce.min.js',
      '../../../assets/plugins/tinymce/init-tinymce.js',
      '../../../assets/plugins/jquery.filer/js/jquery.filer.min.js',
      '../../../assets/plugins/jquery.filer/js/temp.js'
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
      '../../../assets/css/bootstrap.min.css',
      '../../../assets/font-awesome/css/all.css',
      '../../../assets/css/style.css',
      '../../../assets/plugins/chart.js/Chart.min.css',
      '../../../assets/plugins/datatables/datatables.min.css',
      '../../../assets/plugins/jquery.filer/css/jquery.filer.css',
      '../../../assets/plugins/jquery.filer/css/themes/jquery.filer-dragdropbox-theme.css',

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