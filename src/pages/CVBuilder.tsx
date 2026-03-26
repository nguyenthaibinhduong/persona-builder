import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { sampleCVData } from '@/data/sampleData';
import { CVData, CVTemplate } from '@/types';
import {
  FileText, Download, Eye, Edit3, Plus, Trash2, ChevronDown, ChevronUp,
  Mail, Phone, MapPin, Globe, Github, Linkedin, GripVertical,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CVBuilder = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<CVData>(sampleCVData);
  const [template, setTemplate] = useState<CVTemplate>('modern');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updatePersonal = (field: string, value: string) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: field === 'description' ? value.split('\n') : value } : exp
      ),
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', duration: '', description: [''] }],
    }));
  };

  const removeExperience = (index: number) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', duration: '' }],
    }));
  };

  const removeEducation = (index: number) => {
    setData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  const exportPDF = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      // Force show preview for export
      const wasEditor = activeTab === 'editor';
      if (wasEditor) setActiveTab('preview');

      await new Promise(r => setTimeout(r, 300));

      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width at 96 DPI
        windowWidth: 794,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297; // A4 height in mm

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${data.personal.fullName.replace(/\s+/g, '_')}_CV.pdf`);

      if (wasEditor) setActiveTab('editor');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const InputField = ({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
    </div>
  );

  const SectionHeader = ({ title, section, icon: Icon }: { title: string; section: string; icon: any }) => (
    <button onClick={() => toggleSection(section)} className="w-full flex items-center justify-between px-4 py-3 bg-secondary/50 rounded-md hover:bg-secondary transition-colors">
      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="w-4 h-4 text-accent" /> {title}
      </span>
      {expandedSection === section ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20 pb-8 px-4">
        {/* Top bar */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl font-semibold text-foreground">{t('cv.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('cv.subtitle')}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Template selector */}
              <div className="flex items-center gap-1 bg-secondary rounded-md p-1">
                {(['minimal', 'modern', 'executive'] as CVTemplate[]).map(tmpl => (
                  <button key={tmpl} onClick={() => setTemplate(tmpl)}
                    className={`px-3 py-1.5 text-xs font-medium rounded capitalize transition-colors ${template === tmpl ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                    {tmpl}
                  </button>
                ))}
              </div>
              <button onClick={exportPDF} disabled={exporting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                <Download className="w-4 h-4" /> {exporting ? 'Exporting...' : t('cv.export')}
              </button>
            </div>
          </div>

          {/* Mobile tab toggle */}
          <div className="flex lg:hidden mt-4 bg-secondary rounded-md p-1">
            <button onClick={() => setActiveTab('editor')}
              className={`flex-1 py-2 text-sm font-medium rounded flex items-center justify-center gap-1.5 ${activeTab === 'editor' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}>
              <Edit3 className="w-4 h-4" /> {t('cv.editor')}
            </button>
            <button onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 text-sm font-medium rounded flex items-center justify-center gap-1.5 ${activeTab === 'preview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}>
              <Eye className="w-4 h-4" /> {t('cv.preview')}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className={`space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            {/* Personal Info */}
            <SectionHeader title={t('cv.personal')} section="personal" icon={FileText} />
            {expandedSection === 'personal' && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="space-y-3 px-1">
                <div className="grid grid-cols-2 gap-3">
                  <InputField label={t('cv.fullname')} value={data.personal.fullName} onChange={v => updatePersonal('fullName', v)} />
                  <InputField label={t('cv.jobtitle')} value={data.personal.title} onChange={v => updatePersonal('title', v)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Email" value={data.personal.email} onChange={v => updatePersonal('email', v)} type="email" />
                  <InputField label={t('cv.phone')} value={data.personal.phone} onChange={v => updatePersonal('phone', v)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label={t('cv.location')} value={data.personal.location} onChange={v => updatePersonal('location', v)} />
                  <InputField label={t('cv.website')} value={data.personal.website} onChange={v => updatePersonal('website', v)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="LinkedIn" value={data.personal.linkedin} onChange={v => updatePersonal('linkedin', v)} />
                  <InputField label="GitHub" value={data.personal.github} onChange={v => updatePersonal('github', v)} />
                </div>
              </motion.div>
            )}

            {/* Summary */}
            <SectionHeader title={t('cv.summary')} section="summary" icon={FileText} />
            {expandedSection === 'summary' && (
              <div className="px-1">
                <textarea value={data.summary} onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={4} className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
              </div>
            )}

            {/* Skills */}
            <SectionHeader title={t('cv.skills')} section="skills" icon={FileText} />
            {expandedSection === 'skills' && (
              <div className="space-y-3 px-1">
                {data.skills.map((group, gi) => (
                  <div key={gi}>
                    <label className="text-xs text-muted-foreground mb-1 block">{group.category}</label>
                    <input value={group.items.join(', ')} onChange={e => {
                      const newSkills = [...data.skills];
                      newSkills[gi] = { ...group, items: e.target.value.split(',').map(s => s.trim()) };
                      setData(prev => ({ ...prev, skills: newSkills }));
                    }} className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                  </div>
                ))}
              </div>
            )}

            {/* Experience */}
            <SectionHeader title={t('cv.experience')} section="experience" icon={FileText} />
            {expandedSection === 'experience' && (
              <div className="space-y-4 px-1">
                {data.experience.map((exp, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <button onClick={() => removeExperience(i)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label={t('cv.company')} value={exp.company} onChange={v => updateExperience(i, 'company', v)} />
                      <InputField label={t('cv.role')} value={exp.role} onChange={v => updateExperience(i, 'role', v)} />
                    </div>
                    <InputField label={t('cv.duration')} value={exp.duration} onChange={v => updateExperience(i, 'duration', v)} />
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">{t('cv.description')}</label>
                      <textarea value={exp.description.join('\n')} onChange={e => updateExperience(i, 'description', e.target.value)}
                        rows={3} className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
                    </div>
                  </div>
                ))}
                <button onClick={addExperience} className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors flex items-center justify-center gap-1.5">
                  <Plus className="w-4 h-4" /> {t('cv.add')} {t('cv.experience')}
                </button>
              </div>
            )}

            {/* Education */}
            <SectionHeader title={t('cv.education')} section="education" icon={FileText} />
            {expandedSection === 'education' && (
              <div className="space-y-4 px-1">
                {data.education.map((edu, i) => (
                  <div key={i} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex justify-end">
                      <button onClick={() => removeEducation(i)} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label={t('cv.school')} value={edu.school} onChange={v => { const n = [...data.education]; n[i] = { ...edu, school: v }; setData(prev => ({ ...prev, education: n })); }} />
                      <InputField label={t('cv.degree')} value={edu.degree} onChange={v => { const n = [...data.education]; n[i] = { ...edu, degree: v }; setData(prev => ({ ...prev, education: n })); }} />
                    </div>
                    <InputField label={t('cv.duration')} value={edu.duration} onChange={v => { const n = [...data.education]; n[i] = { ...edu, duration: v }; setData(prev => ({ ...prev, education: n })); }} />
                  </div>
                ))}
                <button onClick={addEducation} className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors flex items-center justify-center gap-1.5">
                  <Plus className="w-4 h-4" /> {t('cv.add')} {t('cv.education')}
                </button>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className={`${activeTab === 'editor' ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-24">
              <div className="bg-muted/30 rounded-lg p-4 overflow-auto max-h-[calc(100vh-200px)]">
                <div ref={previewRef} className="bg-white text-gray-900 shadow-lg mx-auto" style={{ width: '100%', maxWidth: '794px', minHeight: '1123px', padding: '48px', fontFamily: "'Inter', sans-serif", fontSize: '13px', lineHeight: '1.5' }}>
                  {/* CV Header */}
                  <div className={`mb-6 ${template === 'modern' ? 'border-b-2 border-amber-500 pb-6' : template === 'executive' ? 'bg-slate-800 text-white -m-[48px] mb-6 p-12' : 'border-b border-gray-200 pb-6'}`}>
                    <h1 className={`text-2xl font-bold mb-1 ${template === 'executive' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {data.personal.fullName}
                    </h1>
                    <p className={`text-base mb-3 ${template === 'executive' ? 'text-gray-300' : template === 'modern' ? 'text-amber-600' : 'text-gray-600'}`}>
                      {data.personal.title}
                    </p>
                    <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${template === 'executive' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {data.personal.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{data.personal.email}</span>}
                      {data.personal.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{data.personal.phone}</span>}
                      {data.personal.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.personal.location}</span>}
                      {data.personal.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{data.personal.website}</span>}
                      {data.personal.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{data.personal.github}</span>}
                      {data.personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{data.personal.linkedin}</span>}
                    </div>
                  </div>

                  {/* Summary */}
                  {data.summary && (
                    <div className="mb-5">
                      <h2 className={`text-sm font-bold uppercase tracking-wider mb-2 ${template === 'modern' ? 'text-amber-600' : 'text-gray-900'}`} style={{ fontFamily: template !== 'minimal' ? "'Playfair Display', serif" : 'inherit' }}>
                        Professional Summary
                      </h2>
                      <p className="text-gray-600 leading-relaxed">{data.summary}</p>
                    </div>
                  )}

                  {/* Skills */}
                  {data.skills.length > 0 && (
                    <div className="mb-5">
                      <h2 className={`text-sm font-bold uppercase tracking-wider mb-2 ${template === 'modern' ? 'text-amber-600' : 'text-gray-900'}`} style={{ fontFamily: template !== 'minimal' ? "'Playfair Display', serif" : 'inherit' }}>
                        Skills
                      </h2>
                      <div className="space-y-1.5">
                        {data.skills.map((group, i) => (
                          <div key={i} className="flex">
                            <span className="font-semibold text-gray-700 w-28 shrink-0">{group.category}:</span>
                            <span className="text-gray-600">{group.items.join(' · ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {data.experience.length > 0 && (
                    <div className="mb-5">
                      <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${template === 'modern' ? 'text-amber-600' : 'text-gray-900'}`} style={{ fontFamily: template !== 'minimal' ? "'Playfair Display', serif" : 'inherit' }}>
                        Work Experience
                      </h2>
                      <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                          <div key={i}>
                            <div className="flex items-baseline justify-between">
                              <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                              <span className="text-xs text-gray-500">{exp.duration}</span>
                            </div>
                            <p className={`text-sm mb-1.5 ${template === 'modern' ? 'text-amber-600' : 'text-gray-500'}`}>{exp.company}</p>
                            <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-600">
                              {exp.description.map((d, di) => d.trim() && <li key={di}>{d}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {data.projects.length > 0 && (
                    <div className="mb-5">
                      <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${template === 'modern' ? 'text-amber-600' : 'text-gray-900'}`} style={{ fontFamily: template !== 'minimal' ? "'Playfair Display', serif" : 'inherit' }}>
                        Key Projects
                      </h2>
                      <div className="space-y-3">
                        {data.projects.map((proj, i) => (
                          <div key={i}>
                            <div className="flex items-baseline justify-between">
                              <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                              <span className="text-xs text-gray-500">{proj.role}</span>
                            </div>
                            <p className="text-gray-600 mb-1">{proj.summary}</p>
                            <p className="text-xs text-gray-500">Tech: {proj.techStack.join(' · ')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {data.education.length > 0 && (
                    <div className="mb-5">
                      <h2 className={`text-sm font-bold uppercase tracking-wider mb-2 ${template === 'modern' ? 'text-amber-600' : 'text-gray-900'}`} style={{ fontFamily: template !== 'minimal' ? "'Playfair Display', serif" : 'inherit' }}>
                        Education
                      </h2>
                      {data.education.map((edu, i) => (
                        <div key={i} className="flex items-baseline justify-between">
                          <div>
                            <span className="font-semibold text-gray-900">{edu.degree}</span>
                            <span className="text-gray-500"> — {edu.school}</span>
                          </div>
                          <span className="text-xs text-gray-500">{edu.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Certifications */}
                  {data.certifications.length > 0 && (
                    <div className="mb-5">
                      <h2 className={`text-sm font-bold uppercase tracking-wider mb-2 ${template === 'modern' ? 'text-amber-600' : 'text-gray-900'}`} style={{ fontFamily: template !== 'minimal' ? "'Playfair Display', serif" : 'inherit' }}>
                        Certifications
                      </h2>
                      <ul className="list-disc list-outside ml-4 text-gray-600 space-y-0.5">
                        {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Languages */}
                  {data.languages.length > 0 && (
                    <div>
                      <h2 className={`text-sm font-bold uppercase tracking-wider mb-2 ${template === 'modern' ? 'text-amber-600' : 'text-gray-900'}`} style={{ fontFamily: template !== 'minimal' ? "'Playfair Display', serif" : 'inherit' }}>
                        Languages
                      </h2>
                      <div className="flex gap-4 text-gray-600">
                        {data.languages.map((lang, i) => (
                          <span key={i}>{lang.name} <span className="text-gray-400">({lang.level})</span></span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
