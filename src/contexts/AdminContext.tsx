import React, { createContext, useContext, useState, useCallback } from 'react';
import { PortfolioProject } from '@/types';
import { sampleProjects } from '@/data/sampleData';

export interface PortfolioSection {
  id: string;
  key: string;
  title: string;
  titleVi: string;
  visible: boolean;
  order: number;
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
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<PortfolioSection[]>(() => {
    const saved = localStorage.getItem('admin_sections');
    return saved ? JSON.parse(saved) : defaultSections;
  });

  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('admin_projects');
    return saved ? JSON.parse(saved) : sampleProjects;
  });

  const persist = useCallback((key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const toggleSectionVisibility = useCallback((id: string) => {
    setSections(prev => {
      const next = prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s);
      persist('admin_sections', next);
      return next;
    });
  }, [persist]);

  const reorderSections = useCallback((activeId: string, overId: string) => {
    setSections(prev => {
      const oldIndex = prev.findIndex(s => s.id === activeId);
      const newIndex = prev.findIndex(s => s.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      const reordered = next.map((s, i) => ({ ...s, order: i }));
      persist('admin_sections', reordered);
      return reordered;
    });
  }, [persist]);

  const addProject = useCallback((project: PortfolioProject) => {
    setProjects(prev => {
      const next = [...prev, project];
      persist('admin_projects', next);
      return next;
    });
  }, [persist]);

  const updateProject = useCallback((project: PortfolioProject) => {
    setProjects(prev => {
      const next = prev.map(p => p.id === project.id ? project : p);
      persist('admin_projects', next);
      return next;
    });
  }, [persist]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => {
      const next = prev.filter(p => p.id !== id);
      persist('admin_projects', next);
      return next;
    });
  }, [persist]);

  return (
    <AdminContext.Provider value={{
      sections, setSections, toggleSectionVisibility, reorderSections,
      projects, setProjects, addProject, updateProject, deleteProject,
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
