import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, ShoppingBag, ExternalLink, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import type { Service } from '@/types/cms';
import { CmsTable } from '@/components/admin/CmsTable';
import { CmsModal } from '@/components/admin/CmsModal';
import { CmsFormField, CmsInput, CmsTextarea, CmsSelect } from '@/components/admin/CmsFormField';
import { StatusBadge } from '@/components/admin/StatusBadge';

const serviceStatusMap = {
  active: { label: 'Hoạt động', className: 'bg-green-500/10 text-green-600' },
  inactive: { label: 'Tạm ngưng', className: 'bg-muted text-muted-foreground' },
};

const formatPrice = (amount: number, currency: string) => {
  if (currency === 'vnd') {
    return `${amount.toLocaleString('vi-VN')} ₫`;
  }
  return `$${(amount / 100).toFixed(2)}`;
};

const emptyService = (): Omit<Service, 'id' | 'createdAt'> => ({
  title: '',
  description: '',
  price: 0,
  currency: 'usd',
  deliveryDays: 7,
  features: [],
  status: 'active',
  paymentLink: '',
});

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<Service> & { id?: string } | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Lỗi khi tải danh sách dịch vụ');
    } else if (data) {
      setServices(
        data.map(s => ({
          id: s.id,
          title: s.title,
          description: s.description,
          price: s.price,
          currency: s.currency,
          deliveryDays: s.delivery_days,
          features: s.features,
          status: s.status,
          paymentLink: s.payment_link,
          createdAt: s.created_at,
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const openNew = () => {
    setEditing(emptyService());
    setIsNew(true);
    setFeatureInput('');
    setModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing({ ...service });
    setIsNew(false);
    setFeatureInput('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = async () => {
    if (!editing?.title?.trim()) {
      toast.error('Tên dịch vụ không được để trống');
      return;
    }

    const payload = {
      title: editing.title.trim(),
      description: editing.description?.trim() ?? '',
      price: editing.price ?? 0,
      currency: editing.currency ?? 'usd',
      delivery_days: editing.deliveryDays ?? 7,
      features: editing.features ?? [],
      status: editing.status ?? 'active',
      payment_link: editing.paymentLink?.trim() ?? '',
    };

    if (isNew) {
      const { error } = await supabase.from('services').insert(payload);
      if (error) {
        toast.error('Lỗi khi tạo dịch vụ: ' + error.message);
        return;
      }
      toast.success('Đã thêm dịch vụ thành công!');
    } else {
      const { error } = await supabase
        .from('services')
        .update(payload)
        .eq('id', editing.id!);

      if (error) {
        toast.error('Lỗi khi cập nhật dịch vụ: ' + error.message);
        return;
      }
      toast.success('Đã lưu thay đổi dịch vụ!');
    }

    closeModal();
    fetchServices();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from('services').delete().eq('id', deleteId);

    if (error) {
      toast.error('Lỗi khi xóa dịch vụ: ' + error.message);
    } else {
      toast.success('Đã xóa dịch vụ thành công');
      fetchServices();
    }
    setDeleteId(null);
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editing) return;
    const cleanFeature = featureInput.trim();
    if (editing.features?.includes(cleanFeature)) {
      setFeatureInput('');
      return;
    }
    setEditing({ ...editing, features: [...(editing.features ?? []), cleanFeature] });
    setFeatureInput('');
  };

  const removeFeature = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, features: (editing.features ?? []).filter((_, i) => i !== idx) });
  };

  const columns = [
    {
      key: 'title',
      label: 'Dịch vụ',
      render: (s: Service) => (
        <div>
          <p className="font-semibold text-foreground">{s.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{s.description}</p>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Giá cả',
      className: 'w-32',
      render: (s: Service) => (
        <span className="font-mono font-semibold text-foreground">
          {formatPrice(s.price, s.currency)}
        </span>
      ),
    },
    {
      key: 'delivery',
      label: 'Thời gian',
      className: 'hidden sm:table-cell w-28',
      render: (s: Service) => <span className="text-muted-foreground">{s.deliveryDays} ngày</span>,
    },
    {
      key: 'status',
      label: 'Trạng thái',
      className: 'hidden sm:table-cell w-28',
      render: (s: Service) => <StatusBadge status={s.status} map={serviceStatusMap} />,
    },
    {
      key: 'actions',
      label: '',
      className: 'w-28',
      render: (s: Service) => (
        <div className="flex gap-1 justify-end">
          {s.paymentLink && (
            <a
              href={s.paymentLink}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-secondary transition-colors"
              title="Đi tới link thanh toán"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={e => {
              e.stopPropagation();
              openEdit(s);
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              setDeleteId(s.id);
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Gói Dịch vụ</h1>
          <p className="text-muted-foreground mt-1">Cấu hình các dịch vụ tư vấn/phát triển và liên kết thanh toán khách hàng</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" /> Thêm dịch vụ
        </motion.button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <ShoppingBag className="w-5 h-5 animate-pulse mr-2" /> Đang tải danh sách dịch vụ...
        </div>
      ) : (
        <CmsTable
          columns={columns}
          data={services}
          emptyMessage="Chưa có gói dịch vụ nào. Hãy bấm 'Thêm dịch vụ' để bắt đầu."
          onRowClick={openEdit}
        />
      )}

      {/* Edit / Create Modal */}
      <CmsModal
        open={modalOpen}
        title={isNew ? 'Thêm gói dịch vụ' : 'Chỉnh sửa dịch vụ'}
        onClose={closeModal}
        size="lg"
        footer={
          <>
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
            >
              {isNew ? 'Tạo mới' : 'Lưu thay đổi'}
            </button>
          </>
        }
      >
        {editing && (
          <div className="space-y-4">
            <CmsFormField label="Tên dịch vụ" required>
              <CmsInput
                value={editing.title ?? ''}
                onChange={e => setEditing({ ...editing, title: e.target.value })}
                placeholder="Ví dụ: Tư vấn giải pháp UI/UX"
              />
            </CmsFormField>

            <CmsFormField label="Mô tả dịch vụ">
              <CmsTextarea
                rows={3}
                value={editing.description ?? ''}
                onChange={e => setEditing({ ...editing, description: e.target.value })}
                placeholder="Gói dịch vụ này giải quyết vấn đề gì của khách hàng..."
              />
            </CmsFormField>

            <div className="grid sm:grid-cols-2 gap-4">
              <CmsFormField
                label="Giá dịch vụ"
                required
                hint={editing.currency === 'usd' ? 'Đơn vị cents (ví dụ: 15000 = $150)' : 'Đơn vị VNĐ'}
              >
                <CmsInput
                  type="number"
                  value={editing.price ?? 0}
                  onChange={e => setEditing({ ...editing, price: Number(e.target.value) })}
                />
              </CmsFormField>

              <CmsFormField label="Đơn vị tiền tệ">
                <CmsSelect
                  value={editing.currency ?? 'usd'}
                  onChange={e => setEditing({ ...editing, currency: e.target.value, price: 0 })}
                >
                  <option value="usd">USD ($)</option>
                  <option value="vnd">VND (₫)</option>
                </CmsSelect>
              </CmsFormField>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <CmsFormField label="Thời gian hoàn thành (ngày)" required>
                <CmsInput
                  type="number"
                  value={editing.deliveryDays ?? 7}
                  onChange={e => setEditing({ ...editing, deliveryDays: Number(e.target.value) })}
                />
              </CmsFormField>

              <CmsFormField label="Trạng thái dịch vụ">
                <CmsSelect
                  value={editing.status ?? 'active'}
                  onChange={e => setEditing({ ...editing, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm ngưng</option>
                </CmsSelect>
              </CmsFormField>
            </div>

            <CmsFormField
              label="Stripe Payment Link URL"
              hint="Dán đường dẫn thanh toán Stripe tương ứng của gói dịch vụ này"
            >
              <CmsInput
                value={editing.paymentLink ?? ''}
                onChange={e => setEditing({ ...editing, paymentLink: e.target.value })}
                placeholder="https://buy.stripe.com/..."
              />
            </CmsFormField>

            <CmsFormField label="Các cam kết / Tính năng đi kèm">
              <div className="flex gap-2">
                <CmsInput
                  value={featureInput}
                  onChange={e => setFeatureInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Ví dụ: Hỗ trợ bảo trì 3 tháng"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors flex-shrink-0"
                >
                  Thêm
                </button>
              </div>
              <ul className="mt-2 space-y-1.5">
                {(editing.features ?? []).map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm text-foreground bg-secondary/40 rounded-xl px-4 py-2 border border-border/20"
                  >
                    <span>{feat}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="text-muted-foreground hover:text-destructive flex items-center justify-center ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </CmsFormField>
          </div>
        )}
      </CmsModal>

      {/* Confirm Delete Modal */}
      <CmsModal open={!!deleteId} title="Xóa gói dịch vụ?" onClose={() => setDeleteId(null)}>
        <p className="text-sm text-muted-foreground">
          Bạn có chắc chắn muốn xóa gói dịch vụ này không? Hành động này sẽ gỡ gói dịch vụ khỏi portfolio của bạn.
        </p>
        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
          <button
            onClick={() => setDeleteId(null)}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-destructive text-destructive-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Xác nhận xóa
          </button>
        </div>
      </CmsModal>
    </div>
  );
};

export default AdminServices;
