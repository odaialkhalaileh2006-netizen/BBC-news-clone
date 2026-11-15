import { createContext, useContext, useEffect, useState } from "react";
import {
  registerReader,
  loginReader,
  fetchReader,
  logoutReader,
} from "../api/readerApi";

const ReaderAuthContext = createContext(null);

export function ReaderAuthProvider({ children }) {
  const [reader, setReader] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReader()
      .then(setReader)
      .catch(() => setReader(null))
      .finally(() => setLoading(false));
  }, []);

  async function register(name, email, password) {
    const data = await registerReader(name, email, password);
    setReader(data);
  }

  async function login(email, password) {
    const data = await loginReader(email, password);
    setReader(data);
  }

  async function logout() {
    await logoutReader();
    setReader(null);
  }

  return (
    <ReaderAuthContext.Provider
      value={{ reader, loading, register, login, logout }}
    >
      {children}
    </ReaderAuthContext.Provider>
  );
}

export function useReader() {
  const context = useContext(ReaderAuthContext);
  if (!context) {
    throw new Error("useReader must be used inside ReaderAuthProvider");
  }
  return context;
}