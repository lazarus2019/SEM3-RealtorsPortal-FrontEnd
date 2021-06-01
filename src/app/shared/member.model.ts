import { Role } from "./role.model";

export class Member {
    memberId: number;
    roleId: number;
    position: string;
    role: Role;
    username: string;
    fullName: string;
    email: string;
    status: boolean;
    photo: string;
    createDate: Date;
    roleName: string;
    password: string;
} 

