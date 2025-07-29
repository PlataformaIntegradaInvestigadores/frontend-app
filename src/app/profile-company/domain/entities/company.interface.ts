export interface Company {
  id: string;
  company_name: string;
  username: string;
  industry: string;
  industry_display?: string;
  description?: string;
  website?: string;
  phone?: string;
  address?: string;
  logo?: string;
  founded_year?: number;
  employee_count?: string;
  is_verified: boolean;
  date_joined: string;
}

export interface CompanyProfile extends Company {
  // Interfaz extendida para el perfil completo
}

export interface CompanyListItem {
  id: string;
  company_name: string;
  username: string;
  industry: string;
  industry_display: string;
  is_verified: boolean;
}

export interface CompanyUpdate {
  company_name?: string;
  industry?: string;
  description?: string;
  website?: string;
  phone?: string;
  address?: string;
  logo?: File | string;
  founded_year?: number;
  employee_count?: string;
}
