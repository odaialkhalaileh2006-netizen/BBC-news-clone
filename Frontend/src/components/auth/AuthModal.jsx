import { useEffect } from "react";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";

function AuthModal({ mode, onModeChange, onClose }) {
  useEffect(() => {
    if (!mode) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mode]);

  if (!mode) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 text-black"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative w-full max-w-md bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 p-1 text-gray-500 hover:text-black"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="auth-title" className="text-2xl font-bold">
          {mode === "signin" ? "Sign in" : "Register"}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          {mode === "signin"
            ? "Welcome back to the BBC."
            : "Create a BBC account to get started."}
        </p>

        {mode === "signin" ? (
          <SignInForm onSuccess={onClose} onSwitch={() => onModeChange("register")} />
        ) : (
          <RegisterForm onSuccess={onClose} onSwitch={() => onModeChange("signin")} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;