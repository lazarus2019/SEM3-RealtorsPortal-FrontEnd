import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from '../shared/property.model';

@Component({
  templateUrl: './adminManage.component.html'
})
export class AdminManagePropertyComponent implements OnInit {

  constructor(private propertyService: PropertyService) {
    this.loadStyle();
    this.loadScripts();
  }

  properties: Property[] = [];
  property: Property = new Property();

  ngOnInit(): void {
    //get member
    this.propertyService.getAllProperty().subscribe((properties) => {
      this.properties = properties;
    });

  }

  onDetails(propertyId: number) {
    console.log(propertyId);
    this.propertyService.getPropertyById(propertyId).subscribe((data) => {
      this.property = data;
      console.table(data);
    });

  }


  // Method to dynamically load JavaScript
  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/js/modernizr.min.js',
      '../../../../assets/js/jquery.min.js',
      '../../../../assets/js/moment.min.js',

      '../../../../assets/js/popper.min.js',
      '../../../../assets/js/bootstrap.min.js',

      '../../../../assets/js/detect.js',
      '../../../../assets/js/fastclick.js',
      '../../../../assets/js/jquery.blockUI.js',
      '../../../../assets/js/jquery.nicescroll.js',

      '../../../../assets/js/jquery.goToTop.js',
      '../../../../assets/js/jquery.lightBox.js',
      '../../../../assets/plugins/datatables/datatables.min.js',

      '../../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',
      '../../../../assets/plugins/counterup/jquery.counterup.min.js',

      '../../../../assets/data/data_datatables.js',
      '../../../../assets/js/jquery.dataTable.js',

      '../../../../assets/data/data_charts_dashboard.js',
      '../../../../assets/plugins/tinymce/jquery.tinymce.min.js',
      '../../../../assets/plugins/tinymce/tinymce.min.js',
      '../../../../assets/plugins/tinymce/init-tinymce.js',
      '../../../../assets/plugins/jquery.filer/js/jquery.filer.min.js',
      '../../../../assets/plugins/jquery.filer/js/temp.js',
      '../../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../../assets/js/jquery.sweetalert.js',
      '../../../../assets/plugins/owlcarousel/owl.carousel.min.js',
      '../../../../assets/js/jquery.owlcarousel.js',

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
      '../../../../assets/plugins/owlcarousel/slideimage.css'
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
