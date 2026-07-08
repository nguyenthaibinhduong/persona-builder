import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CmsModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

const sizes = { md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export const CmsModal = ({ open, title, onClose, children, footer, size = 'md' }: CmsModalProps) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay background */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        {/* Modal content panel */}
        <motion.div
          className={`relative w-full ${sizes[size]} bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-10`}
          initial={{ scale: 0.95, y: 16, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 16, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
            <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
          {/* Body */}
          <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-4">{children}</div>
          {/* Footer */}
          {footer && (
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-card">{footer}</div>
          )}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
