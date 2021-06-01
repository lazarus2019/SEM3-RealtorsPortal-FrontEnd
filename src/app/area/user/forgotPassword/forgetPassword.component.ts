import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ForgotPassword } from 'src/app/shared/forgotPassword.model';

@Component({
  templateUrl: './forgetPassword.component.html'
})
export class ForgetPasswordComponent implements OnInit {

  

  constructor(private accountService: AccountService, private formBuilder: FormBuilder) {
    this.loadStyle();
  }

  forgotPassword: ForgotPassword;

  emailForm: FormGroup;


  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
    });
  }


  onSubmit() {
    this.forgotPassword = this.emailForm.value;
    this.forgotPassword.clientURI = "http://localhost:4200/resetPassword"; 
    this.accountService.forgotPassword(this.forgotPassword).subscribe();
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