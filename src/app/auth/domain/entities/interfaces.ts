export interface User {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    scopus_id?: string | null;
}
export interface Credentials {
    username: string;
    password: string;
}
