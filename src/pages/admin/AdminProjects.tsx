import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { PortfolioProject } from '@/types';
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react';

const emptyProject: Omit<PortfolioProject, 'id'> = {
  title: '', category: '', description: '', image: '',
  techStack: [], featured: false,
};

const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useAdmin();
  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [techInput, setTechInput] = useState('');

  const openNew = () => {
    setEditing({ ...emptyProject, id: crypto.randomUUID() } as PortfolioProject);
    setIsNew(true);
    setTechInput('');
  };

  const openEdit = (p: PortfolioProject) => {
    setEditing({ ...p });
    setIsNew(false);
    setTechInput('');
  };

  const close = () => { setEditing(null); setIsNew(false); };

  const save = () => {
    if (!editing || !editing.title.trim()) return;
    if (isNew) addProject(editing);
    else updateProject(editing);
    close();
  };

  const addTech = () => {
    if (!techInput.trim() || !editing) return;
    setEditing({ ...editing, techStack: [...editing.techStack, techInput.trim()] });
    setTechInput('');
  };

  const removeTech = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, techStack: editing.techStack.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Project list */}
      <div className="grid gap-4">
        {projects.map(p => (
          <div key={p.id} className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground">{p.title}</h3>
                {p.featured && <Star className="w-4 h-4 text-accent fill-accent" />}
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.techStack.map(t => (
                  <span key={t} className="px-2 py-0.5 text-xs rounded bg-secondary text-muted-foreground">{t}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Category: {p.category}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEdit(p)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => deleteProject(p.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No projects yet. Click "Add Project" to get started.</p>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-background border border-border rounded-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                {isNew ? 'New Project' : 'Edit Project'}
              </h2>
              <button onClick={close} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Title *</label>
                <input
                  value={editing.title}
                  onChange={e => setEditing({ ...editing, title: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <input
                  value={editing.category}
                  onChange={e => setEditing({ ...editing, category: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Web App, Mobile App, etc."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea
                  value={editing.description}
                  onChange={e => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Tech Stack</label>
                <div className="flex gap-2 mt-1">
                  <input
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Type and press Enter"
                  />
                  <button onClick={addTech} className="px-3 py-2 bg-secondary text-foreground rounded-md text-sm hover:bg-secondary/80">Add</button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {editing.techStack.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-secondary text-muted-foreground">
                      {t}
                      <button onClick={() => removeTech(i)} className="hover:text-destructive"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Demo URL</label>
                  <input
                    value={editing.demoUrl || ''}
                    onChange={e => setEditing({ ...editing, demoUrl: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">GitHub URL</label>
                  <input
                    value={editing.githubUrl || ''}
                    onChange={e => setEditing({ ...editing, githubUrl: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={e => setEditing({ ...editing, featured: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm text-foreground">Featured project</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button onClick={close} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button
                onClick={save}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {isNew ? 'Create' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
