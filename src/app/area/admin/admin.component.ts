import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberAPI } from 'src/app/models/member/member.model';
import { MailBoxAPIService } from 'src/app/services/admin/mailbox/mailboxAPI.service';
import { MemberAPIService } from 'src/app/services/member/memberAPI.service';
import { PropertyService } from 'src/app/services/property.service';
import { PublicService } from 'src/app/services/publicService.service';

// Declare custom function
declare var alertFunction: any;

@Component({
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  unReadMailBox: number = 0;

  currentMember: MemberAPI = new MemberAPI;

  resultMemberAPI: MemberAPI[] = [];

  userRole: string = "SuperAdmin";

  count: number = 2;

  constructor(
    private router: Router,
    // Declare services
    private propertyService: PropertyService,
    private mailboxAPIService: MailBoxAPIService,
    private memberAPIService: MemberAPIService,
    private publicService: PublicService,
  ) {
    this.loadScripts();
    this.loadStyle();
  }

  ngOnInit() {
    // this.findMember();
    this.findUser();
    this.propertyService.countPropertyPending().subscribe(count => {
      this.count = count;
    })
    this.getAmountMailboxUnread();
    this.userRole = localStorage.getItem('role');
  }

  // findMember() {
  //   this.memberAPIService.findMember(1).then(
  //     res => {
  //       this.resultMemberAPI = res;
  //       this.currentMember = this.resultMemberAPI[0];
  //     },
  //     err => {
  //       alertFunction.error("Cant not get your profile!");
  //     }
  //   )
  // }

  findUser() {
    var userId = localStorage.getItem('userId');

    this.memberAPIService.findUser(userId).then(
      res => {
        this.resultMemberAPI = res;
        this.currentMember = this.resultMemberAPI[0];
      },
      err => {
        alertFunction.error("Cant not get your profile!");
      }
    )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getAmountMailboxUnread() {
    this.mailboxAPIService.getAmountMailboxUnread(1).then(
      res => {
        this.unReadMailBox = res;
      },
      err => {
        alertFunction.error("Can not get mailbox!");
      }
    )
  }

  getUrlImage(imageName: string) {
    return this.publicService.getUrlImage("member", imageName);
  }
  authenticated() {
    if (localStorage.getItem('token') != null)
      return true;
    return false;
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
      '../../../assets/js/jquery.goToTop.js',
      '../../../assets/js/jquery.lightBox.js',

      '../../../assets/plugins/waypoints/lib/jquery.waypoints.min.js',
      '../../../assets/plugins/counterup/jquery.counterup.min.js',

      '../../../assets/plugins/tinymce/tinymce.min.js',
      '../../../assets/plugins/tinymce/jquery.tinymce.min.js',
      '../../../assets/plugins/tinymce/init-tinymce.js',
      '../../../assets/plugins/sweetalert/sweetalert.min.js',
      '../../../assets/js/jquery.sweetalert.js',

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
      '../../../assets/plugins/sweetalert/sweetalert.css',
      '../../../assets/plugins/datetimepicker/css/daterangepicker.css'
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
