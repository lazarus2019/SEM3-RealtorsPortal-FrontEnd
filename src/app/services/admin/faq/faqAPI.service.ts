import { FAQAPI } from './../../../models/faq/faq.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class FAQAPIService {

    private BASE_URL = 'http://localhost:5000/api/admin/faq/';

    constructor(
        private http: HttpClient
    ) { }

    getAllFAQ() {
        return this.http.get(this.BASE_URL + "getAllFAQ")
            .toPromise()
            .then(res => res as FAQAPI[])
    }

    findFAQ(faqId: number) {
        return this.http.get(this.BASE_URL + "findFAQ/" + faqId)
            .toPromise()
            .then(res => res as FAQAPI);
    }

    createFAQ(faq: FAQAPI) {
        return this.http.post(this.BASE_URL + "createFAQ", faq)
            .toPromise()
            .then(res => res);
    }

    deleteFAQ(faqId: number) {
        return this.http.delete(this.BASE_URL + "deleteFAQ/" + faqId)
            .toPromise()
            .then(res => res);
    }

    updateFAQ(faq: FAQAPI){
        return this.http.put(this.BASE_URL + "updateFAQ", faq)
            .toPromise()
            .then(res => res);
    }
}