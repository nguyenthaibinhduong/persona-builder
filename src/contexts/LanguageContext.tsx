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
    'landing.hero.subtitle': 'Premium portfolio & CV platform built for IT professionals who demand excellence. Showcase your achievements, craft compelling resumes, and land your dream opportunity with data-backed credibility.',
    'landing.hero.cta1': 'Explore Portfolio Demo',
    'landing.hero.cta2': 'Build Your Professional CV',
    'landing.features.title': 'Enterprise-Grade Tools for Your Success',
    'landing.features.subtitle': 'Everything professionals need to build credibility and attract opportunities',
    'landing.feature.portfolio': 'Professional Portfolio Builder',
    'landing.feature.portfolio.desc': 'Create stunning portfolio websites with intuitive drag-and-drop editor, real-time preview, bilingual content support, and mobile-responsive design that impresses.',
    'landing.feature.cv': 'ATS-Optimized CV Builder',
    'landing.feature.cv.desc': 'Professional resume templates designed specifically for IT careers with expert formatting, high-quality PDF export, and recruiter-friendly structure.',
    'landing.feature.bilingual': 'Complete Bilingual Support',
    'landing.feature.bilingual.desc': 'Seamlessly switch between English and Vietnamese for all content, interface, and exported documents with perfect formatting in both languages.',
    'landing.feature.pdf': 'Pixel-Perfect PDF Export',
    'landing.feature.pdf.desc': 'Export ATS-compliant PDFs with professional layout, correct Typography, proper pagination, and recruiter-optimized formatting that stands out.',
    // Portfolio
    'portfolio.hero.greeting': 'Trusted by Enterprise & Startup Teams',
    'portfolio.hero.name': 'Nguyen Thai Binh Duong',
    'portfolio.hero.title': 'Award-Caliber Frontend Developer | High-Performance Solutions',
    'portfolio.hero.subtitle': 'I don\'t just build interfaces—I engineer scalable, pixel-perfect digital experiences that drive measurable business results. 1.5 years of verifiable excellence with 10K+ monthly active users.',
    'portfolio.hero.cta': 'View My Work',
    'portfolio.hero.contact': 'Get in Touch',
    'portfolio.about.title': 'Why Clients Trust Me',
    'portfolio.about.text': 'Proven Track Record: Successfully delivered 5+ production applications serving 10K+ monthly active users with zero downtime. Built dashboards handling 100K+ medical records with HIPAA compliance. Optimized booking flows by 50%. | 💎 Enterprise-Grade Quality: Architected Design Systems reducing development time by 45%, implemented 60fps real-time features, and consistently deliver pixel-perfect implementations exceeding specifications. | 🎯 Results-Driven Partnership: I engineer sustainable solutions that scale. Your project becomes my priority, and reliability is non-negotiable. Every feature is optimized for performance, accessibility, and user delight.',
    'portfolio.skills.title': 'Technical Expertise & Proficiency',
    'portfolio.projects.title': 'Proven Success Stories',
    'portfolio.experience.title': 'Professional Track Record',
    'portfolio.services.title': 'What I Deliver',
    'portfolio.testimonials.title': 'Client Success & Trust',
    'portfolio.contact.title': 'Ready to Transform Your Vision?',
    'portfolio.contact.subtitle': 'Let\'s build something remarkable together. With my proven expertise in high-performance web development, your project will exceed expectations.',
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
    'landing.hero.subtitle': 'Nền tảng portfolio & CV cao cấp dành cho dân IT đòi hỏi sự xuất sắc. Trưng bày thành tựu, tạo CV thuyết phục, nắm bắt cơ hội với độ tin cậy được dữ liệu chứng minh.',
    'landing.hero.cta1': 'Khám Phá Portfolio Demo',
    'landing.hero.cta2': 'Tạo CV Chuyên Nghiệp',
    'landing.features.title': 'Công Cụ Cấp Enterprise Cho Thành Công Của Bạn',
    'landing.features.subtitle': 'Tất cả những gì chuyên gia cần để xây dựng độ tin cậy và thu hút cơ hội',
    'landing.feature.portfolio': 'Xây Dựng Portfolio Chuyên Nghiệp',
    'landing.feature.portfolio.desc': 'Tạo website portfolio ấn tượng với editor kéo thả trực quan, xem trước realtime, hỗ trợ nội dung song ngữ, và responsive design hiệu quả.',
    'landing.feature.cv': 'CV Builder Tối Ưu ATS',
    'landing.feature.cv.desc': 'Mẫu CV chuyên nghiệp thiết kế riêng cho ngành IT với định dạng chuyên nghiệp, xuất PDF chất lượng cao, và cấu trúc thân thiện tuyển dụng.',
    'landing.feature.bilingual': 'Hỗ Trợ Song Ngữ Hoàn Toàn',
    'landing.feature.bilingual.desc': 'Chuyển đổi liền mạch giữa Anh-Việt cho tất cả nội dung, giao diện, tài liệu xuất với định dạng hoàn hảo cả hai ngôn ngữ.',
    'landing.feature.pdf': 'Xuất PDF Hoàn Hảo',
    'landing.feature.pdf.desc': 'Xuất PDF tương thích ATS với bố cục chuyên nghiệp, Typography chuẩn, phân trang đẹp, tối ưu tuyển dụng nổi bật.',
    'portfolio.hero.greeting': 'Được Tin Tưởng Bởi Doanh Nghiệp & Startup',
    'portfolio.hero.name': 'Nguyễn Thái Bình Dương',
    'portfolio.hero.title': 'Frontend Developer Chuyên Nghiệp | Giải Pháp Hiệu Năng Cao',
    'portfolio.hero.subtitle': 'Tôi không chỉ xây dựng giao diện—tôi thiết kế những trải nghiệm số có khả năng mở rộng, đạt chuẩn pixel-perfect, mang lại kết quả kinh doanh đo lường được. 1.5 năm thành công được chứng minh với 10K+ người dùng hoạt động hàng tháng.',
    'portfolio.hero.cta': 'Xem Dự Án',
    'portfolio.hero.contact': 'Liên Hệ',
    'portfolio.about.title': 'Tại Sao Khách Hàng Tin Tưởng Tôi',
    'portfolio.about.text': '✅ Lịch Sử Thành Công: Bàn giao 5+ ứng dụng production với 10K+ user/tháng, 0 downtime. Dashboard xử lý 100K+ bản ghi đạt HIPAA. Tối ưu booking giảm 50%. | 💎 Chất Lượng Enterprise: Design System giảm 45% dev time, real-time 60fps, pixel-perfect mỗi lần. | 🎯 Đối Tác Định Hướng Kết Quả: Thiết kế giải pháp bền vững & mở rộng. Dự án của bạn là ưu tiên hàng đầu. Mỗi tính năng tối ưu hệ thống, tiếp cận & UX.',
    'portfolio.skills.title': 'Chuyên Môn & Trình Độ Kỹ Năng',
    'portfolio.projects.title': 'Những Câu Chuyện Thành Công',
    'portfolio.experience.title': 'Lịch Sử Hành Động Chuyên Nghiệp',
    'portfolio.services.title': 'Tôi Cung Cấp Gì',
    'portfolio.testimonials.title': 'Sự Tin Tưởng & Thành Công Khách Hàng',
    'portfolio.contact.title': 'Sẵn Sàng Biến Tầm Nhìn Thành Hiện Thực?',
    'portfolio.contact.subtitle': 'Cùng xây dựng sản phẩm ấn tượng. Với chuyên môn web hiệu năng cao được chứng minh, dự án của bạn sẽ vượt qua mọi kỳ vọng.',
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
