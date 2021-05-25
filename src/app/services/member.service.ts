import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Member } from '../shared/member.model';
import { retry, catchError } from 'rxjs/operators';
import { MailRequest } from '../shared/mailrequest.model';

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


  search(fullName: string, roleId: string, status: string): Observable<Member[]> {
    var url = `${this.baseUrl}/search/${fullName}/${roleId}/${status}`; 
    return this.http.get<Member[]>(url);
  }

  updateStatus(memberId: number, status: boolean): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/updateStatus/' + memberId , status, httpOptions).pipe(

      retry(1),
 
      catchError(this.handleError)
 
    );
  }

  SendEmail(mailRequest: MailRequest): Observable<MailRequest> {
    return this.http.post<MailRequest>(this.baseUrl + '/sendEmail', mailRequest, httpOptions);
  }

  handleError(error) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {

      // client-side error

      errorMessage = `Error: ${error.error.message}`;
      console.log(errorMessage);

    } else {

      // server-side error

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(errorMessage);

    }

    window.alert(errorMessage);

    return throwError(errorMessage);

  }

}
