import { Injectable } from "@angular/core";

@Injectable()
export class ImageService {
    imageType = ['png', 'jpg', 'jpeg', 'gif'];
    status = "";
    validate(file: any) {
        let fileSplit = file.name.split('.');
        let extension = fileSplit[fileSplit.length - 1].toLowerCase();
        if (file.size > 8000000) {
            this.status = "You can't upload file bigger than 8MB";
            return this.status;
        }else if(!this.imageType.includes(extension)){
            this.status = "Image type must be PNG | JPG | JPEG | GIF";
            return this.status;
        }
        return null;
    }
}