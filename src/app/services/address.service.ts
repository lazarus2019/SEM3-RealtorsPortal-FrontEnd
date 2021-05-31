import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Region } from "../shared/region.model";
import { Country } from "../shared/country.model";
import { City } from "../shared/city.model";

@Injectable()
export class AddressService {

    private baseUrl = 'http://localhost:5000/api/address';

    constructor(private http: HttpClient) { }

    getAllRegion(): Observable<Region[]> {
        return this.http.get<Region[]>(this.baseUrl + "/getregion");
    }

    getAllCountry(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + "/getcountry");
    }

    getAllCity(): Observable<City[]> {
        return this.http.get<City[]>(this.baseUrl + "/getcity");
    }
}