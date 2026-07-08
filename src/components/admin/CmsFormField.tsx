import React, { ReactNode } from 'react';

interface CmsFormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export const CmsFormField = ({ label, required, hint, children }: CmsFormFieldProps) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    {children}
    {hint && <p className="text-[11px] text-muted-foreground leading-normal mt-1">{hint}</p>}
  </div>
);

const inputBase =
  'w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all placeholder:text-muted-foreground/40';

export const CmsInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input {...props} ref={ref} className={`${inputBase} ${props.className ?? ''}`} />
  )
);
CmsInput.displayName = 'CmsInput';

export const CmsTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => (
    <textarea {...props} ref={ref} className={`${inputBase} resize-none ${props.className ?? ''}`} />
  )
);
CmsTextarea.displayName = 'CmsTextarea';

export const CmsSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  (props, ref) => (
    <select {...props} ref={ref} className={`${inputBase} ${props.className ?? ''}`} />
  )
);
CmsSelect.displayName = 'CmsSelect';
