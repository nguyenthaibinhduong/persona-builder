-- ==========================================
-- STRUCTURE DEFINITIONS
-- ==========================================

-- 1. Bảng Cấu hình hệ thống (Settings)
create table if not exists settings (
  key text primary key,
  value text not null,
  created_at timestamptz default now()
);

-- 2. Bảng Bài viết Blog
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text default '',
  content text default '',
  cover_image text default '',
  status text check (status in ('draft', 'published')) default 'draft',
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Bảng Dự án
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default '',
  description text default '',
  image_url text default '',
  tech_stack text[] default '{}',
  demo_url text default '',
  github_url text default '',
  featured boolean default false,
  created_at timestamptz default now()
);

-- 4. Bảng Dịch vụ
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  price integer not null default 0,
  currency text default 'usd',
  delivery_days integer default 7,
  features text[] default '{}',
  status text check (status in ('active', 'inactive')) default 'active',
  payment_link text default '',
  created_at timestamptz default now()
);

-- 5. Bảng Thanh toán
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete set null,
  service_title text default '',
  client_name text not null,
  client_email text not null,
  amount integer not null default 0,
  currency text default 'usd',
  status text check (status in ('pending', 'completed', 'refunded')) default 'pending',
  stripe_session_id text default '',
  created_at timestamptz default now()
);

-- Kích hoạt RLS bảo mật
alter table settings enable row level security;
alter table blog_posts enable row level security;
alter table projects enable row level security;
alter table services enable row level security;
alter table payments enable row level security;

-- Quy tắc truy cập công khai (SELECT)
create policy "Công khai SELECT settings" on settings for select using (true);
create policy "Công khai SELECT blog_posts" on blog_posts for select using (status = 'published');
create policy "Công khai SELECT projects" on projects for select using (true);
create policy "Công khai SELECT services" on services for select using (status = 'active');

-- Quyền ghi toàn quyền cho Admin đã xác thực (INSERT, UPDATE, DELETE)
create policy "Admin quản lý settings" on settings for all to authenticated using (true);
create policy "Admin quản lý blog_posts" on blog_posts for all to authenticated using (true);
create policy "Admin quản lý projects" on projects for all to authenticated using (true);
create policy "Admin quản lý services" on services for all to authenticated using (true);
create policy "Admin quản lý payments" on payments for all to authenticated using (true);

-- ==========================================
-- DỮ LIỆU MẪU BAN ĐẦU (SEED DATA)
-- ==========================================
insert into settings (key, value) values 
('chatbot_api_key', 'YOUR_GEMINI_API_KEY_HERE'),
('profile_name', 'NGUYỄN THÁI BÌNH DƯƠNG'),
('profile_title', 'Frontend Developer / React Native Developer'),
('profile_email', 'nguyenthaibinhduong182003@gmail.com'),
('profile_phone', '0395659769'),
('profile_location', 'Quận 12, TP.HCM'),
('profile_github', 'github.com/nguyenthaibinhduong'),
('profile_summary', 'Frontend Developer có 2 năm kinh nghiệm thực tế trong phát triển ứng dụng web và mobile với ReactJS, NextJS, React Native, TypeScript và các công nghệ frontend hiện đại.')
on conflict (key) do update set value = excluded.value;

insert into projects (title, category, description, image_url, tech_stack, demo_url, github_url, featured) values
('CodeSync - Nền tảng cộng tác realtime', 'SaaS Web App', 'Nền tảng chat realtime cho web và mobile với responsive UI, tin nhắn realtime, presence và quản lý channel.', '/images/codesync.png', ARRAY['ReactJS', 'React Native', 'NestJS', 'Redis', 'WebSocket'], 'https://realtime-dev-chatapp-dnq2.vercel.app/', 'https://github.com/nguyenthaibinhduong', true),
('HĐND Số Mobile App', 'Government Tech', 'Ứng dụng mobile/tablet hỗ trợ thông báo, lịch họp, lấy ý kiến, tài liệu và thư viện cá nhân. Tập trung vào UI/UX và REST API.', '/images/hdnd-so.png', ARRAY['React Native', 'TypeScript', 'Redux Toolkit', 'REST API'], '', '', false),
('Freelance Service Marketplace UI', 'Marketplace UI', 'Giao diện quản lý dịch vụ freelance: danh sách dịch vụ, lọc/tìm kiếm, chi tiết, hình ảnh, trạng thái hiển thị.', '/images/booking.png', ARRAY['ReactJS', 'TypeScript', 'REST API', 'TailwindCSS'], 'https://creator.minasoft.vn/', '', true)
on conflict do nothing;

insert into services (title, description, price, currency, delivery_days, features, status, payment_link) values
('Web Development', 'Phát triển ứng dụng ReactJS và NextJS với giao diện responsive, dễ mở rộng và dễ maintain.', 15000, 'usd', 7, ARRAY['Responsive UI', 'State Management', 'REST API Integration'], 'active', 'https://buy.stripe.com/test_14o5'),
('Mobile Development', 'Xây dựng ứng dụng React Native cho mobile/tablet với trải nghiệm người dùng ổn định.', 25000, 'usd', 10, ARRAY['React Native iOS & Android', 'Performance Optimization', 'Native Components'], 'active', 'https://buy.stripe.com/test_25p3')
on conflict do nothing;

insert into blog_posts (title, slug, excerpt, content, cover_image, status, tags) values
('Tối ưu hóa Performance trong React Native', 'optimize-react-native-performance', 'Cách giảm thiểu số lần re-render, tối ưu hình ảnh và danh sách dài FlatList trong ứng dụng di động.', 'Nội dung chi tiết bài viết...', '/images/reuse.png', 'published', ARRAY['React Native', 'Performance'])
on conflict (slug) do nothing;
