import { Role } from "./role.model";

export class Member {
    memberId: number;
    roleId: number;
    role: Role;
    username: string;
    password: string;
    fullName: string;
    email: string;
    status: boolean;
    photo: string;
    createDate: Date;
}