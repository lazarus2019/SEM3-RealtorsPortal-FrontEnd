import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Property } from '../shared/property.model';
import { Image } from '../shared/image.model';

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

  getAllProperty(): Observable<number> {
    return this.http.get<number>(this.baseUrl);
  }

  getAllPropertyPage(page: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl + "/getallpage/" + page);
  }

  getPropertyById(propertyId: number): Observable<Property> {
    const url = `${this.baseUrl}/${propertyId}`;
    return this.http.get<Property>(url);
  }

  search(title: string, partners: string, categoryId: string, status: string): Observable<number> {
    var url = `${this.baseUrl}/search/${title}/${partners}/${categoryId}/${status}`; 
    return this.http.get<number>(url);
  }

  searchPage(title: string, partners: string, categoryId: string, status: string, page: number): Observable<Property[]> {
    var url = `${this.baseUrl}/search/${title}/${partners}/${categoryId}/${status}/${page}`; 
    return this.http.get<Property[]>(url);
  }

  updateStatus(property: Property): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/updateStatus/' + property.propertyId, property.statusId, httpOptions).pipe(

      retry(1),
 
      catchError(this.handleError)
 
    );
    
  }

  updateProperty(property: Property): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/update', property, httpOptions);
  }

  deleteProperty(propertyId: number): Observable<void> {
    const url = `${this.baseUrl}/${propertyId}`;
    return this.http.delete<void>(url);
  }

  createProperty(property: Property, userId: string): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/create/' + userId, property, httpOptions);
  }

  getGallery(propertyId: number): Observable<Image[]> {
    const url = `${this.baseUrl}/getGallery/${propertyId}`;
    return this.http.get<Image[]>(url);
  }

  checkToAddProperty(userId: string): Observable<boolean> {
    const url = `${this.baseUrl}/checktoaddnew/${userId}`;
    return this.http.get<boolean>(url);
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
