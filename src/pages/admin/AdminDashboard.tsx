import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';
import { LayoutGrid, FolderKanban, Eye, EyeOff, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const { sections, projects } = useAdmin();
  const visibleCount = sections.filter(s => s.visible).length;
  const featuredCount = projects.filter(p => p.featured).length;

  const stats = [
    { label: 'Total Sections', value: sections.length, icon: LayoutGrid, color: 'text-accent' },
    { label: 'Visible Sections', value: visibleCount, icon: Eye, color: 'text-green-500' },
    { label: 'Hidden Sections', value: sections.length - visibleCount, icon: EyeOff, color: 'text-muted-foreground' },
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'text-accent' },
    { label: 'Featured Projects', value: featuredCount, icon: FolderKanban, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your portfolio & content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map(s => (
          <div key={s.label} className="p-5 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-3xl font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/sections"
            className="group p-5 rounded-lg border border-border bg-card hover:border-accent/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Manage Sections</h3>
                <p className="text-sm text-muted-foreground mt-1">Reorder, show/hide portfolio sections</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </Link>
          <Link
            to="/admin/projects"
            className="group p-5 rounded-lg border border-border bg-card hover:border-accent/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Manage Projects</h3>
                <p className="text-sm text-muted-foreground mt-1">Add, edit, delete portfolio projects</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </Link>
          <Link
            to="/portfolio"
            className="group p-5 rounded-lg border border-border bg-card hover:border-accent/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Preview Portfolio</h3>
                <p className="text-sm text-muted-foreground mt-1">See your portfolio as visitors do</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent projects */}
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Recent Projects</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Tech Stack</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Featured</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map(p => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-foreground font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.techStack.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded bg-secondary text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {p.featured ? (
                      <span className="px-2 py-0.5 text-xs rounded bg-accent/10 text-accent font-medium">Featured</span>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
