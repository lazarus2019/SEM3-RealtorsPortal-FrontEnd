import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SettingAPI } from "src/app/models/setting/setting.model";

@Injectable()
export class SettingAPIService {

    private BASE_URL = 'http://localhost:5000/api/admin/setting/';

    constructor(
        private http: HttpClient
    ) { }

    getSetting() {
        return this.http.get(this.BASE_URL + "getSetting")
            .toPromise()
            .then(res => res as SettingAPI)
    }

    getMaxNewsImage() {
        return this.http.get(this.BASE_URL + "getMaxNewsImage")
            .toPromise()
            .then(res => res as number);
    }

    updateWebsiteSetting(setting: SettingAPI) {
        return this.http.put(this.BASE_URL + "updateWebsiteSetting", setting)
            .toPromise()
            .then(res => res);
    }

    updateAdminSetting(setting: SettingAPI) {
        return this.http.put(this.BASE_URL + "updateAdminSetting", setting)
            .toPromise()
            .then(res => res);
    }

    updateUserSetting(setting: SettingAPI) {
        return this.http.put(this.BASE_URL + "updateUserSetting", setting)
            .toPromise()
            .then(res => res);
    }
}