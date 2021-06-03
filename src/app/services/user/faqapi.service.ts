import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FAQAPI } from "src/app/models/faqapi.model";

@Injectable()
export class FAQUserService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }
    getAllFAQ() {
        return this.httpClient.get(this.BASE_URL + "getAllFAQ")
            .toPromise()
            .then(res => res as FAQAPI[])
    }

}