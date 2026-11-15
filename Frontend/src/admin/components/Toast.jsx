import { useEffect } from "react";
import { Icon } from "./Icon";

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg ${
        toast.type === "error" ? "bg-red-600" : "bg-gray-900"
      }`}
    >
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="opacity-80 transition hover:opacity-100"
      >
        <Icon name="x" className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Toast;