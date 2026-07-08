interface StatusBadgeProps {
  status: string;
  map: Record<string, { label: string; className: string }>;
}

export const StatusBadge = ({ status, map }: StatusBadgeProps) => {
  const entry = map[status] ?? { label: status, className: 'bg-muted text-muted-foreground' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${entry.className}`}>
      {entry.label}
    </span>
  );
};
