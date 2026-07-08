-- =========================================================================
-- SQL SEED FOR AUTH USERS & PROFILES
-- Chạy script này trong phần SQL Editor trên Supabase Dashboard
-- để tạo các tài khoản xác thực tương ứng với phân quyền trong hệ thống.
-- =========================================================================

-- Kích hoạt pgcrypto nếu chưa được kích hoạt
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Xóa các tài khoản cũ trong auth.users (nếu có trùng lặp email) để tránh lỗi xung đột
DELETE FROM auth.users 
WHERE email IN ('admin@portfolio.local', 'viewer@portfolio.local', 'editor@portfolio.local');

-- Tạm thời vô hiệu hóa trigger trên auth.users nếu có (để tránh lỗi trigger khi insert thủ công)
-- ALTER TABLE auth.users DISABLE TRIGGER ALL;

-- 2. Tạo tài khoản Admin (Email: admin@portfolio.local, Password: password123)
-- Có ID khớp với cấu hình profiles: '11111111-1111-1111-1111-111111111111'
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated',
  'authenticated',
  'admin@portfolio.local',
  crypt('password123', gen_salt('bf', 10)),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  now(),
  now(),
  '',
  ''
);

-- 3. Tạo tài khoản Editor (Email: editor@portfolio.local, Password: password123)
-- Có ID khớp với cấu hình profiles: '22222222-2222-2222-2222-222222222222'
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '22222222-2222-2222-2222-222222222222',
  'authenticated',
  'authenticated',
  'editor@portfolio.local',
  crypt('password123', gen_salt('bf', 10)),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  now(),
  now(),
  '',
  ''
);

-- 4. Tạo tài khoản Viewer (Email: viewer@portfolio.local, Password: password123)
-- Có ID khớp với cấu hình profiles: '33333333-3333-3333-3333-333333333333'
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '33333333-3333-3333-3333-333333333333',
  'authenticated',
  'authenticated',
  'viewer@portfolio.local',
  crypt('password123', gen_salt('bf', 10)),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  now(),
  now(),
  '',
  ''
);

-- Kích hoạt lại trigger trên auth.users nếu đã vô hiệu hóa
-- ALTER TABLE auth.users ENABLE TRIGGER ALL;

-- 5. Đảm bảo các bản ghi phân quyền trong bảng profiles (schema public) khớp hoàn toàn
-- Nếu bảng profiles chưa được định nghĩa hoặc chưa có dữ liệu mẫu, phần này sẽ đồng bộ chúng.
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bật RLS cho bảng profiles nếu chưa bật
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Tạo các policy cơ bản cho bảng profiles (để người dùng xem được danh sách và tự đọc thông tin của mình)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles read access') THEN
    CREATE POLICY "Public profiles read access" ON public.profiles FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin manage profiles') THEN
    CREATE POLICY "Admin manage profiles" ON public.profiles FOR ALL TO authenticated USING (
      (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
    );
  END IF;
END
$$;

-- Đồng bộ dữ liệu quyền của 3 tài khoản mẫu
INSERT INTO public.profiles (id, email, role, updated_at) VALUES 
('11111111-1111-1111-1111-111111111111', 'admin@portfolio.local', 'admin', now()),
('22222222-2222-2222-2222-222222222222', 'editor@portfolio.local', 'editor', now()),
('33333333-3333-3333-3333-333333333333', 'viewer@portfolio.local', 'viewer', now())
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email, 
  role = EXCLUDED.role, 
  updated_at = EXCLUDED.updated_at;
