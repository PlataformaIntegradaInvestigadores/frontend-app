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

export interface UserUpdate {
    first_name: string;
    last_name: string;
    scopus_id?: string;
    institution?: string;
    website?: string;
    investigation_camp?: string;
    profile_picture?: string;
    email_institution?: string;
}
