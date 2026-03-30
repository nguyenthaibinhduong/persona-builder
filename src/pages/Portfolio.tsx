import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectDemoEmbed from '@/components/ProjectDemoEmbed';
import { useAdmin } from '@/contexts/AdminContext';
import { ArrowRight, ExternalLink, Github, Terminal, Code2, Rocket, Sparkles, Layers, Cpu } from 'lucide-react';
import { useState, useMemo, ReactNode } from 'react';

// Animation Variants mượt mà hơn cho không gian rộng
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
    // --- HERO SECTION: Clean & Tech-focused ---
    hero: (
      <section key="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[128px] mix-blend-screen" />

        <div className="container-wide w-full">
          <div className="max-w-4xl">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-sm uppercase tracking-wider mb-8">
                <Terminal className="w-4 h-4" /> <span>{t('portfolio.hero.greeting')}</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className={`${typeScale.heroTitle} text-foreground mb-6`}>
                Software <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Engineer.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className={`${typeScale.lead} text-muted-foreground mb-12 max-w-2xl font-light`}>
                {t('portfolio.hero.subtitle')}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
                <a href="#projects" className="group relative px-8 py-4 bg-foreground text-background rounded-xl overflow-hidden font-medium hover:scale-105 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    {t('portfolio.hero.cta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href="#contact" className="px-8 py-4 border-2 border-border hover:border-foreground/50 text-foreground rounded-xl font-medium transition-colors duration-300 flex items-center gap-2">
                  <Github className="w-5 h-5" /> GitHub Profile
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    ),

    // --- SKILLS: Asymmetric Bento Grid (Tối ưu cho 2-4 items) ---
    skills: (
      <section key="skills" className="py-32 relative">
        <div className="container-wide">
          <div className="mb-20">
            <h2 className={`${typeScale.sectionTitle}`}>{t('portfolio.skills.title')}</h2>
            <div className="h-2 w-24 bg-gradient-to-r from-primary to-accent mt-6 rounded-full" />
          </div>

          {/* Grid setup: Nếu có 3 items, item đầu tiên sẽ to hơn, nếu 4 thì chia 2x2 đều */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 auto-rows-[minmax(300px,auto)]">
            {skillCategories.slice(0, 4).map((cat, ci) => (
              <motion.div
                key={cat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                custom={ci}
                className={`group p-8 lg:p-10 rounded-[2rem] bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-accent/30 transition-all duration-500
                  ${ci === 0 && skillCategories.length === 3 ? 'md:col-span-2' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-foreground group-hover:text-accent group-hover:scale-110 transition-all duration-300 shadow-sm">
                    {ci % 2 === 0 ? <Layers className="w-7 h-7" /> : <Cpu className="w-7 h-7" />}
                  </div>
                  <span className="text-4xl font-black text-foreground/5 group-hover:text-foreground/10 transition-colors">0{ci + 1}</span>
                </div>

                <h3 className="text-2xl font-bold mb-8">{cat.name}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.skills.map((skill, si) => (
                    <div key={si} className="bg-background rounded-xl p-4 border border-border/50">
                      <div className="flex justify-between text-sm font-medium mb-3">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-accent font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-primary to-accent"
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

    // --- PROJECTS: Large Immersive Cards (Tuyệt vời cho 2-4 dự án) ---
    projects: (
      <section key="projects" id="projects" className="py-32 bg-secondary/20 border-y border-border/30">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className={`${typeScale.sectionTitle} mb-6`}>{t('portfolio.projects.title')}</h2>
              <p className={`${typeScale.body} text-muted-foreground`}>Selected works focusing on user experience, scalable architecture, and performance.</p>
            </div>
          </div>

          {/* 1 Cột trải dài hoặc 2 cột tùy theo sở thích, ở đây dùng Grid 2 cột lớn */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filtered.slice(0, 4).map((project, i) => (
              <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i}
                className="group flex flex-col rounded-[2.5rem] bg-background border border-border overflow-hidden hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">

                {/* Visual Area (Rất lớn) */}
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  {project.demoUrl ? (
                    <ProjectDemoEmbed url={project.demoUrl} title={project.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                      <Code2 className="w-20 h-20 text-muted-foreground/30" />
                    </div>
                  )}

                  {/* Floating Action Menu */}
                  <div className="absolute top-6 right-6 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="w-12 h-12 bg-background/90 backdrop-blur-md text-foreground rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-mono font-bold uppercase rounded-full">
                        {project.category}
                      </span>
                      <span className="text-muted-foreground text-sm">2023 - Present</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className={`${typeScale.body} text-muted-foreground mb-8`}>{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-border/50">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-4 py-2 bg-secondary/50 text-foreground text-sm rounded-lg font-medium">
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

    // --- EXPERIENCE: Minimalist Line Connected (Tập trung chi tiết cho 2-4 items) ---
    experience: (
      <section key="experience" className="py-32">
        <div className="container-wide max-w-5xl">
          <div className="mb-20">
            <h2 className={`${typeScale.sectionTitle}`}>{t('portfolio.experience.title')}</h2>
          </div>

          <div className="space-y-16">
            {experiences.slice(0, 4).map((exp, i) => (
              <motion.div key={exp.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start">

                {/* Cột Timeline / Duration */}
                <div className="md:w-1/4 shrink-0 pt-2 flex flex-col md:text-right">
                  <span className="text-xl font-bold text-foreground mb-1">{exp.duration}</span>
                  <span className="text-muted-foreground font-mono text-sm">{exp.company}</span>
                </div>

                {/* Divider Line (Chỉ hiện trên desktop) */}
                <div className="hidden md:flex flex-col items-center shrink-0 w-8">
                  <div className="w-4 h-4 rounded-full bg-secondary border-2 border-primary group-hover:bg-accent group-hover:border-accent group-hover:scale-125 transition-all duration-300 z-10" />
                  {i !== experiences.length - 1 && (
                    <div className="w-px h-full min-h-[120px] bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
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
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent z-[100] origin-left" style={{ scaleX }} />

      <Header />

      <main>
        {visibleSections.includes('hero') && sectionMap.hero}

        {/* Metric Banner: Clean & Corporate */}
        {visibleSections.includes('hero') && (
          <div className="border-y border-border bg-background relative z-10">
            <div className="container-wide py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
                {[
                  { value: '5+', label: 'Years of Exp.' },
                  { value: '20+', label: 'Projects Built' },
                  { value: '100%', label: 'Commitment' },
                  { value: '24/7', label: 'Coffee Intake' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter mb-2">{s.value}</span>
                    <span className="text-xs md:text-sm font-mono text-muted-foreground uppercase">{s.label}</span>
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