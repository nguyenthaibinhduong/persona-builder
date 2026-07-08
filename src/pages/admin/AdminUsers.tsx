import { useState, useEffect, useCallback } from 'react';
import { Users, Shield, Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { CmsTable } from '@/components/admin/CmsTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { CmsSelect } from '@/components/admin/CmsFormField';

interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  updatedAt: string;
}

const roleStatusMap = {
  admin: { label: 'Admin (Toàn quyền)', className: 'bg-red-500/10 text-red-600 font-semibold' },
  editor: { label: 'Editor (Biên tập)', className: 'bg-accent/10 text-accent font-semibold' },
  viewer: { label: 'Viewer (Chỉ xem)', className: 'bg-muted text-muted-foreground' },
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<'admin' | 'editor' | 'viewer'>('viewer');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch current user and all user profiles
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: currentProfile, error: profileErr } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        if (!profileErr && currentProfile) {
          setCurrentUserRole(currentProfile.role);
        }
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        toast.error('Lỗi khi tải danh sách tài khoản');
      } else if (data) {
        setUsers(
          data.map(p => ({
            id: p.id,
            email: p.email,
            role: p.role,
            updatedAt: p.updated_at,
          }))
        );
      }
    } catch (err) {
      toast.error('Đã xảy ra lỗi hệ thống');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    if (currentUserRole !== 'admin') {
      toast.error('Chỉ tài khoản Admin mới có quyền thay đổi phân quyền');
      return;
    }

    setUpdatingId(userId);
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      toast.error('Lỗi khi cập nhật quyền: ' + error.message);
    } else {
      toast.success('Đã cập nhật vai trò thành công!');
      // Update local state
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, role: newRole, updatedAt: new Date().toISOString() } : u))
      );
    }
    setUpdatingId(null);
  };

  const columns = [
    {
      key: 'email',
      label: 'Tài khoản Email',
      render: (u: UserProfile) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-sm">
            {u.email[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-foreground">{u.email}</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">UID: {u.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Vai trò hiển thị',
      className: 'w-48',
      render: (u: UserProfile) => <StatusBadge status={u.role} map={roleStatusMap} />,
    },
    {
      key: 'modify_role',
      label: 'Điều chỉnh quyền',
      className: 'w-64',
      render: (u: UserProfile) => {
        const isAdmin = currentUserRole === 'admin';
        return (
          <div className="flex items-center gap-2">
            <CmsSelect
              value={u.role}
              disabled={!isAdmin || updatingId === u.id}
              onChange={e => handleRoleChange(u.id, e.target.value as 'admin' | 'editor' | 'viewer')}
              className="py-1 px-2.5 text-xs rounded-lg"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </CmsSelect>
            {updatingId === u.id && <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />}
          </div>
        );
      },
    },
    {
      key: 'updated',
      label: 'Cập nhật cuối',
      className: 'hidden md:table-cell w-44',
      render: (u: UserProfile) => (
        <span className="text-muted-foreground text-xs">
          {new Date(u.updatedAt).toLocaleDateString('vi-VN')} {new Date(u.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-accent/10 text-accent">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Tài khoản & Phân quyền</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý vai trò (Admin, Editor, Viewer) của các tài khoản đăng ký hệ thống CMS
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 text-sm text-foreground/80 flex items-start gap-3">
        <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-bold text-accent">Lưu ý phân quyền bảo mật:</p>
          <ul className="list-disc pl-4 mt-1.5 space-y-1 text-xs text-muted-foreground">
            <li><strong>Admin</strong>: Có toàn quyền quản lý, sửa vai trò của người khác và sửa thông tin profile.</li>
            <li><strong>Editor</strong>: Có quyền chỉnh sửa bài viết Blog và dự án Bento, không thể phân quyền người dùng.</li>
            <li><strong>Viewer</strong>: Quyền chỉ xem, tất cả các tác vụ thay đổi, thêm, xóa trên CMS đều bị chặn.</li>
          </ul>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Users className="w-5 h-5 animate-pulse mr-2" /> Đang tải danh sách tài khoản...
        </div>
      ) : (
        <CmsTable
          columns={columns}
          data={users}
          emptyMessage="Không tìm thấy tài khoản nào trong hệ thống."
        />
      )}
    </div>
  );
};

export default AdminUsers;
