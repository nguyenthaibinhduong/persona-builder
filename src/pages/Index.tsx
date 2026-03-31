import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  Wallet,
  Sparkles,
  LayoutTemplate,
  Code2,
  Rocket
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const typeScale = {
  heroTitle: 'font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05]',
  sectionTitle: 'font-heading text-3xl md:text-5xl font-extrabold tracking-tight',
  sectionSubtitle: 'text-base md:text-lg text-muted-foreground mt-4 max-w-2xl',
  lead: 'text-lg md:text-xl font-medium leading-relaxed',
  body: 'text-sm md:text-base leading-relaxed',
  button: 'text-sm md:text-base font-bold uppercase tracking-wide',
  caption: 'text-xs md:text-sm font-bold uppercase tracking-wider',
};

// Nâng cấp Card: Viền sắc nét hơn, hover nổi bật với viền vàng và bóng đổ
const glassCard = 'rounded-2xl border border-border/60 bg-background/40 backdrop-blur-xl hover:bg-background/80 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(var(--primary)/0.15)] transition-all duration-500 overflow-hidden relative group/card';

const Index = () => {
  const { t, lang } = useLanguage();
  const contactLink = 'https://zalo.me/0395659769';
  const heroBadge = lang === 'vi' ? 'Web nhanh – đẹp – tối ưu' : 'Fast, beautiful, optimized web';

  const valueProps = [
    { title: t('landing.value.item1.title'), desc: t('landing.value.item1.desc'), icon: Sparkles },
    { title: t('landing.value.item2.title'), desc: t('landing.value.item2.desc'), icon: Zap },
    { title: t('landing.value.item3.title'), desc: t('landing.value.item3.desc'), icon: ShieldCheck },
    { title: t('landing.value.item4.title'), desc: t('landing.value.item4.desc'), icon: Wallet },
    { title: t('landing.value.item5.title'), desc: t('landing.value.item5.desc'), icon: PhoneCall },
    { title: lang === 'vi' ? 'Kiến trúc sạch' : 'Clean Architecture', desc: lang === 'vi' ? 'Code dễ bảo trì, dễ dàng mở rộng tính năng về sau.' : 'Maintainable code, easy to scale.', icon: Code2 },
  ];

  const services = [
    { title: t('landing.services.landing.title'), desc: t('landing.services.landing.desc'), price: lang === 'vi' ? '2–4 triệu' : '2–4M VND', tag: 'Mini', icon: LayoutTemplate, popular: false },
    { title: t('landing.services.business.title'), desc: t('landing.services.business.desc'), price: lang === 'vi' ? '4–8 triệu' : '4–8M VND', tag: lang === 'vi' ? 'Cơ bản' : 'Basic', icon: Code2, popular: true },
    { title: t('landing.services.advanced.title'), desc: t('landing.services.advanced.desc'), price: lang === 'vi' ? '8–15 triệu' : '8–15M VND', tag: lang === 'vi' ? 'Nâng cao' : 'Advanced', icon: Rocket, popular: false },
  ];

  const projects = [
    {
      title: lang === 'vi' ? 'Landing Page Fintech' : 'Fintech Landing Page',
      audience: lang === 'vi' ? 'Startup Fintech' : 'Fintech Startup',
      problem: lang === 'vi' ? 'Web cũ tải >5s, bounce cao' : 'Old site loaded >5s, high bounce',
      solution: lang === 'vi' ? 'Thiết kế lại UI, tối ưu ảnh, code static + CDN' : 'Redesigned UI, optimized assets, static build + CDN',
      result: lang === 'vi' ? 'Tốc độ cải thiện ~40%, form lead rõ ràng' : '~40% faster, clearer lead form',
      demo: { href: 'https://linear.app', label: 'Linear (live ref)' },
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: lang === 'vi' ? 'Website doanh nghiệp dịch vụ' : 'Service company website',
      audience: lang === 'vi' ? 'Doanh nghiệp dịch vụ' : 'Service Business',
      problem: lang === 'vi' ? 'Thông tin rời rạc, khó tìm' : 'Information scattered, hard to find',
      solution: lang === 'vi' ? 'Sắp xếp lại sitemap, CTA ở mọi section, copy ngắn' : 'Restructured sitemap, CTA in every section, concise copy',
      result: lang === 'vi' ? 'Khách ở lại lâu hơn, dễ liên hệ' : 'Longer session time, easier contact',
      demo: { href: 'https://vercel.com/templates/next.js/agency-landing-page', label: 'Agency template (live ref)' },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    },
    {
      title: lang === 'vi' ? 'Dashboard Nội bộ / Quản lý' : 'Internal Dashboard',
      audience: lang === 'vi' ? 'Đội vận hành' : 'Ops Team',
      problem: lang === 'vi' ? 'Dữ liệu tải chậm, UI rối' : 'Slow data loads, cluttered UI',
      solution: lang === 'vi' ? 'Tối ưu API, cache, bố cục bento rõ ràng' : 'Optimized API, caching, clean bento layout',
      result: lang === 'vi' ? 'Giảm 30-50% thời gian thao tác' : '30-50% faster operations',
      demo: { href: 'https://app.supabase.com', label: 'Supabase dashboard (live ref)' },
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  const steps = [
    t('landing.process.step1'),
    t('landing.process.step2'),
    t('landing.process.step3'),
    t('landing.process.step4'),
    t('landing.process.step5'),
  ];

  const commitments = [
    t('landing.commitments.item1'),
    t('landing.commitments.item2'),
    t('landing.commitments.item3'),
    t('landing.commitments.item4'),
  ];

  const testimonials = [
    t('landing.testimonials.quote1'),
    t('landing.testimonials.quote2'),
    t('landing.testimonials.quote3'),
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background Decor - Lưới chấm bị ẩn mờ và ánh sáng Vàng */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 bg-primary blur-[150px] rounded-full pointer-events-none -z-10" />

      <Header />

      {/* 1. Hero Section */}
      <section className="pt-36 pb-20 md:pt-48 md:pb-32 relative z-10">
        <div className="container-wide text-center">
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary mb-8 ${typeScale.caption} shadow-[0_0_15px_rgba(var(--primary),0.2)]`}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {heroBadge}
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className={`${typeScale.heroTitle} text-foreground mb-6 max-w-5xl mx-auto drop-shadow-sm`}
          >
            {t('landing.hero.title')}
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className={`${typeScale.lead} text-muted-foreground max-w-2xl mx-auto mb-12`}
          >
            {t('landing.hero.subtitle')}
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          >
            <a
              href="#projects"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-none hover:bg-primary/90 hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(255,255,255,0.1)] dark:hover:shadow-[8px_8px_0px_rgba(255,255,255,0.2)] transition-all ${typeScale.button} w-full sm:w-auto relative overflow-hidden group`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('landing.hero.cta1')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>
            <a
              href={contactLink}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border bg-background hover:border-primary text-foreground hover:text-primary rounded-none transition-all ${typeScale.button} w-full sm:w-auto group`}
            >
              {t('landing.hero.cta2')}
              <span className="text-muted-foreground font-normal ml-1 hidden sm:inline group-hover:text-primary/70">{t('landing.hero.cta2.note')}</span>
            </a>
          </motion.div>

          {/* Hero Image Mockup - Viền Glow */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="max-w-5xl mx-auto rounded-none border-2 border-border/40 bg-card p-2 md:p-3 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
              alt="Workspace and Code"
              className="w-full h-auto object-cover relative z-10 grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Value Props */}
      <section className="section-padding relative bg-secondary/20">
        <div className="container-wide text-center mb-16">
          <h2 className={`${typeScale.sectionTitle} text-foreground uppercase tracking-tight`}>{t('landing.value.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 mb-4" />
          <p className={`${typeScale.sectionSubtitle} mx-auto`}>{lang === 'vi' ? 'Nhấn mạnh trải nghiệm, tốc độ, UI/UX hiện đại và chi phí minh bạch.' : 'Focus on UX, speed, modern UI, and transparent cost.'}</p>
        </div>

        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProps.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={i}
                className={`${glassCard} p-8 flex flex-col items-start`}
              >
                <div className="w-14 h-14 rounded-none bg-primary text-primary-foreground flex items-center justify-center mb-6 group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-300 shadow-lg shadow-primary/20">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className={`${typeScale.body} text-muted-foreground`}>{item.desc}</p>
                {/* Accent góc */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Portfolio - Hiệu ứng ảnh Trắng Đen sang Màu */}
      <section id="projects" className="section-padding border-y border-border/30">
        <div className="container-wide text-center mb-16">
          <h2 className={`${typeScale.sectionTitle} text-foreground uppercase`}>{t('landing.portfolio.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 mb-4" />
          <p className={`${typeScale.sectionSubtitle} mx-auto`}>{lang === 'vi' ? 'Các dự án thực tế với link demo để bạn kiểm chứng tốc độ & trải nghiệm.' : 'Real projects with live links so you can check speed & UX.'}</p>
        </div>

        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={i}
                className={`${glassCard} flex flex-col group`}
              >
                {/* Image Thumbnail - Kịch tính hơn với Grayscale */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                      {p.audience}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col border-t-2 border-transparent group-hover:border-primary transition-colors duration-300">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{p.title}</h3>
                  <div className="space-y-3 text-sm text-muted-foreground flex-1">
                    <p><strong className="text-foreground">{t('landing.portfolio.problem')}:</strong> {p.problem}</p>
                    <p><strong className="text-foreground">{t('landing.portfolio.solution')}:</strong> {p.solution}</p>
                    <p><strong className="text-primary">{t('landing.portfolio.result')}:</strong> {p.result}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <a href={p.demo.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground hover:text-primary text-sm font-bold uppercase tracking-wider transition-colors group/link">
                      <ExternalLink className="w-4 h-4 text-primary group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
                      {p.demo.label}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process - Timeline vàng rực */}
      <section className="section-padding bg-secondary/10">
        <div className="container-wide text-center mb-16">
          <h2 className={`${typeScale.sectionTitle} text-foreground uppercase`}>{t('landing.process.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 mb-4" />
          <p className={`${typeScale.sectionSubtitle} mx-auto`}>{lang === 'vi' ? 'Quy trình làm việc rành mạch, tối ưu thời gian ra mắt sản phẩm.' : 'Clear workflow, optimizing time to market.'}</p>
        </div>

        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-border z-0" />

            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={i}
                className="relative z-10 flex flex-col items-center text-center p-4 group"
              >
                <div className="w-14 h-14 bg-background border-4 border-muted-foreground/30 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground text-foreground flex items-center justify-center font-black text-xl mb-6 transition-all duration-300">
                  {i + 1}
                </div>
                <p className="text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing - Bảng giá nổi bật */}
      <section className="section-padding border-y border-border/30">
        <div className="container-wide text-center mb-16">
          <h2 className={`${typeScale.sectionTitle} text-foreground uppercase`}>{t('landing.pricing.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 mb-4" />
          <p className={`${typeScale.sectionSubtitle} mx-auto`}>{t('landing.pricing.note')}</p>
        </div>

        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 items-end">
            {services.map((plan, i) => (
              <motion.div
                key={plan.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={i}
                className={`${glassCard} p-8 ${plan.popular ? 'border-primary md:-translate-y-4 shadow-[0_0_40px_rgba(var(--primary),0.15)] bg-background/80 relative' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest py-2 text-center shadow-md">
                    {lang === 'vi' ? 'Lựa chọn Tốt nhất' : 'Recommended'}
                  </div>
                )}
                <div className={`mt-6 mb-6 w-16 h-16 rounded-none flex items-center justify-center ${plan.popular ? 'bg-primary text-primary-foreground shadow-[4px_4px_0px_rgba(0,0,0,0.5)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)]' : 'bg-secondary text-foreground'}`}>
                  <plan.icon className="w-8 h-8" />
                </div>

                <h3 className="text-3xl font-black mb-2">{plan.title}</h3>
                <p className={`${typeScale.body} text-muted-foreground mb-6 h-12`}>{plan.desc}</p>

                <div className="mb-6 flex items-baseline gap-2 border-b border-border/50 pb-6">
                  <span className={`text-4xl font-black ${plan.popular ? 'text-primary' : 'text-foreground'}`}>{plan.price}</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span>{lang === 'vi' ? 'Thiết kế chuẩn UI/UX riêng biệt' : 'Custom UI/UX Design'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span>{lang === 'vi' ? 'Tối ưu tốc độ tải trang cực nhanh' : 'Extreme speed optimization'}</span>
                  </div>
                </div>

                <a
                  href={contactLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-none transition-all ${typeScale.button} ${plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1'
                    : 'bg-secondary text-foreground hover:bg-secondary/80 border border-transparent hover:border-foreground/20'
                    }`}
                >
                  <PhoneCall className="w-5 h-5" />
                  {t('landing.hero.cta2')}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Commitments & Testimonials */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className={`${typeScale.sectionTitle} text-foreground mb-4 uppercase`}>{t('landing.commitments.title')}</h2>
              <div className="w-16 h-1 bg-primary mt-4 mb-8" />
              <div className="space-y-4">
                {commitments.map((c, i) => (
                  <motion.div
                    key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    className="p-5 border-l-4 border-primary bg-secondary/30 flex items-start gap-4 hover:bg-secondary/50 transition-colors"
                  >
                    <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-bold">{c}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className={`${typeScale.sectionTitle} text-foreground mb-4 uppercase`}>{t('landing.testimonials.title')}</h2>
              <div className="w-16 h-1 bg-primary mt-4 mb-8" />
              <div className="space-y-6">
                {testimonials.map((quote, i) => (
                  <motion.div
                    key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                    className="p-8 border border-border/50 bg-card relative group hover:border-primary/50 transition-colors"
                  >
                    <Sparkles className="w-6 h-6 text-primary absolute top-6 left-6 group-hover:animate-spin" />
                    <p className="text-foreground text-lg leading-relaxed pl-10 font-medium italic">"{quote}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-32 relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 bg-black/90 dark:bg-black/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-40 bg-primary blur-[120px] rounded-full pointer-events-none" />

        <div className="container-narrow text-center relative z-10">
          <h2 className={`${typeScale.sectionTitle} text-white mb-6`}>{t('landing.cta.final.title')}</h2>
          <p className={`${typeScale.lead} text-white/70 mb-12 max-w-2xl mx-auto`}>{t('landing.cta.final.subtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={contactLink}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all ${typeScale.button} w-full sm:w-auto`}
            >
              <PhoneCall className="w-5 h-5 animate-bounce" />
              {t('landing.cta.final.primary')}
            </a>
            <Link
              to="/portfolio"
              className={`inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/20 hover:border-white text-white hover:bg-white/10 transition-all ${typeScale.button} w-full sm:w-auto group`}
            >
              {t('landing.cta.final.secondary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;