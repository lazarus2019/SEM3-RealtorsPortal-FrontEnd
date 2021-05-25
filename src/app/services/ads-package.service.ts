import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { AdsPackage } from '../shared/adsPackage.model';

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

  getAllAdsPackage(): Observable<AdsPackage[]> {
    return this.http.get<AdsPackage[]>(this.baseUrl + '/getall');
  }

  getAllAdsPackageForSalePage(): Observable<AdsPackage[]> {
    return this.http.get<AdsPackage[]>(this.baseUrl + '/getallforsalepage');
  }

  getMaxPrice(): Observable<number> {
    return this.http.get<number>(this.baseUrl + '/getmaxprice');
  }
  
  getAdsPackageById(adsPackageId: number): Observable<AdsPackage> {
    const url = `${this.baseUrl}/${adsPackageId}`;
    return this.http.get<AdsPackage>(url);
  }

  deleteAdsPackage(adsPackageId: number): Observable<number> {
    const url = `${this.baseUrl}/${adsPackageId}`;
    return this.http.delete<number>(url);
  }

  updateStatus(adsPackage: AdsPackage): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/updateStatus/' + adsPackage.packageId, adsPackage.statusBuy, httpOptions);
    
  }

}
