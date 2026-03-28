import { useState } from 'react';
import { useAdmin, type TestimonialEntry } from '@/contexts/AdminContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Quote } from 'lucide-react';
import { toast } from 'sonner';

const empty: Omit<TestimonialEntry, 'id'> = { name: '', role: '', company: '', text: '', avatar: '' };

const AdminTestimonials = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialEntry | null>(null);
  const [form, setForm] = useState(empty);

  const openNew = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (t: TestimonialEntry) => { setEditing(t); setForm({ name: t.name, role: t.role, company: t.company, text: t.text, avatar: t.avatar }); setDialogOpen(true); };

  const save = () => {
    if (!form.name || !form.text) { toast.error('Name and testimonial text are required'); return; }
    if (editing) { updateTestimonial({ ...form, id: editing.id }); toast.success('Testimonial updated'); }
    else { addTestimonial({ ...form, id: crypto.randomUUID() }); toast.success('Testimonial added'); }
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">Testimonials</h1>
          <p className="text-sm text-muted-foreground mt-1">{testimonials.length} reviews</p>
        </div>
        <Button onClick={openNew} size="sm"><Plus className="w-4 h-4 mr-1.5" />Add Testimonial</Button>
      </div>

      <div className="space-y-3">
        {testimonials.map(t => (
          <Card key={t.id} className="border-border">
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Quote className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 italic">"{t.text}"</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteTestimonial(t.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {testimonials.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">No testimonials yet.</p>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Name</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Role</label><Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Company</label><Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
              <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Avatar URL</label><Input value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} placeholder="Optional" /></div>
            </div>
            <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Testimonial</label><Textarea rows={4} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="What did they say about your work?" /></div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={save}>{editing ? 'Update' : 'Create'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
