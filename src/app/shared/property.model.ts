import { Image } from "./image.model";

export class Property {
    propertyId: number;
    title: string;
    cityId: number;
    cityName: string;
    cityRegionId: number;
    cityRegionName: string;
    cityRegionCountryId: number;
    cityRegionCountryName: string;
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
    image: Image;
}
