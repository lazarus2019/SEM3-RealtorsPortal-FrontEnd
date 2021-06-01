export interface ForgotPassword {
    email: string;
    clientURI: string;
}

export interface ResetPassword {
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}