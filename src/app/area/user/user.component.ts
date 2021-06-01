import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailboxModel } from 'src/app/models/mailbox.model';
import { MailboxService } from 'src/app/services/user/mailbox.service';

@Component({
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  
  mailbox: MailboxModel;
  formContact : FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
    private mailboxService : MailboxService
  ) {
    this.loadScripts();
    this.loadStyle();
  }
  
  get Phone(){
    return this.formContact.get('phone')
  }

  ngOnInit(): void {

    this.formContact = this.formBuilder.group({
      fullName : '', 
      phone : ['', [Validators.required, Validators.pattern("^((\\+84-?)|0)?[0-9]{10}$")]] ,
      message : '' 
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

  // send Email
  send() {
    var mailbox: MailboxModel = this.formContact.value;
    
    this.mailboxService.addMailbox(mailbox).then(
      res => {
        if (res == true) {
          alert("Done");
        }
        else {
          alert("Failed");
        }

      },
      err => {
        console.log(err)
      }
    )
  }
}
