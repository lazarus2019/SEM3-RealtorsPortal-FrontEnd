import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryModel } from "src/app/models/category.model";
import { PropertyModel } from "src/app/models/property.model";


@Injectable()
export class CategoryService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    propertybycategory(categoryId: number) {
        return this.httpClient.get(this.BASE_URL + 'propertybycategory/' +  categoryId)
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }
    
}