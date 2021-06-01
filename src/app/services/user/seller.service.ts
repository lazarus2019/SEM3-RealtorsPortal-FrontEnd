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

    getSellertId(){
        return this.httpClient.get(this.BASE_URL + 'getsellerId' )
                        .toPromise()
                        .then( res => res as number ) ;
    }
    getAllSeller(page : number){
        return this.httpClient.get(this.BASE_URL + 'getallseller/' + page )
                        .toPromise()
                        .then( res => res as SellerProfileModel[] ) ;
    }

    getAgentId(){
        return this.httpClient.get(this.BASE_URL + 'getagentId' )
                        .toPromise()
                        .then( res => res as number ) ;
    }
    getAllAgent(page : number){
        return this.httpClient.get(this.BASE_URL + 'getallagent/' + page )
                        .toPromise()
                        .then( res => res as SellerProfileModel[] ) ;
    }

}
