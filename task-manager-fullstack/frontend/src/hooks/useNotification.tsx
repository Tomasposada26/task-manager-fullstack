import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  message: string | null;
  type: 'error' | 'success' | null;
  show: (msg: string, type?: 'error' | 'success') => void;
  hide: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<'error' | 'success' | null>(null);

  const show = (msg: string, t: 'error' | 'success' = 'error') => {
    setMessage(msg);
    setType(t);
    setTimeout(() => hide(), 4000);
  };
  const hide = () => {
    setMessage(null);
    setType(null);
  };

  return (
    <NotificationContext.Provider value={{ message, type, show, hide }}>
      {children}
      {message && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 1000,
            background: type === 'error' ? '#ef4444' : '#22c55e',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: 8,
            boxShadow: '0 2px 8px #0003',
            minWidth: 200,
            fontWeight: 600,
          }}
        >
          {message}
          <button onClick={hide} style={{ marginLeft: 16, background: 'none', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>×</button>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};
