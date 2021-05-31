import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryModel } from "../models/category.model";
import { PropertyModel } from "../models/property.model";
import { SettingModel } from "../models/setting.model";


@Injectable()
export class UserService {
    private BASE_URL: string = 'http://localhost:65320/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllCategory() {
        return this.httpClient.get(this.BASE_URL + 'loadcategories')
                        .toPromise()
                        .then( res => res as CategoryModel[] ) ;
    }
    getSetting() {
        return this.httpClient.get(this.BASE_URL + 'getsetting' )
                        .toPromise()
                        .then( res => res as SettingModel ) ;
    }
    
}