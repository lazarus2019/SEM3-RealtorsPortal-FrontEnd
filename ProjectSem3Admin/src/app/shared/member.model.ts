import { Role } from "./role.model";

export class Member {
    memberId: number;
    roleId: number;
    roleName: string;
    username: string;
    password: string;
    fullName: string;
    email: string;
    status: boolean;
    photo: string;
    createDate: Date;
}