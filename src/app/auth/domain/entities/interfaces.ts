/**
 * Representa un usuario investigador en la aplicación.
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
 * Representa una empresa en la aplicación.
 */
export interface Company {
  id?: string | null;
  company_name: string;
  username: string;
  password: string;
  confirm_password?: string;
  industry?: string;
  description?: string;
  website?: string;
  phone?: string;
  address?: string;
  logo?: string;
  founded_year?: number;
  employee_count?: string;
}

/**
 * Tipos de usuario del sistema
 */
export type UserType = 'user' | 'company';

/**
 * Representa las credenciales de inicio de sesión.
 */
export interface LoginCredentials {
  username: string;
  password: string;
  userType?: UserType;
}

/**
 * Representa la información de actualización de un usuario investigador.
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

/**
 * Representa la información de actualización de una empresa.
 */
export interface CompanyUpdate {
  company_name: string;
  industry?: string;
  description?: string;
  website?: string;
  phone?: string;
  address?: string;
  logo?: string;
  founded_year?: number;
  employee_count?: string;
}

/**
 * Representa la respuesta de autenticación.
 */
export interface AuthResponse {
  access: string;
  refresh: string;
  user_id?: string;
  company_id?: string;
  user_type?: UserType;
}
