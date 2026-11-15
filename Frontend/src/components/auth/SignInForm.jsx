import { useState } from "react";
import { useReader } from "../../context/ReaderAuthContext";
import PasswordField from "./PasswordField";

function SignInForm({ onSuccess, onSwitch }) {
  const { login } = useReader();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      {error && (
        <p role="alert" className="border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="signin-email" className="mb-1.5 block text-sm font-semibold">
          Email
        </label>
        <input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="w-full border border-gray-400 px-3 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <PasswordField
        id="signin-password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <button
        type="submit"
        disabled={submitting}
        className="bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-black underline underline-offset-2"
        >
          Register
        </button>
      </p>
    </form>
  );
}

export default SignInForm;