import { CountryModel } from "./country.model"

export class RegionModel{
    regionId : string 
    name : string 
    country : CountryModel[];
}