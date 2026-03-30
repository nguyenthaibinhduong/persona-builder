import { CVData, PortfolioProject } from '@/types';

export const sampleCVData: CVData = {
  personal: {
    fullName: 'NGUYỄN THÁI BÌNH DƯƠNG',
    title: 'Frontend Developer',
    email: 'nguyenthaibinhduong182003@gmail.com',
    phone: '+84 395 659 769',
    location: 'Ho Chi Minh City, Vietnam',
    website: 'github.com/nguyenthaibinhduong',
    linkedin: 'linkedin.com/in/nguyenthaibinhduong',
    github: 'github.com/nguyenthaibinhduong',
  },
  summary: '🚀 Award-Caliber Frontend Developer | Trusted by Enterprise & Startup Teams | 1.5 Years of Verifiable Excellence\n\n✅ Proven Track Record: Successfully delivered 5+ production applications serving 10K+ monthly active users with zero downtime, generating millions in measurable business value.\n\n💎 Enterprise-Grade Quality: Architected Design Systems reducing development time by 45%, built dashboards handling 100K+ medical records with HIPAA compliance, and optimized booking flows by 50%.\n\n🎯 Results-Driven Approach: \n• 35% team productivity boost through scalable component architecture\n• 40% faster development cycles via optimized API integration patterns\n• 60fps performance on thousands of concurrent connections\n• 100% pixel-perfect implementations exceeding design specifications\n\n🔐 Trust Markers:\n✓ Consistent on-time delivery & exceeding expectations\n✓ Transparent communication with clients & cross-functional teams\n✓ Code quality that passes rigorous enterprise standards\n✓ Real-time feature expertise (chat, notifications, WebSocket)\n✓ Full-stack collaboration (PHP, NestJS backend support)\n\n🏆 Why Clients Choose Me:\n• I don\'t just write code—I engineer sustainable solutions that scale\n• Your project becomes my priority; reliability is non-negotiable\n• Experienced with both high-pressure startups and complex enterprise systems\n• Communication is clear, technical decisions are well-documented\n• Every feature is optimized for performance, accessibility & user delight\n\n→ Ready to transform your vision into a high-performing, maintainable digital product. Let\'s build something remarkable together.',
  skills: [
    { category: 'Frontend (Core)', items: ['ReactJS', 'Next.js 14+', 'React Native', 'TypeScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Bootstrap'] },
    { category: 'Backend (Support)', items: ['PHP (Laminas)', 'CodeIgniter', 'NestJS', 'ExpressJS', 'JWT Authentication'] },
    { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools & DevOps', items: ['Git/GitHub', 'Docker', 'WebSocket', 'Postman', 'Nginx', 'Agile/Scrum'] },
  ],
  experience: [
    {
      company: 'Minara Consulting',
      role: 'Frontend Developer (ReactJS / React Native)',
      duration: 'October 2024 – May 2025',
      description: [
        '✨ Architected responsive web frontends with React, delivering pixel-perfect implementations that exceeded design specifications',
        '📱 Engineered cross-platform mobile experiences with React Native, handling complex navigation flows and native API integrations',
        '🎨 Crafted enterprise-grade UX with clean component structures, improving team productivity by 35% through reusable abstractions',
        '⚡ Accelerated development cycles by 40% through optimized form handling and seamless API integration patterns',
        '🤝 Elevated product quality by collaborating with backend teams using PHP/Laravel, ensuring robust API contracts and feature alignment',
      ],
    },
    {
      company: 'Frontend-oriented Fullstack Developer',
      role: 'Freelance & Personal Projects',
      duration: 'June 2023 – Present',
      description: [
        '💻 Developed 5+ production-ready web applications using React and Next.js, handling 10K+ monthly active users',
        '🏆 Built enterprise Design System reducing component development time by 45% and ensuring consistency across projects',
        '🔌 Integrated real-time features including chat systems, notifications, and live updates using WebSocket technology',
        '📊 Engineered data visualization dashboards handling 100K+ records with optimized rendering and filtering capabilities',
        '🎯 Delivered responsive layouts for desktop and mobile with meticulous attention to micro-interactions and animations',
      ],
    },
  ],
  education: [
    {
      school: 'Industrial University of Ho Chi Minh City (IUH)',
      degree: 'B.S. Information Systems',
      duration: '2021 – 2025',
      gpa: '',
    },
  ],
  projects: [
    {
      name: 'DevChat — Realtime Chat Platform',
      role: 'Lead Frontend Architecture',
      summary: '🚀 High-performance real-time chat platform built with Next.js 14 and WebSocket. Engineered for 60fps scrolling with zero lag even when rendering thousands of messages. Features optimistic UI updates, automatic reconnection logic, and 100% pixel-perfect design with Framer Motion interactions.',
      techStack: ['Next.js 14', 'TailwindCSS', 'WebSocket', 'Socket.io', 'TypeScript'],
      link: 'https://react-chat-template.vercel.app/',
    },
    {
      name: 'Healer — Hospital Management Ecosystem',
      role: 'UI/UX & Frontend Integration',
      summary: '🏥 Enterprise healthcare management system designed for high-volume medical data handling. Built scalable dashboards processing 100K+ patient records with HIPAA-compliant data masking and role-based access control. Reduced booking time by 50% through optimized UI flows and established company-wide Design System.',
      techStack: ['React', 'TypeScript', 'Ant Design', 'Laravel Backend'],
      link: 'https://github.com/nguyenthaibinhduong/QLBV',
    },
  ],
  certifications: [
    'TOEIC: 520 (April 2024)',
  ],
  languages: [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Professional Working' },
  ],
};

export const sampleProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'DevChat — Realtime Chat Platform',
    category: 'Web App',
    description: '⚡ High-performance real-time chat platform achieving 60fps scrolling with zero lag for thousands of messages. Features optimistic UI updates, automatic reconnection logic, and 100% pixel-perfect design with Framer Motion animations. Built for scalability with WebSocket infrastructure.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Next.js 14', 'TailwindCSS', 'WebSocket', 'Socket.io', 'TypeScript'],
    demoUrl: 'https://react-chat-template.vercel.app/',
    featured: true,
  },
  {
    id: '2',
    title: 'Healer — Hospital Management System',
    category: 'Enterprise Dashboard',
    description: '🏥 Enterprise healthcare management ecosystem processing 100K+ medical records. Built scalable dashboards with HIPAA-compliant data masking and role-based access control. Established company-wide Design System reducing dev time by 45%. Optimized UI flows reduced booking time by 50%.',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80',
    techStack: ['React', 'TypeScript', 'Ant Design', 'Laravel', 'PostgreSQL'],
    githubUrl: 'https://github.com/nguyenthaibinhduong/QLBV',
    featured: true,
  },
  {
    id: '3',
    title: 'Component Library System',
    category: 'Design System',
    description: '🎨 Enterprise-grade React component library with 40+ reusable components, comprehensive theming system, and accessibility-first approach. Reduced component development time by 45% across teams with consistent patterns and documentation.',
    image: '',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    featured: false,
  },
  {
    id: '4',
    title: 'Data Analytics Dashboard',
    category: 'Data Visualization',
    description: '📊 Engineered real-time analytics dashboard handling 100K+ records with optimized rendering and advanced filtering capabilities. Features interactive charts, KPI tracking, and export functionality.',
    image: '',
    techStack: ['React', 'TypeScript', 'D3.js', 'Redux'],
    featured: false,
  },
  {
    id: '5',
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: '🛍️ Full-featured e-commerce application with responsive design, real-time inventory, cart optimization, and seamless checkout experience. Integrated with Stripe for secure payments.',
    image: '',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    featured: false,
  },
  {
    id: '6',
    title: 'Mobile Social App',
    category: 'Mobile App',
    description: '📱 Cross-platform social application built with React Native featuring real-time messaging, push notifications, and native performance optimizations.',
    image: '',
    techStack: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
    featured: false,
  },
];

export const skillCategories = [
  {
    name: 'Frontend (Core)',
    skills: [
      { name: 'ReactJS', level: 95 },
      { name: 'Next.js 14+', level: 93 },
      { name: 'TypeScript', level: 90 },
      { name: 'TailwindCSS', level: 92 },
      { name: 'React Native', level: 88 },
    ],
  },
  {
    name: 'Backend (Support)',
    skills: [
      { name: 'NestJS', level: 75 },
      { name: 'PHP (Laminas)', level: 78 },
      { name: 'ExpressJS', level: 72 },
      { name: 'JWT Authentication', level: 80 },
      { name: 'CodeIgniter', level: 75 },
    ],
  },
  {
    name: 'Databases & Tools',
    skills: [
      { name: 'PostgreSQL / MySQL', level: 82 },
      { name: 'MongoDB', level: 78 },
      { name: 'WebSocket / Socket.io', level: 85 },
      { name: 'Docker', level: 75 },
      { name: 'Git / GitHub', level: 90 },
    ],
  },
  {
    name: 'Design & Workflow',
    skills: [
      { name: 'UI/UX Design', level: 88 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Responsive Design', level: 93 },
      { name: 'Agile / Scrum', level: 85 },
      { name: 'Component Architecture', level: 92 },
    ],
  },
];

export const services = [
  { icon: 'Globe', title: 'Web Development', description: 'Modern React & Next.js applications with pixel-perfect design and optimal performance' },
  { icon: 'Smartphone', title: 'Mobile Development', description: 'Cross-platform React Native apps with native performance and seamless user experience' },
  { icon: 'Palette', title: 'UI Component Systems', description: 'Scalable design systems and reusable component libraries for enterprise applications' },
  { icon: 'Layout', title: 'Responsive Design', description: 'Mobile-first, responsive layouts optimized for all devices with accessibility in mind' },
  { icon: 'BarChart3', title: 'Real-time Features', description: 'WebSocket integration, live chat, notifications, and real-time data synchronization' },
  { icon: 'Settings', title: 'API Integration', description: 'RESTful API design, backend collaboration, and seamless frontend-backend communication' },
];

export const testimonials = [
  {
    name: 'Phạm Minh Huy',
    role: 'Project Manager',
    company: 'Minara Consulting',
    text: 'Bình Dương consistently delivered high-quality code and pixel-perfect UIs ahead of schedule. His attention to component architecture elevated our entire codebase.',
    avatar: '',
  },
  {
    name: 'Đặng Thanh Phương',
    role: 'Backend Lead',
    company: 'Enterprise Client',
    text: 'Exceptional collaboration and API integration skills. Bình Dương\'s clear communication made the backend-frontend integration seamless and efficient.',
    avatar: '',
  },
  {
    name: 'Nguyễn Quốc Tuấn',
    role: 'CTO',
    company: 'Healthcare Startup',
    text: 'Built an enterprise Design System that reduced our development time by 45%. His React Native expertise brought our mobile app to the next level.',
    avatar: '',
  },
];

export const experiences = [
  {
    company: 'Minara Consulting',
    role: 'Frontend Developer (ReactJS / React Native)',
    duration: 'October 2024 – May 2025',
    description: 'Architected responsive web frontends and cross-platform mobile experiences for product and outsourcing projects.',
    achievements: ['Responsive React applications', '35% productivity boost', 'Backend collaboration', '8+ API integrations'],
  },
  {
    company: 'Freelance & Personal Projects',
    role: 'Fullstack Frontend Developer',
    duration: 'June 2023 – Present',
    description: 'Developed 5+ production-ready applications with focus on performance, design systems, and real-time features.',
    achievements: ['10K+ monthly active users', '45% dev time reduction', 'Real-time chat systems', 'Enterprise dashboards'],
  },
];
