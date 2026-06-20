import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useSpring, Variants } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectDemoEmbed from '@/components/ProjectDemoEmbed';
import { useAdmin } from '@/contexts/AdminContext';
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
} from 'lucide-react';
import { useState, useMemo, ReactNode } from 'react';

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
          { name: 'NativeWind' },
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
        techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST API', 'NativeWind'],
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
        demoUrl: 'https://persona-builder-psi.vercel.app/'
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
        demoUrl: 'https://creator.minasoft.vn/'
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
        techStack: ['React Native', 'TypeScript', 'NativeWind', 'Redux Toolkit'],
        imageUrl: 'images/reuse.png'
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
          { name: 'NativeWind' },
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
        techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST API', 'NativeWind'],
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
        techStack: ['React Native', 'TypeScript', 'NativeWind', 'Redux Toolkit'],
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
  const { language } = useLanguage() as { t: (key: string) => string; language?: Lang };
  const { sections } = useAdmin();

  const lang: Lang = language === 'en' ? 'en' : 'vi';
  const data = portfolioContent[lang];

  const projects = data.projects;
  const experiences = data.experiences;
  const skillCategories = data.skillCategories;

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

  const codeLines = [
    { key: 'const', text: 'const frontendDeveloper = {' },
    { key: 'name', text: `  name: "${data.personal.fullName}",` },
    { key: 'role', text: `  role: "${data.personal.title}",` },
    { key: 'focus', text: '  focus: ["UX", "Responsive", "Clean Components"],' },
    { key: 'stack', text: '  stack: ["React", "TypeScript", "React Native"],' },
    { key: 'mindset', text: lang === 'vi' ? '  mindset: "ship UI như sản phẩm thật",' : '  mindset: "ship UI like a real product",' },
    { key: 'status', text: lang === 'vi' ? '  status: "open for frontend work 🚀",' : '  status: "open for frontend work 🚀",' },
    { key: 'close', text: '}' },
  ];

  const sectionMap: Record<string, ReactNode> = {
    hero: (
      <section key="hero" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808014_1px,transparent_1px),linear-gradient(to_bottom,#80808014_1px,transparent_1px)] bg-[size:26px_26px]" />
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-accent/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-primary/10 rounded-full blur-[130px]" />

        <div className="container-wide w-full relative z-10">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-7">
                <span className={eyebrow}>
                  <Terminal className="w-4 h-4" /> {data.hero.badge}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-background/70 border border-border/70 text-xs font-mono text-muted-foreground backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {data.hero.availability}
                </span>
              </motion.div>

              <motion.div variants={fadeInUp} className="mb-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary to-accent blur-2xl opacity-25" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-accent to-primary opacity-70" />
                  <img
                    src="/images/avatar.png"
                    alt={data.personal.fullName}
                    className="relative w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-background shadow-2xl ring-1 ring-border"
                  />
                  <span className="absolute bottom-3 right-4 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-background shadow-lg" />
                </div>

                <div className="text-center sm:text-left">
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground mb-3">
                    {lang === 'vi' ? 'Frontend profile' : 'Frontend profile'}
                  </p>
                  <h1 style={{ lineHeight: 1.2 }} className={`${typeScale.heroTitle} text-foreground`}>
                    {data.personal.fullName}
                  </h1>
                  <p className="mt-4 text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {data.personal.title}
                  </p>
                </div>
              </motion.div>

              <motion.h2 variants={fadeInUp} style={{ lineHeight: 1.2 }} className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6 max-w-3xl">
                {data.hero.headline}
              </motion.h2>

              <motion.p variants={fadeInUp} className={`${typeScale.lead} text-muted-foreground mb-9 max-w-2xl`}>
                {data.hero.subHeadline}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  className="px-7 py-4 bg-foreground text-background rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-accent group shadow-xl shadow-foreground/10"
                >
                  {data.hero.primaryCta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="px-7 py-4 border border-border bg-background/70 backdrop-blur-md hover:border-accent/50 hover:bg-secondary/40 text-foreground rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" /> {data.hero.secondaryCta}
                </a>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/30 border border-border/50">
                  <MapPin className="w-4 h-4 text-accent" /> {data.personal.location}
                </span>
                <a href={`https://${data.personal.github}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/30 border border-border/50 hover:border-accent/50 transition-colors">
                  <Github className="w-4 h-4 text-accent" /> {data.personal.github}
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="relative w-full max-w-xl mx-auto lg:max-w-none"
            >
              <motion.span custom={0} variants={floatChip} animate="animate" className="hidden md:flex absolute -top-6 -left-5 z-20 items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-xl text-xs font-mono font-semibold">
                <Code2 className="w-4 h-4 text-accent" /> React Native
              </motion.span>
              <motion.span custom={1} variants={floatChip} animate="animate" className="hidden md:flex absolute top-20 -right-6 z-20 items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-xl text-xs font-mono font-semibold">
                <Zap className="w-4 h-4 text-accent" /> Responsive UX
              </motion.span>
              <motion.span custom={2} variants={floatChip} animate="animate" className="hidden md:flex absolute -bottom-5 right-10 z-20 items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-xl text-xs font-mono font-semibold">
                <Wand2 className="w-4 h-4 text-accent" /> AI-assisted
              </motion.span>

              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-[2rem] blur-3xl opacity-20" />
              <div className="relative rounded-[2rem] border border-border bg-background/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between gap-2 px-5 py-3 border-b border-border bg-secondary/40">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">portfolio.tsx</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="p-5 md:p-7 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                  {codeLines.map((line, i) => (
                    <motion.div key={line.key} custom={i} variants={codeLineVariant} initial="hidden" animate="visible" className="text-foreground/90 whitespace-pre">
                      {line.text}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-px bg-border/60 border-t border-border">
                  {data.metrics.slice(0, 4).map((metric, i) => (
                    <div key={metric.label} className="bg-background/90 p-4 md:p-5">
                      <p className="text-2xl md:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs font-bold text-foreground">{metric.label}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{metric.helper}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/30 text-[11px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5" /> main
                  </span>
                  <span>TypeScript · Tailwind · Framer Motion</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    ),

    about: (
      <section key="about" id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[360px] h-[360px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeInUp}>
              <span className={eyebrow}>{lang === 'vi' ? 'Giới thiệu' : 'About'}</span>
              <h2 style={{ lineHeight: 1.2 }} className={`${typeScale.sectionTitle} mt-6 mb-6`}>
                {lang === 'vi' ? 'Không chỉ làm UI đẹp — mình xây UI có thể dùng thật.' : 'Not just good-looking UI — I build interfaces that work in real products.'}
              </h2>
              <p className={`${typeScale.body} text-muted-foreground mb-8 max-w-2xl`}>{data.aboutText}</p>

              <div className="space-y-4">
                {data.aboutDetails.map((item, i) => (
                  <motion.div key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i} className="flex gap-4 rounded-2xl border border-border/60 bg-secondary/20 p-4">
                    <div className="mt-0.5 w-8 h-8 shrink-0 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
              {data.quickFacts.map((fact, i) => {
                const Icon = factIcons[i % factIcons.length];
                return (
                  <motion.div key={fact.label} variants={fadeInUp} custom={i} className="group rounded-[1.5rem] border border-border/60 bg-secondary/20 p-6 hover:bg-secondary/40 hover:border-accent/30 transition-all duration-300">
                    <div className="w-11 h-11 rounded-2xl bg-background border border-border flex items-center justify-center text-accent mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">{fact.label}</p>
                    <p className="text-lg font-black leading-tight text-foreground">{fact.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    ),

    services: (
      <section key="services" id="services" className="py-24 md:py-28 bg-secondary/10 border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mb-14">
            <span className={eyebrow}>
              <Rocket className="w-4 h-4" /> {lang === 'vi' ? 'Mình có thể làm gì' : 'What I can do'}
            </span>
            <h2 style={{ lineHeight: 1.2 }} className={`${typeScale.sectionTitle} mt-6 mb-5`}>
              {lang === 'vi' ? 'Tập trung vào phần frontend tạo ra giá trị nhìn thấy được.' : 'Frontend work that creates visible product value.'}
            </h2>
            <p className={`${typeScale.body} text-muted-foreground max-w-2xl`}>
              {lang === 'vi'
                ? 'Các item bên dưới được viết theo hướng nhà tuyển dụng/khách hàng nhìn vào sẽ hiểu ngay mình mạnh ở đâu và có thể giao việc gì.'
                : 'These items make it clear to recruiters or clients where I am strongest and what kind of work I can take ownership of.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
            {data.serviceItems.map((item, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeInUp} custom={i} className="group relative rounded-[1.75rem] border border-border/60 bg-background/80 p-6 md:p-7 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300">
                  <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-secondary border border-border flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight mb-3">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    ),

    skills: (
      <section key="skills" id="skills" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-3xl">
              <span className={eyebrow}>
                <Cpu className="w-4 h-4" /> {lang === 'vi' ? 'Kỹ năng' : 'Skills'}
              </span>
              <h2 style={{ lineHeight: 1.2 }} className={`${typeScale.sectionTitle} mt-6 mb-5`}>
                {lang === 'vi' ? 'Stack gọn, thực dụng và đủ để ship sản phẩm.' : 'A practical stack for shipping real products.'}
              </h2>
              <p className={`${typeScale.body} text-muted-foreground`}>
                {lang === 'vi'
                  ? 'Mình trình bày kỹ năng theo nhóm công việc thay vì chỉ liệt kê công nghệ, để người xem hiểu cách mình dùng chúng trong dự án.'
                  : 'I group skills by the way I use them in projects, instead of only listing technologies.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {skillCategories.map((cat, ci) => {
              const Icon = skillIcons[ci % skillIcons.length];
              return (
                <motion.div key={cat.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeInUp} custom={ci} className="group min-h-full p-5 rounded-[1.5rem] bg-secondary/20 border border-border/50 hover:bg-secondary/40 hover:border-accent/30 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-background border border-border flex items-center justify-center text-foreground group-hover:text-accent shadow-sm shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black leading-tight">{cat.name}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, si) => (
                      <span key={`${cat.id}-${si}`} className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-xs font-semibold text-foreground/80 hover:text-foreground hover:border-accent/50 transition-colors shadow-sm">
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
      <section key="aiWorkflow" id="ai-workflow" className="py-24 md:py-32 bg-secondary/10 border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="container-wide relative z-10">
          <div className="max-w-3xl mb-16">
            <span className={eyebrow}>
              <Wand2 className="w-4 h-4" /> {lang === 'vi' ? 'Quy trình làm việc' : 'Workflow'}
            </span>
            <h2 style={{ lineHeight: 1.2 }} className={`${typeScale.sectionTitle} mt-6 mb-5`}>
              {lang === 'vi' ? 'Làm nhanh hơn bằng AI, nhưng vẫn giữ tư duy kỹ sư.' : 'Faster with AI, still owned by engineering judgment.'}
            </h2>
            <p className={`${typeScale.body} text-muted-foreground`}>
              {lang === 'vi'
                ? 'Điểm khác biệt là mình không để AI quyết định chất lượng. AI giúp tăng tốc, còn mình chịu trách nhiệm về logic, UI behavior, responsive và khả năng bảo trì.'
                : 'AI helps me move faster, but I still own the logic, UI behavior, responsiveness, and maintainability.'}
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-5">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-border" />
            {data.aiWorkflow.map((step, i) => (
              <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i} className="relative rounded-[1.5rem] border border-border/60 bg-background/90 p-5 md:p-6">
                <div className="w-14 h-14 rounded-2xl bg-background border-2 border-border flex items-center justify-center font-mono font-black text-accent mb-5 relative z-10 shadow-sm">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-black mb-2 tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    projects: (
      <section key="projects" id="projects" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute -top-20 -right-24 w-[420px] h-[420px] bg-accent/10 rounded-full blur-[130px]" />
        <div className="container-wide relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <span className={eyebrow}>
                <Layers className="w-4 h-4" /> {lang === 'vi' ? 'Dự án nổi bật' : 'Selected work'}
              </span>
              <h2 style={{ lineHeight: 1.2 }} className={`${typeScale.sectionTitle} mt-6 mb-5`}>
                {lang === 'vi' ? 'Case study ngắn — không chỉ show ảnh, mà show cách mình giải quyết vấn đề.' : 'Short case studies — not just screenshots, but how I solve problems.'}
              </h2>
              <p className={`${typeScale.body} text-muted-foreground`}>
                {lang === 'vi'
                  ? 'Mỗi dự án đều có vai trò, vấn đề, giải pháp, impact và tech stack để portfolio nhìn chuyên nghiệp hơn khi gửi nhà tuyển dụng.'
                  : 'Each project includes role, problem, solution, impact, and tech stack for a more professional recruiter-facing portfolio.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {projectCategories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full border text-xs font-mono font-bold uppercase tracking-wider transition-all ${activeCategory === category
                    ? 'bg-foreground text-background border-foreground shadow-lg shadow-foreground/10'
                    : 'bg-secondary/30 text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
                    }`}
                >
                  {category === 'All' ? (lang === 'vi' ? 'Tất cả' : 'All') : category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8 md:space-y-10">
            {filteredProjects.map((project, i) => {
              const isReverse = i % 2 !== 0;

              return (
                <motion.section
                  key={project.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={fadeInUp}
                  custom={i}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch rounded-[2rem] md:rounded-[2.5rem] bg-secondary/10 border border-border/70 overflow-hidden hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 p-4 md:p-5"
                >
                  <div className={`relative min-h-[280px] lg:min-h-full aspect-[16/10] lg:aspect-auto overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-secondary border border-border/50 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    {project.demoUrl ? (
                      <ProjectDemoEmbed
                        url={project.demoUrl}
                        title={project.title}
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
                      />
                    ) : project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-secondary/40">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/40" />
                        <span className="text-xs font-mono text-muted-foreground">{project.category}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80" />
                    <div className="absolute left-5 bottom-5 right-5 z-10">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map(tech => (
                          <span key={tech} className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-[11px] font-bold text-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute top-5 right-5 flex gap-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-11 h-11 bg-background/90 backdrop-blur-md text-foreground rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors shadow-lg">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="w-11 h-11 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-accent transition-colors shadow-lg">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={`flex flex-col justify-center p-4 md:p-7 lg:p-8 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-mono font-bold uppercase rounded-full">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                      <span className="hidden sm:inline-flex h-px flex-1 bg-border" />
                      <span className="text-xs font-mono text-muted-foreground">{project.role}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-[-0.04em] leading-tight group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    <p className={`${typeScale.body} text-muted-foreground mb-6 max-w-2xl`}>
                      {project.description}
                    </p>

                    <div className="grid md:grid-cols-3 gap-3 mb-6">
                      {[
                        { label: lang === 'vi' ? 'Vấn đề' : 'Problem', value: project.problem },
                        { label: lang === 'vi' ? 'Giải pháp' : 'Solution', value: project.solution },
                        { label: 'Impact', value: project.impact },
                      ].map(item => (
                        <div key={item.label} className="rounded-2xl border border-border/60 bg-background/70 p-4">
                          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-accent mb-2">{item.label}</p>
                          <p className="text-xs md:text-sm leading-relaxed text-muted-foreground line-clamp-5">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2.5 mb-7">
                      {project.highlights.slice(0, 3).map(item => (
                        <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-7">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-secondary/70 text-foreground text-xs font-semibold rounded-md border border-border/40">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background text-sm font-bold hover:bg-accent transition-colors">
                          {lang === 'vi' ? 'Xem demo' : 'View demo'}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-secondary text-foreground text-sm font-bold hover:bg-secondary/70 transition-colors border border-border/60">
                          Source Code
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </section>
    ),

    nowBuilding: (
      <section key="nowBuilding" id="now-building" className="py-24 md:py-32 bg-secondary/10 border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container-wide max-w-7xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative rounded-[2rem] md:rounded-[2.75rem] border border-border bg-gradient-to-br from-background via-background to-secondary/40 p-6 md:p-10 lg:p-14 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/10 rounded-full blur-[110px]" />
            <div className="relative z-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-semibold uppercase mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {data.nowBuilding.status}
                </span>
                <h2 className={`${typeScale.sectionTitle} mb-5`}>{data.nowBuilding.title}</h2>
                <p className={`${typeScale.body} text-muted-foreground mb-7`}>{data.nowBuilding.description}</p>

                <ul className="space-y-3 mb-8">
                  {data.nowBuilding.bullets.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                      <Rocket className="w-4 h-4 text-accent shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-8">
                  {data.nowBuilding.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-secondary/50 text-foreground text-xs font-semibold rounded-md border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>

                <a href={data.nowBuilding.link} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3.5 bg-foreground text-background rounded-2xl font-bold items-center gap-2 hover:bg-accent transition-colors shadow-xl shadow-foreground/10">
                  <Rocket className="w-4 h-4" /> {lang === 'vi' ? 'Xem live demo' : 'View live demo'}
                </a>
              </div>

              <div className="rounded-[1.75rem] border border-border bg-background shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 px-3 py-1 bg-background rounded-md text-[11px] font-mono text-muted-foreground border border-border/60 truncate">
                    {data.nowBuilding.link.replace('https://', '')}
                  </span>
                </div>
                <div className="aspect-[16/10] bg-secondary/30">
                  <ProjectDemoEmbed url={data.nowBuilding.link} title={data.nowBuilding.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    ),

    experience: (
      <section key="experience" id="experience" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container-wide max-w-6xl relative z-10">
          <div className="max-w-3xl mb-16">
            <span className={eyebrow}>
              <Terminal className="w-4 h-4" /> {lang === 'vi' ? 'Kinh nghiệm' : 'Experience'}
            </span>
            <h2 className={`${typeScale.sectionTitle} mt-6 mb-5`}>
              {lang === 'vi' ? 'Kinh nghiệm làm sản phẩm thực tế.' : 'Production product experience.'}
            </h2>
            <p className={`${typeScale.body} text-muted-foreground`}>
              {lang === 'vi'
                ? 'Phần này được viết chi tiết hơn để nhà tuyển dụng thấy rõ bạn đã làm gì, phối hợp ra sao và tạo giá trị như thế nào.'
                : 'This section is written in detail so recruiters can quickly understand ownership, collaboration, and value delivered.'}
            </p>
          </div>

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div key={exp.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeInUp} custom={i} className="group grid md:grid-cols-[240px_1fr] gap-8 md:gap-12 items-start rounded-[2rem] border border-border/70 bg-secondary/10 p-6 md:p-8 lg:p-10">
                <div className="md:text-right">
                  <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono font-bold uppercase mb-4">
                    {exp.duration}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black leading-tight mb-2">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{exp.role}</p>
                </div>

                <div>
                  <p className={`${typeScale.body} text-muted-foreground mb-7`}>{exp.description}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {exp.achievements.map((achievement, ai) => (
                      <div key={achievement} className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background/70 p-4">
                        <Sparkles className="w-4 h-4 text-accent shrink-0 mt-1" />
                        <span className="text-sm leading-relaxed text-muted-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ),

    education: (
      <section key="education" id="education" className="py-24 md:py-28 bg-secondary/10 border-y border-border/30">
        <div className="container-wide max-w-6xl">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-12 items-start">
            <div>
              <span className={eyebrow}>
                <GraduationCap className="w-4 h-4" /> {lang === 'vi' ? 'Học vấn' : 'Education'}
              </span>
              <h2 className={`${typeScale.sectionTitle} mt-6`}>
                {lang === 'vi' ? 'Nền tảng học thuật' : 'Academic background'}
              </h2>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-background border border-border rounded-[2rem] p-6 md:p-9">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">{data.education.school}</h3>
                  <p className="text-muted-foreground font-bold mb-2">{data.education.degree}</p>
                  <p className="text-sm font-mono text-accent mb-5">{data.education.duration}</p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{data.education.note}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    ),

    philosophy: (
      <section key="philosophy" id="philosophy" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <Quote className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 text-foreground/[0.04]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
        <div className="container-wide max-w-5xl text-center relative z-10">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.04em]">
            “{data.philosophyQuote}”
          </motion.p>
          <div className="mt-10 h-1.5 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
      </section>
    ),

    contact: (
      <section key="contact" id="contact" className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[320px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="container-wide max-w-4xl text-center relative z-10">
          <span className={eyebrow}>{lang === 'vi' ? 'Liên hệ' : 'Get in touch'}</span>
          <h2 className={`${typeScale.sectionTitle} mt-6 mb-6`}>{data.contact.title}</h2>
          <p className={`${typeScale.lead} text-muted-foreground mb-12 max-w-2xl mx-auto`}>
            {data.contact.description}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
            {[
              { icon: Mail, label: 'Email', value: data.personal.email, href: `mailto:${data.personal.email}` },
              { icon: Phone, label: lang === 'vi' ? 'Điện thoại' : 'Phone', value: data.personal.phone, href: `tel:${data.personal.phone.replace(/\s/g, '')}` },
              { icon: Github, label: 'GitHub', value: data.personal.github, href: `https://${data.personal.github}` },
            ].map(item => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target={item.label === 'GitHub' ? '_blank' : undefined} rel={item.label === 'GitHub' ? 'noreferrer' : undefined} className="group rounded-2xl border border-border/60 bg-background/70 p-5 hover:border-accent/40 hover:bg-secondary/30 transition-all">
                  <div className="w-11 h-11 rounded-2xl bg-secondary border border-border flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">{item.label}</p>
                  <p className="text-sm font-bold text-foreground break-all">{item.value}</p>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`mailto:${data.personal.email}`} className="px-8 py-4 bg-foreground text-background rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors shadow-xl shadow-foreground/10">
              <Mail className="w-5 h-5" /> {lang === 'vi' ? 'Gửi email' : 'Send email'}
            </a>
            <a href={`https://${data.personal.github}`} target="_blank" rel="noreferrer" className="px-8 py-4 border border-border bg-background/70 backdrop-blur-sm hover:border-accent/50 hover:bg-secondary/50 text-foreground rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </div>
      </section>
    ),
  };

  const alwaysShownSections = ['about', 'services', 'aiWorkflow', 'nowBuilding', 'education', 'philosophy', 'contact'];

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white font-sans text-foreground overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent z-[100] origin-left shadow-md" style={{ scaleX }} />

      <Header />

      <main>
        {visibleSections.includes('hero') && sectionMap.hero}

        {visibleSections.includes('hero') && (
          <section className="border-y border-border bg-secondary/10 relative z-10 backdrop-blur-sm">
            <div className="container-wide py-8 md:py-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {data.metrics.map((metric, i) => (
                  <motion.div key={metric.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} custom={i} className="rounded-2xl border border-border/60 bg-background/70 p-5 text-center">
                    <span className="block text-3xl md:text-5xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
                      {metric.value}
                    </span>
                    <span className="block text-xs md:text-sm font-mono text-foreground uppercase tracking-widest mb-2">{metric.label}</span>
                    <span className="block text-[11px] md:text-xs text-muted-foreground leading-relaxed">{metric.helper}</span>
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
        {sectionMap.education}
        {sectionMap.philosophy}
        {sectionMap.contact}

        {visibleSections
          .filter(k => !['hero', 'skills', 'projects', 'experience', ...alwaysShownSections].includes(k))
          .map(key => (
            <div key={key}>{sectionMap[key] || null}</div>
          ))}
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
