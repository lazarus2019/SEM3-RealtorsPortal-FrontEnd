import { Injectable } from '@angular/core';
import { Category } from '../shared/category.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:5000/api/category';

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }
}
