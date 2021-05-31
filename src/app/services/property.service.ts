import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PropertyModel } from "../models/property.model";


@Injectable()
export class PropertyService {
    private BASE_URL: string = 'http://localhost:65320/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    getPopularPost(memberId : number) {
        return this.httpClient.get(this.BASE_URL + 'getpopularpost/' + memberId )
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }
    
}