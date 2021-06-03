import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SettingModel } from "src/app/shared/setting.model";

@Injectable()
export class SettingUserService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadSetting(){
        return this.httpClient.get(this.BASE_URL + 'getallsetting' )
        .toPromise()
        .then( res => res as SettingModel[] ) ;
    }
}