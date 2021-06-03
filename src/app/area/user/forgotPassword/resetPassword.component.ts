import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/shared/forgotPassword.model';
import { PasswordConfirmationValidatorService } from 'src/app/services/PasswordConfirmationValidatorService.service';

@Component({
  templateUrl: './resetPassword.component.html'
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  private token: string;
  private email: string;

  constructor(private accountService: AccountService, private router: Router, private activeRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private passConfValidator: PasswordConfirmationValidatorService) {
    this.loadStyle();

  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required])
    });

    // this.resetPasswordForm = new FormGroup({
    //   password: new FormControl('', [Validators.required]),
    //   confirm: new FormControl('')
    // });

    this.token = this.activeRoute.snapshot.queryParams['token'];
    this.email = this.activeRoute.snapshot.queryParams['email'];
  }

  onSubmit() {
    this.showError = this.showSuccess = false;

    const resetPassword: ResetPassword = {
      password: this.resetPasswordForm.get('newPassword').value,
      confirmPassword: this.resetPasswordForm.get('confirmNewPassword').value,
      token: this.token,
      email: this.email
    }
    this.accountService.resetPassword(resetPassword)
      .subscribe(() => {
        this.showSuccess = true;
        this.router.navigateByUrl('/login');
      },
        error => {
          this.showError = true;
          this.errorMessage = error.error;
        })
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