export interface Company {
  id: number;
  name: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  logo: string;
  coverImage: string;
  founded: number;
  employeeCount: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
