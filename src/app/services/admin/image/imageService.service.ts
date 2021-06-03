import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewsImageAPI } from "src/app/models/newsImage/newsImage.model";

@Injectable()
export class ImageService {

    private BASE_URL = 'http://localhost:5000/api/image/';

    constructor(
        private http: HttpClient
    ) { }

    imageType = ['png', 'jpg', 'jpeg', 'gif'];
    status = "";
    validate(file: any) {
        let fileSplit = file.name.split('.');
        let extension = fileSplit[fileSplit.length - 1].toLowerCase();
         if (!this.imageType.includes(extension)) {
            this.status = "Image type must be PNG | JPG | JPEG | GIF";
            return this.status;
        }else if (file.size > 8000000) {
            this.status = "You can't upload file bigger than 8MB";
            return this.status;
        } 
        return null;
    }

    uploadImage(id: string, directName: string, data: FormData) {
        return this.http.post(`${this.BASE_URL}upload/${id}/${directName}`, data)
            .toPromise()
            .then(res => res);
    }

    deleteImage(id: number, name: string, directName: string) {
        return this.http.delete(`${this.BASE_URL}delete/${id}/${name}/${directName}`)
            .toPromise()
            .then(res => res);
    }

    uploadSingle(column: string, directName: string, data: FormData) {
        return this.http.post(`${this.BASE_URL}uploadSingle/${column}/${directName}`, data)
            .toPromise()
            .then(res => res);
    }

    deleteSingle(name:string, directName: string){
        return this.http.delete(`${this.BASE_URL}deleteSingle/${name}/${directName}`)
            .toPromise()
            .then(res => res);
    }

    deleteImageByPropertyId(id: number):Observable<number> {
        return this.http.delete<number>(`${this.BASE_URL}delete/${id}`);
    }

}