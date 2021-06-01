import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NewsCategoryAPI } from 'src/app/models/newsCategory/newsCategory.model';

@Injectable()
export class NewsCategoryAPIService {

    private BASE_URL = 'http://localhost:5000/api/admin/newsCategory/';

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

    createNewsCategory(newsCategory: NewsCategoryAPI){
        return this.http.post(this.BASE_URL + 'createNewsCategory', newsCategory)
        .toPromise()
        .then(res => res as number);
    }

    deleteNewsCategory(newsCategoryId: number) {
        return this.http.delete(this.BASE_URL + 'deleteNewsCategory/' + newsCategoryId)
            .toPromise()
            .then(res => res);
    }

    updateNewsCategory(newsCategory: NewsCategoryAPI) {
        return this.http.put(this.BASE_URL + 'updateNewsCategory', newsCategory)
            .toPromise()
            .then(res => res);
    }

    findNewsCategory(newsCategoryId: number) {
        return this.http.get(this.BASE_URL + 'findNewsCategory/' + newsCategoryId)
            .toPromise()
            .then(res => res as NewsCategoryAPI);
    }

}