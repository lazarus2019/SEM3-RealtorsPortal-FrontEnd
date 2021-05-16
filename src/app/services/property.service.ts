import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Property } from '../area/admin/shared/property.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl = 'http://localhost:5000/api/property';


  constructor(private http: HttpClient) { }

  getAllProperty(): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl);
  }

  getPropertyById(propertyId: number): Observable<Property> {
    const url = `${this.baseUrl}/${propertyId}`;
    return this.http.get<Property>(url);

  }

  updateStatus(property: Property): Observable<Property> {
    return this.http.put<Property>(this.baseUrl + '/updateStatus', property, httpOptions);
    
  }

  deleteProperty(propertyId: number): Observable<number> {
    const url = `${this.baseUrl}/${propertyId}`;
    return this.http.delete<number>(url);
  }

  
  addNewProperty(property: Property): Observable<Property> {
    //const url = `${this.baseUrl}/${property.propertyId}`;
    return this.http.post<Property>(this.baseUrl, property, httpOptions);
    
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
