import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Globe, Languages, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Index = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Globe, title: t('landing.feature.portfolio'), desc: t('landing.feature.portfolio.desc') },
    { icon: FileText, title: t('landing.feature.cv'), desc: t('landing.feature.cv.desc') },
    { icon: Languages, title: t('landing.feature.bilingual'), desc: t('landing.feature.bilingual.desc') },
    { icon: Download, title: t('landing.feature.pdf'), desc: t('landing.feature.pdf.desc') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="container-narrow text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Portfolio & CV Platform
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] mb-6"
          >
            {t('landing.hero.title')}
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('landing.hero.subtitle')}
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t('landing.hero.cta1')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cv-builder"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors"
            >
              {t('landing.hero.cta2')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">{t('landing.features.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('landing.features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                custom={i}
                className="p-6 rounded-lg border border-border bg-background hover:border-accent/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Ready to Stand Out?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Start building your professional portfolio and CV today. No account required for the demo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Explore Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cv-builder"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors"
            >
              Try CV Builder
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
