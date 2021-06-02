import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private accountService: AccountService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') != null) {
      let roles = next.data['permittedRoles'] as Array<string>;
      if (roles) {
        if (this.accountService.roleMatch(roles)) {
          return true;
        }
        else {
          this.router.navigate(['/']);
          return false;
        }
      }
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}