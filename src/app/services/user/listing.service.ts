import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CityModel } from "src/app/models/city.model";
import { PopularLocations } from "src/app/models/popularLocation.model";
import { PropertyModel } from "src/app/models/property.model";
import { RegionModel } from "src/app/models/region.model";


@Injectable()
export class ListingService {
    private BASE_URL: string = 'http://localhost:65320/api/user/' ;

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
    searchPropertyListing(
        keyword: string , 
        categoryId : number , 
        country : string, 
        city : string , 
        type : string , 
        area : number , 
        bed : number , 
        room : number , 
        price : number )  {

        return this.httpClient.get(this.BASE_URL + 'searchpropertylisting/' +  keyword + '/' + categoryId + '/' + country + '/' + city + '/' + type + '/' + area + '/' + bed + '/' + room +'/' + price)
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }
    propertyDetail(propertyId : number) {
        return this.httpClient.get(this.BASE_URL + 'propertydetail/'+ propertyId)
                        .toPromise()
                        .then( res => res as PropertyModel) ; 
    }
    loadcity(countryId :string) {
        return this.httpClient.get(this.BASE_URL + 'loadcity/' + countryId)
                        .toPromise()
                        .then( res => res as CityModel[]) ; 
    }
    loadallcity() {
        return this.httpClient.get(this.BASE_URL + 'loadallcity')
                        .toPromise()
                        .then( res => res as CityModel[]) ; 
    }
    
}