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

/**
 * Opciones de industria para empresas
 */
export const INDUSTRY_OPTIONS = [
  { value: 'technology', label: 'Tecnología' },
  { value: 'health', label: 'Salud' },
  { value: 'sales', label: 'Ventas' },
  { value: 'finance', label: 'Finanzas' },
  { value: 'education', label: 'Educación' },
  { value: 'manufacturing', label: 'Manufactura' },
  { value: 'retail', label: 'Comercio' },
  { value: 'consulting', label: 'Consultoría' },
  { value: 'energy', label: 'Energía' },
  { value: 'telecommunications', label: 'Telecomunicaciones' },
  { value: 'automotive', label: 'Automotriz' },
  { value: 'food', label: 'Alimentaria' },
  { value: 'real_estate', label: 'Bienes Raíces' },
  { value: 'media', label: 'Medios de Comunicación' },
  { value: 'transportation', label: 'Transporte' },
  { value: 'other', label: 'Otro' }
];

/**
 * Opciones de tamaño de empleados
 */
export const EMPLOYEE_COUNT_OPTIONS = [
  { value: '1-10', label: '1-10 empleados' },
  { value: '11-50', label: '11-50 empleados' },
  { value: '51-200', label: '51-200 empleados' },
  { value: '201-500', label: '201-500 empleados' },
  { value: '501-1000', label: '501-1000 empleados' },
  { value: '1000+', label: 'Más de 1000 empleados' }
];
