import { useState } from 'react';
import { useAdmin, type ExperienceEntry } from '@/contexts/AdminContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const emptyEntry: Omit<ExperienceEntry, 'id'> = {
  company: '', role: '', duration: '', description: '', achievements: [],
};

const AdminExperience = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ExperienceEntry | null>(null);
  const [form, setForm] = useState(emptyEntry);
  const [achievementInput, setAchievementInput] = useState('');

  const openNew = () => { setEditing(null); setForm(emptyEntry); setAchievementInput(''); setDialogOpen(true); };
  const openEdit = (e: ExperienceEntry) => { setEditing(e); setForm({ company: e.company, role: e.role, duration: e.duration, description: e.description, achievements: e.achievements }); setAchievementInput(''); setDialogOpen(true); };

  const addAchievement = () => {
    const v = achievementInput.trim();
    if (!v) return;
    setForm(f => ({ ...f, achievements: [...f.achievements, v] }));
    setAchievementInput('');
  };
  const removeAchievement = (i: number) => setForm(f => ({ ...f, achievements: f.achievements.filter((_, idx) => idx !== i) }));

  const save = () => {
    if (!form.company || !form.role) { toast.error('Company and role are required'); return; }
    if (editing) {
      updateExperience({ ...form, id: editing.id });
      toast.success('Experience updated');
    } else {
      addExperience({ ...form, id: crypto.randomUUID() });
      toast.success('Experience added');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { deleteExperience(id); toast.success('Experience deleted'); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">Experience</h1>
          <p className="text-sm text-muted-foreground mt-1">{experiences.length} entries</p>
        </div>
        <Button onClick={openNew} size="sm"><Plus className="w-4 h-4 mr-1.5" />Add Experience</Button>
      </div>

      <div className="space-y-3">
        {experiences.map(exp => (
          <Card key={exp.id} className="border-border">
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Briefcase className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">{exp.role}</p>
                  <p className="text-sm text-muted-foreground">{exp.company} · {exp.duration}</p>
                  {exp.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.achievements.map((a, i) => (
                        <span key={i} className="text-[11px] bg-secondary text-muted-foreground px-2 py-0.5 rounded">{a}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(exp)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(exp.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {experiences.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">No experience entries yet.</p>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Experience' : 'Add Experience'}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Company</label><Input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
              <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Role</label><Input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} /></div>
            </div>
            <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Duration</label><Input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="2021 – Present" /></div>
            <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label><Textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Achievements</label>
              <div className="flex gap-2 mb-2"><Input value={achievementInput} onChange={e => setAchievementInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAchievement())} placeholder="Add achievement" /><Button type="button" size="sm" variant="outline" onClick={addAchievement}>Add</Button></div>
              <div className="flex flex-wrap gap-1">
                {form.achievements.map((a, i) => (
                  <span key={i} className="text-xs bg-secondary text-foreground px-2 py-1 rounded flex items-center gap-1">{a}<button onClick={() => removeAchievement(i)} className="text-muted-foreground hover:text-destructive">×</button></span>
                ))}
              </div>
            </div>
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

export default AdminExperience;
