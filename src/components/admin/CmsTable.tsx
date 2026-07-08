import { ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface CmsTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function CmsTable<T extends { id: string }>({
  columns, data, emptyMessage = 'Không tìm thấy bản ghi nào.', onRowClick,
}: CmsTableProps<T>) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {columns.map(col => (
                <th key={col.key} className={`text-left px-5 py-3.5 font-semibold text-muted-foreground uppercase text-[10px] tracking-wider ${col.className ?? ''}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-16 text-muted-foreground text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-border last:border-0 hover:bg-secondary/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map(col => (
                    <td key={col.key} className={`px-5 py-4 ${col.className ?? ''}`}>
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
