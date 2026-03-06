import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: { bg: '#059669', icon: '#fff' },
  error: { bg: '#dc2626', icon: '#fff' },
  info: { bg: '#2563eb', icon: '#fff' },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '92%',
        maxWidth: '380px',
        pointerEvents: 'none',
      }}>
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type];
            const color = colors[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                style={{
                  pointerEvents: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: color.bg,
                  color: '#fff',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '500',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                  lineHeight: '1.4',
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{toast.message}</span>
                <div
                  onClick={() => removeToast(toast.id)}
                  style={{ flexShrink: 0, cursor: 'pointer', opacity: 0.7 }}
                >
                  <X size={16} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
