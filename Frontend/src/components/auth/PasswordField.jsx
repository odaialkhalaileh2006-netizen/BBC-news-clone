import { useState } from "react";

function PasswordField({ id, label, value, onChange, autoComplete, minLength }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          minLength={minLength}
          required
          className="w-full border border-gray-400 px-3 py-2.5 pr-16 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-gray-600 hover:text-black"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;