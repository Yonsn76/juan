export interface Project {
  id: string;
  title: string;
  category: 'personalizacion' | 'restauracion' | 'rendimiento';
  categoryLabel: string;
  description: string;
  fullDescription?: string;
  image: string;
  specs?: string[];
  beforeImages?: string[];
  afterImages?: string[];
  completionDate?: string;
  client?: string;
  duration?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  projects: Project[];
}

export interface PortfolioData {
  [key: string]: ProjectCategory;
}
