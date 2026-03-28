import { useState } from 'react';
import { useAdmin, type SkillCategory } from '@/contexts/AdminContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Layers } from 'lucide-react';
import { toast } from 'sonner';

const AdminSkills = () => {
  const { skillCategories: categories, addSkillCategory, updateSkillCategory, deleteSkillCategory } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SkillCategory | null>(null);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState<{ name: string; level: number }[]>([]);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState(80);

  const openNew = () => { setEditing(null); setName(''); setSkills([]); setDialogOpen(true); };
  const openEdit = (cat: SkillCategory) => { setEditing(cat); setName(cat.name); setSkills([...cat.skills]); setDialogOpen(true); };

  const addSkill = () => {
    if (!skillName.trim()) return;
    setSkills(s => [...s, { name: skillName.trim(), level: skillLevel }]);
    setSkillName(''); setSkillLevel(80);
  };
  const removeSkill = (i: number) => setSkills(s => s.filter((_, idx) => idx !== i));

  const save = () => {
    if (!name.trim()) { toast.error('Category name is required'); return; }
    if (skills.length === 0) { toast.error('Add at least one skill'); return; }
    const entry: SkillCategory = { id: editing?.id || crypto.randomUUID(), name: name.trim(), skills };
    if (editing) { updateSkillCategory(entry); toast.success('Category updated'); }
    else { addSkillCategory(entry); toast.success('Category added'); }
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">Skills</h1>
          <p className="text-sm text-muted-foreground mt-1">{categories.length} categories · {categories.reduce((a, c) => a + c.skills.length, 0)} skills</p>
        </div>
        <Button onClick={openNew} size="sm"><Plus className="w-4 h-4 mr-1.5" />Add Category</Button>
      </div>

      <div className="space-y-3">
        {categories.map(cat => (
          <Card key={cat.id} className="border-border">
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Layers className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm">{cat.name}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="text-[11px] bg-secondary text-muted-foreground px-2 py-0.5 rounded">
                        {s.name} <span className="text-accent font-medium">{s.level}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(cat)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteSkillCategory(cat.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {categories.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">No skill categories yet.</p>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Category' : 'Add Category'}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Category Name</label><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Frontend" /></div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Skills</label>
              <div className="flex gap-2 mb-2">
                <Input className="flex-1" value={skillName} onChange={e => setSkillName(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Skill name" />
                <Input className="w-20" type="number" min={0} max={100} value={skillLevel} onChange={e => setSkillLevel(Number(e.target.value))} />
                <Button type="button" size="sm" variant="outline" onClick={addSkill}>Add</Button>
              </div>
              <div className="space-y-1.5">
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${s.level}%` }} />
                    </div>
                    <span className="text-xs text-foreground w-28 truncate">{s.name}</span>
                    <span className="text-xs text-muted-foreground w-10">{s.level}%</span>
                    <button onClick={() => removeSkill(i)} className="text-muted-foreground hover:text-destructive text-sm">×</button>
                  </div>
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

export default AdminSkills;
