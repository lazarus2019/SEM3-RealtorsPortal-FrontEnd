import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { AdsPackage } from '../area/admin/shared/adsPackage.model';

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
    return this.http.get<AdsPackage[]>(this.baseUrl);
  }

}
