export interface ForgotPassword {
    email: string;
    clientURI: string;
}

export class ResetPassword {
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}