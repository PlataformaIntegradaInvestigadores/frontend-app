/**
 * Representa un usuario en la aplicación.
 */
export interface User {
    id?: string | null;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    scopus_id?: string | null;
}

/**
 * Representa las credenciales de inicio de sesión.
 */
export interface Credentials {
    username: string;
    password: string;
}

/**
 * Representa la información de actualización de un usuario.
 */
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
