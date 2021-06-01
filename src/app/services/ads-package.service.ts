import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { AdsPackage } from '../shared/adsPackage.model';
import { retry, catchError } from 'rxjs/operators';
import { AdsPackageDetail } from '../shared/adsPackageDetail.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AdsPackageService {

  private baseUrl = 'http://localhost:5000/api/adspackage';

  constructor(private http: HttpClient) { }

  getAllAdsPackage(): Observable<number> {
    return this.http.get<number>(this.baseUrl + '/getall');
  }

  getAllAdsPackagePage(page: number): Observable<AdsPackage[]> {
    return this.http.get<AdsPackage[]>(this.baseUrl + '/getall/' + page);
  }

  getAllAdsPackageForSalePage(): Observable<number> {
    return this.http.get<number>(this.baseUrl + '/getallforsalepage');
  }

  getAllAdsPackageForSalePagePerPage(page: number): Observable<AdsPackage[]> {
    return this.http.get<AdsPackage[]>(this.baseUrl + '/getallforsalepage/' + page);
  }

  getMaxPrice(): Observable<number> {
    return this.http.get<number>(this.baseUrl + '/getmaxprice');
  }
  
  getAdsPackageById(adsPackageId: number): Observable<AdsPackage> {
    const url = `${this.baseUrl}/${adsPackageId}`;
    return this.http.get<AdsPackage>(url);
  }
  
  checkExpiryDate(userId: string): Observable<boolean> {
    const url = `${this.baseUrl}/checkexpiry/${userId}`;
    return this.http.get<boolean>(url);
  }

  deleteAdsPackage(adsPackageId: number): Observable<number> {
    const url = `${this.baseUrl}/${adsPackageId}`;
    return this.http.delete<number>(url);
  }

  updateStatus(adsPackage: AdsPackage): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/updateStatus/' + adsPackage.packageId, adsPackage.statusBuy, httpOptions);
  }

  updateAdsPackage(adsPackage: AdsPackage): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/update', adsPackage, httpOptions);
  }
  
  createAdsPackage(adsPackage: AdsPackage): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/create', adsPackage, httpOptions);
  }
  
  createAdsPackageDetail(adsPackageDetail: AdsPackageDetail, userId: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/createadsdetail/' + userId, adsPackageDetail, httpOptions);
  }

  search(name: string,status: string, price: string): Observable<number> {
    var url = `${this.baseUrl}/search/${name}/${status}/${price}`; 
    return this.http.get<number>(url);
  }

  searchPage(name: string,status: string, price: string, page: number): Observable<AdsPackage[]> {
    var url = `${this.baseUrl}/search/${name}/${status}/${price}/${page}`; 
    return this.http.get<AdsPackage[]>(url);
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
