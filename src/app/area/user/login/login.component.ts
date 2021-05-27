import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formLogin = {
    username: '',
    password: ''
  }

  constructor(private accountService: AccountService, private router: Router) { 
    this.loadStyle();

  }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm) {
    this.accountService.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.resultToken);
        this.router.navigateByUrl('/');
      },
      err => {
        if (err.status == 400)
          console.log('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
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