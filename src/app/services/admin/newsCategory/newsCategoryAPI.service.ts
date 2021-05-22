import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';

@Injectable()
export class NewsCategoryAPIService {

    private BASE_URL = 'http://localhost:65320/api/admin/news/';

    constructor(
        private http: HttpClient
    ) { }

    // getAllNews(): Observable<NewsAPI[]> {
    //     // return this.httpClient.get<NewsAPI[]>(this.BASE_URL + "getAllNews");
    //     return this.http.get<NewsAPI[]>(this.BASE_URL + "getAllNews");
    // }

    findAllNewsCategory() {
        return this.http.get(this.BASE_URL + 'getAllNewsCategory')
            .toPromise()
            .then(res => res as NewsCategoryAPI[]);
    }

}