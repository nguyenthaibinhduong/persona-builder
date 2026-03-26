export interface CVData {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: string[];
  languages: { name: string; level: string }[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  duration: string;
  gpa?: string;
}

export interface ProjectItem {
  name: string;
  role: string;
  summary: string;
  techStack: string[];
  link?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export type CVTemplate = 'minimal' | 'modern' | 'executive';
