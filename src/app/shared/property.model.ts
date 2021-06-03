import { Category } from "./category.model";
import { Image } from "./image.model";
import { Member } from "./member.model";
import { Status } from "./status.model";

export class Property {
    propertyId: number;
    title: string;
    cityId: number;
    cityName: string;
    cityCountryId: number;
    cityCountryName: string;
    cityCountryRegionId: number;
    cityCountryRegionName: string;
    address: string;
    price: number;
    bedNumber: number;
    roomNumber: number;
    area: number;
    soldDate: Date;
    uploadDate: Date;
    statusId: number;
    statusName: string;
    categoryId: number;
    categoryName: string;
    memberId: number;
    memberFullName: string
    description: string;
    type: string;
    imageName: Image;
    images: Image[];
    category:Category;
    status:Status;
    member:Member;
}