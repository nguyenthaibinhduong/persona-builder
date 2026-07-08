import { useState, useEffect, useCallback } from 'react';
import { CreditCard, TrendingUp, DollarSign, Wallet, Loader2, CheckCircle, XCircle, Eye, Phone, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import type { Payment, PaymentStatus } from '@/types/cms';
import { CmsTable } from '@/components/admin/CmsTable';

const paymentStatusMap: Record<string, { label: string; className: string }> = {
  pending:   { label: 'Chờ xác nhận', className: 'bg-amber-500/10 text-amber-500 border border-amber-500/20' },
  confirmed: { label: 'Đang thực hiện', className: 'bg-accent/10 text-accent border border-accent/20' },
  completed: { label: 'Hoàn thành', className: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' },
  cancelled: { label: 'Đã hủy', className: 'bg-red-500/10 text-red-500 border border-red-500/20' },
  refunded:  { label: 'Đã hoàn tiền', className: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20' },
};

const formatAmount = (amount: number, currency: string) => {
  if (currency === 'vnd') return `${amount.toLocaleString('vi-VN')} ₫`;
  return `$${(amount / 100).toFixed(2)}`;
};

interface ExtendedPayment extends Payment {
  clientPhone?: string;
  requirements?: string;
  orderReference?: string;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<ExtendedPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [detailOrder, setDetailOrder] = useState<ExtendedPayment | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Lỗi khi tải dữ liệu đơn hàng');
    } else if (data) {
      setPayments(
        data.map(p => ({
          id: p.id,
          serviceId: p.service_id,
          serviceTitle: p.service_title,
          clientName: p.client_name,
          clientEmail: p.client_email,
          clientPhone: p.client_phone ?? undefined,
          requirements: p.requirements ?? undefined,
          orderReference: p.order_reference ?? undefined,
          amount: p.amount,
          currency: p.currency,
          status: p.status as PaymentStatus,
          stripeSessionId: p.stripe_session_id ?? undefined,
          createdAt: p.created_at,
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);

  const updateStatus = async (id: string, status: PaymentStatus) => {
    setUpdating(id);
    const { error } = await supabase.from('payments').update({ status }).eq('id', id);
    if (error) {
      toast.error('Cập nhật trạng thái thất bại');
    } else {
      toast.success(`Đã đổi trạng thái thành "${paymentStatusMap[status]?.label}"`);
      setPayments(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    }
    setUpdating(null);
  };

  const totalUSD = payments.filter(p => p.status === 'completed' && p.currency === 'usd').reduce((a, p) => a + p.amount / 100, 0);
  const totalVND = payments.filter(p => p.status === 'completed' && p.currency === 'vnd').reduce((a, p) => a + p.amount, 0);

  const columns = [
    {
      key: 'ref',
      label: 'Mã đơn',
      render: (p: ExtendedPayment) => (
        <span className="font-mono text-xs text-accent font-bold">{p.orderReference ?? p.id.slice(0, 8)}</span>
      ),
    },
    {
      key: 'client',
      label: 'Khách hàng',
      render: (p: ExtendedPayment) => (
        <div>
          <p className="font-semibold text-foreground text-sm">{p.clientName}</p>
          <p className="text-xs text-muted-foreground">{p.clientEmail}</p>
          {p.clientPhone && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" />{p.clientPhone}</p>}
        </div>
      ),
    },
    {
      key: 'service',
      label: 'Dịch vụ',
      className: 'hidden sm:table-cell',
      render: (p: ExtendedPayment) => (
        <div>
          <p className="text-sm text-foreground">{p.serviceTitle}</p>
          <p className="font-mono font-bold text-sm text-foreground mt-0.5">{formatAmount(p.amount, p.currency)}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Trạng thái',
      render: (p: ExtendedPayment) => {
        const cfg = paymentStatusMap[p.status];
        return (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cfg?.className ?? ''}`}>
            {cfg?.label ?? p.status}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Thao tác',
      render: (p: ExtendedPayment) => {
        const isUpdating = updating === p.id;
        return (
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* View detail */}
            <button
              onClick={() => setDetailOrder(p)}
              className="p-1.5 rounded-lg border border-border/60 hover:border-accent/40 hover:bg-accent/5 text-muted-foreground hover:text-accent transition-all"
              title="Xem chi tiết"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {/* Approve */}
            {p.status === 'pending' && (
              <button
                onClick={() => updateStatus(p.id, 'confirmed')}
                disabled={isUpdating}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-accent-foreground text-xs font-semibold transition-all disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                Xác nhận
              </button>
            )}

            {/* Complete */}
            {p.status === 'confirmed' && (
              <button
                onClick={() => updateStatus(p.id, 'completed')}
                disabled={isUpdating}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white text-xs font-semibold transition-all disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                Hoàn thành
              </button>
            )}

            {/* Cancel */}
            {(p.status === 'pending' || p.status === 'confirmed') && (
              <button
                onClick={() => updateStatus(p.id, 'cancelled')}
                disabled={isUpdating}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white text-xs font-semibold transition-all disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                Hủy
              </button>
            )}
          </div>
        );
      },
    },
    {
      key: 'date',
      label: 'Ngày đặt',
      className: 'hidden lg:table-cell w-32',
      render: (p: ExtendedPayment) => (
        <span className="text-muted-foreground text-xs">
          {new Date(p.createdAt).toLocaleDateString('vi-VN')}
        </span>
      ),
    },
  ];

  const stats = [
    { label: 'Tổng đơn hàng', value: payments.length, icon: CreditCard, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Chờ xác nhận', value: payments.filter(p => p.status === 'pending').length, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Đã hoàn thành', value: payments.filter(p => p.status === 'completed').length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Doanh thu', value: totalUSD > 0 ? `$${totalUSD.toFixed(0)}` : `${(totalVND / 1000000).toFixed(1)}M ₫`, icon: DollarSign, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Quản lý đơn hàng</h1>
        <p className="text-muted-foreground mt-1">Xác nhận, theo dõi và quản lý toàn bộ đơn đặt dịch vụ từ khách hàng</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-xl border border-border bg-card shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground truncate">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Đang tải đơn hàng...
        </div>
      ) : (
        <CmsTable
          columns={columns}
          data={payments}
          emptyMessage="Chưa có đơn hàng nào."
        />
      )}

      {/* Detail Modal */}
      {detailOrder && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDetailOrder(null)}
        >
          <div
            className="bg-card border border-border/60 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-mono text-accent mb-0.5">{detailOrder.orderReference}</p>
                <h3 className="font-bold text-foreground text-lg">{detailOrder.serviceTitle}</h3>
              </div>
              <button onClick={() => setDetailOrder(null)} className="text-muted-foreground hover:text-foreground p-1">✕</button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Khách hàng</span>
                <span className="font-semibold text-foreground">{detailOrder.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="text-foreground">{detailOrder.clientEmail}</span>
              </div>
              {detailOrder.clientPhone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số điện thoại</span>
                  <span className="text-foreground">{detailOrder.clientPhone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số tiền</span>
                <span className="font-bold text-foreground">{formatAmount(detailOrder.amount, detailOrder.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày đặt</span>
                <span className="text-foreground">{new Date(detailOrder.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
              {detailOrder.requirements && (
                <div className="pt-3 border-t border-border/40">
                  <p className="text-muted-foreground flex items-center gap-1.5 mb-2"><FileText className="w-3.5 h-3.5" /> Yêu cầu của khách</p>
                  <p className="text-foreground text-sm leading-relaxed bg-secondary/30 rounded-xl p-3">{detailOrder.requirements}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
