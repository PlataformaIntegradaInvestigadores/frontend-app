// Interfaz para los datos del perfil del usuario recibidos de la API
export interface UserProfile {
  first_name: string;
  last_name: string;
  scopus_id?: string;
  institution?: string;
  website?: string;
  investigation_camp?: string;
  profile_picture?: string;
  email_institution?: string;
}

// Interfaz para los datos del usuario utilizados en los componentes
export interface User extends UserProfile {
  id?: string | null;
  isOwnProfile?: boolean;
}

// Interfaz para la información adicional del usuario
export interface UserInfo {
  about_me?: string;
  disciplines?: string[];
  contact_info?: ContactInfo[];
}

// Interfaz para la información de contacto del usuario
export interface ContactInfo {
  type: string;
  value: string;
}

// Interfaz para los datos de Scopus
export interface ScopusData {
  citations: number;
  articles: number;
}
