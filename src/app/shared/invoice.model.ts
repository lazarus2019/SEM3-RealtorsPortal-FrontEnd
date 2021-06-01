import { AdsPackage } from "./adsPackage.model";
import { Member } from "./member.model";

export class Invoice {
    invoiceId: number;
    name: string;
    created: Date;
    total: number;
    paymentMethod: string;
    paymentCard: string;
    paymentCode: string;
    memberId: number;
    packageId: number;
    member : Member
    adsPackage : AdsPackage 
}