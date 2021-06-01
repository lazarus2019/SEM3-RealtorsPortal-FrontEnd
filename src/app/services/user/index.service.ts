import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PopularLocations } from "src/app/models/popularLocation.model";
import { PropertyModel } from "src/app/models/property.model";


@Injectable()
export class HomeService {
    private BASE_URL: string = 'http://localhost:50625/api/user/' ;

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
    
}