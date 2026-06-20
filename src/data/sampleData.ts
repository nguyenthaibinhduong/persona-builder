import { CVData, PortfolioProject } from '@/types';

export const sampleCVData: CVData = {
  personal: {
    fullName: 'NGUYỄN THÁI BÌNH DƯƠNG',
    title: 'Frontend Developer / React Native Developer',
    email: 'nguyenthaibinhduong182003@gmail.com',
    phone: '0395659769',
    location: 'Quận 12, TP.HCM',
    website: 'https://realtime-dev-chatapp-dnq2.vercel.app/',
    linkedin: '',
    github: 'github.com/nguyenthaibinhduong',
  },
  summary:
    'Frontend Developer có 2 năm kinh nghiệm thực tế trong phát triển ứng dụng web và mobile với ReactJS, NextJS, React Native, TypeScript và các công nghệ frontend hiện đại. Có kinh nghiệm xây dựng giao diện người dùng, reusable components, tích hợp REST API, quản lý state và tối ưu trải nghiệm trên mobile/tablet. Đã tham gia các sản phẩm thực tế trong lĩnh vực chính quyền điện tử, quản lý bệnh viện và hệ thống realtime. Biết sử dụng các công cụ AI hỗ trợ lập trình như GitHub Copilot, Cursor AI và ChatGPT để tăng tốc debug, refactor và phát triển tính năng, đồng thời vẫn tự kiểm soát logic nghiệp vụ, chất lượng code và trải nghiệm người dùng.',
  skills: [
    {
      category: 'Frontend',
      items: ['ReactJS', 'NextJS', 'React Native', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3'],
    },
    {
      category: 'UI & Styling',
      items: ['TailwindCSS', 'NativeWind', 'Responsive Design', 'Mobile-first Design', 'Reusable Components'],
    },
    {
      category: 'Testing & Debugging',
      items: ['Chrome DevTools', 'Postman', 'Error Handling', 'UI Debugging', 'Unit Testing cơ bản'],
    },
    {
      category: 'Tools & Workflow',
      items: ['Git', 'GitHub', 'Figma', 'Docker', 'Firebase', 'Agile/Scrum'],
    },
    {
      category: 'AI-assisted Development',
      items: ['GitHub Copilot', 'Cursor AI', 'ChatGPT', 'Claude AI'],
    },
    {
      category: 'Kỹ năng mềm',
      items: ['Giải quyết vấn đề', 'Tự học', 'Phối hợp nhóm', 'Đọc hiểu yêu cầu', 'Tư duy sản phẩm'],
    },
  ],
  experience: [
    {
      company: 'Công ty TNHH Phần mềm Minasoft',
      role: 'Frontend Developer — ReactJS / React Native',
      duration: '10/2024 - nay',
      description: [
        'Phát triển giao diện web và mobile bằng ReactJS, React Native và TypeScript cho các sản phẩm phần mềm thực tế.',
        'Đảm nhận phần frontend mobile cho dự án HĐND Số, bao gồm các module: lịch họp, lấy ý kiến, tài liệu, thông báo, thư viện cá nhân và hậu cần.',
        'Tích hợp REST API và xử lý các trạng thái loading, empty, error, success nhằm cải thiện trải nghiệm người dùng trên mobile/tablet.',
        'Xây dựng reusable components và base components giúp chuẩn hóa giao diện, giảm thời gian phát triển các màn hình mới.',
        'Tối ưu hiệu năng render cho các danh sách dữ liệu lớn và các luồng nghiệp vụ phức tạp trên mobile/tablet.',
        'Phối hợp với backend developer và QA để xử lý lỗi, kiểm tra luồng nghiệp vụ và cải thiện độ ổn định của sản phẩm.',
        'Hỗ trợ maintain một số module backend PHP Laminas/CodeIgniter để hiểu và xử lý luồng end-to-end khi cần thiết.',
      ],
    },
  ],
  education: [
    {
      school: 'Đại học Công nghiệp TP. Hồ Chí Minh — IUH',
      degree:
        'Cử nhân Hệ thống Thông tin\nDự kiến tốt nghiệp: 2027\nMôn học liên quan: Lập trình hướng đối tượng, Phát triển ứng dụng Web, Phát triển ứng dụng, Cơ sở dữ liệu, Công nghệ phần mềm',
      duration: '2021 - 2027',
      gpa: '',
    },
  ],
  projects: [
    {
      name: 'HĐND Số Mobile App',
      role: 'Frontend Mobile Developer',
      summary:
        'Phát triển giao diện mobile/tablet cho ứng dụng chính quyền điện tử hỗ trợ lịch họp, tài liệu, thông báo, lấy ý kiến và quy trình hậu cần. Xây dựng reusable UI components, tích hợp REST API, quản lý state bằng Redux Toolkit và cải thiện trải nghiệm người dùng thông qua xử lý loading, empty, error.',
      techStack: ['React Native', 'TypeScript', 'Redux Toolkit', 'REST API'],
    },
    {
      name: 'CodeSync - Nền tảng nhắn tin công việc cho dev',
      role: 'Frontend / Fullstack Developer',
      summary:
        'Xây dựng nền tảng chat realtime cho website với kênh chat làm việc, tích hợp quản lý mã nguồn GitHub và quản lý nhóm chat dự án. Tích hợp WebSocket, user presence, API và Webhook GitHub để hiển thị dữ liệu repositories, commits. Thiết kế các luồng đăng nhập, danh sách hội thoại, phòng chat, xử lý tin nhắn và tạo báo cáo công việc trong tin nhắn.',
      techStack: ['ReactJS', 'NestJS', 'Redis', 'WebSocket'],
      link: 'https://realtime-dev-chatapp-dnq2.vercel.app/',
    },
  ],
  certifications: [],
  languages: [
    { name: 'Tiếng Việt', level: 'Bản ngữ' },
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
