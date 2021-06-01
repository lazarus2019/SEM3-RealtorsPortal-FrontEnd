import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PropertyModel } from "src/app/models/property.model";


@Injectable()
export class ListingService {
    private BASE_URL: string = 'http://localhost:50625/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllListing() {
        return this.httpClient.get(this.BASE_URL + 'getalllisting' )
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }
    searchProperty(keyword: string , categoryId : number , country : string) {
        return this.httpClient.get(this.BASE_URL + 'searchproperty/' +  keyword + '/' + categoryId + '/' + country)
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }
    propertyDetail(propertyId : number) {
        return this.httpClient.get(this.BASE_URL + 'propertydetail/'+ propertyId)
                        .toPromise()
                        .then( res => res as PropertyModel) ; 
    }
    
}