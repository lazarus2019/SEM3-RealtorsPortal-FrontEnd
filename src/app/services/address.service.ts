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

    getAllCountry(countryId: number): Observable<Country[]> {
        return this.http.get<Country[]>(this.baseUrl + "/getcountry/" + countryId);
    }

    getAllCity(cityId: number): Observable<City[]> {
        return this.http.get<City[]>(this.baseUrl + "/getcity/" + cityId);
    }
}