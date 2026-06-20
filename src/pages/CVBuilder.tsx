import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  ChevronDown,
  ChevronUp,
  Download,
  Edit3,
  Eye,
  FileText,
  Github,
  Globe,
  GripVertical,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleCVData } from '@/data/sampleData';
import { CVData, CVTemplate } from '@/types';

const templateLabels: Record<CVTemplate, string> = {
  minimal: 'Tối giản',
  modern: 'TopCV',
  executive: 'Chuyên nghiệp',
};

const sectionTitleClass = 'mb-2 border-b-2 border-blue-900 pb-1.5 text-sm font-bold uppercase tracking-wide text-blue-950';

const CVBuilder = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<CVData>(sampleCVData);
  const [template, setTemplate] = useState<CVTemplate>('modern');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updatePersonal = (field: keyof CVData['personal'], value: string) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
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
    let restorePreviewStyles: (() => void) | undefined;

    try {
      const wasEditor = activeTab === 'editor';
      if (wasEditor) setActiveTab('preview');

      await new Promise(resolve => setTimeout(resolve, 300));

      const element = previewRef.current;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidthMm = 210;
      const pageHeightMm = 297;
      const pageWidthPx = 794;
      const pageHeightPx = 1123;
      const pagePaddingPx = 36;
      const blockGapPx = 12;
      const scale = 2;
      const bottomLimitPx = pageHeightPx - pagePaddingPx;
      let cursorYPx = pagePaddingPx;
      let hasPageContent = false;
      let isFirstPdfPage = true;

      const originalWidth = element.style.width;
      const originalMaxWidth = element.style.maxWidth;
      element.style.width = `${pageWidthPx}px`;
      element.style.maxWidth = `${pageWidthPx}px`;
      restorePreviewStyles = () => {
        element.style.width = originalWidth;
        element.style.maxWidth = originalMaxWidth;
      };

      await new Promise(resolve => requestAnimationFrame(resolve));

      const blocks = Array.from(element.querySelectorAll<HTMLElement>('[data-pdf-block="true"]'));

      const createPageCanvas = () => {
        const canvas = document.createElement('canvas');
        canvas.width = pageWidthPx * scale;
        canvas.height = pageHeightPx * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Cannot create PDF canvas context');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return { canvas, ctx };
      };

      let page = createPageCanvas();

      const addCanvasPageToPdf = () => {
        if (!hasPageContent) return;
        if (!isFirstPdfPage) pdf.addPage();
        pdf.addImage(page.canvas.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, pageWidthMm, pageHeightMm);
        isFirstPdfPage = false;
      };

      for (const block of blocks) {
        const canvas = await html2canvas(block, {
          scale,
          useCORS: true,
          backgroundColor: '#ffffff',
          width: block.scrollWidth,
          windowWidth: element.scrollWidth,
        });
        let sourceYPx = 0;
        const blockHeightPx = canvas.height / scale;
        const maxContentHeightPx = bottomLimitPx - pagePaddingPx;

        if (hasPageContent && cursorYPx + blockHeightPx > bottomLimitPx) {
          addCanvasPageToPdf();
          page = createPageCanvas();
          cursorYPx = pagePaddingPx;
          hasPageContent = false;
        }

        while (sourceYPx < blockHeightPx) {
          const availableHeightPx = bottomLimitPx - cursorYPx;
          const sliceHeightPx = Math.min(blockHeightPx - sourceYPx, availableHeightPx, maxContentHeightPx);

          page.ctx.drawImage(
            canvas,
            0,
            sourceYPx * scale,
            canvas.width,
            sliceHeightPx * scale,
            pagePaddingPx * scale,
            cursorYPx * scale,
            canvas.width,
            sliceHeightPx * scale
          );

          cursorYPx += sliceHeightPx + blockGapPx;
          sourceYPx += sliceHeightPx;
          hasPageContent = true;

          if (sourceYPx < blockHeightPx) {
            addCanvasPageToPdf();
            page = createPageCanvas();
            cursorYPx = pagePaddingPx;
            hasPageContent = false;
          }
        }
      }

      addCanvasPageToPdf();

      pdf.save(`${data.personal.fullName.replace(/\s+/g, '_')}_CV.pdf`);
      if (wasEditor) setActiveTab('editor');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      restorePreviewStyles?.();
      setExporting(false);
    }
  };

  const InputField = ({
    label,
    value,
    onChange,
    type = 'text',
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
  }) => (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
      />
    </div>
  );

  const SectionHeader = ({ title, section, icon: Icon }: { title: string; section: string; icon: typeof FileText }) => (
    <button
      onClick={() => setExpandedSection(prev => (prev === section ? null : section))}
      className="flex w-full items-center justify-between rounded-md bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
    >
      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="h-4 w-4 text-accent" /> {title}
      </span>
      {expandedSection === section ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="px-4 pb-8 pt-20">
        <div className="mx-auto mb-6 max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-body text-2xl font-semibold text-foreground">{t('cv.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('cv.subtitle')}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-md bg-secondary p-1">
                {(['minimal', 'modern', 'executive'] as CVTemplate[]).map(tmpl => (
                  <button
                    key={tmpl}
                    onClick={() => setTemplate(tmpl)}
                    className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${template === tmpl ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {templateLabels[tmpl]}
                  </button>
                ))}
              </div>
              <button
                onClick={exportPDF}
                disabled={exporting}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <Download className="h-4 w-4" /> {exporting ? 'Đang xuất...' : t('cv.export')}
              </button>
            </div>
          </div>

          <div className="mt-4 flex rounded-md bg-secondary p-1 lg:hidden">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded py-2 text-sm font-medium ${activeTab === 'editor' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                }`}
            >
              <Edit3 className="h-4 w-4" /> {t('cv.editor')}
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded py-2 text-sm font-medium ${activeTab === 'preview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
                }`}
            >
              <Eye className="h-4 w-4" /> {t('cv.preview')}
            </button>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className={`max-h-[calc(100vh-200px)] space-y-3 overflow-y-auto pr-2 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
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

            <SectionHeader title={t('cv.summary')} section="summary" icon={FileText} />
            {expandedSection === 'summary' && (
              <div className="px-1">
                <textarea
                  value={data.summary}
                  onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={4}
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            )}

            <SectionHeader title={t('cv.skills')} section="skills" icon={FileText} />
            {expandedSection === 'skills' && (
              <div className="space-y-3 px-1">
                {data.skills.map((group, gi) => (
                  <div key={group.category}>
                    <label className="mb-1 block text-xs text-muted-foreground">{group.category}</label>
                    <input
                      value={group.items.join(', ')}
                      onChange={e => {
                        const newSkills = [...data.skills];
                        newSkills[gi] = { ...group, items: e.target.value.split(',').map(s => s.trim()).filter(Boolean) };
                        setData(prev => ({ ...prev, skills: newSkills }));
                      }}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                ))}
              </div>
            )}

            <SectionHeader title={t('cv.experience')} section="experience" icon={FileText} />
            {expandedSection === 'experience' && (
              <div className="space-y-4 px-1">
                {data.experience.map((exp, i) => (
                  <div key={`${exp.company}-${i}`} className="space-y-3 rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <button onClick={() => removeExperience(i)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label={t('cv.company')} value={exp.company} onChange={v => updateExperience(i, 'company', v)} />
                      <InputField label={t('cv.role')} value={exp.role} onChange={v => updateExperience(i, 'role', v)} />
                    </div>
                    <InputField label={t('cv.duration')} value={exp.duration} onChange={v => updateExperience(i, 'duration', v)} />
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">{t('cv.description')}</label>
                      <textarea
                        value={exp.description.join('\n')}
                        onChange={e => updateExperience(i, 'description', e.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>
                  </div>
                ))}
                <button onClick={addExperience} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground">
                  <Plus className="h-4 w-4" /> {t('cv.add')} {t('cv.experience')}
                </button>
              </div>
            )}

            <SectionHeader title={t('cv.education')} section="education" icon={FileText} />
            {expandedSection === 'education' && (
              <div className="space-y-4 px-1">
                {data.education.map((edu, i) => (
                  <div key={`${edu.school}-${i}`} className="space-y-3 rounded-lg border border-border p-4">
                    <div className="flex justify-end">
                      <button onClick={() => removeEducation(i)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label={t('cv.school')} value={edu.school} onChange={v => {
                        const next = [...data.education];
                        next[i] = { ...edu, school: v };
                        setData(prev => ({ ...prev, education: next }));
                      }} />
                      <InputField label={t('cv.degree')} value={edu.degree} onChange={v => {
                        const next = [...data.education];
                        next[i] = { ...edu, degree: v };
                        setData(prev => ({ ...prev, education: next }));
                      }} />
                    </div>
                    <InputField label={t('cv.duration')} value={edu.duration} onChange={v => {
                      const next = [...data.education];
                      next[i] = { ...edu, duration: v };
                      setData(prev => ({ ...prev, education: next }));
                    }} />
                  </div>
                ))}
                <button onClick={addEducation} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground">
                  <Plus className="h-4 w-4" /> {t('cv.add')} {t('cv.education')}
                </button>
              </div>
            )}
          </div>

          <div className={`${activeTab === 'editor' ? 'hidden lg:block' : ''}`}>
            <div className="sticky top-24">
              <div className="max-h-[calc(100vh-200px)] overflow-auto rounded-lg bg-muted/30 p-4">
                <div
                  ref={previewRef}
                  className="mx-auto bg-white text-slate-800 shadow-lg"
                  style={{
                    width: '100%',
                    maxWidth: '794px',
                    minHeight: '1123px',
                    padding: '36px',
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: '12px',
                    lineHeight: '1.42',
                    overflowWrap: 'break-word',
                    wordBreak: 'normal',
                  }}
                >
                  <div data-pdf-block="true" className="mb-5 overflow-hidden border border-blue-950">
                    <div className="bg-blue-950 px-5 py-4 text-white">
                      <h1 className="mb-1 text-2xl font-bold uppercase leading-tight">{data.personal.fullName}</h1>
                      <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">{data.personal.title}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 bg-slate-50 px-5 py-3 text-xs text-slate-700">
                      {data.personal.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{data.personal.email}</span>}
                      {data.personal.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{data.personal.phone}</span>}
                      {data.personal.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{data.personal.location}</span>}
                      {data.personal.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{data.personal.website}</span>}
                      {data.personal.github && <span className="flex items-center gap-1"><Github className="h-3 w-3" />{data.personal.github}</span>}
                      {data.personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{data.personal.linkedin}</span>}
                    </div>
                  </div>

                  {data.summary && (
                    <div data-pdf-block="true" className="mb-4">
                      <h2 className={sectionTitleClass}>Giới thiệu bản thân</h2>
                      <p className="text-justify text-slate-700">{data.summary}</p>
                    </div>
                  )}

                  {data.skills.length > 0 && (
                    <div data-pdf-block="true" className="mb-4">
                      <h2 className={sectionTitleClass}>Kỹ năng kỹ thuật</h2>
                      <table className="w-full border-collapse text-left">
                        <tbody>
                          {data.skills.map(group => (
                            <tr key={group.category} className="border border-slate-300">
                              <th className="w-36 bg-blue-950 px-3 py-2 align-top text-xs font-bold uppercase text-white">
                                {group.category}
                              </th>
                              <td className="px-3 py-2 text-slate-700">{group.items.filter(Boolean).join(', ')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {data.experience.length > 0 && (
                    <div className="mb-4">
                      <div data-pdf-block="true">
                        <h2 className={sectionTitleClass}>Kinh nghiệm làm việc</h2>
                      </div>
                      <div className="space-y-3">
                        {data.experience.map((exp, i) => (
                          <div data-pdf-block="true" key={`${exp.company}-preview-${i}`} className="break-inside-avoid border-l-2 border-blue-950 pl-3">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="font-bold text-slate-900">{exp.role}</h3>
                              <span className="shrink-0 text-xs font-medium text-slate-500">{exp.duration}</span>
                            </div>
                            <p className="mb-1 text-sm font-semibold text-blue-900">{exp.company}</p>
                            <ul className="ml-4 list-disc space-y-0.5 text-slate-700">
                              {exp.description.map((d, di) => d.trim() && <li key={di}>{d}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.projects.length > 0 && (
                    <div className="mb-4">
                      <div data-pdf-block="true">
                        <h2 className={sectionTitleClass}>Dự án</h2>
                      </div>
                      <div className="space-y-3">
                        {data.projects.map((proj, i) => (
                          <div data-pdf-block="true" key={`${proj.name}-preview-${i}`} className="break-inside-avoid border-l-2 border-slate-300 pl-3">
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="font-bold text-slate-900">{proj.name}</h3>
                              <span className="shrink-0 text-xs font-medium text-slate-500">{proj.role}</span>
                            </div>
                            <p className="mb-1 text-slate-700">{proj.summary}</p>
                            <p className="text-xs text-slate-500">Công nghệ: {proj.techStack.join(' • ')}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.education.length > 0 && (
                    <div data-pdf-block="true" className="mb-4">
                      <h2 className={sectionTitleClass}>Học vấn</h2>
                      <table className="w-full border-collapse text-left">
                        <tbody>
                          {data.education.map((edu, i) => (
                            <tr key={`${edu.school}-preview-${i}`} className="border border-slate-300">
                              <th className="w-36 bg-slate-100 px-3 py-2 align-top text-xs font-bold uppercase text-blue-950">
                                {edu.duration}
                              </th>
                              <td className="px-3 py-2">
                                <p className="font-bold text-slate-900">{edu.school}</p>
                                <p className="whitespace-pre-line text-slate-700">{edu.degree}</p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {data.certifications.length > 0 && (
                    <div data-pdf-block="true" className="mb-4">
                      <h2 className={sectionTitleClass}>Chứng chỉ</h2>
                      <ul className="ml-4 list-disc space-y-0.5 text-slate-700">
                        {data.certifications.map((cert, i) => <li key={i}>{cert}</li>)}
                      </ul>
                    </div>
                  )}

                  {data.languages.length > 0 && (
                    <div data-pdf-block="true">
                      <h2 className={sectionTitleClass}>Ngôn ngữ</h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-700">
                        {data.languages.map((lang, i) => (
                          <span key={i}>{lang.name} <span className="text-slate-500">({lang.level})</span></span>
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
