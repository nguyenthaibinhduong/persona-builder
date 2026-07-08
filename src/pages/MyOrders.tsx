import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, CheckCircle, XCircle, Loader2, Package, ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { PaymentStatus } from '@/types/cms';

interface OrderRow {
  id: string;
  order_reference: string;
  service_title: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: string;
  service_id: string;
}

function formatPrice(price: number, currency: string): string {
  if (currency === 'vnd') {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price / 100);
}

const statusConfig: Record<PaymentStatus, { icon: typeof CheckCircle; label: string; textColor: string; pillCls: string }> = {
  pending: {
    icon: Clock,
    label: 'Chờ xác nhận',
    textColor: 'text-amber-400',
    pillCls: 'bg-amber-400/10 border-amber-400/30 text-amber-400',
  },
  confirmed: {
    icon: CheckCircle,
    label: 'Đang thực hiện',
    textColor: 'text-accent',
    pillCls: 'bg-accent/10 border-accent/30 text-accent',
  },
  completed: {
    icon: CheckCircle,
    label: 'Hoàn thành',
    textColor: 'text-emerald-400',
    pillCls: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400',
  },
  cancelled: {
    icon: XCircle,
    label: 'Đã hủy',
    textColor: 'text-red-400',
    pillCls: 'bg-red-400/10 border-red-400/30 text-red-400',
  },
  refunded: {
    icon: XCircle,
    label: 'Đã hoàn tiền',
    textColor: 'text-zinc-400',
    pillCls: 'bg-zinc-400/10 border-zinc-400/30 text-zinc-400',
  },
};

const MyOrders = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [inputEmail, setInputEmail] = useState(searchParams.get('email') ?? '');
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [paymentLinks, setPaymentLinks] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchOrders = async (emailToSearch: string) => {
    if (!emailToSearch.trim()) return;
    setLoading(true);
    setSearched(true);

    const { data } = await supabase
      .from('payments')
      .select('id, order_reference, service_title, amount, currency, status, created_at, service_id')
      .eq('client_email', emailToSearch.trim().toLowerCase())
      .order('created_at', { ascending: false });

    const rows = (data as OrderRow[]) ?? [];
    setOrders(rows);

    // Fetch payment links for services that are pending
    const pendingServiceIds = [...new Set(rows.filter(r => r.status === 'pending').map(r => r.service_id))];
    if (pendingServiceIds.length > 0) {
      const { data: svcs } = await supabase
        .from('services')
        .select('id, payment_link')
        .in('id', pendingServiceIds);
      if (svcs) {
        const map: Record<string, string> = {};
        svcs.forEach((s) => { if (s.payment_link) map[s.id] = s.payment_link; });
        setPaymentLinks(map);
      }
    }

    setLoading(false);
  };

  // Auto-search if email in URL
  useEffect(() => {
    if (email) fetchOrders(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(inputEmail);
    fetchOrders(inputEmail);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      <main className="container max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Về trang chủ
          </Link>

          <div className="mb-8">
            <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-accent mb-3">Quản lý đơn hàng</span>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">Theo dõi đơn hàng</h1>
            <p className="text-muted-foreground text-sm">Nhập email bạn đã dùng khi đặt dịch vụ để xem tất cả đơn hàng.</p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border/60 hover:border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Tìm kiếm
            </button>
          </form>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
            </motion.div>
          )}

          {!loading && searched && orders.length === 0 && (
            <motion.div key="empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center py-16">
              <div className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
                <Package className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">Không tìm thấy đơn hàng</p>
              <p className="text-sm text-muted-foreground">Chưa có đơn hàng nào với email này.</p>
            </motion.div>
          )}

          {!loading && orders.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">
                  Tìm thấy <span className="font-bold text-foreground">{orders.length}</span> đơn hàng
                </p>
                <button
                  onClick={() => fetchOrders(email)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Làm mới
                </button>
              </div>

              {orders.map((order, i) => {
                const st = statusConfig[order.status];
                const Icon = st.icon;
                const link = paymentLinks[order.service_id];

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-2xl border border-border/40 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Status bar */}
                    <div className={`h-1 w-full ${order.status === 'pending' ? 'bg-amber-400' : order.status === 'confirmed' ? 'bg-accent' : order.status === 'completed' ? 'bg-emerald-400' : 'bg-red-400'}`} />

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-xs text-muted-foreground mb-1">{order.order_reference}</p>
                          <h3 className="font-bold text-foreground leading-tight">{order.service_title}</h3>
                        </div>
                        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${st.pillCls}`}>
                          <Icon className="w-3 h-3" />
                          {st.label}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-extrabold text-foreground">{formatPrice(order.amount, order.currency)}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {new Date(order.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {order.status === 'pending' && link && (
                            <a
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-accent-foreground font-bold text-xs hover:opacity-90 transition-all"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> Thanh toán
                            </a>
                          )}
                          <Link
                            to={`/order-confirmation?ref=${order.order_reference}`}
                            className="px-3 py-2 rounded-xl border border-border/60 hover:border-accent/40 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MyOrders;
