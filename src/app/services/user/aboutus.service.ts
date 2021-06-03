import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SellerProfileModel } from "src/app/models/sellerProfile.models";
import { SettingModel } from "src/app/models/setting.model";

@Injectable()
export class AboutUsService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }
    loadagentAU(){
        return this.httpClient.get(this.BASE_URL + 'loadagentAU' )
                        .toPromise()
                        .then( res => res as SellerProfileModel[] ) ;
    }

    loadsetting(){
        return this.httpClient.get(this.BASE_URL + 'loadsetting' )
                        .toPromise()
                        .then( res => res as SettingModel[] ) ;
    }

    loadRent(){
        return this.httpClient.get(this.BASE_URL + 'loadrentcount' )
                        .toPromise()
                        .then( res => res as number ) ;
    }

    loadSale(){
        return this.httpClient.get(this.BASE_URL + 'loadsalecount' )
                        .toPromise()
                        .then( res => res as number ) ;
    }


}