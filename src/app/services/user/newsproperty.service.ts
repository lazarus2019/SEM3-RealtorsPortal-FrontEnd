import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImageModel } from "src/app/models/image.model";
import { NewCategoryModel } from "src/app/models/newcategory.model";

@Injectable()
export class NewsPropertyService {
    private BASE_URL: string = 'http://localhost:50625/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadPropertyId(newpropertiesID : number){
        return this.httpClient.get(this.BASE_URL + 'newpropertyID/' + newpropertiesID )
                    .toPromise()
                    .then(res => res as NewCategoryModel);
    }

    getGalleryNews(newsId: number) {
        return this.httpClient.get(this.BASE_URL + "getGallery/" + newsId)
            .toPromise()
            .then(res => res as ImageModel[])
    }
}