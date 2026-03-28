import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAdmin } from '@/contexts/AdminContext';
import { services } from '@/data/sampleData';
import { ArrowRight, ExternalLink, Github, Mail, MapPin, Calendar, Award, Users, Briefcase, Star, Globe, Smartphone, Palette, Layout, BarChart3, Settings } from 'lucide-react';
import { useState, useMemo, ReactNode } from 'react';

const iconMap: Record<string, any> = { Globe, Smartphone, Palette, Layout, BarChart3, Settings };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Portfolio = () => {
  const { t } = useLanguage();
  const { sections, projects, experiences, skillCategories, testimonials } = useAdmin();
  const [filter, setFilter] = useState('All');

  const visibleSections = useMemo(() =>
    sections.filter(s => s.visible).sort((a, b) => a.order - b.order).map(s => s.key),
    [sections]
  );

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const stats = [
    { icon: Briefcase, value: '50+', label: 'Projects' },
    { icon: Calendar, value: '8+', label: 'Years' },
    { icon: Users, value: '30+', label: 'Clients' },
    { icon: Star, value: '98%', label: 'Satisfaction' },
  ];

  const sectionMap: Record<string, ReactNode> = {
    hero: (
      <section key="hero" className="pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <p className="text-accent font-medium text-sm mb-3 tracking-wide uppercase">{t('portfolio.hero.greeting')}</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.1] mb-4">
                {t('portfolio.hero.name')}
              </h1>
              <p className="font-heading text-xl md:text-2xl text-muted-foreground mb-4 italic">
                {t('portfolio.hero.title')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {t('portfolio.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                  {t('portfolio.hero.cta')} <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors">
                  {t('portfolio.hero.contact')}
                </a>
              </div>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 border border-border flex items-center justify-center">
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                  <span className="font-heading text-6xl md:text-7xl font-bold text-accent/60">AN</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    ),

    about: (
      <section key="about" className="section-padding">
        <div className="container-narrow">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">{t('portfolio.about.title')}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t('portfolio.about.text')}</p>
          </motion.div>
        </div>
      </section>
    ),

    skills: (
      <section key="skills" className="section-padding bg-card border-y border-border">
        <div className="container-wide">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">{t('portfolio.skills.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, ci) => (
              <motion.div key={cat.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={ci} className="p-6 rounded-lg border border-border bg-background">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">{cat.name}</h3>
                <div className="space-y-3">
                  {cat.skills.map((skill, si) => (
                    <div key={si}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: si * 0.1 }}
                          className="h-full bg-accent rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    services: (
      <section key="services" className="section-padding">
        <div className="container-wide">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">{t('portfolio.services.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="p-6 rounded-lg border border-border hover:border-accent/30 transition-all group">
                  <Icon className="w-6 h-6 text-accent mb-4" />
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    ),

    projects: (
      <section key="projects" id="projects" className="section-padding bg-card border-y border-border">
        <div className="container-wide">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center">{t('portfolio.projects.title')}</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-lg border border-border bg-background overflow-hidden group hover:border-accent/30 transition-all">
                <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary/5 flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-accent/40">{project.title.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-accent font-medium uppercase tracking-wide">{project.category}</span>
                    {project.featured && <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">Featured</span>}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map(tech => (
                      <span key={tech} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="inline-flex items-center gap-1 text-sm text-foreground hover:text-accent transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="inline-flex items-center gap-1 text-sm text-foreground hover:text-accent transition-colors">
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    experience: (
      <section key="experience" className="section-padding">
        <div className="container-narrow">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">{t('portfolio.experience.title')}</h2>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div key={exp.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="relative pl-8 border-l-2 border-border">
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-accent" />
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{exp.role}</h3>
                  <span className="text-accent text-sm font-medium">@ {exp.company}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{exp.duration}</p>
                <p className="text-muted-foreground text-sm mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.achievements.map((a, ai) => (
                    <span key={ai} className="text-xs px-2.5 py-1 bg-accent/10 text-accent rounded-full font-medium">{a}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    testimonials: (
      <section key="testimonials" className="section-padding bg-card border-y border-border">
        <div className="container-wide">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">{t('portfolio.testimonials.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((test, i) => (
              <motion.div key={test.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="p-6 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{test.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-semibold text-sm">{test.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{test.name}</div>
                    <div className="text-xs text-muted-foreground">{test.role}, {test.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    contact: (
      <section key="contact" id="contact" className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">{t('portfolio.contact.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('portfolio.contact.subtitle')}</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder={t('portfolio.contact.name')} className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                <input type="email" placeholder={t('portfolio.contact.email')} className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <textarea placeholder={t('portfolio.contact.message')} rows={5} className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> {t('portfolio.contact.send')}
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Ho Chi Minh City</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> alex@example.com</span>
            </div>
          </div>
        </div>
      </section>
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Stats - always after hero if hero visible */}
      {visibleSections.includes('hero') && (
        <>
          {sectionMap.hero}
          <section className="py-12 border-y border-border bg-card">
            <div className="container-wide">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                    <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                    <div className="font-heading text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Render remaining sections in admin-defined order */}
      {visibleSections.filter(k => k !== 'hero').map(key => sectionMap[key] || null)}

      <Footer />
    </div>
  );
};

export default Portfolio;
