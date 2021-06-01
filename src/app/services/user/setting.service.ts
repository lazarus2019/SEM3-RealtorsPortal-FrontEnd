import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SettingModel } from "src/app/models/setting.model";

@Injectable()
export class SettingService {
    private BASE_URL: string = 'http://localhost:50625/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadSetting(){
        return this.httpClient.get(this.BASE_URL + 'getallsetting' )
        .toPromise()
        .then( res => res as SettingModel[] ) ;
    }
}