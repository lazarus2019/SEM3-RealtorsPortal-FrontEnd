import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SellerProfileModel } from "src/app/models/sellerProfile.models";
import { SettingModel } from "src/app/models/setting.model";

@Injectable()
export class AboutUsService {
    private BASE_URL: string = 'http://localhost:50625/api/user/' ;

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


}