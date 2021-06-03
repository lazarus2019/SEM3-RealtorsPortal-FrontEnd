import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImageModel } from "src/app/models/image.model";
import { NewCategoryModel } from "src/app/models/newcategory.model";
import { PropertyModel } from "src/app/models/property.model";

@Injectable()
export class NewsPropertyService {
    private BASE_URL: string = 'http://localhost:5000/api/user/' ;

    constructor(
        private httpClient: HttpClient
    ) { }

    loadPropertyId(newpropertiesID : number){
        return this.httpClient.get(this.BASE_URL + 'getallnewsid/' + newpropertiesID )
                    .toPromise()
                    .then(res => res as NewCategoryModel);
    }

    getAllProperty(propertyId : number){
        return this.httpClient.get(this.BASE_URL + 'getallpropertys/' + propertyId )
                        .toPromise()
                        .then( res => res as PropertyModel[] ) ;
    }

    getGalleryNews(newsId: number) {
        return this.httpClient.get(this.BASE_URL + "getNewsGallery/" + newsId)
            .toPromise()
            .then(res => res as ImageModel[])
    }


}