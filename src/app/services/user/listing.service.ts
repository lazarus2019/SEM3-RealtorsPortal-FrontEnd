import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CityModel } from "src/app/models/city.model";
import { ImageModel } from "src/app/models/image.model";
import { PropertyModel } from "src/app/models/property.model";
import { SettingModel } from "src/app/models/setting.model";


@Injectable()
export class ListingService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllListing(page : number) {
        return this.httpClient.get(this.BASE_URL + 'getalllisting/' + page )
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }

    getListingCount() {
        return this.httpClient.get(this.BASE_URL + 'getlistingcount' )
                        .toPromise()
                        .then( res => res as number ) ;
    }
    getGallery(propertyId : number) {
        return this.httpClient.get(this.BASE_URL + 'getGallery/'+ propertyId)
                        .toPromise()
                        .then( res => res as ImageModel[] ) ;
    }
    getSetting() {
        return this.httpClient.get(this.BASE_URL + 'getsetting' )
                        .toPromise()
                        .then( res => res as SettingModel ) ;
    }

    searchProperty(keyword: string , categoryId : number , countryId : number, page : number ) {
        return this.httpClient.get(this.BASE_URL + 'searchproperty/' +  keyword + '/' + categoryId + '/' + countryId + '/' + page)
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }
    searchPropertyCount(keyword: string , categoryId : number , countryId : number) {
        return this.httpClient.get(this.BASE_URL + 'searchpropertycount/' +  keyword + '/' + categoryId + '/' + countryId)
                        .toPromise()
                        .then( res => res as number ) ;
    }
    searchPropertyListing(
        
        keyword: string , 
        categoryId : number , 
        countryId : number, 
        city : number , 
        type : string , 
        area : number , 
        bed : number , 
        room : number , 
        price : number, 
        page : number )  {

        return this.httpClient.get(this.BASE_URL + 'searchpropertylisting/' +  keyword + '/' + categoryId + '/' + countryId + '/' + city + '/' + type + '/' + area + '/' + bed + '/' + room +'/' + price + '/' + page )
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }
    searchPropertyListingCount(
        keyword: string , 
        categoryId : number , 
        countryId : number, 
        city : number , 
        type : string , 
        area : number , 
        bed : number , 
        room : number , 
        price : number )  {

        return this.httpClient.get(this.BASE_URL + 'searchpropertylistingcount/' +  keyword + '/' + categoryId + '/' + countryId + '/' + city + '/' + type + '/' + area + '/' + bed + '/' + room +'/' + price)
                        .toPromise()
                        .then( res => res as number ) ;
    }
    propertyDetail(propertyId : number) {
        return this.httpClient.get(this.BASE_URL + 'propertydetail/'+ propertyId)
                        .toPromise()
                        .then( res => res as PropertyModel) ; 
    }
    loadcity(countryId :number) {
        return this.httpClient.get(this.BASE_URL + 'loadcity/' + countryId)
                        .toPromise()
                        .then( res =>res as CityModel[] ) ; 
    }
    loadallcity() {
        return this.httpClient.get(this.BASE_URL + 'loadallcity')
                        .toPromise()
                        .then( res => res as CityModel[]) ; 
    }
    
}