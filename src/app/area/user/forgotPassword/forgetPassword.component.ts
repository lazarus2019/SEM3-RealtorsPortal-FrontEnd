import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ForgotPassword } from 'src/app/shared/forgotPassword.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './forgetPassword.component.html'
})
export class ForgetPasswordComponent implements OnInit {



  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private route: Router) {
    this.loadStyle();
  }

  forgotPassword: ForgotPassword;

  emailForm: FormGroup;

  public errorMessage: string = '';

  public showSuccess: boolean;
  
  public showError: boolean;


  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.emailForm.controls[controlName].hasError(errorName)
  }

  public validateControl = (controlName: string) => {
    return this.emailForm.controls[controlName].invalid && this.emailForm.controls[controlName].touched
  }

  onSubmit() {
    this.forgotPassword = this.emailForm.value;
    this.forgotPassword.clientURI = "http://localhost:4200/resetPassword";
    this.accountService.forgotPassword(this.forgotPassword).subscribe(res => {
      this.showSuccess = true;
      this.errorMessage = "Please check your email to reset password.";
    }),
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        this.showError = true;
      };
  }

  loadStyle() {
    const dynamicStyles = [
      '../../../../assets/user/css/main.css',
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