import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  templateUrl: './confirmEmail.component.html'
})
export class ConfirmEmailComponent implements OnInit {
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;

  constructor(private accountService: AccountService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.confirmEmail();
  }
  confirmEmail() {
    this.showError = this.showSuccess = false;

    const token = this.activeRoute.snapshot.queryParams['token'];
    const email = this.activeRoute.snapshot.queryParams['email'];

    console.log(token);

    this.accountService.confirmEmail(token, email).subscribe(() => {
      this.showSuccess = true;
    },
    (error: HttpErrorResponse) => {
      this.errorMessage = error.error;
      this.showError = true;
    });
  }

}