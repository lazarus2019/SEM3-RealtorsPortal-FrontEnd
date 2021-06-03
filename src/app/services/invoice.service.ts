import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Invoice } from '../shared/invoice.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = 'http://localhost:5000/api/invoice/';
  
  constructor(private http: HttpClient) { }

  createInvoice(userId: string, invoice: Invoice): Observable<void> {
    const url = `${this.baseUrl}create/${userId}`;
    return this.http.post<void>(url, invoice, httpOptions);
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
  getAllInvoice(page : number) : Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl + 'getallinvoice/' + page) ; 
  }
  getAllInvoiceCount() : Observable<number> {
    return this.http.get<number>(this.baseUrl + 'getallinvoicecount') ; 
  }
  searchInvoice(keyword : string , page : number ) : Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl + 'searchinvoice/'+keyword+'/' + page) ; 
  }
  searchInvoiceCount(keyword : string) : Observable<number> {
    return this.http.get<number>(this.baseUrl + 'searchinvoicecount/' + keyword) ; 
  }
}
