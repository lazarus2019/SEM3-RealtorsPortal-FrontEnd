import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryModel } from "src/app/models/category.model";
import { CountryModel } from "src/app/models/country.model";
import { MailboxModel } from "src/app/models/maibox.model";
import { PopularLocations } from "src/app/models/popularLocation.model";
import { PropertyModel } from "src/app/models/property.model";


@Injectable()
export class MailboxService {
    private BASE_URL: string = 'http://localhost:65320/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    addMailbox(mailbox : MailboxModel) {
        return this.httpClient.post(this.BASE_URL + 'addmailbox' , mailbox)
                        .toPromise()
                        .then( res => res) ;
    }
}