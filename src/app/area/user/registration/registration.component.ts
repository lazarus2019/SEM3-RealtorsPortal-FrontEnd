import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Registration } from 'src/app/shared/registration.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PasswordConfirmationValidatorService } from 'src/app/services/PasswordConfirmationValidatorService.service';

@Component({
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  constructor(public accountService: AccountService,
    private router: Router,
    private _route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _passConfValidator: PasswordConfirmationValidatorService) {
    this.loadStyle();


  }
  showValidationErrors: boolean;
  registrationForm: FormGroup;
  registration: Registration;
  public errorMessage: string = '';
  public showError: boolean;
  position: string;
  agent: string;

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      position: new FormControl('option', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required])
    });

    this.registrationForm.get('confirm').setValidators([Validators.required,
    this._passConfValidator.validateConfirmPassword(this.registrationForm.get('password'))]);

  }


  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName)
  }

  public validateControl = (controlName: string) => {
    return this.registrationForm.controls[controlName].invalid && this.registrationForm.controls[controlName].touched
  }


  onSubmit() {
    this.showError = false;
    this.registration = this.registrationForm.value;
    //var position = document.getElementById(#agent).nodeValue;
    //var position =  (<HTMLInputElement>document.getElementById('position')).textContent  as any as string
    //console.log(position);
    //this.registration.position = position;
    this.registration.clientURI = 'http://localhost:4200/confirmEmail';
    this.accountService.register(this.registration).subscribe(() => {
      this.router.navigateByUrl('/successRegistration', { state: this.registration });
    },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        this.showError = true;
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