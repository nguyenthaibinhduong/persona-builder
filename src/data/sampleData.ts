import { CVData, PortfolioProject } from '@/types';

export const sampleCVData: CVData = {
  personal: {
    fullName: 'Alex Nguyen',
    title: 'Senior Fullstack Engineer',
    email: 'alex@example.com',
    phone: '+84 912 345 678',
    location: 'Ho Chi Minh City, Vietnam',
    website: 'alexnguyen.dev',
    linkedin: 'linkedin.com/in/alexnguyen',
    github: 'github.com/alexnguyen',
  },
  summary: 'Results-driven Fullstack Engineer with 8+ years of experience building scalable web applications and leading cross-functional teams. Specialized in React, Node.js, and cloud architecture. Passionate about clean code, user experience, and delivering impactful products.',
  skills: [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL'] },
    { category: 'DevOps', items: ['AWS', 'Docker', 'CI/CD', 'Kubernetes', 'Terraform'] },
    { category: 'Tools', items: ['Figma', 'Git', 'Jira', 'Notion', 'VS Code'] },
  ],
  experience: [
    {
      company: 'TechVision Inc.',
      role: 'Senior Fullstack Engineer',
      duration: '2021 – Present',
      description: [
        'Led development of a SaaS platform serving 50K+ users, improving performance by 40%',
        'Architected microservices infrastructure reducing deployment time by 60%',
        'Mentored team of 5 junior developers and established coding standards',
      ],
    },
    {
      company: 'Digital Craft Studio',
      role: 'Fullstack Developer',
      duration: '2018 – 2021',
      description: [
        'Built 20+ client projects including e-commerce platforms and dashboards',
        'Implemented CI/CD pipelines reducing release cycles from weeks to days',
        'Collaborated with design team to improve UX across all products',
      ],
    },
    {
      company: 'StartupHub',
      role: 'Frontend Developer',
      duration: '2016 – 2018',
      description: [
        'Developed responsive web applications using React and Redux',
        'Reduced page load time by 50% through code optimization',
        'Contributed to open-source UI component library with 2K+ stars',
      ],
    },
  ],
  education: [
    {
      school: 'HCMC University of Technology',
      degree: 'B.Sc. Computer Science',
      duration: '2012 – 2016',
      gpa: '3.7/4.0',
    },
  ],
  projects: [
    {
      name: 'CloudDash Pro',
      role: 'Lead Developer',
      summary: 'Real-time cloud monitoring dashboard with AI-powered anomaly detection',
      techStack: ['React', 'Node.js', 'AWS', 'TensorFlow'],
      link: 'clouddash.dev',
    },
    {
      name: 'ShopFlow',
      role: 'Fullstack Developer',
      summary: 'E-commerce platform with AI product recommendations, serving 10K+ daily orders',
      techStack: ['Next.js', 'Python', 'PostgreSQL', 'Stripe'],
    },
  ],
  certifications: [
    'AWS Solutions Architect – Associate',
    'Google Cloud Professional Developer',
    'Meta Frontend Developer Certificate',
  ],
  languages: [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Professional' },
    { name: 'Japanese', level: 'Conversational' },
  ],
};

export const sampleProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'CloudDash Pro',
    category: 'Web App',
    description: 'Real-time cloud infrastructure monitoring dashboard with AI-powered anomaly detection and automated alerting system.',
    image: '',
    techStack: ['React', 'TypeScript', 'AWS', 'TensorFlow', 'D3.js'],
    demoUrl: 'https://clouddash.dev',
    githubUrl: 'https://github.com/alex/clouddash',
    featured: true,
  },
  {
    id: '2',
    title: 'ShopFlow E-Commerce',
    category: 'E-Commerce',
    description: 'Full-featured e-commerce platform with AI product recommendations, real-time inventory management, and multi-vendor support.',
    image: '',
    techStack: ['Next.js', 'Python', 'PostgreSQL', 'Stripe', 'Redis'],
    demoUrl: 'https://shopflow.io',
    featured: true,
  },
  {
    id: '3',
    title: 'HealthTrack Mobile',
    category: 'Mobile App',
    description: 'Cross-platform health tracking app with wearable integration, personalized insights, and telehealth features.',
    image: '',
    techStack: ['React Native', 'Firebase', 'HealthKit', 'Node.js'],
    featured: true,
  },
  {
    id: '4',
    title: 'DesignSystem UI',
    category: 'Open Source',
    description: 'Comprehensive React component library with 60+ components, theming support, and accessibility-first approach.',
    image: '',
    techStack: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
    githubUrl: 'https://github.com/alex/designsystem',
    featured: false,
  },
  {
    id: '5',
    title: 'FinanceBot',
    category: 'AI/ML',
    description: 'AI-powered personal finance assistant with natural language processing for expense tracking and budget optimization.',
    image: '',
    techStack: ['Python', 'OpenAI', 'FastAPI', 'React'],
    featured: false,
  },
  {
    id: '6',
    title: 'EventHub Platform',
    category: 'Web App',
    description: 'Event management platform with real-time collaboration, ticketing, and analytics dashboard.',
    image: '',
    techStack: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
    demoUrl: 'https://eventhub.app',
    featured: false,
  },
];

export const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Vue.js', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python / FastAPI', level: 85 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'GraphQL', level: 82 },
      { name: 'Redis', level: 78 },
    ],
  },
  {
    name: 'DevOps & Cloud',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker / K8s', level: 82 },
      { name: 'CI/CD', level: 88 },
      { name: 'Terraform', level: 75 },
    ],
  },
  {
    name: 'Design & Tools',
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'UI/UX Design', level: 80 },
      { name: 'Git', level: 95 },
      { name: 'Agile / Scrum', level: 88 },
    ],
  },
];

export const services = [
  { icon: 'Globe', title: 'Web Development', description: 'Full-stack web applications with modern technologies and best practices' },
  { icon: 'Smartphone', title: 'Mobile Development', description: 'Cross-platform mobile apps with React Native and native integrations' },
  { icon: 'Palette', title: 'UI/UX Design', description: 'User-centered design with focus on usability and visual excellence' },
  { icon: 'Layout', title: 'Landing Pages', description: 'High-converting landing pages optimized for performance and SEO' },
  { icon: 'BarChart3', title: 'Dashboard Systems', description: 'Data-driven dashboards with real-time analytics and visualization' },
  { icon: 'Settings', title: 'Consulting', description: 'Technical consulting for architecture, performance, and scalability' },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'TechStart Inc.',
    text: 'Alex delivered exceptional work on our platform. His attention to detail and technical expertise transformed our vision into reality.',
    avatar: '',
  },
  {
    name: 'Michael Park',
    role: 'Product Manager',
    company: 'InnovateLab',
    text: 'Working with Alex was a game-changer. He brought both technical depth and design sensibility that elevated our entire product.',
    avatar: '',
  },
  {
    name: 'Lisa Tran',
    role: 'CTO',
    company: 'DataFlow Systems',
    text: 'Alex\'s ability to architect scalable solutions while maintaining clean code is remarkable. Highly recommended for any serious project.',
    avatar: '',
  },
];

export const experiences = [
  {
    company: 'TechVision Inc.',
    role: 'Senior Fullstack Engineer',
    duration: '2021 – Present',
    description: 'Leading development of SaaS products, architecting microservices, and mentoring engineering team.',
    achievements: ['50K+ users served', '40% performance improvement', 'Team of 5 mentored'],
  },
  {
    company: 'Digital Craft Studio',
    role: 'Fullstack Developer',
    duration: '2018 – 2021',
    description: 'Built 20+ client projects spanning e-commerce, dashboards, and enterprise solutions.',
    achievements: ['20+ projects delivered', 'CI/CD pipeline setup', 'Cross-team collaboration'],
  },
  {
    company: 'StartupHub',
    role: 'Frontend Developer',
    duration: '2016 – 2018',
    description: 'Developed responsive web applications and contributed to open-source component libraries.',
    achievements: ['50% load time reduction', '2K+ GitHub stars', 'React ecosystem expert'],
  },
];
