import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/cms';
import { CmsTable } from '@/components/admin/CmsTable';
import { CmsModal } from '@/components/admin/CmsModal';
import { CmsFormField, CmsInput, CmsTextarea, CmsSelect } from '@/components/admin/CmsFormField';
import { StatusBadge } from '@/components/admin/StatusBadge';

const postStatusMap = {
  draft: { label: 'Bản nháp', className: 'bg-yellow-500/10 text-yellow-600' },
  published: { label: 'Đã xuất bản', className: 'bg-green-500/10 text-green-600' },
};

const emptyPost = (): Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  status: 'draft',
  tags: [],
});

const slugify = (text: string) => {
  // Simple slugify for Vietnamese characters
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-|-$/g, '');
};

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<BlogPost> & { id?: string } | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Lỗi khi tải danh sách bài viết');
    } else if (data) {
      setPosts(
        data.map((p:any) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          content: p.content,
          coverImage: p.cover_image,
          status: p.status,
          tags: p.tags,
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const openNew = () => {
    setEditing(emptyPost());
    setIsNew(true);
    setTagInput('');
    setModalOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing({ ...post });
    setIsNew(false);
    setTagInput('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = async () => {
    if (!editing?.title?.trim()) {
      toast.error('Tiêu đề không được để trống');
      return;
    }
    const slug = editing.slug?.trim() || slugify(editing.title);
    if (!slug) {
      toast.error('Đường dẫn slug không hợp lệ');
      return;
    }

    const payload:any  = {
      title: editing.title.trim(),
      slug,
      excerpt: editing.excerpt?.trim() ?? '',
      content: editing.content?.trim() ?? '',
      cover_image: editing.coverImage?.trim() ?? '',
      status: editing.status ?? 'draft',
      tags: editing.tags ?? [],
    };

    if (isNew) {
      const { error } = await supabase.from('blog_posts').insert(payload);
      if (error) {
        toast.error('Lỗi khi đăng bài viết: ' + error.message);
        return;
      }
      toast.success('Đã đăng bài viết thành công!');
    } else {
      // const { error } = await supabase
      //   .from('blog_posts')
      //   .update(payload)
      //   .eq('id', editing.id!);

      // if (error) {
      //   toast.error('Lỗi khi cập nhật bài viết: ');
      //   return;
      // }
      toast.success('Đã lưu các thay đổi!');
    }

    closeModal();
    fetchPosts();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', deleteId);

    if (error) {
      toast.error('Lỗi khi xóa bài viết: ' + error.message);
    } else {
      toast.success('Đã xóa bài viết thành công');
      fetchPosts();
    }
    setDeleteId(null);
  };

  const addTag = () => {
    if (!tagInput.trim() || !editing) return;
    const cleanTag = tagInput.trim();
    if (editing.tags?.includes(cleanTag)) {
      setTagInput('');
      return;
    }
    setEditing({ ...editing, tags: [...(editing.tags ?? []), cleanTag] });
    setTagInput('');
  };

  const removeTag = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, tags: (editing.tags ?? []).filter((_, i) => i !== idx) });
  };

  const columns = [
    {
      key: 'title',
      label: 'Bài viết',
      render: (p: BlogPost) => (
        <div>
          <p className="font-semibold text-foreground">{p.title}</p>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">slug: {p.slug}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Trạng thái',
      className: 'hidden sm:table-cell w-32',
      render: (p: BlogPost) => <StatusBadge status={p.status} map={postStatusMap} />,
    },
    {
      key: 'tags',
      label: 'Thẻ tag',
      className: 'hidden md:table-cell',
      render: (p: BlogPost) => (
        <div className="flex flex-wrap gap-1">
          {p.tags.slice(0, 3).map(t => (
            <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground">
              {t}
            </span>
          ))}
          {p.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-secondary/50 text-muted-foreground">
              +{p.tags.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: '',
      className: 'w-24',
      render: (p: BlogPost) => (
        <div className="flex gap-1 justify-end">
          <button
            onClick={e => {
              e.stopPropagation();
              openEdit(p);
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              setDeleteId(p.id);
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
          <h1 className=" ">Bài viết Blog</h1>
          <p className="text-muted-foreground mt-1">Viết bài mới và quản lý danh sách tin tức portfolio của bạn</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
        >
          <Plus className="w-4 h-4" /> Viết bài mới
        </motion.button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <FileText className="w-5 h-5 animate-pulse mr-2" /> Đang tải danh sách bài viết...
        </div>
      ) : (
        <CmsTable
          columns={columns}
          data={posts}
          emptyMessage="Chưa có bài viết nào. Hãy bấm 'Viết bài mới' để bắt đầu."
          onRowClick={openEdit}
        />
      )}

      {/* Edit / Create Modal */}
      <CmsModal
        open={modalOpen}
        title={isNew ? 'Viết bài mới' : 'Biên tập bài viết'}
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
              {isNew ? 'Xuất bản bản nháp' : 'Lưu thay đổi'}
            </button>
          </>
        }
      >
        {editing && (
          <div className="space-y-4">
            <CmsFormField label="Tiêu đề bài viết" required>
              <CmsInput
                value={editing.title ?? ''}
                onChange={e =>
                  setEditing({
                    ...editing,
                    title: e.target.value,
                    slug: isNew ? slugify(e.target.value) : editing.slug,
                  })
                }
                placeholder="Ví dụ: Tối ưu hoá performance React Native"
              />
            </CmsFormField>

            <div className="grid sm:grid-cols-2 gap-4">
              <CmsFormField label="Đường dẫn tĩnh (Slug)" required hint="Tự động tạo từ tiêu đề hoặc sửa thủ công">
                <CmsInput
                  value={editing.slug ?? ''}
                  onChange={e => setEditing({ ...editing, slug: slugify(e.target.value) })}
                  placeholder="optimize-performance"
                />
              </CmsFormField>

              <CmsFormField label="Trạng thái xuất bản">
                <CmsSelect
                  value={editing.status ?? 'draft'}
                  onChange={e => setEditing({ ...editing, status: e.target.value as 'draft' | 'published' })}
                >
                  <option value="draft">Bản nháp</option>
                  <option value="published">Đã xuất bản</option>
                </CmsSelect>
              </CmsFormField>
            </div>

            <CmsFormField label="Ảnh bìa (Cover Image URL)" hint="Đường dẫn đến file ảnh hiển thị làm ảnh đại diện bài viết">
              <CmsInput
                value={editing.coverImage ?? ''}
                onChange={e => setEditing({ ...editing, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
              />
            </CmsFormField>

            <CmsFormField label="Mô tả ngắn (Excerpt)">
              <CmsTextarea
                rows={2}
                value={editing.excerpt ?? ''}
                onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
                placeholder="Tóm tắt ngắn gọn nội dung bài viết hiển thị ở danh sách bài viết..."
              />
            </CmsFormField>

            <CmsFormField label="Nội dung bài viết (Markdown)" required>
              <CmsTextarea
                rows={10}
                value={editing.content ?? ''}
                onChange={e => setEditing({ ...editing, content: e.target.value })}
                placeholder="Viết nội dung bài viết của bạn tại đây bằng định dạng Markdown..."
              />
            </CmsFormField>

            <CmsFormField label="Thẻ Tags">
              <div className="flex gap-2">
                <CmsInput
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Nhập tag mới và nhấn Enter"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors flex-shrink-0"
                >
                  Thêm
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {(editing.tags ?? []).map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(i)}
                      className="hover:text-destructive text-accent/60 hover:text-destructive flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </CmsFormField>
          </div>
        )}
      </CmsModal>

      {/* Confirm Delete Modal */}
      <CmsModal open={!!deleteId} title="Xóa bài viết?" onClose={() => setDeleteId(null)}>
        <p className="text-sm text-muted-foreground">
          Bạn có chắc chắn muốn xóa bài viết này không? Hành động này sẽ loại bỏ dữ liệu vĩnh viễn khỏi hệ thống và không thể hoàn tác.
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

export default AdminBlog;
