import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../entities/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private mockCompany: Company = {
    id: 1,
    name: 'TechCorp Solutions',
    description: 'Somos una empresa líder en desarrollo de software y soluciones tecnológicas innovadoras. Con más de 10 años de experiencia en el mercado, nos especializamos en crear aplicaciones web y móviles de alta calidad para empresas de todos los tamaños. Nuestro equipo está compuesto por profesionales apasionados por la tecnología que trabajan constantemente para ofrecer soluciones que superen las expectativas de nuestros clientes.',
    industry: 'Tecnología y Software',
    location: 'Madrid, España',
    website: 'https://techcorp-solutions.com',
    email: 'contacto@techcorp-solutions.com',
    phone: '+34 91 123 45 67',
    logo: 'https://images.unsplash.com/photo-1562705121-e624542c7b9b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    coverImage: 'https://images.unsplash.com/photo-1573757056004-065ad36e2cf4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    founded: 2014,
    employeeCount: '50-100',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techcorp-solutions',
      twitter: 'https://twitter.com/techcorpsol',
      facebook: 'https://facebook.com/techcorpsolutions'
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2025-06-26')
  };

  constructor() { }

  getCompanyProfile(): Observable<Company> {
    return of(this.mockCompany);
  }

  updateCompanyProfile(company: Company): Observable<Company> {
    this.mockCompany = { ...this.mockCompany, ...company, updatedAt: new Date() };
    return of(this.mockCompany);
  }
}
