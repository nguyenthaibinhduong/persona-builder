import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectDemoEmbed from '@/components/ProjectDemoEmbed';
import { useAdmin } from '@/contexts/AdminContext';
import { ArrowRight, ExternalLink, Github, Terminal, Code2, Rocket, Sparkles, Layers, Cpu, Image as ImageIcon } from 'lucide-react';
import { useState, useMemo, ReactNode } from 'react';

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const typeScale = {
  heroTitle: 'text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight',
  sectionTitle: 'text-4xl md:text-5xl lg:text-6xl font-black tracking-tight',
  lead: 'text-lg md:text-xl leading-relaxed',
  body: 'text-base md:text-lg leading-relaxed',
};

const Portfolio = () => {
  const { t } = useLanguage();
  const { sections, projects, experiences, skillCategories } = useAdmin();
  const [filter, setFilter] = useState('All');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const visibleSections = useMemo(() =>
    sections.filter(s => s.visible).sort((a, b) => a.order - b.order).map(s => s.key),
    [sections]
  );

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const sectionMap: Record<string, ReactNode> = {
    // --- HERO SECTION: Clean, Tech-focused & Has Avatar ---
    hero: (
      <section key="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-background to-background" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px] mix-blend-screen" />

        <div className="container-wide w-full">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
            <div className="max-w-3xl flex-1">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-sm uppercase tracking-wider mb-8 shadow-sm">
                  <Terminal className="w-4 h-4" /> <span>{t('portfolio.hero.greeting')}</span>
                </motion.div>

                <motion.h1 variants={fadeInUp} className={`${typeScale.heroTitle} text-foreground mb-6`}>
                  Software <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">Engineer.</span>
                </motion.h1>

                <motion.p variants={fadeInUp} className={`${typeScale.lead} text-muted-foreground mb-12 max-w-2xl font-light`}>
                  {t('portfolio.hero.subtitle')}
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
                  <a href="#projects" className="group relative px-8 py-4 bg-foreground text-background rounded-xl overflow-hidden font-medium hover:scale-105 transition-all duration-300 shadow-xl shadow-foreground/10">
                    <span className="relative z-10 flex items-center gap-2">
                      {t('portfolio.hero.cta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                  <a href="#contact" className="px-8 py-4 border-2 border-border bg-background/50 backdrop-blur-sm hover:border-foreground/50 hover:bg-secondary/50 text-foreground rounded-xl font-medium transition-all duration-300 flex items-center gap-2">
                    <Github className="w-5 h-5" /> GitHub Profile
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Avatar / Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-3xl opacity-20 animate-pulse" />
              {/* Bạn có thể thay link ảnh dưới đây bằng ảnh thật của bạn */}
              <div className="relative w-full h-full rounded-full border-4 border-background shadow-2xl overflow-hidden bg-secondary">
                <img
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=800"
                  alt="Developer Portrait"
                  className="w-full h-full object-cover mix-blend-overlay hover:mix-blend-normal transition-all duration-500 grayscale hover:grayscale-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    ),

    // --- SKILLS: Ngắn gọn với dạng Tags/Pills ---
    skills: (
      <section key="skills" className="py-24 relative bg-background">
        <div className="container-wide">
          <div className="mb-16">
            <h2 className={`${typeScale.sectionTitle}`}>{t('portfolio.skills.title')}</h2>
            <div className="h-2 w-24 bg-gradient-to-r from-primary to-accent mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                custom={ci}
                className="group p-6 rounded-[1.5rem] bg-secondary/20 border border-border/50 hover:bg-secondary/40 hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-foreground group-hover:text-accent shadow-sm">
                    {ci % 2 === 0 ? <Layers className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                </div>

                {/* Chuyển Skills thành dạng Tags gọn gàng */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <span
                      key={si}
                      className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:border-accent/50 transition-colors shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    // --- PROJECTS: Bổ sung placeholder hình ảnh ---
    projects: (
      <section key="projects" id="projects" className="py-32 bg-secondary/10 border-y border-border/30 relative">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className={`${typeScale.sectionTitle} mb-6`}>{t('portfolio.projects.title')}</h2>
              <p className={`${typeScale.body} text-muted-foreground`}>Selected works focusing on user experience, scalable architecture, and performance.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filtered.slice(0, 4).map((project, i) => (
              <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i}
                className="group flex flex-col rounded-[2.5rem] bg-background border border-border overflow-hidden hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">

                {/* Visual Area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary border-b border-border/50">
                  {project.demoUrl ? (
                    <ProjectDemoEmbed url={project.demoUrl} title={project.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  ) : (
                    // Hiển thị ảnh thay thế nếu không có iframe demo
                    <img
                      src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000&seed=${i}`}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating Action Menu */}
                  <div className="absolute top-6 right-6 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="w-12 h-12 bg-background/90 backdrop-blur-md text-foreground rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors shadow-lg">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-accent transition-colors shadow-lg">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-10 flex-1 flex flex-col justify-between relative bg-background">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-mono font-bold uppercase rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className={`${typeScale.body} text-muted-foreground mb-8 line-clamp-3`}>{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-border/50">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-secondary/50 text-foreground text-xs font-semibold rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    // --- EXPERIENCE: Minimalist Line Connected ---
    experience: (
      <section key="experience" className="py-32 bg-background">
        <div className="container-wide max-w-5xl">
          <div className="mb-20">
            <h2 className={`${typeScale.sectionTitle}`}>{t('portfolio.experience.title')}</h2>
          </div>

          <div className="space-y-16">
            {experiences.slice(0, 4).map((exp, i) => (
              <motion.div key={exp.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start">

                <div className="md:w-1/4 shrink-0 pt-2 flex flex-col md:text-right">
                  <span className="text-xl font-bold text-foreground mb-1">{exp.duration}</span>
                  <span className="text-muted-foreground font-mono text-sm">{exp.company}</span>
                </div>

                <div className="hidden md:flex flex-col items-center shrink-0 w-8">
                  <div className="w-4 h-4 rounded-full bg-secondary border-2 border-primary group-hover:bg-accent group-hover:border-accent group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_15px_rgba(var(--accent),0.5)]" />
                  {i !== experiences.length - 1 && (
                    <div className="w-px h-full min-h-[120px] bg-border mt-2" />
                  )}
                </div>

                <div className="md:w-3/4 pb-8 md:pb-0">
                  <h3 className="text-2xl font-bold mb-4">{exp.role}</h3>
                  <p className={`${typeScale.body} text-muted-foreground mb-6`}>{exp.description}</p>

                  <ul className="space-y-3 mb-6">
                    {exp.achievements.map((a, ai) => (
                      <li key={ai} className="flex items-start gap-3 text-muted-foreground">
                        <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white font-sans text-foreground overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent z-[100] origin-left shadow-md" style={{ scaleX }} />

      <Header />

      <main>
        {visibleSections.includes('hero') && sectionMap.hero}

        {/* Metric Banner: Clean & Corporate */}
        {visibleSections.includes('hero') && (
          <div className="border-y border-border bg-secondary/10 relative z-10 backdrop-blur-sm">
            <div className="container-wide py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
                {[
                  { value: '5+', label: 'Years of Exp.' },
                  { value: '20+', label: 'Projects Built' },
                  { value: '100%', label: 'Commitment' },
                  { value: '24/7', label: 'Coffee Intake' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">{s.value}</span>
                    <span className="text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-widest">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {visibleSections.filter(k => k !== 'hero').map(key => (
          <div key={key}>{sectionMap[key] || null}</div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;