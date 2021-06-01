import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../shared/invoice.model';
import { ReportModel } from '../shared/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:5000/api/report/';

  getReport() : Observable<ReportModel> {
    return this.http.get<ReportModel>(this.baseUrl + 'getReport') ;
  }
  getPayment() : Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl + 'getpayment') ;  
  }
  //searchDate
  getReportByDate(fromDate :string , toDate :string) : Observable<ReportModel> {
    return this.http.get<ReportModel>(this.baseUrl + 'searchReportByDate/' + fromDate + '/' + toDate  ) ;
  }
  getPaymentByDate(fromDate :string , toDate :string) : Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl + 'searchPaymentByDate/' + fromDate + '/' + toDate ) ;  
  }
  //searchDuration
  getReportByDuration(duration : string) : Observable<ReportModel> {
    return this.http.get<ReportModel>(this.baseUrl + 'searchReportByDuration/' + duration) ;
  }
  getPaymentByDuration(duration : string) : Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl + 'searchPaymentByDuration/' + duration) ;  
  }

}