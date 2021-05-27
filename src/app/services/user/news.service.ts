import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewCategoryModel } from "src/app/models/newcategory.model";


@Injectable()
export class NewsService {
    private BASE_URL: string = 'http://localhost:50625/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadnewproperty() {
        return this.httpClient.get(this.BASE_URL + 'loadnews' )
                        .toPromise()
                        .then( res => res as NewCategoryModel[] ) ;
    }

}