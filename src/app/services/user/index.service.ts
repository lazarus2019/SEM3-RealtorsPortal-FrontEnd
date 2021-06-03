import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryModel } from "src/app/models/category.model";
import { CountryModel } from "src/app/models/country.model";
import { PopularLocations } from "src/app/models/popularLocation.model";
import { PropertyModel } from "src/app/models/property.model";


@Injectable()
export class IndexService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadtopproperty() {
        return this.httpClient.get(this.BASE_URL + 'loadtopproperty' )
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }

    loadpopularlocation() {
        return this.httpClient.get(this.BASE_URL + 'loadpopularlocation' )
        .toPromise()
        .then( res => res as PopularLocations[] ) ;
    }

    loadcountries() {
        return this.httpClient.get(this.BASE_URL + 'loadcountries' )
        .toPromise()
        .then( res => res as CountryModel[] ) ;
    }
    loadcategories() {
        return this.httpClient.get(this.BASE_URL + 'loadcategories' )
        .toPromise()
        .then( res => res as CategoryModel[] ) ;
    }
    
    
}