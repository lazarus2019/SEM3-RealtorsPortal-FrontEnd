import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewCategoryModel } from "src/app/models/newcategory.model";
import { NewsCategoryModel } from "src/app/models/newscategory.model";


@Injectable()
export class NewsUserService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadAllNews(page : number, numNewsPerPage : number) {
        return this.httpClient.get(this.BASE_URL + 'getallnews/' + page + '/'+ numNewsPerPage)
                        .toPromise()
                        .then( res => res as NewCategoryModel[] ) ;
    }

    loadAllNewsCount(){
        return this.httpClient.get(this.BASE_URL + 'getallnewscount' )
        .toPromise()
        .then( res => res as number ) ;
    }

    searchNewsResult(title: string , categoryId : number ) {
        return this.httpClient.get(this.BASE_URL + 'searchnewsresult/' +  title + '/' + categoryId)
                        .toPromise()
                        .then( res => res as number ) ;
    }

    searchAllNews(page: number ,title: string , categoryId : number ) {
        return this.httpClient.get(this.BASE_URL + 'searchnews/' + page + '/' +  title + '/' + categoryId)
                        .toPromise()
                        .then( res => res as NewCategoryModel[] ) ;
    }

    loadAllNewsCategory(){
        return this.httpClient.get(this.BASE_URL + 'getallnewscategory' )
        .toPromise()
        .then( res => res as NewsCategoryModel[] ) ;
    }

}