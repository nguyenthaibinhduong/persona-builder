import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-heading text-lg font-semibold text-foreground">
              Folio<span className="text-accent">.</span>
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              Portfolio & CV Builder for IT Professionals
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Folio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
