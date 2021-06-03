import { Injectable } from '@angular/core';
import { Category } from '../shared/category.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private BASE_URL = 'http://localhost:5000/api/category/';

  getAllCategory() {
    return this.http.get(this.BASE_URL + "GetAllCategory")
      .toPromise()
      .then(res => res as Category[]);
  }

  createCategory(Category: Category) {
    return this.http.post(this.BASE_URL + 'createCategory', Category)
      .toPromise()
      .then(res => res as number);
  }

  deleteCategory(CategoryId: number) {
    return this.http.delete(this.BASE_URL + 'deleteCategory/' + CategoryId)
      .toPromise()
      .then(res => res);
  }

  updateCategory(Category: Category) {
    return this.http.put(this.BASE_URL + 'updateCategory', Category)
      .toPromise()
      .then(res => res);
  }

  findCategory(CategoryId: number) {
    return this.http.get(this.BASE_URL + 'findCategory/' + CategoryId)
      .toPromise()
      .then(res => res as Category);
  }

}
