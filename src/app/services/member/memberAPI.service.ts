import { ResetPassword } from 'src/app/shared/forgotPassword.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemberAPI } from "src/app/models/member/member.model";
import { Registration } from 'src/app/shared/registration.model';
import { LoginRequest } from 'src/app/shared/login.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable()
export class MemberAPIService {

    private BASE_URL = 'http://localhost:5000/api/member/';
    private BASE_URL_ACCOUNT = 'http://localhost:5000/api/account/';

    constructor(
        private http: HttpClient
    ) { }

    // getAllNews(): Observable<NewsAPI[]> {
    //     // return this.httpClient.get<NewsAPI[]>(this.BASE_URL + "getAllNews");
    //     return this.http.get<NewsAPI[]>(this.BASE_URL + "getAllNews");
    // }

    updateMember(member: MemberAPI) {
        return this.http.put(this.BASE_URL + "updateMember", member)
            .toPromise()
            .then(res => res);
    }

    findMember(memberId: number) {
        return this.http.get(this.BASE_URL + "findMember/" + memberId)
            .toPromise()
            .then(res => res as MemberAPI[]);
    }

    findUser(userId: string) {
        return this.http.get(this.BASE_URL + "findUser/" + userId)
            .toPromise()
            .then(res => res as MemberAPI[]);
    }

    updatePassword(resetPassword: ResetPassword) {
        return this.http.post(this.BASE_URL_ACCOUNT + "updatePassword", resetPassword)
            .toPromise()
            .then(res => res);
    }

    changeEmailPassword(memberId: number, password: string) {
        return this.http.put(this.BASE_URL + "changeEmailPassword/" + memberId, password)
            .toPromise()
            .then(res => res);
    }
    
    checkPasswordDB(loginRequest: LoginRequest) {
        return this.http.post(this.BASE_URL_ACCOUNT + 'CheckPasswordDB', loginRequest, httpOptions)
            .toPromise()
            .then(res => res);
    }
}