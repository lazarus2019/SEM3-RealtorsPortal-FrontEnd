import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryModel } from "../models/category.model";
import { PropertyModel } from "../models/property.model";


@Injectable()
export class UserService {
    private BASE_URL: string = 'http://localhost:65320/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllCategory() {
        return this.httpClient.get(this.BASE_URL + 'getallcategory' )
                        .toPromise()
                        .then( res => res as CategoryModel[] ) ;
    }
    
}