"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number; // in ms, default 2000
  onClose?: () => void;
}

const Toast = ({ message, duration = 2000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center pointer-events-none z-50 m-4">
      <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg pointer-events-auto animate-slide-in">
        {message}
      </div>
    </div>
  );
};

export default Toast;
