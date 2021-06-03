import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration } from 'src/app/shared/registration.model';
declare var alertFunction: any;

@Component({
  templateUrl: './successRegistration.component.html'
})
export class SuccessRegistrationComponent implements OnInit {

  constructor(public accountService: AccountService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.loadStyle();
  }

  registration: Registration;
  
  public errorMessage: string = '';

  public showSuccess: boolean;

  ngOnInit(): void {
    this.registration = history.state;
    console.table(this.registration);
  }

  onSubmit() {
    this.accountService.resendEmailConfirm(this.registration).subscribe(() => {
      this.showSuccess = true;
      this.errorMessage = "Please check email again."
    });
  }

  loadScripts() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../../../assets/plugins/select2/css/select2.min.css',
      '../../../../assets/plugins/select2/css/select2.min.js',
      '../../../../assets/js/global.js',
      '../../../../assets/user/css/material-design-iconic-font.min.css',
      '../../../../assets/js/jquery.min.js',

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
      '../../../../assets/user/css/main.css',
      '../../../../assets/user/css/bootstrap.min.css',
      '../../../../assets/plugins/select2/css/select2.min.css',
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