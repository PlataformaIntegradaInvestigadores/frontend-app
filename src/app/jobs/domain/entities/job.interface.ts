export interface CompanyInfo {
  id: string;
  company_name: string;
  logo?: string;
  industry: string;
  website?: string;
  address?: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  benefits?: string;
  location?: string;
  job_type: string;
  job_type_display: string;
  experience_level: string;
  experience_display: string;
  salary_min?: number;
  salary_max?: number;
  status: string;
  status_display: string;
  is_remote: boolean;
  application_deadline?: string;
  created_at: string;
  updated_at: string;
  company: string; // ID de la empresa
  company_info: CompanyInfo;
  applications_count: number;
}

export interface JobCreate {
  title: string;
  description: string;
  requirements?: string;
  benefits?: string;
  location?: string;
  job_type: string;
  experience_level: string;
  salary_min?: number;
  salary_max?: number;
  status?: string;
  is_remote?: boolean;
  application_deadline?: string;
}

export interface JobFilter {
  q?: string; // búsqueda general
  location?: string;
  type?: string; // job_type
  experience?: string; // experience_level
  remote?: boolean;
}