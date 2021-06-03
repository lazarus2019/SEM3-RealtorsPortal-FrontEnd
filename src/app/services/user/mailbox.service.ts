import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MailboxModel } from "src/app/models/mailbox.model";

@Injectable()
export class MailboxUserService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    addMailbox(mailbox : MailboxModel) {
        return this.httpClient.post(this.BASE_URL + 'addmailbox' , mailbox)
                        .toPromise()
                        .then( res => res) ;
    }
}