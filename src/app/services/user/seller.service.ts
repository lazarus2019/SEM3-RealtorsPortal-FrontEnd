import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PopularLocations } from "src/app/models/popularLocation.model";
import { PropertyModel } from "src/app/models/property.model";
import { SellerProfileModel } from "src/app/models/sellerProfile.models";


@Injectable()
export class SellerService {
    private BASE_URL: string = 'http://localhost:50625/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadseller(){
        return this.httpClient.get(this.BASE_URL + 'loadseller' )
                        .toPromise()
                        .then( res => res as SellerProfileModel[] ) ;
    }

    loadagent(){
        return this.httpClient.get(this.BASE_URL + 'loadagent' )
                        .toPromise()
                        .then( res => res as SellerProfileModel[] ) ;
    }

}
