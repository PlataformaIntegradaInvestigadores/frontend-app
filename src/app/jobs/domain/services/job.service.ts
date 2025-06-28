import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job } from '../entities/job.interface';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private mockJobs: Job[] = [
    {
      id: 1,
      title: 'Desarrollador Frontend Angular',
      company: 'TechCorp Solutions',
      location: 'Madrid, España',
      type: 'Full-time',
      salary: '€45,000 - €60,000',
      description: 'Buscamos un desarrollador Frontend especializado en Angular para unirse a nuestro equipo de desarrollo. Trabajarás en proyectos innovadores utilizando las últimas tecnologías.',
      requirements: [
        'Experiencia mínima de 3 años con Angular',
        'Conocimiento de TypeScript',
        'Experiencia con HTML5, CSS3 y JavaScript',
        'Conocimiento de Git',
        'Experiencia con metodologías ágiles'
      ],
      benefits: [
        'Seguro médico privado',
        'Formación continua',
        'Trabajo remoto híbrido',
        'Bonus por objetivos'
      ],
      postedDate: new Date('2025-06-20'),
      applicationDeadline: new Date('2025-07-20'),
      contactEmail: 'hr@techcorp.com',
      remote: true
    },
    {
      id: 2,
      title: 'Desarrollador Full Stack',
      company: 'StartupHub',
      location: 'Barcelona, España',
      type: 'Full-time',
      salary: '€50,000 - €70,000',
      description: 'Únete a nuestra startup en crecimiento como desarrollador Full Stack. Trabajarás tanto en el frontend como en el backend de nuestras aplicaciones web.',
      requirements: [
        'Experiencia con Node.js y Express',
        'Conocimiento de React o Angular',
        'Experiencia con bases de datos SQL y NoSQL',
        'Conocimiento de Docker',
        'Experiencia con APIs RESTful'
      ],
      benefits: [
        'Equity en la empresa',
        'Horarios flexibles',
        'Oficina moderna',
        'Café y snacks gratis'
      ],
      postedDate: new Date('2025-06-18'),
      applicationDeadline: new Date('2025-07-15'),
      contactEmail: 'jobs@startuphub.com',
      remote: false
    },
    {
      id: 3,
      title: 'Desarrollador Backend Python',
      company: 'DataTech Industries',
      location: 'Valencia, España',
      type: 'Contract',
      salary: '€400 - €500/día',
      description: 'Proyecto de 6 meses para desarrollo de APIs y microservicios usando Python y Django. Excelente oportunidad para trabajar con big data.',
      requirements: [
        'Experiencia sólida con Python y Django',
        'Conocimiento de PostgreSQL',
        'Experiencia con Docker y Kubernetes',
        'Conocimiento de AWS o Azure',
        'Experiencia con APIs GraphQL'
      ],
      benefits: [
        'Proyecto interesante',
        'Posibilidad de extensión',
        'Trabajo 100% remoto',
        'Tarifa competitiva'
      ],
      postedDate: new Date('2025-06-15'),
      applicationDeadline: new Date('2025-07-10'),
      contactEmail: 'contracts@datatech.com',
      remote: true
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'CreativeSpace',
      location: 'Sevilla, España',
      type: 'Part-time',
      salary: '€25,000 - €35,000',
      description: 'Buscamos un diseñador UI/UX creativo para trabajar en proyectos de diseño de interfaces y experiencias de usuario para aplicaciones web y móviles.',
      requirements: [
        'Portfolio sólido de diseño UI/UX',
        'Experiencia con Figma y Adobe Creative Suite',
        'Conocimiento de principios de diseño',
        'Experiencia en prototipado',
        'Conocimiento básico de HTML/CSS'
      ],
      benefits: [
        'Horarios flexibles',
        'Proyectos creativos',
        'Equipo joven y dinámico',
        'Formación en nuevas herramientas'
      ],
      postedDate: new Date('2025-06-22'),
      applicationDeadline: new Date('2025-07-25'),
      contactEmail: 'design@creativespace.com',
      remote: true
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudFirst Solutions',
      location: 'Bilbao, España',
      type: 'Full-time',
      salary: '€55,000 - €75,000',
      description: 'Únete a nuestro equipo de DevOps para implementar y mantener infraestructura cloud escalable. Trabajarás con las últimas tecnologías de containerización y orquestación.',
      requirements: [
        'Experiencia con AWS, Azure o GCP',
        'Conocimiento de Docker y Kubernetes',
        'Experiencia con Terraform o similar',
        'Conocimiento de CI/CD pipelines',
        'Experiencia con monitoreo y logging'
      ],
      benefits: [
        'Certificaciones pagadas',
        'Trabajo remoto',
        'Tecnologías de vanguardia',
        'Plan de carrera definido'
      ],
      postedDate: new Date('2025-06-19'),
      applicationDeadline: new Date('2025-07-18'),
      contactEmail: 'devops@cloudfirst.com',
      remote: true
    }
  ];

  constructor() { }

  getAllJobs(): Observable<Job[]> {
    return of(this.mockJobs);
  }

  getJobById(id: number): Observable<Job | undefined> {
    const job = this.mockJobs.find(j => j.id === id);
    return of(job);
  }
}
