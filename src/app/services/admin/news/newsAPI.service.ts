import { NewsOrgAPI } from './../../../models/news/newsOrg.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewsAPI } from "../../../models/news/news.model";

@Injectable()
export class NewsAPIService {

    private BASE_URL = 'http://localhost:65320/api/admin/';

    constructor(
        private http: HttpClient
    ) { }

    // getAllNews(): Observable<NewsAPI[]> {
    //     // return this.httpClient.get<NewsAPI[]>(this.BASE_URL + "getAllNews");
    //     return this.http.get<NewsAPI[]>(this.BASE_URL + "getAllNews");
    // }

    findAllNews() {
        return this.http.get(this.BASE_URL + 'getAllNews')
            .toPromise()
            .then(res => res as NewsAPI[]);
    }

    deleteNews(news: NewsAPI) {
        return this.http.delete(this.BASE_URL + 'deleteNews/' + news.id)
            .toPromise()
            .then(res => res);
    }

    updateNews(news: NewsAPI) {
        return this.http.put(this.BASE_URL + 'updateNews', news)
            .toPromise()
            .then(res => res as NewsAPI);
    }

    createNews(news: NewsOrgAPI) {
        return this.http.post(this.BASE_URL + 'createNews', news)
            .toPromise()
            .then(res => res);
    }

    sortFilterNews(title: string, category: string, status: boolean) {
        return this.http.get(this.BASE_URL + 'sortFilterNews/' + title + '/' + category + '/' + status)
            .toPromise()
            .then(res => res as NewsAPI[]);
    }
}