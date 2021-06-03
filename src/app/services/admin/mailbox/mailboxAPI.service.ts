import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mailboxAPI } from 'src/app/models/mailbox/mailbox.model';

@Injectable()
export class MailBoxAPIService {

    private BASE_URL = 'http://localhost:5000/api/mailbox/';

    constructor(
        private http: HttpClient
    ) { }

    getMailboxByMemberId(memberId:number){
        return this.http.get(this.BASE_URL + "getMailboxByMemberId/" + memberId)
            .toPromise()
            .then(res => res as mailboxAPI[])
    }

    getMailboxAdmin(){
        return this.http.get(this.BASE_URL + "getMailboxAdmin")
            .toPromise()
            .then(res => res as mailboxAPI[])
    }

    filterMail(memberId:number, sortDate:string, status:string){
        return this.http.get(`${this.BASE_URL}filterMail/${memberId}/${sortDate}/${status}` )
            .toPromise()
            .then(res => res as mailboxAPI[])
    }

    filterMailAdmin(sortDate:string, status:string){
        return this.http.get(`${this.BASE_URL}filterMailAdmin/${sortDate}/${status}` )
            .toPromise()
            .then(res => res as mailboxAPI[])
    }

    getAmountMailboxUnread(memberId:number){
        return this.http.get(this.BASE_URL + "getAmountMailboxUnread/" + memberId)
            .toPromise()
            .then(res => res as number)
    }
    getAmountMailboxAdminUnread(){
        return this.http.get(this.BASE_URL + "getAmountMailboxAdminUnread")
            .toPromise()
            .then(res => res as number)
    }

    deleteMailbox(mailboxId: number){
        return this.http.delete(this.BASE_URL + "deleteMailbox/" + mailboxId)
            .toPromise()
            .then(res => res);
    }

    findMailbox(mailboxId: number){
        return this.http.get(this.BASE_URL + "findMailbox/"+ mailboxId)
            .toPromise()
            .then(res => res as mailboxAPI);
    }

    readMailbox(mailboxId: number){
        return this.http.put(this.BASE_URL + "readMailbox", mailboxId)
            .toPromise()
            .then(res => res);
    }
}