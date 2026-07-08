import { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';
import {
  LayoutGrid,
  FolderKanban,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Bot,
  Mail,
  Phone,
  MapPin,
  Github,
  Save,
  Loader2,
  FileText,
  ShoppingBag,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { CmsFormField, CmsInput, CmsTextarea } from '@/components/admin/CmsFormField';

const AdminDashboard = () => {
  const { sections, projects } = useAdmin();
  const visibleCount = sections.filter(s => s.visible).length;
  const featuredCount = projects.filter(p => p.featured).length;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Profile and Settings Form State
  const [profile, setProfile] = useState({
    profile_name: '',
    profile_title: '',
    profile_email: '',
    profile_phone: '',
    profile_location: '',
    profile_github: '',
    profile_summary: '',
    chatbot_api_key: '',
  });

  // Load Settings from Supabase
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('settings').select('*');
      if (error) {
        toast.error('Lỗi khi tải cấu hình hệ thống');
      } else if (data) {
        const loaded: any = {};
        data.forEach((item:any) => {
          loaded[item.key] = item.value;
        });
        setProfile(prev => ({
          ...prev,
          ...loaded,
        }));
      }
      setLoading(false);
    };

    loadSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const upsertData:any = Object.entries(profile).map(([key, value]) => ({
      key,
      value: value ?? '',
    }));

    const { error } = await supabase.from('settings').upsert(upsertData, { onConflict: 'key' });

    if (error) {
      toast.error('Lỗi khi cập nhật cấu hình: ' + error.message);
    } else {
      toast.success('Đã cập nhật thông tin thành công!');
    }
    setSaving(false);
  };

  const stats = [
    { label: 'Visible Sections', value: visibleCount, icon: Eye, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Hidden Sections', value: sections.length - visibleCount, icon: EyeOff, color: 'text-muted-foreground', bg: 'bg-muted/50' },
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Featured Projects', value: featuredCount, icon: FolderKanban, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Quản lý tổng quan thông tin website và cấu hình Chatbot</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải cấu hình...
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info Forms */}
          <form onSubmit={handleSaveSettings} className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <User className="w-5 h-5 text-accent" />
                <h2 className="font-heading text-lg font-semibold text-foreground">Thông tin cá nhân & Giới thiệu</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <CmsFormField label="Họ và tên" required>
                  <CmsInput
                    value={profile.profile_name}
                    onChange={e => setProfile({ ...profile, profile_name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </CmsFormField>

                <CmsFormField label="Chức danh" required>
                  <CmsInput
                    value={profile.profile_title}
                    onChange={e => setProfile({ ...profile, profile_title: e.target.value })}
                    placeholder="Frontend Developer"
                  />
                </CmsFormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <CmsFormField label="Email liên hệ">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <CmsInput
                      className="pl-9"
                      value={profile.profile_email}
                      onChange={e => setProfile({ ...profile, profile_email: e.target.value })}
                      placeholder="admin@portfolio.local"
                    />
                  </div>
                </CmsFormField>

                <CmsFormField label="Số điện thoại">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <CmsInput
                      className="pl-9"
                      value={profile.profile_phone}
                      onChange={e => setProfile({ ...profile, profile_phone: e.target.value })}
                      placeholder="039xxxxxx"
                    />
                  </div>
                </CmsFormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <CmsFormField label="Địa chỉ">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <CmsInput
                      className="pl-9"
                      value={profile.profile_location}
                      onChange={e => setProfile({ ...profile, profile_location: e.target.value })}
                      placeholder="TP. Hồ Chí Minh"
                    />
                  </div>
                </CmsFormField>

                <CmsFormField label="Đường dẫn GitHub">
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <CmsInput
                      className="pl-9"
                      value={profile.profile_github}
                      onChange={e => setProfile({ ...profile, profile_github: e.target.value })}
                      placeholder="github.com/username"
                    />
                  </div>
                </CmsFormField>
              </div>

              <CmsFormField label="Đoạn tự giới thiệu (Bio Summary)">
                <CmsTextarea
                  rows={4}
                  value={profile.profile_summary}
                  onChange={e => setProfile({ ...profile, profile_summary: e.target.value })}
                  placeholder="Giới thiệu bản thân và kinh nghiệm của bạn..."
                />
              </CmsFormField>
            </div>

            {/* Chatbot API Key configuration */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <Bot className="w-5 h-5 text-accent" />
                <h2 className="font-heading text-lg font-semibold text-foreground">Cấu hình Chatbot tư vấn</h2>
              </div>

              <CmsFormField label="AI API KEY (Gemini / OpenAI)" hint="Khóa API Key dùng cho chatbot tự động tư vấn dịch vụ của bạn trên trang chính">
                <CmsInput
                  type="password"
                  value={profile.chatbot_api_key}
                  onChange={e => setProfile({ ...profile, chatbot_api_key: e.target.value })}
                  placeholder="YOUR_GEMINI_API_KEY_HERE"
                />
              </CmsFormField>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Lưu toàn bộ thay đổi
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Quick Shortcuts */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-foreground px-1">Lối tắt nhanh</h3>
            <div className="grid gap-3">
              {[
                { to: '/adminabc/blog', title: 'Bài viết Blog', desc: 'Quản lý, tạo và biên tập bài viết', icon: FileText, color: 'text-accent', bg: 'bg-accent/10' },
                { to: '/adminabc/services', title: 'Dịch vụ & Giá', desc: 'Quản lý gói dịch vụ và thanh toán', icon: ShoppingBag, color: 'text-green-500', bg: 'bg-green-500/10' },
                { to: '/adminabc/projects', title: 'Bento Projects', desc: 'Quản lý dự án bento hiển thị', icon: FolderKanban, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
              ].map(action => (
                <Link
                  key={action.to}
                  to={action.to}
                  className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-accent/40 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.bg}`}>
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">{action.title}</h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{action.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
