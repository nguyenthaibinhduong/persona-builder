import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { KeyRound, Mail, ArrowRight, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/adminabc');
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (password.length < 6) {
      toast.error('Mật khẩu phải tối thiểu 6 ký tự');
      return;
    }

    setLoading(true);

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Đăng ký tài khoản thành công! Bạn có thể đăng nhập ngay.');
        setIsSignUp(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log(error)

      if (error) {
        toast.error('Đăng nhập thất bại: Sai email hoặc mật khẩu');
      } else {
        toast.success('Đăng nhập quản trị viên thành công!');
        navigate('/adminabc');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card/80 border border-border/50 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4 border border-accent/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Folio<span className="text-accent">.</span> Control Center
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {isSignUp ? 'Tạo tài khoản quản trị portfolio' : 'Đăng nhập vào trang quản trị nội dung'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@portfolio.local"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors placeholder:text-muted-foreground/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/25 hover:shadow-accent/40"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {isSignUp ? 'Đăng ký tài khoản' : 'Đăng nhập'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-accent hover:underline font-semibold"
          >
            {isSignUp ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chưa có tài khoản? Đăng ký tại đây'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
