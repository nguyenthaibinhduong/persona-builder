import React, { createContext, useContext, useState, useCallback } from 'react';
import { PortfolioProject } from '@/types';
import { sampleProjects, skillCategories as defaultSkillCats, testimonials as defaultTestimonials, experiences as defaultExperiences } from '@/data/sampleData';

export interface PortfolioSection {
  id: string;
  key: string;
  title: string;
  titleVi: string;
  visible: boolean;
  order: number;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; level: number }[];
}

export interface TestimonialEntry {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

const defaultSections: PortfolioSection[] = [
  { id: 's1', key: 'hero', title: 'Hero / Banner', titleVi: 'Hero / Banner', visible: true, order: 0 },
  { id: 's2', key: 'about', title: 'About', titleVi: 'Giới thiệu', visible: true, order: 1 },
  { id: 's3', key: 'skills', title: 'Skills', titleVi: 'Kỹ năng', visible: true, order: 2 },
  { id: 's4', key: 'services', title: 'Services', titleVi: 'Dịch vụ', visible: true, order: 3 },
  { id: 's5', key: 'projects', title: 'Projects', titleVi: 'Dự án', visible: true, order: 4 },
  { id: 's6', key: 'experience', title: 'Experience', titleVi: 'Kinh nghiệm', visible: true, order: 5 },
  { id: 's7', key: 'testimonials', title: 'Testimonials', titleVi: 'Đánh giá', visible: true, order: 6 },
  { id: 's8', key: 'contact', title: 'Contact', titleVi: 'Liên hệ', visible: true, order: 7 },
];

const seedExperiences: ExperienceEntry[] = defaultExperiences.map((e, i) => ({
  id: `exp-${i}`, company: e.company, role: e.role, duration: e.duration, description: e.description, achievements: e.achievements,
}));

const seedSkillCategories: SkillCategory[] = defaultSkillCats.map((c, i) => ({
  id: `sk-${i}`, name: c.name, skills: c.skills,
}));

const seedTestimonials: TestimonialEntry[] = defaultTestimonials.map((t, i) => ({
  id: `tm-${i}`, name: t.name, role: t.role, company: t.company, text: t.text, avatar: t.avatar,
}));

interface AdminContextType {
  sections: PortfolioSection[];
  setSections: React.Dispatch<React.SetStateAction<PortfolioSection[]>>;
  toggleSectionVisibility: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  projects: PortfolioProject[];
  setProjects: React.Dispatch<React.SetStateAction<PortfolioProject[]>>;
  addProject: (project: PortfolioProject) => void;
  updateProject: (project: PortfolioProject) => void;
  deleteProject: (id: string) => void;
  experiences: ExperienceEntry[];
  addExperience: (e: ExperienceEntry) => void;
  updateExperience: (e: ExperienceEntry) => void;
  deleteExperience: (id: string) => void;
  skillCategories: SkillCategory[];
  addSkillCategory: (c: SkillCategory) => void;
  updateSkillCategory: (c: SkillCategory) => void;
  deleteSkillCategory: (id: string) => void;
  testimonials: TestimonialEntry[];
  addTestimonial: (t: TestimonialEntry) => void;
  updateTestimonial: (t: TestimonialEntry) => void;
  deleteTestimonial: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

function usePersisted<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  });
  const persist = useCallback((data: T) => localStorage.setItem(key, JSON.stringify(data)), [key]);
  return [state, setState, persist] as const;
}

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections, persistSections] = usePersisted<PortfolioSection[]>('admin_sections', defaultSections);
  const [projects, setProjects, persistProjects] = usePersisted<PortfolioProject[]>('admin_projects', sampleProjects);
  const [experiences, setExperiences, persistExp] = usePersisted<ExperienceEntry[]>('admin_experiences', seedExperiences);
  const [skillCategories, setSkillCategories, persistSkills] = usePersisted<SkillCategory[]>('admin_skills', seedSkillCategories);
  const [testimonials, setTestimonials, persistTest] = usePersisted<TestimonialEntry[]>('admin_testimonials', seedTestimonials);

  const toggleSectionVisibility = useCallback((id: string) => {
    setSections(prev => { const next = prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s); persistSections(next); return next; });
  }, [persistSections]);

  const reorderSections = useCallback((activeId: string, overId: string) => {
    setSections(prev => {
      const oi = prev.findIndex(s => s.id === activeId), ni = prev.findIndex(s => s.id === overId);
      if (oi === -1 || ni === -1) return prev;
      const next = [...prev]; const [m] = next.splice(oi, 1); next.splice(ni, 0, m);
      const reordered = next.map((s, i) => ({ ...s, order: i })); persistSections(reordered); return reordered;
    });
  }, [persistSections]);

  const crud = <T extends { id: string }>(setter: React.Dispatch<React.SetStateAction<T[]>>, persist: (d: T[]) => void) => ({
    add: (item: T) => setter(p => { const n = [...p, item]; persist(n); return n; }),
    update: (item: T) => setter(p => { const n = p.map(x => x.id === item.id ? item : x); persist(n); return n; }),
    del: (id: string) => setter(p => { const n = p.filter(x => x.id !== id); persist(n); return n; }),
  });

  const projCrud = crud(setProjects, persistProjects);
  const expCrud = crud(setExperiences, persistExp);
  const skillCrud = crud(setSkillCategories, persistSkills);
  const testCrud = crud(setTestimonials, persistTest);

  return (
    <AdminContext.Provider value={{
      sections, setSections, toggleSectionVisibility, reorderSections,
      projects, setProjects, addProject: projCrud.add, updateProject: projCrud.update, deleteProject: projCrud.del,
      experiences, addExperience: expCrud.add, updateExperience: expCrud.update, deleteExperience: expCrud.del,
      skillCategories, addSkillCategory: skillCrud.add, updateSkillCategory: skillCrud.update, deleteSkillCategory: skillCrud.del,
      testimonials, addTestimonial: testCrud.add, updateTestimonial: testCrud.update, deleteTestimonial: testCrud.del,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};
