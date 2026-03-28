import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import type { PortfolioSection } from '@/contexts/AdminContext';

const SortableItem = ({ section, onToggle }: { section: PortfolioSection; onToggle: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
  const { lang } = useLanguage();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 rounded-lg border bg-card transition-colors ${
        section.visible ? 'border-border' : 'border-border/50 opacity-60'
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground touch-none"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">
          {lang === 'vi' ? section.titleVi : section.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">Key: {section.key} · Order: {section.order}</p>
      </div>

      <button
        onClick={onToggle}
        className={`p-2 rounded-md transition-colors ${
          section.visible
            ? 'text-green-500 hover:bg-green-500/10'
            : 'text-muted-foreground hover:bg-secondary'
        }`}
        title={section.visible ? 'Hide section' : 'Show section'}
      >
        {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>
    </div>
  );
};

const AdminSections = () => {
  const { sections, toggleSectionVisibility, reorderSections } = useAdmin();
  const sorted = [...sections].sort((a, b) => a.order - b.order);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderSections(String(active.id), String(over.id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground">Portfolio Sections</h1>
        <p className="text-muted-foreground mt-1">Drag to reorder, toggle visibility for each section</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sorted.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 max-w-2xl">
            {sorted.map(section => (
              <SortableItem
                key={section.id}
                section={section}
                onToggle={() => toggleSectionVisibility(section.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default AdminSections;
