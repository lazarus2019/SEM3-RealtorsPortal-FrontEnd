import { ImageModel } from "./image.model";

export class PropertyModel {
    propertyId: number ; 
    title :string ;
    cityId : number ;
    cityName : string ;
    address : string ;
    googleMap : string ;  
    price : number ;
    bedNumber : number ; 
    roomNumber : number ; 
    area : number ; 
    type : string ;
    soldDate : Date = new Date() ; 
    uploadDate: Date = new Date() ;
    buildYear : Date = new Date() ;
    statusId : number ;
    statusName : string ;
    categoryId : number ;
    categoryName : string ;
    memberId : number ; 
    memberName : string ; 
    memberType : string ;
    memberEmail : string ;
    memberPhone : string ;
    description : string ;
    images : ImageModel[]

}