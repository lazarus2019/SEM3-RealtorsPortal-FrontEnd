import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/shared/login.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  loginRequest: LoginRequest;

  public errorMessage: string = '';

  public showError: boolean;

  constructor(private accountService: AccountService, private router: Router) {
    this.loadStyle();

  }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }


  public validateControl(controlName: string) {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
  }

  public hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onSubmit(loginFormValue) {
    const login = { ...loginFormValue };
    const loginRequest: LoginRequest = {
      username: login.username,
      password: login.password
    }
    this.accountService.login(loginRequest).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('role', res.role);
        var userRole = res.role.toString();
        if(userRole === 'SuperAdmin' || userRole === 'Admin'){
          this.router.navigateByUrl('/admin');
        } else if(userRole === "User"){
          this.router.navigateByUrl('/');
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        this.showError = true;
      });
  }

  loadStyle() {
    const dynamicStyles = [
      '../../../../assets/user/css/main.css',
      '../../../../assets/user/css/bootstrap.min.css',

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