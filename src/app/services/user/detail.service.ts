import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PropertyModel } from "src/app/models/property.model";
import { SellerProfileModel } from "src/app/models/sellerProfile.models";

@Injectable()
export class DetailService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadSellerId(memberId : number){
        return this.httpClient.get(this.BASE_URL + 'sellerID/' + memberId )
                    .toPromise()
                    .then(res => res as SellerProfileModel);
    }

    loadPropertyId(memberId : number){
        return this.httpClient.get(this.BASE_URL + 'propertyID/' + memberId )
                    .toPromise()
                    .then(res => res as PropertyModel[]);
    }

}