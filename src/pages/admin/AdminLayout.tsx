import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LayoutList,
  FolderKanban,
  Briefcase,
  Layers,
  Quote,
  ArrowLeft,
  Sun,
  Moon,
  FileText,
  ShoppingBag,
  CreditCard,
  LogOut,
  Database,
  Loader2,
  Shield,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const navGroups = [
  {
    label: 'Nội dung',
    items: [
      { to: '/adminabc', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/adminabc/blog', label: 'Bài viết Blog', icon: FileText },
      { to: '/adminabc/projects', label: 'Dự án Bento', icon: FolderKanban },
    ],
  },
  {
    label: 'Kinh doanh',
    items: [
      { to: '/adminabc/services', label: 'Dịch vụ & Giá', icon: ShoppingBag },
      { to: '/adminabc/payments', label: 'Giao dịch', icon: CreditCard },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { to: '/adminabc/sections', label: 'Các phần hiển thị', icon: LayoutList },
      { to: '/adminabc/experience', label: 'Kinh nghiệm', icon: Briefcase },
      { to: '/adminabc/skills', label: 'Kỹ năng', icon: Layers },
      { to: '/adminabc/testimonials', label: 'Đánh giá', icon: Quote },
    ],
  },
  {
    label: 'Hệ thống',
    items: [
      { to: '/adminabc/users', label: 'Tài khoản & Quyền', icon: Shield },
    ],
  },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Lỗi khi đăng xuất: ' + error.message);
    } else {
      toast.success('Đã đăng xuất tài khoản quản trị');
      navigate('/admin-login');
    }
  };

  const isActive = (path: string, end?: boolean) =>
    end ? location.pathname === path : location.pathname.startsWith(path);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">Đang xác thực thông tin...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/admin-login" replace />;
  }

  const allNavItems = navGroups.flatMap(g => g.items);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden lg:flex flex-col">
        <div className="p-5 border-b border-border">
          <Link to="/" className="font-heading text-xl font-semibold text-foreground tracking-tight">
            Folio<span className="text-accent">.</span> <span className="text-sm font-normal text-muted-foreground">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-5 overflow-y-auto">
          {navGroups.map(group => (
            <div key={group.label} className="space-y-1">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.to, item.end)
                        ? 'bg-accent/10 text-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1 bg-card/50">
          <div className="px-3 py-2.5 flex items-center gap-2.5 rounded-lg bg-secondary/40 border border-border/30 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-foreground truncate">Supabase DB</p>
              <p className="text-[9px] text-muted-foreground truncate">Connected (RLS Active)</p>
            </div>
            <Database className="w-3.5 h-3.5 text-accent" />
          </div>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>

          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/adminabc" className="font-heading text-lg font-semibold text-foreground">
            Folio<span className="text-accent">.</span> Admin
          </Link>
          <div className="flex items-center gap-1 overflow-x-auto max-w-[70vw] no-scrollbar">
            {allNavItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`p-2 rounded-md transition-colors ${
                  isActive(item.to, item.end) ? 'text-accent bg-accent/10' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-4 h-4" />
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="p-2 rounded-md text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <div className="p-6 lg:p-10 pt-20 lg:pt-10 md:max-w-[90vw] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
