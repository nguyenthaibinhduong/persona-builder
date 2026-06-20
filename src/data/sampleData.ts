import { CVData, PortfolioProject } from '@/types';

export const sampleCVData: CVData = {
  personal: {
    fullName: 'NGUYỄN THÁI BÌNH DƯƠNG',
    title: 'Frontend Developer (ReactJS / React Native)',
    email: 'nguyenthaibinhduong182003@gmail.com',
    phone: '+84 395 659 769',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    website: 'github.com/nguyenthaibinhduong',
    linkedin: '',
    github: 'github.com/nguyenthaibinhduong',
  },
  summary:
    'Lập trình viên Frontend có 1.5 nắm kinh nghiệm thực tế trong phát triển ứng dụng Web và Mobile bằng ReactJS, NextJS và React Native. Có thế mạnh về UI/UX, xây dựng reusable components, tích hợp API và responsive design. Có kinh nghiệm phối hợp với backend trong quá trình phát triển sản phẩm thực tế. Luôn mong muốn nâng cao kỹ năng chuyên môn và xây dựng các sản phẩm tối ưu, thân thiện với người dùng.',
  skills: [
    {
      category: 'Frontend',
      items: ['ReactJS', 'NextJS', 'React Native', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'TailwindCSS', 'Bootstrap'],
    },
    {
      category: 'Backend & API',
      items: ['ExpressJS', 'NestJS (Cơ bản)', 'PHP (Laravel, Laminas, CodeIgniter)', 'REST API', 'JWT Authentication'],
    },
    {
      category: 'Database',
      items: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Công cụ',
        items: [
        'Git / GitHub',
        'Docker / Docker Compose',
        'Postman',
        'Nginx',
        'Agile / Scrum',
        'ChatGPT',
        'GitHub Copilot', 
        'Claude AI',
        'Cursor AI',
        'Figma AI',
        'Firebase',
        'OneSignal',
        'Swagger / OpenAPI',
      ],
        
    },
    {
      category: 'Kiến thức nghiệp vụ',
      items: [
        'Hệ thống quản lý bệnh viện',
        'Hệ thống chính quyền điện tử',
        'Quản lý quy trình & tài liệu',
        'Hệ thống quản lý giải đấu',
        'Xác thực & phân quyền',
        'Hệ thống giao tiếp realtime',
      ]
    }
  ],
  experience: [
    {
      company: 'Dự án HĐND Số',
      role: 'Frontend Mobile Developer (React Native)',
      duration: '05/2025 - Hiện tại',
      description: [
        'Phát triển và maintain frontend mobile cho ứng dụng HĐND Số bằng React Native.',
        'Xây dựng và tối ưu UI/UX cho các tính năng: thông báo, lịch họp, lấy ý kiến, tài liệu, thư viện cá nhân và hậu cần.',
        'Tích hợp RESTful APIs, quản lý state và tối ưu hiệu năng hiển thị dữ liệu lớn trên mobile/tablet.',
        'Phối hợp với backend, QA và designer để xử lý bug và cải thiện chất lượng sản phẩm.',
        'Tham gia xây dựng reusable/base components giúp chuẩn hóa và mở rộng hệ thống frontend.',
      ],
    },
    {
      company: 'Minara Consulting',
      role: 'Frontend Developer (ReactJS / React Native)',
      duration: '10/2024 - 05/2025',
      description: [
        'Phát triển các tính năng frontend cho web và mobile bằng ReactJS và React Native.',
        'Xây dựng giao diện responsive, forms và màn hình quản lý dữ liệu.',
        'Tích hợp REST APIs và phối hợp với backend để hoàn thiện tính năng sản phẩm.',
        'Hỗ trợ maintain backend bằng PHP (Laminas, CodeIgniter).',
        'Làm việc theo mô hình Agile/Scrum và quản lý source code bằng Git/GitHub.',
      ],
    },
    {
      company: 'Freelance & Dự án cá nhân',
      role: 'Frontend-oriented Fullstack Developer',
      duration: '06/2023 - Hiện tại',
      description: [
        'Phát triển các ứng dụng web và công cụ nội bộ bằng ReactJS và NextJS.',
        'Thiết kế reusable UI components và xây dựng cấu trúc frontend dễ maintain.',
        'Xây dựng các tính năng như authentication, chat realtime, notifications và tích hợp APIs.',
        'Làm việc với RESTful APIs, state management và WebSocket.',
        'Phối hợp backend và database để hoàn thiện các tính năng end-to-end.',
      ],
    },
  ],
  education: [
    {
      school: 'Đại học Công nghiệp TP.HCM (IUH)',
      degree:
        'Chuyên ngành: Hệ thống Thông tin\nMôn học liên quan: Lập trình hướng đối tượng (OOP), Web Applications and Technologies, Web Application Development, Application Development',
      duration: '2021 - 2025',
      gpa: '',
    },
  ],
  projects: [
    {
      name: 'DevChat - Nền tảng cộng tác realtime',
      role: 'Frontend / Fullstack Developer',
      summary:
        'Phát triển nền tảng chat realtime cho web và mobile. Xây dựng responsive UI, reusable frontend components, triển khai các tính năng realtime như nhắn tin, notifications, user presence và tích hợp APIs cho authentication, chat room, message management.',
      techStack: ['ReactJS', 'React Native', 'NestJS', 'Redis', 'WebSocket'],
    },
    {
      name: 'Hospital Management System',
      role: 'Frontend / Fullstack Developer',
      summary:
        'Phát triển dashboard quản lý bệnh viện và hệ thống đặt lịch khám. Xây dựng forms, tables, chức năng phân quyền người dùng và workflow quản lý lịch bác sĩ, bệnh nhân.',
      techStack: ['Laravel', 'MySQL', 'Bootstrap'],
      link: 'https://github.com/nguyenthaibinhduong/QLBV',
    },
  ],
  certifications: ['TOEIC 520 (04/2024)'],
  languages: [
    { name: 'Tiếng Việt', level: 'Bản ngữ' },
    { name: 'Tiếng Anh', level: 'TOEIC 520' },
  ],
};

export const sampleProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'CodeSync - Nền tảng cộng tác realtime',
    category: 'Web & Mobile App',
    description:
      'Nền tảng chat realtime cho web và mobile với responsive UI, reusable components, nhắn tin realtime, notifications, user presence và quản lý chat room.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    techStack: ['ReactJS', 'React Native', 'NestJS', 'Redis', 'WebSocket'],
    featured: true,
  },
  {
    id: '2',
    title: 'Hospital Management System',
    category: 'Management Dashboard',
    description:
      'Dashboard quản lý bệnh viện và hệ thống đặt lịch khám với forms, tables, phân quyền người dùng, workflow quản lý lịch bác sĩ và bệnh nhân.',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Laravel', 'MySQL', 'Bootstrap'],
    githubUrl: 'https://github.com/nguyenthaibinhduong/QLBV',
    featured: true,
  },
  {
    id: '3',
    title: 'HĐND Số Mobile App',
    category: 'Mobile App',
    description:
      'Ứng dụng mobile/tablet hỗ trợ thông báo, lịch họp, lấy ý kiến, tài liệu, thư viện cá nhân và hậu cần. Tập trung vào UI/UX, REST API integration và tối ưu hiển thị dữ liệu lớn.',
    image: '',
    techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST API'],
    featured: false,
  },
];

export const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'ReactJS', level: 90 },
      { name: 'NextJS', level: 85 },
      { name: 'React Native', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'TailwindCSS', level: 88 },
    ],
  },
  {
    name: 'Backend & API',
    skills: [
      { name: 'ExpressJS', level: 75 },
      { name: 'NestJS', level: 65 },
      { name: 'PHP (Laminas, CodeIgniter)', level: 70 },
      { name: 'REST API', level: 85 },
      { name: 'JWT Authentication', level: 78 },
    ],
  },
  {
    name: 'Databases & Tools',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'MongoDB', level: 70 },
      { name: 'Docker / Docker Compose', level: 70 },
      { name: 'Git / GitHub', level: 88 },
    ],
  },
  {
    name: 'Workflow',
    skills: [
      { name: 'UI/UX', level: 85 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Reusable Components', level: 88 },
      { name: 'Postman', level: 82 },
      { name: 'Agile / Scrum', level: 80 },
    ],
  },
];

export const services = [
  { icon: 'Globe', title: 'Web Development', description: 'Phát triển ứng dụng ReactJS và NextJS với giao diện responsive, dễ mở rộng và dễ maintain.' },
  { icon: 'Smartphone', title: 'Mobile Development', description: 'Xây dựng ứng dụng React Native cho mobile/tablet với trải nghiệm người dùng ổn định.' },
  { icon: 'Palette', title: 'Reusable Components', description: 'Thiết kế base components và component system giúp chuẩn hóa frontend.' },
  { icon: 'Layout', title: 'Responsive UI', description: 'Xây dựng giao diện phù hợp nhiều kích thước màn hình bằng TailwindCSS, CSS3 và Bootstrap.' },
  { icon: 'BarChart3', title: 'Realtime Features', description: 'Tích hợp chat realtime, notifications, user presence và WebSocket.' },
  { icon: 'Settings', title: 'API Integration', description: 'Tích hợp REST APIs, xử lý state management và phối hợp backend để hoàn thiện tính năng.' },
];

export const testimonials = [
  {
    name: 'Minara Consulting',
    role: 'Frontend Team',
    company: 'Minara Consulting',
    text: 'Bình Dương tham gia phát triển frontend web/mobile, phối hợp backend tốt và chủ động xử lý các màn hình quản lý dữ liệu.',
    avatar: '',
  },
  {
    name: 'Dự án HĐND Số',
    role: 'Product Team',
    company: 'HĐND Số',
    text: 'Đóng góp vào mobile app React Native, tập trung vào UI/UX, tích hợp API và tối ưu trải nghiệm trên mobile/tablet.',
    avatar: '',
  },
];

export const experiences = [
  {
    company: 'Dự án HĐND Số',
    role: 'Frontend Mobile Developer (React Native)',
    duration: '05/2025 - Hiện tại',
    description: 'Phát triển và maintain frontend mobile cho ứng dụng HĐND Số bằng React Native.',
    achievements: ['React Native mobile app', 'REST API integration', 'Redux Toolkit', 'Reusable/base components'],
  },
  {
    company: 'Minara Consulting',
    role: 'Frontend Developer (ReactJS / React Native)',
    duration: '10/2024 - 05/2025',
    description: 'Phát triển frontend web/mobile, xây dựng giao diện responsive và tích hợp REST APIs.',
    achievements: ['ReactJS', 'React Native', 'Responsive UI', 'PHP backend support'],
  },
  {
    company: 'Freelance & Dự án cá nhân',
    role: 'Frontend-oriented Fullstack Developer',
    duration: '06/2023 - Hiện tại',
    description: 'Phát triển ứng dụng web và công cụ nội bộ bằng ReactJS, NextJS, ExpressJS và MySQL.',
    achievements: ['Authentication', 'Realtime chat', 'Notifications', 'End-to-end features'],
  },
];
