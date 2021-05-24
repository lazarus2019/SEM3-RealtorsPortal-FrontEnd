import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class ShareFormService {
 
  public formData : FormGroup ;
  private data : []
 
  
  public get ValueFromChild() {
      return this.data;
  }
 
  public sendData(datas) {      
       this.data = datas; 
   }
}