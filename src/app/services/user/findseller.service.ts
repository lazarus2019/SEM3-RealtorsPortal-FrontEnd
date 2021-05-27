import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class FindSellerService {
    private BASE_URL: string = 'http://localhost:50625/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    find(keyword: string){
        return this.httpClient.get(this.BASE_URL + 'find/' + keyword, { responseType: 'text' })
                    .toPromise()
                    .then(res => res);
    }
}