import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SellerProfileModel } from "src/app/models/sellerProfile.models";

@Injectable()
export class ProfileSellerService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadProfileSeller(){
        return this.httpClient.get(this.BASE_URL + 'loadprofileseller' )
        .toPromise()
        .then( res => res as SellerProfileModel[] ) ;
    }
}