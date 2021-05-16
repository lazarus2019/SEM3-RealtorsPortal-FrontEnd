import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Member } from '../area/admin/shared/member.model';
import { MailRequest } from '../area/admin/shared/mailrequest.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private baseUrl = 'http://localhost:5000/api/member';
  
  constructor(private http: HttpClient) { }

  getAllMember(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl);
  }

  SendEmail(mailRequest: MailRequest): Observable<MailRequest> {
    return this.http.post<MailRequest>(this.baseUrl + '/sendEmail', mailRequest, httpOptions);
  }

}
