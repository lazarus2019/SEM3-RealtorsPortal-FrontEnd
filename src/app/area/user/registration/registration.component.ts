import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration } from 'src/app/shared/registration.model';

@Component({
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  constructor(public accountService: AccountService, private router: Router, private _route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.loadStyle();
  }

  registrationForm: FormGroup;
  registration: Registration;
  public errorMessage: string = '';
  public showError: boolean;

  ngOnInit(): void {
    //this.registrationForm.reset;
    this.registrationForm = this.formBuilder.group({
      role: new FormControl('op', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.registration = this.registrationForm.value;
    this.registration.clientURI = 'http://localhost:4200/confirmEmail';
    console.log(this.registration.clientURI);
    console.log("email: " + this.registration.email);
    this.accountService.register(this.registration).subscribe(() => {
      this.router.navigateByUrl('/login');
    },
      error => {
        this.errorMessage = error;
        this.showError = true;
      })
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