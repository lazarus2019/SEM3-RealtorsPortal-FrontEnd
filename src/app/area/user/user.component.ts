import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryComponent } from 'src/app/area/user/category/category.component';
import { CategoryModel } from 'src/app/models/category.model';
import { MailboxModel } from 'src/app/models/mailbox.model';
import { SettingModel } from 'src/app/models/setting.model';
import { UserService } from 'src/app/services/user.service';
import { MailboxUserService } from 'src/app/services/user/mailbox.service';

declare var alertFunction : any 
@Component({
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  categories: CategoryModel[];
  setting: SettingModel;
  formContact: FormGroup

  constructor(
    private router : Router,

    private userService: UserService,
    private formBuilder: FormBuilder,
    private mailboxService: MailboxUserService
  ) {

  }

  ngOnInit(): void {

    this.loadScripts();
    this.loadStyle();
    this.loadData();
    
  }

  get Email(){
    return this.formContact.get('email')
    }
  get Phone(){
    return this.formContact.get('phone')
    }
  loadData() {

    this.userService.getSetting().then(
      res => {
        this.setting = res
      },
      err => {
        console.log(err)
      }
    )

    this.formContact = this.formBuilder.group({
      fullName: '',
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: ['', [Validators.required, Validators.pattern("^((\\+84-?)|0)?[0-9]{10}$")]],
      message: ''
    })
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
      '../../../assets/user/js/jquery.sweetalert.js',
      '../../../assets/user/js/sweetalert.min.js'

    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.body.appendChild(node);
    }
  }
  send() {
    var mailbox: MailboxModel = this.formContact.value;
    mailbox.time = new Date();
    mailbox.isRead = false
    this.mailboxService.addMailbox(mailbox).then(
      res => {
        if (res == true) {
          alertFunction.success("We will contact you soon !") ; 
        }
        else {
          alertFunction.error("Maybe something wrong .Please try again !") ; 
        }

      },
      err => {
        console.log(err)
      }
    )

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
      '../../../assets/user/css/sweetalert.css',

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