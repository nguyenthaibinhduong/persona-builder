import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectDemoEmbed from '@/components/ProjectDemoEmbed';
import { useAdmin } from '@/contexts/AdminContext';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import BookingModal from '@/components/BookingModal';
import type { BookingService } from '@/components/BookingModal';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Terminal,
  Code2,
  Rocket,
  Sparkles,
  Layers,
  Cpu,
  Image as ImageIcon,
  GraduationCap,
  Quote,
  Mail,
  Phone,
  MapPin,
  Globe,
  GitBranch,
  Wand2,
  Zap,
  Calendar,
  CheckCircle,
  ShoppingCart,
  Smartphone,
  Palette,
  Network,
  FileText,
  Gauge,
  LayoutGrid,
  MessageSquare,
  Key,
  CheckSquare,
} from 'lucide-react';
import { useState, useMemo, ReactNode, useEffect } from 'react';

// ============================================================================
// SENIOR-STYLE PORTFOLIO — ONE FILE ONLY
// - Không tách components
// - Không thêm import mới
// - Toàn bộ nội dung VI/EN nằm trong file này để bạn copy/dán và sửa nhanh
// ============================================================================

type Lang = 'vi' | 'en';

interface SkillItem {
  name: string;
  level?: string;
}

interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  problem: string;
  solution: string;
  impact: string;
  highlights: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

interface ExperienceItem {
  id: string;
  duration: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
}

interface QuickFact {
  label: string;
  value: string;
}

interface MetricItem {
  value: string;
  label: string;
  helper: string;
}

interface WorkflowStep {
  title: string;
  description: string;
}

interface ServiceItem {
  title: string;
  description: string;
}

interface PortfolioContent {
  personal: {
    fullName: string;
    title: string;
    github: string;
    location: string;
    email: string;
    phone: string;
  };
  hero: {
    badge: string;
    availability: string;
    headline: string;
    subHeadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  summary: string;
  aboutText: string;
  aboutDetails: string[];
  metrics: MetricItem[];
  quickFacts: QuickFact[];
  serviceItems: ServiceItem[];
  skillCategories: SkillCategory[];
  aiWorkflow: WorkflowStep[];
  projects: ProjectItem[];
  nowBuilding: {
    title: string;
    description: string;
    techStack: string[];
    status: string;
    link: string;
    bullets: string[];
  };
  experiences: ExperienceItem[];
  education: {
    school: string;
    degree: string;
    duration: string;
    note: string;
  };
  philosophyQuote: string;
  contact: {
    title: string;
    description: string;
  };
}

const portfolioContent: Record<Lang, PortfolioContent> = {
  vi: {
    personal: {
      fullName: 'Nguyễn Thái Bình Dương',
      title: 'Frontend Developer / React Native Developer',
      github: 'github.com/nguyenthaibinhduong',
      location: 'Quận 12, TP. Hồ Chí Minh',
      email: 'natteam1998@gmail.com',
      phone: '0395659769',
    },
    hero: {
      badge: 'Portfolio / Product-minded Frontend',
      availability: 'Sẵn sàng nhận việc Frontend / React Native',
      headline: 'Xây giao diện rõ ràng, mượt, responsive và dễ mở rộng.',
      subHeadline:
        'Mình tập trung vào UI có tính sản phẩm: component tái sử dụng, state rõ ràng, API flow ổn định, mobile-first responsive và trải nghiệm người dùng chỉn chu trên web/mobile.',
      primaryCta: 'Xem dự án nổi bật',
      secondaryCta: 'Liên hệ ngay',
    },
    summary:
      'Frontend Developer với 2 năm kinh nghiệm thực tế trong phát triển web/mobile bằng ReactJS, NextJS, React Native và TypeScript. Có kinh nghiệm xây dựng UI theo component-based architecture, tích hợp REST API, quản lý state, tối ưu responsive layout và cải thiện trải nghiệm mobile/tablet cho sản phẩm thực tế.',
    aboutText:
      'Mình không chỉ dựng giao diện theo mockup, mà cố gắng hiểu luồng nghiệp vụ, trạng thái dữ liệu và hành vi người dùng để tạo ra sản phẩm dễ dùng, dễ bảo trì và dễ mở rộng. Khi làm frontend, mình ưu tiên clean structure, reusable component, responsive layout, loading/empty/error state rõ ràng và UI consistency.',
    aboutDetails: [
      'Có kinh nghiệm triển khai giao diện mobile/tablet cho sản phẩm chính quyền điện tử, nhiều màn hình dữ liệu và nhiều trạng thái nghiệp vụ.',
      'Làm việc tốt với REST API, Redux Toolkit, TypeScript, component base, UI state và tối ưu render cho danh sách lớn.',
      'Chủ động dùng AI như Copilot, Cursor, ChatGPT để tăng tốc, nhưng vẫn tự review logic, code quality và edge cases trước khi ship.',
    ],
    metrics: [
      { value: '2+', label: 'Năm kinh nghiệm', helper: 'Làm sản phẩm web/mobile thực tế' },
      { value: '20+', label: 'Màn hình mobile', helper: 'Form, list, detail, document, notification' },
      { value: '10+', label: 'Reusable modules', helper: 'Button, card, list, empty state, layout' },
      { value: '100%', label: 'Product mindset', helper: 'Code chạy ổn, UI rõ, UX dễ dùng' },
    ],
    quickFacts: [
      { label: 'Vị trí', value: 'Quận 12, TP.HCM' },
      { label: 'Vai trò mạnh nhất', value: 'Frontend Web / Mobile UI' },
      { label: 'Đang tập trung', value: 'React Native, UX, AI-assisted dev' },
      { label: 'Ngôn ngữ', value: 'Tiếng Việt, English' },
    ],
    serviceItems: [
      {
        title: 'Responsive Web UI',
        description: 'Xây landing page, portfolio, dashboard và web app responsive tốt trên mobile/tablet/desktop.',
      },
      {
        title: 'React Native Mobile App',
        description: 'Phát triển màn hình mobile có list, form, detail, upload, notification, document flow và API integration.',
      },
      {
        title: 'Frontend Architecture',
        description: 'Tổ chức component, state, API service, loading state, empty state và error handling rõ ràng để dễ maintain.',
      },
      {
        title: 'UI Polish & Refactor',
        description: 'Làm đẹp giao diện cũ, chuẩn hóa spacing, typography, card, animation và flow để nhìn chuyên nghiệp hơn.',
      },
    ],
    skillCategories: [
      {
        id: 'frontend-core',
        name: 'Frontend Core',
        description: 'Nền tảng chính để xây web app hiện đại, rõ cấu trúc và dễ scale.',
        skills: [
          { name: 'ReactJS' },
          { name: 'NextJS' },
          { name: 'TypeScript' },
          { name: 'JavaScript ES6+' },
          { name: 'HTML5' },
          { name: 'CSS3' },
          { name: 'Component Design' },
        ],
      },
      {
        id: 'mobile',
        name: 'Mobile App',
        description: 'Tập trung trải nghiệm mobile/tablet, xử lý nhiều trạng thái và dữ liệu thực tế.',
        skills: [
          { name: 'React Native' },
          { name: 'Tailwind Css' },
          { name: 'Redux Toolkit' },
          { name: 'REST API' },
          { name: 'Form Flow' },
          { name: 'List Performance' },
        ],
      },
      {
        id: 'ui-ux',
        name: 'UI / UX Execution',
        description: 'Biến yêu cầu thành giao diện dễ dùng, đồng bộ style và responsive tốt.',
        skills: [
          { name: 'TailwindCSS' },
          { name: 'Responsive Design' },
          { name: 'Mobile-first' },
          { name: 'Design System' },
          { name: 'Micro-interaction' },
          { name: 'Figma Handoff' },
        ],
      },
      {
        id: 'workflow',
        name: 'Workflow & Delivery',
        description: 'Làm việc theo quy trình, biết debug, phối hợp backend/QA và ship nhanh.',
        skills: [
          { name: 'Git' },
          { name: 'GitHub' },
          { name: 'Postman' },
          { name: 'Docker Basic' },
          { name: 'Firebase' },
          { name: 'Agile/Scrum' },
        ],
      },
      {
        id: 'ai',
        name: 'AI-assisted Dev',
        description: 'Dùng AI để tăng tốc nhưng vẫn kiểm soát yêu cầu, logic và chất lượng code.',
        skills: [
          { name: 'GitHub Copilot' },
          { name: 'Cursor AI' },
          { name: 'ChatGPT' },
          { name: 'Claude AI' },
          { name: 'Prompting' },
          { name: 'Code Review' },
        ],
      },
    ],
    aiWorkflow: [
      {
        title: 'Hiểu yêu cầu',
        description: 'Tách nghiệp vụ thành flow, state, API dependency và edge case trước khi dựng UI.',
      },
      {
        title: 'Thiết kế cấu trúc',
        description: 'Chia layout, component, data model và reusable pattern để màn hình sau làm nhanh hơn.',
      },
      {
        title: 'Code nhanh cùng AI',
        description: 'Dùng AI để tạo boilerplate, refactor, gợi ý xử lý lỗi và tăng tốc các phần lặp lại.',
      },
      {
        title: 'Review thủ công',
        description: 'Tự kiểm tra logic, naming, responsive, loading/error state và behavior trên thiết bị nhỏ.',
      },
      {
        title: 'Ship & cải tiến',
        description: 'Kiểm tra thực tế, sửa lỗi theo feedback, tối ưu UI/UX và giữ codebase sạch dần theo thời gian.',
      },
    ],
    projects: [
      {
        id: 'hdnd-so',
        title: 'HĐND Số — Mobile App',
        category: 'Government Tech',
        description:
          'Ứng dụng mobile/tablet phục vụ quy trình làm việc số hóa cho cơ quan chính quyền: lịch họp, tài liệu, thông báo, lấy ý kiến, thư viện cá nhân và hậu cần.',
        role: 'Frontend Mobile Developer',
        problem:
          'Người dùng cần thao tác với nhiều nhóm dữ liệu, tài liệu và thông báo trên thiết bị mobile/tablet nhưng vẫn phải giữ giao diện rõ, dễ đọc và dễ tìm kiếm.',
        solution:
          'Xây dựng UI theo reusable components, chuẩn hóa list/detail/form state, tích hợp REST API và xử lý loading, empty, error, success state nhất quán.',
        impact:
          'Giúp các màn hình nghiệp vụ có trải nghiệm ổn định hơn, dễ mở rộng thêm module mới và giảm lặp code khi phát triển màn hình tương tự.',
        highlights: [
          'Thiết kế lại nhiều màn hình theo hướng mobile-first và tablet-friendly.',
          'Tổ chức component dùng lại cho card, list, filter, document, notification và empty state.',
          'Tích hợp API cho luồng dữ liệu lịch họp, tài liệu, ý kiến, thông báo và thư viện cá nhân.',
        ],
        techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST API', 'Tailwind Css'],
        imageUrl: '/images/hdnd-so.png',
      },
      {
        id: 'codesync',
        title: 'CodeSync Chat',
        category: 'SaaS Web App',
        description:
          'Nền tảng chat realtime cho developer team, hướng tới mô hình work-chat kết hợp GitHub, channel, message, presence và quản lý module theo nhu cầu doanh nghiệp.',
        role: 'Full Product Builder / Frontend Owner',
        problem:
          'Team dev cần một không gian trao đổi nhanh nhưng vẫn gắn với ngữ cảnh kỹ thuật như repository, commit, task và thông báo realtime.',
        solution:
          'Xây dựng giao diện chat realtime bằng React, thiết kế landing page bán sản phẩm, tích hợp WebSocket và định hướng kiến trúc multi-service.',
        impact:
          'Tạo được sản phẩm demo để trình bày năng lực với nhà tuyển dụng và làm nền tảng phát triển hướng SaaS trong tương lai.',
        highlights: [
          'Realtime messaging, user presence và giao diện channel theo phong cách modern SaaS.',
          'Landing page có hero, feature sections, pricing mindset và visual preview để chạy marketing.',
          'Định hướng backend gồm Gateway, Auth, Chat, Upload, Notification, Redis, Postgres và MongoDB.',
        ],
        techStack: ['ReactJS', 'TypeScript', 'NestJS', 'Redis', 'WebSocket', 'Docker'],
        demoUrl: 'https://realtime-dev-chatapp-dnq2.vercel.app/',
        githubUrl: 'https://github.com/nguyenthaibinhduong',
        imageUrl: '/images/codesync.png',
      },
      {
        id: 'portfolio-web',
        title: 'Personal Portfolio Website',
        category: 'Portfolio / Branding',
        description:
          'Website cá nhân giới thiệu năng lực frontend/mobile, case study, quy trình làm việc và thông tin liên hệ theo phong cách hiện đại, responsive và dễ mở rộng nội dung.',
        role: 'UI Designer & Frontend Developer',
        problem:
          'Một CV truyền thống khó thể hiện rõ tư duy sản phẩm, khả năng UI và cách xử lý dự án thực tế.',
        solution:
          'Thiết kế portfolio dạng landing page, có hero ấn tượng, metric, service cards, case-study projects và CTA rõ ràng.',
        impact:
          'Tăng độ chuyên nghiệp khi gửi cho nhà tuyển dụng hoặc khách hàng freelance, giúp họ nhìn nhanh được stack, dự án và cách làm việc.',
        highlights: [
          'Responsive layout cho mobile, tablet và desktop.',
          'Nội dung song ngữ VI/EN, dễ chỉnh trong cùng một file.',
          'Animation bằng Framer Motion và UI theo card-based design.',
        ],
        techStack: ['ReactJS', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
        demoUrl: 'https://persona-builder-psi.vercel.app/',
        imageUrl: '/images/portfolio.png',
      },
      {
        id: 'freelance-service-ui',
        title: 'Freelance Service Marketplace UI',
        category: 'Marketplace UI',
        description:
          'Giao diện quản lý dịch vụ freelance: danh sách dịch vụ, lọc/tìm kiếm, chi tiết, hình ảnh, tệp đính kèm, lượt xem và trạng thái hiển thị.',
        role: 'Frontend / API Flow Designer',
        problem:
          'Người tạo dịch vụ cần quản lý nội dung, ảnh, file và trạng thái dịch vụ rõ ràng; người xem cần truy cập nhanh thông tin dịch vụ.',
        solution:
          'Thiết kế UI list/detail theo hướng dashboard, hỗ trợ filter, upload preview, state rõ ràng và liên kết tốt với API backend.',
        impact:
          'Tạo nền tảng để mở rộng các luồng đặt hàng, quản lý dịch vụ và hiển thị portfolio/dịch vụ cho freelancer.',
        highlights: [
          'Luồng list/detail có search, filter, status và empty state.',
          'Thiết kế dữ liệu phù hợp cho thumbnail, attachments và base URL handling.',
          'Tư duy kết nối frontend với backend entity/API để tránh lỗi dữ liệu hiển thị.',
        ],
        techStack: ['ReactJS', 'TypeScript', 'REST API', 'TailwindCSS'],
        demoUrl: 'https://creator.minasoft.vn/',
        imageUrl: '/images/booking.png',
      },
      {
        id: 'react-native-components',
        title: 'Reusable Mobile UI Kit',
        category: 'Component System',
        description:
          'Bộ pattern component cho React Native gồm card, section header, list row, filter chip, document item, empty state, loading skeleton và action sheet.',
        role: 'Component Builder',
        problem:
          'Nhiều màn hình mobile có cấu trúc giống nhau nhưng dễ bị lệch spacing, font size và behavior nếu code lặp lại từng nơi.',
        solution:
          'Tách pattern UI thành component có props rõ ràng, thống nhất spacing, typography, trạng thái và cách xử lý interaction.',
        impact:
          'Giảm thời gian dựng màn hình mới, giữ giao diện đồng bộ và dễ chỉnh style toàn app.',
        highlights: [
          'Chuẩn hóa UI state: loading, empty, error, success.',
          'Tối ưu layout cho mobile nhỏ và tablet.',
          'Dễ tái sử dụng trong nhiều module nghiệp vụ.',
        ],
        techStack: ['React Native', 'TypeScript', 'Tailwind Css', 'Redux Toolkit'],
        imageUrl: '/images/reuse.png',
      },
    ],
    nowBuilding: {
      title: 'Đang xây dựng: CodeSync Chat',
      description:
        'Mình đang phát triển CodeSync Chat như một sản phẩm SaaS nhỏ cho developer team: chat realtime, channel, GitHub context, landing page marketing và kiến trúc backend có thể mở rộng. Đây là dự án thể hiện rõ cách mình tự học, tự thiết kế sản phẩm và tự triển khai end-to-end.',
      techStack: ['React', 'TypeScript', 'NestJS', 'Redis', 'WebSocket', 'Postgres', 'Docker'],
      status: 'Đang phát triển',
      link: 'https://realtime-dev-chatapp-dnq2.vercel.app/',
      bullets: [
        'Thiết kế UI theo hướng SaaS hiện đại, có landing page, dashboard và chat workspace.',
        'Tập trung realtime UX: message flow, online presence, channel và notification mindset.',
        'Triển khai Docker Compose cho nhiều service để mô phỏng môi trường sản phẩm thực tế.',
      ],
    },
    experiences: [
      {
        id: 'minasoft',
        duration: '10/2024 - Hiện tại',
        company: 'Công ty TNHH Phần mềm Minasoft',
        role: 'Frontend Developer — ReactJS / React Native',
        description:
          'Phát triển giao diện web và mobile bằng ReactJS, React Native và TypeScript cho các sản phẩm phần mềm thực tế. Đảm nhận nhiều phần frontend mobile cho dự án HĐND Số, phối hợp với backend và QA để hoàn thiện luồng nghiệp vụ.',
        achievements: [
          'Xây dựng nhiều màn hình mobile/tablet cho HĐND Số: lịch họp, tài liệu, lấy ý kiến, thông báo, thư viện cá nhân và hậu cần.',
          'Tích hợp REST API, xử lý state loading/empty/error/success và kiểm soát dữ liệu hiển thị cho từng màn hình.',
          'Xây dựng reusable components và base UI pattern giúp giảm lặp code, đồng bộ giao diện và tăng tốc phát triển màn hình mới.',
          'Tối ưu trải nghiệm responsive cho mobile/tablet, chú ý khoảng cách, typography, trạng thái danh sách và thao tác người dùng.',
          'Phối hợp với backend developer và QA để debug lỗi, kiểm tra nghiệp vụ, tái hiện bug và cải thiện độ ổn định sản phẩm.',
          'Chủ động dùng AI hỗ trợ refactor, viết boilerplate và phân tích lỗi nhưng vẫn tự kiểm tra logic và chất lượng code.',
        ],
      },
    ],
    education: {
      school: 'Đại học Công nghiệp TP. Hồ Chí Minh (IUH)',
      degree: 'Cử nhân Hệ thống Thông tin',
      duration: '2021 - 2027 (dự kiến)',
      note: 'Tập trung vào lập trình hướng đối tượng, phát triển ứng dụng web, cơ sở dữ liệu, công nghệ phần mềm và quy trình xây dựng hệ thống thông tin.',
    },
    philosophyQuote:
      'Mình muốn frontend không chỉ đẹp ở giao diện, mà còn rõ ở cấu trúc, ổn ở trải nghiệm và dễ phát triển tiếp khi sản phẩm lớn dần.',
    contact: {
      title: 'Cần một frontend biết chăm UI và hiểu sản phẩm?',
      description:
        'Mình sẵn sàng cho cơ hội Frontend / React Native, dự án freelance nhỏ hoặc vai trò cần người có thể biến ý tưởng thành giao diện chạy ổn, responsive và dễ dùng.',
    },
  },

  en: {
    personal: {
      fullName: 'Nguyen Thai Binh Duong',
      title: 'Frontend Developer / React Native Developer',
      github: 'github.com/nguyenthaibinhduong',
      location: 'District 12, Ho Chi Minh City',
      email: 'natteam1998@gmail.com',
      phone: '+84 395 659 769',
    },
    hero: {
      badge: 'Portfolio / Product-minded Frontend',
      availability: 'Open to Frontend / React Native opportunities',
      headline: 'I build clean, responsive, scalable interfaces for real products.',
      subHeadline:
        'I focus on product-minded UI: reusable components, predictable state, reliable API flows, mobile-first responsive layouts, and polished user experiences across web and mobile.',
      primaryCta: 'View selected work',
      secondaryCta: 'Contact me',
    },
    summary:
      'Frontend Developer with 2 years of hands-on experience building web and mobile apps with ReactJS, NextJS, React Native, and TypeScript. Experienced in component-based UI architecture, REST API integration, state management, responsive layouts, and mobile/tablet UX improvements for production software.',
    aboutText:
      'I do not only translate mockups into screens. I try to understand product flows, data states, and user behavior so the final interface is easy to use, maintain, and scale. My frontend work prioritizes clean structure, reusable components, responsive layouts, clear loading/empty/error states, and UI consistency.',
    aboutDetails: [
      'Built mobile/tablet interfaces for an e-government product with many business screens, data states, and document flows.',
      'Comfortable with REST APIs, Redux Toolkit, TypeScript, base components, UI states, and render optimization for large lists.',
      'Use AI tools such as Copilot, Cursor, and ChatGPT to move faster while manually reviewing logic, code quality, and edge cases.',
    ],
    metrics: [
      { value: '2+', label: 'Years of experience', helper: 'Production web/mobile work' },
      { value: '20+', label: 'Mobile screens', helper: 'Forms, lists, details, documents' },
      { value: '10+', label: 'Reusable modules', helper: 'Cards, lists, empty states, layouts' },
      { value: '100%', label: 'Product mindset', helper: 'Stable code, clear UI, smooth UX' },
    ],
    quickFacts: [
      { label: 'Location', value: 'District 12, HCMC' },
      { label: 'Strongest role', value: 'Frontend Web / Mobile UI' },
      { label: 'Currently focused on', value: 'React Native, UX, AI-assisted dev' },
      { label: 'Languages', value: 'Vietnamese, English' },
    ],
    serviceItems: [
      {
        title: 'Responsive Web UI',
        description: 'Build landing pages, portfolios, dashboards, and web apps that work well on mobile, tablet, and desktop.',
      },
      {
        title: 'React Native Mobile App',
        description: 'Develop mobile screens with lists, forms, details, uploads, notifications, documents, and API integration.',
      },
      {
        title: 'Frontend Architecture',
        description: 'Structure components, state, API services, loading states, empty states, and error handling for maintainability.',
      },
      {
        title: 'UI Polish & Refactor',
        description: 'Improve old interfaces with better spacing, typography, cards, animation, and clearer product flows.',
      },
    ],
    skillCategories: [
      {
        id: 'frontend-core',
        name: 'Frontend Core',
        description: 'Core stack for modern, structured, and scalable web apps.',
        skills: [
          { name: 'ReactJS' },
          { name: 'NextJS' },
          { name: 'TypeScript' },
          { name: 'JavaScript ES6+' },
          { name: 'HTML5' },
          { name: 'CSS3' },
          { name: 'Component Design' },
        ],
      },
      {
        id: 'mobile',
        name: 'Mobile App',
        description: 'Mobile/tablet experience, complex data states, and real product flows.',
        skills: [
          { name: 'React Native' },
          { name: 'Tailwind Css' },
          { name: 'Redux Toolkit' },
          { name: 'REST API' },
          { name: 'Form Flow' },
          { name: 'List Performance' },
        ],
      },
      {
        id: 'ui-ux',
        name: 'UI / UX Execution',
        description: 'Turn requirements into consistent, responsive, and easy-to-use interfaces.',
        skills: [
          { name: 'TailwindCSS' },
          { name: 'Responsive Design' },
          { name: 'Mobile-first' },
          { name: 'Design System' },
          { name: 'Micro-interaction' },
          { name: 'Figma Handoff' },
        ],
      },
      {
        id: 'workflow',
        name: 'Workflow & Delivery',
        description: 'Debugging, backend/QA collaboration, and pragmatic delivery.',
        skills: [
          { name: 'Git' },
          { name: 'GitHub' },
          { name: 'Postman' },
          { name: 'Docker Basic' },
          { name: 'Firebase' },
          { name: 'Agile/Scrum' },
        ],
      },
      {
        id: 'ai',
        name: 'AI-assisted Dev',
        description: 'Use AI to accelerate work while keeping logic and quality under control.',
        skills: [
          { name: 'GitHub Copilot' },
          { name: 'Cursor AI' },
          { name: 'ChatGPT' },
          { name: 'Claude AI' },
          { name: 'Prompting' },
          { name: 'Code Review' },
        ],
      },
    ],
    aiWorkflow: [
      {
        title: 'Understand',
        description: 'Break requirements into flows, states, API dependencies, and edge cases before building UI.',
      },
      {
        title: 'Structure',
        description: 'Plan layout, components, data models, and reusable patterns to speed up future screens.',
      },
      {
        title: 'Build with AI',
        description: 'Use AI to generate boilerplate, refactor, debug ideas, and accelerate repetitive work.',
      },
      {
        title: 'Manual review',
        description: 'Check logic, naming, responsiveness, loading/error states, and behavior on small screens.',
      },
      {
        title: 'Ship & improve',
        description: 'Test in real usage, fix feedback, improve UX, and keep the codebase cleaner over time.',
      },
    ],
    projects: [
      {
        id: 'hdnd-so',
        title: 'HĐND Số — Mobile App',
        category: 'Government Tech',
        description:
          'A mobile/tablet app for digital government workflows: meeting schedules, documents, notifications, polling, personal library, and logistics.',
        role: 'Frontend Mobile Developer',
        problem:
          'Users need to work with many data groups, documents, and notifications on mobile/tablet while keeping the interface clear and searchable.',
        solution:
          'Built UI with reusable components, standardized list/detail/form states, integrated REST APIs, and handled loading, empty, error, and success states consistently.',
        impact:
          'Improved business screen stability, made future modules easier to extend, and reduced repeated UI code across similar screens.',
        highlights: [
          'Reworked multiple screens with a mobile-first and tablet-friendly approach.',
          'Created reusable patterns for cards, lists, filters, documents, notifications, and empty states.',
          'Integrated API flows for meetings, documents, polling, notifications, and personal library features.',
        ],
        techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST API', 'Tailwind Css'],
        imageUrl: '/images/hdnd-so.png',
      },
      {
        id: 'codesync',
        title: 'CodeSync Chat',
        category: 'SaaS Web App',
        description:
          'A real-time chat platform for developer teams, moving toward a work-chat product with GitHub context, channels, messages, presence, and module-based business usage.',
        role: 'Full Product Builder / Frontend Owner',
        problem:
          'Developer teams need fast communication while keeping technical context such as repositories, commits, tasks, and realtime notifications close to the conversation.',
        solution:
          'Built a realtime chat UI with React, designed a product landing page, integrated WebSocket flows, and planned a scalable multi-service architecture.',
        impact:
          'Created a demo product to showcase product thinking, frontend skill, and end-to-end execution to recruiters or clients.',
        highlights: [
          'Realtime messaging, user presence, and a modern SaaS-style channel interface.',
          'Landing page with hero, feature sections, pricing mindset, and visual product preview.',
          'Backend direction includes Gateway, Auth, Chat, Upload, Notification, Redis, Postgres, and MongoDB.',
        ],
        techStack: ['ReactJS', 'TypeScript', 'NestJS', 'Redis', 'WebSocket', 'Docker'],
        demoUrl: 'https://realtime-dev-chatapp-dnq2.vercel.app/',
        githubUrl: 'https://github.com/nguyenthaibinhduong',
        imageUrl: '/images/codesync.png',
      },
      {
        id: 'portfolio-web',
        title: 'Personal Portfolio Website',
        category: 'Portfolio / Branding',
        description:
          'A personal portfolio website presenting frontend/mobile capability, case studies, work process, and contact information with a modern responsive landing-page style.',
        role: 'UI Designer & Frontend Developer',
        problem:
          'A traditional CV does not fully show product thinking, UI execution, and real project handling.',
        solution:
          'Designed the portfolio as a landing page with a strong hero, metrics, service cards, case-study projects, and clear CTAs.',
        impact:
          'Creates a more professional first impression for recruiters or freelance clients by quickly showing stack, projects, and workflow.',
        highlights: [
          'Responsive layout for mobile, tablet, and desktop.',
          'Bilingual VI/EN content that is easy to edit in one file.',
          'Framer Motion animation and card-based visual design.',
        ],
        techStack: ['ReactJS', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
        githubUrl: 'https://github.com/nguyenthaibinhduong',
        imageUrl: '/images/portfolio.png',
      },
      {
        id: 'freelance-service-ui',
        title: 'Freelance Service Marketplace UI',
        category: 'Marketplace UI',
        description:
          'A service management UI for freelancers: service list, filters, search, detail, images, attachments, view count, and visibility status.',
        role: 'Frontend / API Flow Designer',
        problem:
          'Creators need to manage service content, images, files, and status clearly; viewers need quick access to service information.',
        solution:
          'Designed dashboard-style list/detail UI with filters, upload preview, clear states, and strong alignment with backend APIs.',
        impact:
          'Provides a foundation for expanding ordering flows, service management, and public freelancer service pages.',
        highlights: [
          'List/detail flow with search, filter, status, and empty states.',
          'Data design mindset for thumbnail, attachments, and base URL handling.',
          'Frontend-backend alignment to avoid broken data display.',
        ],
        techStack: ['ReactJS', 'TypeScript', 'REST API', 'TailwindCSS'],
        imageUrl: '/images/booking.png',
      },
      {
        id: 'react-native-components',
        title: 'Reusable Mobile UI Kit',
        category: 'Component System',
        description:
          'A React Native UI pattern kit including cards, section headers, list rows, filter chips, document items, empty states, loading skeletons, and action sheets.',
        role: 'Component Builder',
        problem:
          'Many mobile screens share similar structures but easily drift in spacing, typography, and behavior when each screen is coded separately.',
        solution:
          'Extracted UI patterns into components with clear props, consistent spacing, typography, states, and interactions.',
        impact:
          'Speeds up new screen development, keeps the interface consistent, and makes app-wide style changes easier.',
        highlights: [
          'Standardized loading, empty, error, and success states.',
          'Optimized layouts for small phones and tablets.',
          'Reusable across multiple business modules.',
        ],
        techStack: ['React Native', 'TypeScript', 'Tailwind Css', 'Redux Toolkit'],
        imageUrl: '/images/reuse.png',
      },
    ],
    nowBuilding: {
      title: 'Now building: CodeSync Chat',
      description:
        'I am building CodeSync Chat as a small SaaS product for developer teams: realtime chat, channels, GitHub context, a marketing landing page, and a scalable backend architecture. This project shows how I learn, design, and ship end-to-end.',
      techStack: ['React', 'TypeScript', 'NestJS', 'Redis', 'WebSocket', 'Postgres', 'Docker'],
      status: 'In active development',
      link: 'https://realtime-dev-chatapp-dnq2.vercel.app/',
      bullets: [
        'Modern SaaS UI with landing page, dashboard, and chat workspace direction.',
        'Focus on realtime UX: message flow, online presence, channels, and notification mindset.',
        'Docker Compose deployment for multiple services to simulate a production-like environment.',
      ],
    },
    experiences: [
      {
        id: 'minasoft',
        duration: 'Oct 2024 - Present',
        company: 'Minasoft Software Co., Ltd.',
        role: 'Frontend Developer — ReactJS / React Native',
        description:
          'Building web and mobile interfaces with ReactJS, React Native, and TypeScript for production software. Owned multiple mobile frontend parts of the HĐND Số project and worked with backend and QA to complete business flows.',
        achievements: [
          'Built multiple mobile/tablet screens for HĐND Số: meeting schedules, documents, polling, notifications, personal library, and logistics.',
          'Integrated REST APIs, handled loading/empty/error/success states, and controlled display data for each screen.',
          'Built reusable components and base UI patterns to reduce repetition, improve consistency, and speed up future screens.',
          'Improved responsive experience for mobile/tablet with attention to spacing, typography, list states, and user actions.',
          'Worked with backend developers and QA to debug issues, verify business flows, reproduce bugs, and improve product stability.',
          'Used AI tools for refactoring, boilerplate, and error analysis while personally validating logic and code quality.',
        ],
      },
    ],
    education: {
      school: 'Industrial University of Ho Chi Minh City (IUH)',
      degree: 'B.Sc. in Information Systems',
      duration: '2021 - 2027 (expected)',
      note: 'Focused on object-oriented programming, web application development, databases, software engineering, and information system design.',
    },
    philosophyQuote:
      'I want frontend to be more than visual polish: it should be clear in structure, stable in experience, and easy to extend as the product grows.',
    contact: {
      title: 'Need a frontend developer who cares about UI and product?',
      description:
        'I am open to Frontend / React Native opportunities, small freelance projects, or roles that need someone who can turn ideas into stable, responsive, and usable interfaces.',
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const codeLineVariant: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.45 + i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

const floatChip: Variants = {
  animate: (i: number = 0) => ({
    y: [0, -10, 0],
    rotate: [0, i % 2 === 0 ? 1.5 : -1.5, 0],
    transition: { duration: 3.8 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 },
  }),
};

const typeScale = {
  heroTitle: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.98] tracking-[-0.055em]',
  sectionTitle: 'text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-[1.05]',
  lead: 'text-base md:text-lg lg:text-xl leading-relaxed',
  body: 'text-sm md:text-base leading-relaxed',
};

const eyebrow =
  'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-[11px] md:text-xs uppercase tracking-[0.2em]';

const Portfolio = () => {
  const { sectionTitle, body, lead } = typeScale;
  const { lang, setLang } = useLanguage();
  const { sections, testimonials } = useAdmin();
  const { profile, projects: dbProjects, services: dbServices } = usePortfolioData();

  const data = portfolioContent[lang];

  // Merge Supabase data with hardcode fallback
  const resolvedName    = profile?.name  || data.personal.fullName;
  const resolvedTitle   = profile?.title || data.personal.title;
  const resolvedEmail   = profile?.email || data.personal.email;
  const resolvedPhone   = profile?.phone || data.personal.phone;
  const resolvedGithub  = profile?.github || data.personal.github;
  const resolvedSummary = profile?.summary || data.hero.subHeadline;

  const projects = dbProjects.length > 0
    ? dbProjects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        description: p.description,
        role: '',
        problem: '',
        solution: '',
        impact: '',
        highlights: [],
        techStack: p.tech_stack ?? [],
        demoUrl: p.demo_url ?? undefined,
        githubUrl: p.github_url ?? undefined,
        imageUrl: p.image_url ?? undefined,
        featured: p.featured,
      }))
    : data.projects.map(p => ({ ...p, featured: false }));

  const dbServicesMapped = dbServices.length > 0 ? dbServices : null;

  const experiences = data.experiences;
  const skillCategories = data.skillCategories;

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'cyber';
  });

  const [bookingService, setBookingService] = useState<BookingService | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = (svc: BookingService) => {
    setBookingService(svc);
    setBookingOpen(true);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (lang === 'vi') {
      document.documentElement.style.setProperty('--heading-font', "'Be Vietnam Pro', 'Plus Jakarta Sans', system-ui, sans-serif");
      document.documentElement.style.setProperty('--body-font', "'Be Vietnam Pro', 'Inter', system-ui, sans-serif");
    } else {
      document.documentElement.style.setProperty('--heading-font', "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif");
      document.documentElement.style.setProperty('--body-font', "'Inter', system-ui, -apple-system, sans-serif");
    }
  }, [lang]);

  const themes = [
    { id: 'cyber', name: 'Teal' },
    { id: 'sunset', name: 'Copper' },
    { id: 'forest', name: 'Forest' },
    { id: 'royal', name: 'Royal' },
    { id: 'ocean', name: 'Ocean' },
  ];

  const themeClasses: Record<string, { color: string; active: string; hover: string }> = {
    cyber: {
      color: 'bg-[#14b8a6]',
      active: 'border-foreground shadow-lg shadow-[#14b8a6]/40 scale-110',
      hover: 'hover:shadow-lg hover:shadow-[#14b8a6]/40 hover:scale-110'
    },
    sunset: {
      color: 'bg-[#f97316]',
      active: 'border-foreground shadow-lg shadow-[#f97316]/40 scale-110',
      hover: 'hover:shadow-lg hover:shadow-[#f97316]/40 hover:scale-110'
    },
    forest: {
      color: 'bg-[#10b981]',
      active: 'border-foreground shadow-lg shadow-[#10b981]/40 scale-110',
      hover: 'hover:shadow-lg hover:shadow-[#10b981]/40 hover:scale-110'
    },
    royal: {
      color: 'bg-[#a855f7]',
      active: 'border-foreground shadow-lg shadow-[#a855f7]/40 scale-110',
      hover: 'hover:shadow-lg hover:shadow-[#a855f7]/40 hover:scale-110'
    },
    ocean: {
      color: 'bg-[#0ea5e9]',
      active: 'border-foreground shadow-lg shadow-[#0ea5e9]/40 scale-110',
      hover: 'hover:shadow-lg hover:shadow-[#0ea5e9]/40 hover:scale-110'
    }
  };

  const [activeCategory, setActiveCategory] = useState('All');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const visibleSections = useMemo(
    () => sections.filter(s => s.visible).sort((a, b) => a.order - b.order).map(s => s.key),
    [sections]
  );

  const projectCategories = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.category)))], [projects]);
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  const factIcons = [MapPin, Zap, Cpu, Globe];
  const serviceIcons = [Layers, Code2, Cpu, Sparkles];
  const skillIcons = [Code2, Phone, Layers, GitBranch, Wand2];

  const icon = (src: string, alt: string, inline: boolean = true) => (
    <img
      src={src}
      alt={alt}
      width={inline ? 18 : 20}
      height={inline ? 18 : 20}
      loading="lazy"
      className={inline ? "mr-2 inline-block object-contain" : "object-contain w-5 h-5"}
    />
  );

  const lucideIcon = (IconComponent: any, color: string = "text-accent", inline: boolean = true) => (
    <IconComponent className={inline ? `w-[18px] h-[18px] mr-2 inline-block object-contain ${color}` : `w-5 h-5 object-contain ${color}`} />
  );

  const getSkillIcon = (name: string, inline: boolean = true) => {
    const n = name.toLowerCase();

    // 1. BRANDED LOGOS (Simple Icons / Devicon / NPM Mirror)
    if (n.includes("react native"))
      return icon("https://cdn.simpleicons.org/react", name, inline);

    if (n.includes("react"))
      return icon("https://cdn.simpleicons.org/react", name, inline);

    if (n.includes("node"))
      return icon("https://cdn.simpleicons.org/nodedotjs", name, inline);

    if (n.includes("typescript"))
      return icon("https://cdn.simpleicons.org/typescript", name, inline);

    if (n.includes("javascript") || n.includes("js"))
      return icon("https://cdn.simpleicons.org/javascript", name, inline);

    if (n.includes("next"))
      return icon("https://cdn.simpleicons.org/nextdotjs", name, inline);

    if (n.includes("redux"))
      return icon("https://cdn.simpleicons.org/redux", name, inline);

    if (n.includes("tailwind"))
      return icon("https://cdn.simpleicons.org/tailwindcss", name, inline);

    if (n.includes("git") && !n.includes("github"))
      return icon("https://cdn.simpleicons.org/git", name, inline);

    if (n.includes("github"))
      return icon("https://cdn.simpleicons.org/github", name, inline);

    if (n.includes("docker"))
      return icon("https://cdn.simpleicons.org/docker", name, inline);

    if (n.includes("firebase"))
      return icon("https://cdn.simpleicons.org/firebase", name, inline);

    if (n.includes("supabase"))
      return icon("https://cdn.simpleicons.org/supabase", name, inline);

    if (n.includes("mysql"))
      return icon("https://cdn.simpleicons.org/mysql", name, inline);

    if (n.includes("postgresql") || n.includes("postgres"))
      return icon("https://cdn.simpleicons.org/postgresql", name, inline);

    if (n.includes("mongodb"))
      return icon("https://cdn.simpleicons.org/mongodb", name, inline);

    if (n.includes("express"))
      return icon("https://cdn.simpleicons.org/express", name, inline);

    if (n.includes("nest"))
      return icon("https://cdn.simpleicons.org/nestjs", name, inline);

    if (n.includes("php"))
      return icon("https://cdn.simpleicons.org/php", name, inline);

    if (n.includes("figma"))
      return icon("https://cdn.simpleicons.org/figma", name, inline);

    if (n.includes("html"))
      return icon("https://cdn.simpleicons.org/html5", name, inline);

    if (n.includes("css"))
      return icon("https://cdn.simpleicons.org/css", name, inline);

    if (n.includes("chatgpt") || n.includes("openai"))
      return icon("https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openai.png", name, inline);

    if (n.includes("claude"))
      return icon("https://cdn.simpleicons.org/anthropic", name, inline);

    if (n.includes("gemini"))
      return icon("https://cdn.simpleicons.org/googlegemini", name, inline);

    if (n.includes("copilot"))
      return icon("https://cdn.simpleicons.org/githubcopilot", name, inline);

    if (n.includes("cursor"))
      return icon(
        "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/cursor.png",
        name,
        inline
      );

    if (n.includes("vscode") || n.includes("vs code"))
      return icon("https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=000000", name, inline);

    if (n.includes("vercel"))
      return icon("https://cdn.simpleicons.org/vercel", name, inline);

    if (n.includes("postman"))
      return icon("https://cdn.simpleicons.org/postman", name, inline);

    // 2. CONCEPTUAL LOGOS (Lucide Icons)
    if (n.includes("mobile-first") || n.includes("mobile"))
      return lucideIcon(Smartphone, "text-sky-400", inline);

    if (n.includes("design system") || n.includes("ui/ux") || n.includes("ux"))
      return lucideIcon(Palette, "text-rose-400", inline);

    if (n.includes("micro-interaction") || n.includes("sparkles") || n.includes("reusable components"))
      return lucideIcon(Sparkles, "text-amber-400", inline);

    if (n.includes("rest api") || n.includes("api"))
      return lucideIcon(Network, "text-teal-400", inline);

    if (n.includes("form flow"))
      return lucideIcon(FileText, "text-blue-400", inline);

    if (n.includes("list performance") || n.includes("performance") || n.includes("responsive design"))
      return lucideIcon(Gauge, "text-emerald-400", inline);

    if (n.includes("agile") || n.includes("scrum"))
      return lucideIcon(LayoutGrid, "text-purple-400", inline);

    if (n.includes("prompt") || n.includes("prompting"))
      return lucideIcon(MessageSquare, "text-pink-400", inline);

    if (n.includes("code review"))
      return lucideIcon(CheckSquare, "text-cyan-400", inline);

    if (n.includes("auth") || n.includes("jwt"))
      return lucideIcon(Key, "text-amber-400", inline);

    // Default Fallback
    return icon("https://cdn.simpleicons.org/codeium", name, inline);
  };

  const sectionMap: Record<string, ReactNode> = {
    hero: (
      <section key="hero" className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background Grid and Radial Gradient */}
        <div className="absolute inset-0 -z-10 bg-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.04),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.04),transparent_35%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px]" />

        {/* Floating Particles Canvas/Effect */}
        <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-accent/5 blur-[80px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[20%] right-[15%] w-96 h-96 rounded-full bg-primary/5 blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        <div className="container-wide w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. HERO PROFILE CARD (Occupies 2 columns, split internally 50/50) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-2xl border-2 border-accent/40 bg-card p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-lg shadow-accent/5 md:col-span-2 lg:col-span-2"
            >
              {/* Highlight background glow */}
              <div className="absolute -inset-24 rounded-[3rem] bg-gradient-to-tr from-accent/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative z-10 w-full">
                {/* Left Side: Profile info */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/50 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-6">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      {data.hero.availability}
                    </span>

                    <div className="mb-5">
                      <h1 className="text-2xl font-extrabold text-foreground tracking-tight leading-none">{resolvedName}</h1>
                      <p className="text-xs text-accent font-semibold mt-2 font-mono uppercase tracking-wider">{resolvedTitle}</p>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black tracking-tight leading-tight mb-3">
                      {lang === 'vi' 
                        ? <>Xây dựng <span className="text-accent">sản phẩm số</span> hiệu năng cao</>
                        : <>Building high-performance <span className="text-accent">digital products</span></>}
                    </h2>

                    <p className="text-[11px] md:text-xs leading-relaxed text-muted-foreground line-clamp-4">
                      {resolvedSummary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/40">
                    <a
                      href="#projects"
                      className="flex-1 text-center py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:opacity-90 hover:scale-[0.98] active:scale-[0.96]"
                    >
                      {data.hero.primaryCta}
                    </a>
                    <a
                      href="#contact"
                      className="flex-1 text-center py-2.5 rounded-xl border border-border bg-background text-foreground text-xs font-semibold hover:bg-secondary transition-all hover:scale-[0.98] active:scale-[0.96]"
                    >
                      {data.hero.secondaryCta}
                    </a>
                  </div>
                </div>

                {/* Right Side: Large Avatar Image with same proportion */}
                <div className="relative rounded-xl border border-border/30 bg-secondary/20 overflow-hidden flex items-center justify-center min-h-[220px] md:min-h-[260px] shadow-inner group">
                  <img
                    src="/images/avatar.png"
                    alt={resolvedName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle decorative bottom glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* 3. RECENT WORK */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 flex flex-col justify-between overflow-hidden shadow-sm hover:border-accent/40 hover:shadow-accent/5 transition-all duration-300"
            >
              {/* Highlight background */}
              <div className="absolute -right-12 -top-12 w-36 h-36 bg-accent/5 rounded-full blur-2xl" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Recent Work</span>
                  <span className="text-[10px] font-mono text-muted-foreground">SaaS Web App</span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                  CodeSync Chat
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {lang === 'vi'
                    ? 'Nền tảng cộng tác và chat realtime dành cho đội ngũ lập trình viên, tích hợp ngữ cảnh kỹ thuật.'
                    : 'Real-time collaboration and messaging platform designed for developers, integrating code contexts.'}
                </p>

                {/* Styled Image Preview */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-border/40 shadow-sm bg-secondary/20 relative group-hover:scale-[1.01] transition-all duration-300">
                  <img
                    src="/images/codesync.png"
                    alt="CodeSync mockup"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
                </div>
              </div>

              <div className="mt-5">
                <a
                  href="#projects"
                  className="w-full py-2 px-4 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground text-xs font-semibold transition-all duration-200 inline-flex items-center justify-center gap-1.5"
                >
                  {lang === 'vi' ? 'Xem dự án' : 'View Project'} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* 4. CORE SKILLS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:border-accent/40 hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Core Skills</span>
                <span className="text-[10px] font-mono text-muted-foreground">Expertise</span>
              </div>

              {/* Skills Grid matching design */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: 'React', icon: '⚛️', color: 'text-sky-400 bg-sky-400/5 border-sky-400/20' },
                  { name: 'Node.js', icon: '🟢', color: 'text-emerald-400 bg-emerald-400/5 border-emerald-400/20' },
                  { name: 'TypeScript', icon: '🟦', color: 'text-blue-400 bg-blue-400/5 border-blue-400/20' },
                  { name: 'JS ES6+', icon: '🟡', color: 'text-yellow-400 bg-yellow-400/5 border-yellow-400/20' },
                  { name: 'NextJS', icon: '▲', color: 'text-foreground bg-foreground/5 border-border' },
                  { name: 'Redux', icon: '💜', color: 'text-purple-400 bg-purple-400/5 border-purple-400/20' },
                  { name: 'Tailwind', icon: '🎨', color: 'text-teal-400 bg-teal-400/5 border-teal-400/20' },
                  { name: 'Git', icon: '🐙', color: 'text-orange-400 bg-orange-400/5 border-orange-400/20' },
                ].map((sk) => (
                  <div key={sk.name} className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-1.5 ${sk.color} group-hover:scale-105 transition-transform duration-300 shadow-sm overflow-hidden p-2 bg-secondary/20`}>
                      {getSkillIcon(sk.name, false)}
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground font-mono truncate max-w-full">{sk.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. TECH STACK CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:border-accent/40 hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Tech Stack</span>
                <span className="text-[10px] font-mono text-muted-foreground">Tools & Services</span>
              </div>

              {/* Stack items */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: 'VS Code', icon: '💻', color: 'bg-blue-500/5 border-blue-500/20' },
                  { name: 'GitHub', icon: '🐙', color: 'bg-zinc-500/5 border-zinc-500/20' },
                  { name: 'Supabase', icon: '⚡', color: 'bg-emerald-500/5 border-emerald-500/20' },
                  { name: 'Docker', icon: '🐳', color: 'bg-sky-500/5 border-sky-500/20' },
                  { name: 'Firebase', icon: '🔥', color: 'bg-amber-500/5 border-amber-500/20' },
                  { name: 'Postman', icon: '📮', color: 'bg-orange-500/5 border-orange-500/20' },
                  { name: 'Vercel', icon: '▲', color: 'bg-foreground/5 border-border' },
                  { name: 'Claude', icon: '🤖', color: 'bg-purple-500/5 border-purple-500/20' },
                ].map((stk) => (
                  <div key={stk.name} className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-1.5 ${stk.color} group-hover:scale-105 transition-transform duration-300 shadow-sm overflow-hidden p-2 bg-secondary/20`}>
                      {getSkillIcon(stk.name, false)}
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground font-mono truncate max-w-full">{stk.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 6. GITHUB CONTRIBUTION HEATMAP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:border-accent/40 hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">GitHub Activity</span>
                <span className="text-[10px] font-mono text-muted-foreground">Heatmap</span>
              </div>

              {/* Grid of green squares representing contribution heatmap */}
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-1">
                  {Array.from({ length: 96 }).map((_, idx) => {
                    // Weighted random green shading
                    const opacityClass =
                      idx % 9 === 0
                        ? 'bg-accent/80'
                        : idx % 6 === 0
                        ? 'bg-accent/60'
                        : idx % 4 === 0
                        ? 'bg-accent/30'
                        : idx % 3 === 0
                        ? 'bg-accent/15'
                        : 'bg-secondary/40';

                    return (
                      <div
                        key={idx}
                        className={`aspect-square rounded-[2px] transition-all hover:scale-125 duration-100 ${opacityClass}`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
                  <div>
                    <p className="text-base font-extrabold text-foreground leading-none">1.8K+</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">Contributions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-foreground leading-none">12</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">Repositories</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    ),

    about: (
      <section key="about" id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px]" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
            {/* Left */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeInUp}>
              <h2 className={`${sectionTitle} mb-6`} style={{ lineHeight: 1.15 }}>
                {lang === 'vi'
                  ? <>Không chỉ dựng UI<br /><span className="text-accent">— mình xây sản phẩm.</span></>
                  : <>Not just UI.<br /><span className="text-accent">I build products.</span></>
                }
              </h2>
              <p className={`${body} text-muted-foreground mb-8`}>{data.aboutText}</p>

              {/* Timeline-style detail list */}
              <div className="space-y-0 border-l-2 border-border/50 pl-6 ml-1">
                {data.aboutDetails.map((item, i) => (
                  <motion.div
                    key={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i}
                    className="relative pb-6 last:pb-0"
                  >
                    <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                    </span>
                    <p className={`${body} text-muted-foreground`}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Quick facts */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {data.quickFacts.map((fact, i) => {
                const Icon = factIcons[i % factIcons.length];
                return (
                  <motion.div
                    key={fact.label}
                    variants={fadeInUp}
                    custom={i}
                    className="group relative flex flex-col p-6 rounded-2xl border border-border/40 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{fact.label}</span>
                    <span className="text-base font-bold text-foreground leading-snug">{fact.value}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    ),

    services: (
      <section key="services" id="services" className="py-24 border-y border-border/50 bg-border/10 relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className={eyebrow}><Layers className="w-3.5 h-3.5" />{lang === 'vi' ? 'Dịch vụ' : 'Services'}</span>
              <h2 className={`${sectionTitle} mt-4`}>
                {lang === 'vi' ? 'Dịch vụ & Năng lực' : 'Services & Capabilities'}
              </h2>
            </motion.div>
            <motion.a
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              href="/my-orders"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              {lang === 'vi' ? 'Theo dõi đơn hàng →' : 'Track my orders →'}
            </motion.a>
          </div>

          {dbServicesMapped ? (
            // Supabase services with price + booking
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {dbServicesMapped.map((svc, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];
                const priceDisplay = svc.currency === 'vnd'
                  ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(svc.price)
                  : `$${(svc.price / 100).toFixed(0)}`;
                return (
                  <motion.div
                    key={svc.id}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i}
                    className="group relative flex flex-col bg-card border border-border/40 rounded-2xl p-6 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold tracking-tight mb-2 text-foreground">{svc.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground mb-4 flex-grow">{svc.description}</p>

                    {svc.features && svc.features.length > 0 && (
                      <ul className="space-y-1.5 mb-5">
                        {svc.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto pt-4 border-t border-border/30">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xl font-extrabold text-foreground">{priceDisplay}</span>
                        {svc.delivery_days > 0 && (
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Calendar className="w-3 h-3" />{svc.delivery_days}d
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => openBooking({ id: svc.id, title: svc.title, price: svc.price, currency: svc.currency, delivery_days: svc.delivery_days, payment_link: svc.payment_link })}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {lang === 'vi' ? 'Đặt dịch vụ' : 'Book now'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Hardcode fallback: simple grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 overflow-hidden rounded-2xl border border-border/40">
              {data.serviceItems.map((item, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];
                return (
                  <motion.div
                    key={item.title}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i}
                    className="group relative bg-background p-8 hover:bg-secondary/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-3 text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    ),

    skills: (
      <section key="skills" id="skills" className="py-24 bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-2xl mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className={sectionTitle}>
                {lang === 'vi' ? 'Kỹ năng & Năng lực kỹ thuật' : 'Skills & Tech Stack'}
              </h2>
              <p className={`${body} text-muted-foreground mt-4 max-w-xl`}>
                {lang === 'vi'
                  ? 'Công nghệ và công cụ mình sử dụng trong phát triển web và mobile.'
                  : 'Technologies and tools I leverage for web and mobile development.'}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, ci) => {
              const Icon = skillIcons[ci % skillIcons.length];
              return (
                <motion.div
                  key={cat.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={ci}
                  className="p-6 rounded-2xl border border-border/40 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{cat.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-grow">{cat.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center rounded-lg border border-border/50 bg-secondary/30 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent/35 hover:bg-accent/5 hover:text-accent transition-all cursor-default"
                      >
                        {getSkillIcon(skill.name)}
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    ),

    aiWorkflow: (
      <section key="aiWorkflow" id="ai-workflow" className="py-24 bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="max-w-2xl mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className={sectionTitle}>
                {lang === 'vi' ? 'Quy trình tăng tốc với AI' : 'Accelerated AI Workflow'}
              </h2>
              <p className={`${body} text-muted-foreground mt-4 max-w-xl`}>
                {lang === 'vi'
                  ? 'AI giúp tăng tốc hiệu quả, kết hợp với tư duy phản biện và khả năng kiểm soát chất lượng code của kỹ sư.'
                  : 'AI accelerates efficiency, paired with engineering judgment and codebase quality controls.'}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {data.aiWorkflow.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="relative flex flex-col p-6 rounded-2xl border border-border/40 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 shrink-0">
                  <span className="font-mono font-black text-sm text-accent">0{i + 1}</span>
                </div>
                <h3 className="text-base font-bold mb-2 tracking-tight text-foreground">{step.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    projects: (
      <section id="projects" className="py-24 bg-background relative overflow-hidden">
        <div className="container-wide">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className={eyebrow}>
                <Rocket className="w-3.5 h-3.5 animate-pulse text-accent" />
                {lang === 'vi' ? 'Dự án nổi bật' : 'Featured Projects'}
              </span>
              <h2 className={`${sectionTitle} mt-4`}>
                {lang === 'vi' ? 'Sản phẩm đã thực hiện' : 'Selected Work'}
              </h2>
            </motion.div>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="text-muted-foreground max-w-sm text-sm leading-relaxed md:text-right"
            >
              {lang === 'vi'
                ? 'Ứng dụng mobile, giao diện web và giải pháp phần mềm mình đã xây dựng.'
                : 'Mobile apps, web UIs and software solutions I have built.'}
            </motion.p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'bg-background text-muted-foreground border-border/80 hover:border-accent/40 hover:text-foreground'
                }`}
              >
                {cat === 'All' ? (lang === 'vi' ? 'Tất cả' : 'All') : cat}
              </button>
            ))}
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              {String(filteredProjects.length).padStart(2, '0')} {lang === 'vi' ? 'dự án' : 'projects'}
            </span>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => {
              const isFeatured = (project as typeof project & { featured?: boolean }).featured;
              const isFirstFull = idx === 0;
              return (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeInUp}
                  custom={idx}
                  className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card
                    hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300
                    ${isFirstFull ? 'lg:col-span-2' : 'col-span-1'}
                  `}
                >
                  {/* Number badge */}
                  <span className="absolute top-4 left-4 z-10 font-mono text-[11px] font-bold text-accent/60">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Featured badge */}
                  {isFeatured && (
                    <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-[10px] font-semibold">
                      ★ Featured
                    </span>
                  )}

                  <div className={`grid ${isFirstFull ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'grid-cols-1'} gap-0 h-full`}>
                    {/* Image */}
                    <div className="aspect-video w-full bg-secondary/30 relative overflow-hidden flex items-center justify-center p-5 border-b lg:border-b-0 lg:border-r border-border/20">
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-full h-full relative rounded-xl overflow-hidden shadow-md border border-border/30 group-hover:scale-[1.02] transition-transform duration-500">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-secondary via-background to-accent/10 flex items-center justify-center">
                            <Code2 className="w-10 h-10 text-accent/40" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 md:p-7 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold mb-2 block">
                          {project.category}
                        </span>
                        <h3 className="font-bold text-xl mb-3 text-foreground tracking-tight group-hover:text-accent transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-[10px] font-semibold font-mono rounded-md bg-accent/8 text-accent border border-accent/15"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2.5">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 text-center py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:opacity-90 hover:scale-[0.98] active:scale-[0.96] flex items-center justify-center gap-1.5"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                            </a>
                          )}
                          {project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 rounded-xl border border-border hover:border-accent/40 hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          ) : (
                            <div className="p-2.5 rounded-xl border border-border/20 text-muted-foreground/30 cursor-not-allowed">
                              <Code2 className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    ),

    nowBuilding: (
      <section key="nowBuilding" id="now-building" className="py-24 border-y border-border/50 bg-border/10 relative overflow-hidden">
        <div className="container-wide max-w-7xl relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="relative rounded-2xl border border-border/40 bg-card p-6 md:p-10 lg:p-14 overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/5 rounded-full blur-[110px]" />
            <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-mono font-semibold uppercase mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {data.nowBuilding.status}
                </span>
                <h2 className={`${sectionTitle} mb-5`}>{data.nowBuilding.title}</h2>
                <p className={`${body} text-muted-foreground mb-7`}>{data.nowBuilding.description}</p>

                <ul className="space-y-3 mb-8">
                  {data.nowBuilding.bullets.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Rocket className="w-4 h-4 text-accent shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-8">
                  {data.nowBuilding.techStack.map(tech => (
                    <span key={tech} className="px-2.5 py-1 text-[11px] font-semibold font-mono rounded-md bg-secondary text-foreground border border-border/40">
                      {tech}
                    </span>
                  ))}
                </div>

                <a href={data.nowBuilding.link} target="_blank" rel="noreferrer" className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-[0.98] active:scale-[0.96]">
                  <Rocket className="w-4 h-4" /> {lang === 'vi' ? 'Xem live demo' : 'View live demo'}
                </a>
              </div>

              <div className="rounded-xl border border-border bg-zinc-950 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-900 bg-zinc-900/50">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 px-3 py-1 bg-zinc-900 rounded-md text-[10px] font-mono text-zinc-500 border border-zinc-800/50 truncate">
                    {data.nowBuilding.link.replace('https://', '')}
                  </span>
                </div>
                <div className="aspect-[16/10] bg-zinc-900/10">
                  <ProjectDemoEmbed url={data.nowBuilding.link} title={data.nowBuilding.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    ),

    experience: (
      <section key="experience" id="experience" className="py-24 bg-background relative overflow-hidden">
        <div className="container-wide max-w-6xl relative z-10">
          <div className="max-w-2xl mb-14">
            <h2 className={sectionTitle}>
              {lang === 'vi' ? 'Kinh nghiệm làm việc' : 'Professional Experience'}
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeInUp} custom={i}
                className="group relative rounded-2xl border border-border/40 bg-card p-6 md:p-8 lg:p-10 hover:border-accent/30 transition-all duration-300"
              >
                <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-12 items-start">
                  <div>
                    <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      {exp.duration}
                    </span>
                    <h3 className="text-lg font-bold leading-tight mb-2 text-foreground">{exp.company}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{exp.role}</p>
                  </div>

                  <div>
                    <p className={`${body} text-muted-foreground mb-7`}>{exp.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {exp.achievements.map((achievement) => (
                        <div key={achievement} className="flex items-start gap-3 rounded-xl border border-border/40 bg-background/50 p-4">
                          <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),



    philosophy: (
      <section key="philosophy" id="philosophy" className="py-24 bg-background relative overflow-hidden">
        <div className="container-wide max-w-4xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Quote className="w-10 h-10 text-accent/15 mx-auto mb-8 animate-pulse" />
            <p className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-foreground">
              "{data.philosophyQuote}"
            </p>
            <div className="mt-8 h-1 w-20 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-sm font-mono text-muted-foreground">— {data.personal.fullName}</p>
          </motion.div>
        </div>
      </section>
    ),

    testimonials: (
      <section key="testimonials" id="testimonials" className="py-24 bg-background relative overflow-hidden border-t border-border/40">
        <div className="container-wide max-w-7xl relative z-10">
          <div className="max-w-2xl mb-14 text-left">
            <h2 className={sectionTitle}>
              {lang === 'vi' ? 'Đánh giá & Phản hồi' : 'Feedback & Testimonials'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => {
              const initials = t.name.split(' ').map(n => n[0]).slice(0, 2).join('');
              return (
                <motion.div
                  key={t.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInUp} custom={i}
                  className="group relative rounded-2xl border border-border/40 bg-card p-6 md:p-8 hover:border-accent/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-5">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-xl object-cover border border-border shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-accent font-bold text-base shrink-0">
                          {initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base leading-tight text-foreground">{t.name}</h3>
                        <p className="text-[12px] text-muted-foreground mt-0.5">{t.role} · <span className="text-accent">{t.company}</span></p>
                      </div>
                    </div>

                    <blockquote>
                      <p className="text-sm leading-relaxed text-muted-foreground italic line-clamp-3">"{t.text}"</p>
                    </blockquote>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    ),

    contact: (
      <section key="contact" id="contact" className="py-24 md:py-32 bg-border/10 relative overflow-hidden border-t border-border/40">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container-wide max-w-4xl text-center relative z-10">
          <h2 className={`${sectionTitle} mb-5`} style={{ lineHeight: 1.15 }}>
            {data.contact.title}
          </h2>
          <p className={`${body} text-muted-foreground mb-12 max-w-2xl mx-auto text-sm md:text-base`}>
            {data.contact.description}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-12 text-left">
            {[
              { icon: Mail, label: 'Email', value: resolvedEmail, href: `mailto:${resolvedEmail}` },
              { icon: Phone, label: lang === 'vi' ? 'Điện thoại' : 'Phone', value: resolvedPhone, href: `tel:${resolvedPhone.replace(/\s/g, '')}` },
              { icon: Github, label: 'GitHub', value: resolvedGithub, href: `https://${resolvedGithub}` },
            ].map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === 'GitHub' ? '_blank' : undefined}
                  rel={item.label === 'GitHub' ? 'noreferrer' : undefined}
                  className="group relative flex flex-col p-6 rounded-2xl border border-border/40 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{item.label}</span>
                  <span className="text-sm font-bold text-foreground break-all">{item.value}</span>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href={`mailto:${resolvedEmail}`}
              className="px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all hover:scale-[0.98] active:scale-[0.96]">
              <Mail className="w-4.5 h-4.5" />
              {lang === 'vi' ? 'Gửi email' : 'Send email'}
            </a>
            <a href={`https://${resolvedGithub}`} target="_blank" rel="noreferrer"
              className="px-7 py-3.5 border border-border bg-card hover:border-accent/40 hover:bg-secondary/40 text-foreground rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[0.98] active:scale-[0.96]">
              <Github className="w-4.5 h-4.5" />
              GitHub
            </a>
          </div>
        </div>
      </section>
    ),
  };

  const alwaysShownSections = ['about', 'services', 'aiWorkflow', 'nowBuilding', 'philosophy', 'contact'];

  return (
    <div className="min-h-screen bg-background selection:bg-accent/20 selection:text-accent font-sans text-foreground overflow-x-hidden antialiased">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main>
        {visibleSections.includes('hero') && sectionMap.hero}

        {visibleSections.includes('hero') && (
          <section className="border-y border-border/40 bg-secondary/10 relative z-10">
            <div className="container-wide py-8 md:py-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
                {data.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i}
                    className="bg-background p-6 text-center hover:bg-secondary/20 transition-all duration-300"
                  >
                    <span className="block text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-foreground">
                      {metric.value}
                    </span>
                    <span className="block text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">{metric.label}</span>
                    <span className="block text-xs text-muted-foreground leading-relaxed">{metric.helper}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {sectionMap.about}
        {sectionMap.services}
        {visibleSections.includes('skills') && sectionMap.skills}
        {sectionMap.aiWorkflow}
        {visibleSections.includes('projects') && sectionMap.projects}
        {sectionMap.nowBuilding}
        {visibleSections.includes('experience') && sectionMap.experience}
        {visibleSections.includes('testimonials') && sectionMap.testimonials}
        {sectionMap.philosophy}
        {sectionMap.contact}

        {visibleSections
          .filter(k => !['hero', 'skills', 'projects', 'experience', 'testimonials', ...alwaysShownSections].includes(k))
          .map(key => (
            <div key={key}>{sectionMap[key] || null}</div>
          ))}
      </main>

      {/* Floating Theme Switcher */}
      <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-3 bg-card/85 border border-border/50 p-2.5 rounded-2xl backdrop-blur-md shadow-lg">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={`Theme: ${t.name}`}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-300 cursor-pointer ${
              themeClasses[t.id].color
            } ${
              theme === t.id
                ? themeClasses[t.id].active
                : `border-transparent scale-95 opacity-85 hover:opacity-100 ${themeClasses[t.id].hover}`
            }`}
          />
        ))}
      </div>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        service={bookingService}
        open={bookingOpen}
        onClose={() => { setBookingOpen(false); setBookingService(null); }}
      />
    </div>
  );
};

export default Portfolio;
