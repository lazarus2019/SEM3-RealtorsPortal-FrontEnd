import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoginResults, LoginRequest } from '../shared/login.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MailRequest } from '../shared/mailrequest.model';
import { ForgotPassword, ResetPassword } from '../shared/forgotPassword.model';
import { Registration } from '../shared/registration.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private baseUrl = 'http://localhost:5000/api/account';

    constructor(private fb: FormBuilder, private http: HttpClient) { }
    
    SendEmail(mailRequest: MailRequest): Observable<MailRequest> {
        return this.http.post<MailRequest>(this.baseUrl + '/sendEmail', mailRequest, httpOptions);
    }

    register(registration: Registration) {
        return this.http.post<void>(this.baseUrl + '/register', registration, httpOptions);
    }

    login(loginRequest: LoginRequest) {
        return this.http.post(this.baseUrl + '/login', loginRequest, httpOptions);
    }

    forgotPassword(forgotPassword: ForgotPassword): Observable<void> {
        const url = `${this.baseUrl}/forgotpassword`;
        return this.http.post<void>(url, forgotPassword, httpOptions);
    }

    public confirmEmail(token: string, email: string): Observable<void> {
        const url = `${this.baseUrl}/emailconfirmation?email=${email}&token=${token}`;
        return this.http.get<void>(url);
    };


    public resetPassword(resetPassword: ResetPassword) {
        const url = `${this.baseUrl}/resetpassword`;
        return this.http.post(url, resetPassword);
    }

    resendEmailConfirm(registration: Registration){
        return this.http.post<void>(this.baseUrl + '/resendemailconfirm', registration, httpOptions);
    }

    roleMatch(allowedRoles): boolean {
        var isMatch = false;
        //var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        //var userRole = payLoad.role;
        var userRole = localStorage.getItem('role');
        allowedRoles.forEach(element => {
            if (userRole == element) {
                isMatch = true;
                return false;
            }
            return true;

        });
        return isMatch;
    }
}