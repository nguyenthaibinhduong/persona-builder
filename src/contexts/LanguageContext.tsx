import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.cv_builder': 'CV Builder',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    // Landing
    'landing.hero.title': 'Build Your Professional Presence',
    'landing.hero.subtitle': 'Portfolio & CV platform crafted for IT professionals. Showcase your work, build stunning resumes, and land your next opportunity.',
    'landing.hero.cta1': 'View Portfolio Demo',
    'landing.hero.cta2': 'Build Your CV',
    'landing.features.title': 'Everything You Need',
    'landing.features.subtitle': 'One platform to manage your professional identity',
    'landing.feature.portfolio': 'Portfolio Builder',
    'landing.feature.portfolio.desc': 'Create a stunning portfolio website with drag-and-drop sections, real-time preview, and bilingual support.',
    'landing.feature.cv': 'CV Builder',
    'landing.feature.cv.desc': 'Professional resume templates optimized for IT roles with high-quality PDF export.',
    'landing.feature.bilingual': 'Bilingual Support',
    'landing.feature.bilingual.desc': 'Full English and Vietnamese support for all content, UI, and exported documents.',
    'landing.feature.pdf': 'PDF Export',
    'landing.feature.pdf.desc': 'Export pixel-perfect A4 PDFs with proper pagination, fonts, and ATS-friendly formatting.',
    // Portfolio
    'portfolio.hero.greeting': 'Hello, I\'m',
    'portfolio.hero.name': 'Alex Nguyen',
    'portfolio.hero.title': 'Senior Fullstack Engineer & Product Designer',
    'portfolio.hero.subtitle': 'I craft digital experiences that bridge technology and design. 8+ years building products people love.',
    'portfolio.hero.cta': 'View My Work',
    'portfolio.hero.contact': 'Get in Touch',
    'portfolio.about.title': 'About Me',
    'portfolio.about.text': 'I\'m a passionate fullstack engineer and product designer based in Ho Chi Minh City. I specialize in building scalable web applications and intuitive user interfaces that solve real problems.',
    'portfolio.skills.title': 'Skills & Expertise',
    'portfolio.projects.title': 'Featured Projects',
    'portfolio.experience.title': 'Experience',
    'portfolio.services.title': 'Services',
    'portfolio.testimonials.title': 'What Clients Say',
    'portfolio.contact.title': 'Let\'s Work Together',
    'portfolio.contact.subtitle': 'Have a project in mind? I\'d love to hear about it.',
    'portfolio.contact.name': 'Your Name',
    'portfolio.contact.email': 'Your Email',
    'portfolio.contact.message': 'Your Message',
    'portfolio.contact.send': 'Send Message',
    // CV Builder
    'cv.title': 'CV Builder',
    'cv.subtitle': 'Create a professional resume tailored for IT roles',
    'cv.editor': 'Editor',
    'cv.preview': 'Preview',
    'cv.export': 'Export PDF',
    'cv.template': 'Template',
    'cv.personal': 'Personal Info',
    'cv.summary': 'Professional Summary',
    'cv.skills': 'Skills',
    'cv.experience': 'Work Experience',
    'cv.education': 'Education',
    'cv.projects': 'Projects',
    'cv.certifications': 'Certifications',
    'cv.languages': 'Languages',
    'cv.fullname': 'Full Name',
    'cv.jobtitle': 'Job Title',
    'cv.phone': 'Phone',
    'cv.location': 'Location',
    'cv.website': 'Website',
    'cv.company': 'Company',
    'cv.role': 'Role',
    'cv.duration': 'Duration',
    'cv.description': 'Description',
    'cv.add': 'Add',
    'cv.remove': 'Remove',
    'cv.school': 'School',
    'cv.degree': 'Degree',
    'cv.project_name': 'Project Name',
    'cv.tech_stack': 'Tech Stack',
    // Common
    'common.dark_mode': 'Dark Mode',
    'common.light_mode': 'Light Mode',
    'common.language': 'Language',
    'common.download_cv': 'Download CV',
  },
  vi: {
    'nav.home': 'Trang chủ',
    'nav.portfolio': 'Portfolio',
    'nav.cv_builder': 'Tạo CV',
    'nav.about': 'Giới thiệu',
    'nav.contact': 'Liên hệ',
    'landing.hero.title': 'Xây Dựng Hình Ảnh Chuyên Nghiệp',
    'landing.hero.subtitle': 'Nền tảng Portfolio & CV dành cho dân IT. Trưng bày sản phẩm, tạo CV ấn tượng, và nắm bắt cơ hội nghề nghiệp.',
    'landing.hero.cta1': 'Xem Portfolio Demo',
    'landing.hero.cta2': 'Tạo CV Của Bạn',
    'landing.features.title': 'Đầy Đủ Tính Năng',
    'landing.features.subtitle': 'Một nền tảng quản lý toàn bộ hình ảnh chuyên nghiệp',
    'landing.feature.portfolio': 'Xây Dựng Portfolio',
    'landing.feature.portfolio.desc': 'Tạo portfolio ấn tượng với kéo thả section, xem trước realtime, hỗ trợ song ngữ.',
    'landing.feature.cv': 'Tạo CV',
    'landing.feature.cv.desc': 'Mẫu CV chuyên nghiệp tối ưu cho ngành IT với xuất PDF chất lượng cao.',
    'landing.feature.bilingual': 'Hỗ Trợ Song Ngữ',
    'landing.feature.bilingual.desc': 'Hỗ trợ đầy đủ tiếng Anh và tiếng Việt cho nội dung, giao diện và tài liệu xuất.',
    'landing.feature.pdf': 'Xuất PDF',
    'landing.feature.pdf.desc': 'Xuất PDF A4 hoàn hảo với phân trang đẹp, font chuẩn, tương thích ATS.',
    'portfolio.hero.greeting': 'Xin chào, tôi là',
    'portfolio.hero.name': 'Alex Nguyen',
    'portfolio.hero.title': 'Senior Fullstack Engineer & Product Designer',
    'portfolio.hero.subtitle': 'Tôi kiến tạo trải nghiệm số kết nối công nghệ và thiết kế. 8+ năm xây dựng sản phẩm được yêu thích.',
    'portfolio.hero.cta': 'Xem Dự Án',
    'portfolio.hero.contact': 'Liên Hệ',
    'portfolio.about.title': 'Về Tôi',
    'portfolio.about.text': 'Tôi là một fullstack engineer và product designer đam mê, sống tại TP. Hồ Chí Minh. Chuyên xây dựng ứng dụng web có khả năng mở rộng và giao diện trực quan giải quyết vấn đề thực tế.',
    'portfolio.skills.title': 'Kỹ Năng & Chuyên Môn',
    'portfolio.projects.title': 'Dự Án Nổi Bật',
    'portfolio.experience.title': 'Kinh Nghiệm',
    'portfolio.services.title': 'Dịch Vụ',
    'portfolio.testimonials.title': 'Khách Hàng Nói Gì',
    'portfolio.contact.title': 'Hãy Cùng Hợp Tác',
    'portfolio.contact.subtitle': 'Bạn có dự án cần thực hiện? Tôi rất muốn lắng nghe.',
    'portfolio.contact.name': 'Họ và tên',
    'portfolio.contact.email': 'Email',
    'portfolio.contact.message': 'Tin nhắn',
    'portfolio.contact.send': 'Gửi Tin Nhắn',
    'cv.title': 'Tạo CV',
    'cv.subtitle': 'Tạo CV chuyên nghiệp dành cho ngành IT',
    'cv.editor': 'Chỉnh sửa',
    'cv.preview': 'Xem trước',
    'cv.export': 'Xuất PDF',
    'cv.template': 'Mẫu',
    'cv.personal': 'Thông tin cá nhân',
    'cv.summary': 'Giới thiệu chuyên môn',
    'cv.skills': 'Kỹ năng',
    'cv.experience': 'Kinh nghiệm làm việc',
    'cv.education': 'Học vấn',
    'cv.projects': 'Dự án',
    'cv.certifications': 'Chứng chỉ',
    'cv.languages': 'Ngôn ngữ',
    'cv.fullname': 'Họ và tên',
    'cv.jobtitle': 'Chức danh',
    'cv.phone': 'Số điện thoại',
    'cv.location': 'Địa chỉ',
    'cv.website': 'Website',
    'cv.company': 'Công ty',
    'cv.role': 'Vị trí',
    'cv.duration': 'Thời gian',
    'cv.description': 'Mô tả',
    'cv.add': 'Thêm',
    'cv.remove': 'Xoá',
    'cv.school': 'Trường',
    'cv.degree': 'Bằng cấp',
    'cv.project_name': 'Tên dự án',
    'cv.tech_stack': 'Công nghệ',
    'common.dark_mode': 'Chế độ tối',
    'common.light_mode': 'Chế độ sáng',
    'common.language': 'Ngôn ngữ',
    'common.download_cv': 'Tải CV',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    return translations[lang][key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
