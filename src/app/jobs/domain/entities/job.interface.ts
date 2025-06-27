export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string; // Full-time, Part-time, Contract, etc.
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: Date;
  applicationDeadline: Date;
  contactEmail: string;
  remote: boolean;
}