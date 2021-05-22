import { NewsOrgAPI } from './../../../models/news/newsOrg.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewsAPI } from "../../../models/news/news.model";
import { NewsImageAPI } from 'src/app/models/newsImage/newsImage.model';

@Injectable()
export class NewsAPIService {

    private BASE_URL = 'http://localhost:65320/api/admin/news/';

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
        return this.http.delete(this.BASE_URL + 'deleteNews/' + news.newsId)
            .toPromise()
            .then(res => res);
    }

    updateNews(news: NewsOrgAPI) {
        return this.http.put(this.BASE_URL + 'updateNews', news)
            .toPromise()
            .then(res => res as NewsOrgAPI);
    }

    createNews(news: NewsOrgAPI) {
        console.table(news);
        return this.http.post(this.BASE_URL + 'createNews', news)
            .toPromise()
            .then(res => res);
    }

    sortFilterNews(title: string, category: string, status: string) {
        return this.http.get(this.BASE_URL + 'sortFilterNews/' + title + '/' + category + '/' + status)
            .toPromise()
            .then(res => res as NewsAPI[]);
    }

    findNews(newsId: number) {
        return this.http.get(this.BASE_URL + 'findNews/' + newsId)
            .toPromise()
            .then(res => res as NewsAPI);
    }

    getGalleryNews(newsId: number) {
        return this.http.get(this.BASE_URL + "getGallery/" + newsId)
            .toPromise()
            .then(res => res as NewsImageAPI[])
    }

}