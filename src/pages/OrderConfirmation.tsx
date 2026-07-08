import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, Copy, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { PaymentStatus } from '@/types/cms';

interface OrderData {
  id: string;
  order_reference: string;
  service_title: string;
  client_name: string;
  client_email: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: string;
  service_id: string;
  payment_link?: string | null;
}

function formatPrice(price: number, currency: string): string {
  if (currency === 'vnd') {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price / 100);
}

const statusConfig: Record<PaymentStatus, { icon: typeof CheckCircle; label: string; color: string; bg: string }> = {
  pending: {
    icon: Clock,
    label: 'Chờ xác nhận',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/30',
  },
  confirmed: {
    icon: CheckCircle,
    label: 'Đã xác nhận — Đang thực hiện',
    color: 'text-accent',
    bg: 'bg-accent/10 border-accent/30',
  },
  completed: {
    icon: CheckCircle,
    label: 'Hoàn thành',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/30',
  },
  cancelled: {
    icon: XCircle,
    label: 'Đã hủy',
    color: 'text-red-400',
    bg: 'bg-red-400/10 border-red-400/30',
  },
  refunded: {
    icon: XCircle,
    label: 'Đã hoàn tiền',
    color: 'text-zinc-400',
    bg: 'bg-zinc-400/10 border-zinc-400/30',
  },
};

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');

  const [order, setOrder] = useState<OrderData | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!ref) { setLoading(false); setNotFound(true); return; }

    async function fetchOrder() {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('order_reference', ref)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setOrder(data as OrderData);
        // Fetch payment_link from service
        if (data.service_id) {
          const { data: svc } = await supabase
            .from('services')
            .select('payment_link')
            .eq('id', data.service_id)
            .single();
          if (svc?.payment_link) setPaymentLink(svc.payment_link);
        }
      }
      setLoading(false);
    }

    fetchOrder();
  }, [ref]);

  const handleCopy = () => {
    if (order?.order_reference) {
      navigator.clipboard.writeText(order.order_reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
        <div>
          <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy đơn hàng</h1>
          <p className="text-muted-foreground text-sm mb-6">Mã đơn hàng không hợp lệ hoặc đã bị xóa.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
            <ArrowLeft className="w-4 h-4" /> Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const st = order ? statusConfig[order.status] : null;
  const StatusIcon = st?.icon ?? Clock;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      <main className="container max-w-xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Success header */}
          <div className="text-center mb-8">
            <div className="relative inline-flex">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative w-20 h-20 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-foreground mb-2 mt-4">Đơn hàng đã được tạo!</h1>
            <p className="text-muted-foreground text-sm">
              Chúng tôi sẽ liên hệ xác nhận trong vòng 24 giờ làm việc.
            </p>
          </div>

          {/* Order card */}
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden mb-6">
            {/* Order ref */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-secondary/20">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">Mã đơn hàng</p>
                <span className="font-mono font-bold text-lg text-accent tracking-wider">
                  {order?.order_reference}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 hover:border-accent/40 hover:bg-accent/5 text-xs font-semibold text-muted-foreground hover:text-accent transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Đã sao chép' : 'Sao chép'}
              </button>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Dịch vụ</span>
                <span className="text-sm font-semibold text-foreground text-right max-w-[60%]">{order?.service_title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Khách hàng</span>
                <span className="text-sm font-semibold text-foreground">{order?.client_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm text-foreground">{order?.client_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Số tiền</span>
                <span className="text-sm font-bold text-foreground">
                  {order ? formatPrice(order.amount, order.currency) : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ngày đặt</span>
                <span className="text-sm text-foreground">
                  {order ? new Date(order.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'}
                </span>
              </div>

              {/* Status */}
              {st && (
                <div className="flex justify-between items-center pt-2 border-t border-border/30">
                  <span className="text-sm text-muted-foreground">Trạng thái</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${st.color} ${st.bg}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {st.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            {paymentLink && order?.status === 'pending' && (
              <a
                href={paymentLink}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Thanh toán ngay
              </a>
            )}
            <Link
              to={`/my-orders?email=${encodeURIComponent(order?.client_email ?? '')}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border hover:border-accent/40 hover:bg-secondary/30 text-foreground font-semibold text-sm transition-all"
            >
              Theo dõi tất cả đơn hàng
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Về trang chủ
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
