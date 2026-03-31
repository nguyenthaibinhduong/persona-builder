import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/cv-builder', label: t('nav.cv_builder') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container-wide flex items-center justify-between h-16">
        <Link to="/" className="font-heading text-xl font-semibold text-foreground tracking-tight">
          Folio<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 ${isActive(link.to)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {link.label}
              {isActive(link.to) && (
                <motion.div layoutId="nav-underline" className="h-0.5 bg-accent mt-0.5 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'EN' : 'VI'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container-wide py-4 flex flex-col gap-3">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 ${isActive(link.to) ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <button onClick={() => setLang(lang === 'en' ? 'vi' : 'en')} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" /> {lang === 'en' ? 'English' : 'Tiếng Việt'}
                </button>
                <button onClick={toggleTheme} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  {theme === 'light' ? t('common.dark_mode') : t('common.light_mode')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
