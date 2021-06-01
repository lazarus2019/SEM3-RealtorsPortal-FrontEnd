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

  getAllMember(): Observable<number> {
    return this.http.get<number>(this.baseUrl);
  }

  getAllMemberPage(page: number): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + "/" + page);
  }

  search(fullName: string, position: string, status: string): Observable<number> {
    var url = `${this.baseUrl}/search/${fullName}/${position}/${status}`;
    return this.http.get<number>(url);
  }

  searchPage(fullName: string, position: string, status: string, page: number): Observable<Member[]> {
    var url = `${this.baseUrl}/search/${fullName}/${position}/${status}/${page}`;
    return this.http.get<Member[]>(url);
  }

  updateStatus(memberId: number, email: string, status: boolean): Observable<void> {
    var url = `${this.baseUrl}/updateStatus/${memberId}/${email}`;
    return this.http.put<void>(url, status, httpOptions);
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
