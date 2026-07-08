import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface PortfolioProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  summary: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tech_stack: string[];
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  featured: boolean;
}

export interface PortfolioService {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  delivery_days: number;
  features: string[];
  status: string;
  payment_link: string | null;
}

interface UsePortfolioDataReturn {
  profile: PortfolioProfile | null;
  projects: PortfolioProject[];
  services: PortfolioService[];
  loading: boolean;
  error: string | null;
}

export function usePortfolioData(): UsePortfolioDataReturn {
  const [profile, setProfile] = useState<PortfolioProfile | null>(null);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [services, setServices] = useState<PortfolioService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [settingsRes, projectsRes, servicesRes] = await Promise.all([
          supabase.from('settings').select('key, value'),
          supabase.from('projects').select('id, title, category, description, tech_stack, image_url, demo_url, github_url, featured').order('featured', { ascending: false }),
          supabase.from('services').select('id, title, description, price, currency, delivery_days, features, status, payment_link').eq('status', 'active'),
        ]);

        if (cancelled) return;

        // Parse settings → profile
        if (settingsRes.data && settingsRes.data.length > 0) {
          const map: Record<string, string> = {};
          settingsRes.data.forEach((row) => { map[row.key] = row.value; });
          setProfile({
            name: map['profile_name'] ?? '',
            title: map['profile_title'] ?? '',
            email: map['profile_email'] ?? '',
            phone: map['profile_phone'] ?? '',
            location: map['profile_location'] ?? '',
            github: map['profile_github'] ?? '',
            summary: map['profile_summary'] ?? '',
          });
        }

        // Projects — only set if Supabase has data (fallback handled by consumer)
        if (projectsRes.data && projectsRes.data.length > 0) {
          setProjects(projectsRes.data as PortfolioProject[]);
        }

        // Services — only set if Supabase has data
        if (servicesRes.data && servicesRes.data.length > 0) {
          setServices(servicesRes.data as PortfolioService[]);
        }
      } catch (err) {
        if (!cancelled) setError(String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { profile, projects, services, loading, error };
}
