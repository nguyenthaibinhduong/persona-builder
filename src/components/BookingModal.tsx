import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Phone, Mail, User, FileText, Calendar, DollarSign } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export interface BookingService {
  id: string;
  title: string;
  price: number;
  currency: string;
  delivery_days: number;
  payment_link: string | null;
}

interface BookingModalProps {
  service: BookingService | null;
  open: boolean;
  onClose: () => void;
}

function formatPrice(price: number, currency: string): string {
  if (currency === 'vnd') {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price / 100);
}

const BookingModal = ({ service, open, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [form, setForm] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    requirements: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.client_name.trim()) e.client_name = 'Vui lòng nhập họ tên';
    if (!form.client_email.trim()) e.client_email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email)) e.client_email = 'Email không hợp lệ';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !validate()) return;
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('payments')
        .insert({
          service_id: service.id,
          service_title: service.title,
          client_name: form.client_name.trim(),
          client_email: form.client_email.trim().toLowerCase(),
          client_phone: form.client_phone.trim() || null,
          requirements: form.requirements.trim() || null,
          amount: service.price,
          currency: service.currency,
          status: 'pending',
          stripe_session_id: null,
        })
        .select('order_reference')
        .single();

      if (error) throw error;
      setOrderRef(data?.order_reference ?? '');
      setStep('success');
    } catch (err) {
      console.error('Booking error:', err);
      setErrors({ submit: 'Có lỗi xảy ra, vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setForm({ client_name: '', client_email: '', client_phone: '', requirements: '' });
    setErrors({});
    setOrderRef('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Accent glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-border/40">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-accent mb-1">Đặt dịch vụ</p>
                <h2 className="text-lg font-bold text-foreground">{service.title}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <DollarSign className="w-3.5 h-3.5 text-accent" />
                    {formatPrice(service.price, service.currency)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {service.delivery_days} ngày hoàn thành
                  </span>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 'form' ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Họ và tên <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={form.client_name}
                          onChange={(e) => setForm(f => ({ ...f, client_name: e.target.value }))}
                          placeholder="Nguyễn Văn A"
                          className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${errors.client_name ? 'border-red-500/60' : 'border-border/60 hover:border-border'}`}
                        />
                      </div>
                      {errors.client_name && <p className="text-xs text-red-400 mt-1">{errors.client_name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Email <span className="text-accent">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={form.client_email}
                          onChange={(e) => setForm(f => ({ ...f, client_email: e.target.value }))}
                          placeholder="example@email.com"
                          className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all ${errors.client_email ? 'border-red-500/60' : 'border-border/60 hover:border-border'}`}
                        />
                      </div>
                      {errors.client_email && <p className="text-xs text-red-400 mt-1">{errors.client_email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Số điện thoại <span className="text-muted-foreground/50">(tùy chọn)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={form.client_phone}
                          onChange={(e) => setForm(f => ({ ...f, client_phone: e.target.value }))}
                          placeholder="0912 345 678"
                          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border/60 hover:border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Mô tả yêu cầu <span className="text-muted-foreground/50">(tùy chọn)</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <textarea
                          rows={3}
                          value={form.requirements}
                          onChange={(e) => setForm(f => ({ ...f, requirements: e.target.value }))}
                          placeholder="Mô tả ngắn gọn dự án hoặc yêu cầu của bạn..."
                          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border/60 hover:border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {errors.submit && (
                      <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{errors.submit}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Gửi yêu cầu đặt dịch vụ</>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-muted-foreground">
                      Sau khi gửi, bạn sẽ nhận được mã đơn hàng và link thanh toán.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Đặt dịch vụ thành công!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Mã đơn hàng của bạn:
                    </p>
                    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-xl px-5 py-2.5 mb-6">
                      <span className="font-mono font-bold text-lg text-accent tracking-wider">{orderRef}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6">
                      Lưu mã đơn hàng này để theo dõi trạng thái. Chúng tôi sẽ liên hệ xác nhận trong vòng 24h.
                    </p>
                    <div className="flex flex-col gap-3">
                      {service.payment_link && (
                        <a
                          href={service.payment_link}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-all text-center"
                        >
                          Thanh toán ngay →
                        </a>
                      )}
                      <a
                        href={`/my-orders?email=${encodeURIComponent(form.client_email)}`}
                        className="w-full py-2.5 rounded-xl border border-border hover:border-accent/40 hover:bg-secondary/30 text-foreground font-semibold text-sm transition-all text-center"
                      >
                        Theo dõi đơn hàng
                      </a>
                      <button
                        onClick={handleClose}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Đóng
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
