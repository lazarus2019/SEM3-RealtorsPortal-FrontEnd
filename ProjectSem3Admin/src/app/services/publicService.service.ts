import { Injectable } from "@angular/core";

@Injectable()
export class PublicService {

    private BASE_URL = 'http://localhost:5000/images/';

    getUrlImage(folderName: string, imageName: string) {
        return `${this.BASE_URL}${folderName}/${imageName}`;
    }

}