import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryModel } from "src/app/models/category.model";
import { PropertyModel } from "src/app/models/property.model";


@Injectable()
export class CategoryService {
    private BASE_URL: string = 'http://localhost:65320/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    propertybycategorycount(categoryId: number) {
        return this.httpClient.get(this.BASE_URL + 'propertybycategorycount/' +  categoryId)
                        .toPromise()
                        .then( res => res as  number) ;
    }
    propertybycategory(categoryId: number , page : number ) {
        return this.httpClient.get(this.BASE_URL + 'propertybycategory/' +  categoryId + '/' +page)
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }
    
}