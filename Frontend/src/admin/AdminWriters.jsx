import { useState, useEffect } from "react";
import { createWriter, fetchWriters, deleteWriter } from "../api/articlesApi";
import { logout, verifyToken } from "../api/authApi";
import Login from "./Login";

function AdminWriters() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [writerEmail, setWriterEmail] = useState('');
  const [writerPassword, setWriterPassword] = useState('');
  const [writerMessage, setWriterMessage] = useState(null);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    verifyToken().then(({ valid, role }) => {
      if (valid) {
        setLoggedIn(true);
        setRole(role);
        if (role === 'admin') {
          loadWriters();
        }
      } else {
        logout();
        setLoggedIn(false);
      }
      setChecking(false);
    });
  }, []);

  function loadWriters() {
    fetchWriters().then(setWriters).catch((err) => setWriterMessage(err.message));
  }

  async function handleAddWriter(e) {
    e.preventDefault();
    setWriterMessage(null);
    try {
      const newWriter = await createWriter(writerEmail, writerPassword);
      setWriterMessage(`Writer created: ${newWriter.email}`);
      setWriterEmail('');
      setWriterPassword('');
      loadWriters();
    } catch (err) {
      setWriterMessage(err.message);
    }
  }

  async function handleDeleteWriter(id) {
    if (!window.confirm("Delete this writer?")) return;
    try {
      await deleteWriter(id);
      loadWriters();
    } catch (err) {
      setWriterMessage(err.message);
    }
  }

  if (checking) {
    return <p className="p-8">Checking login...</p>;
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  if (role !== 'admin') {
    return <p className="p-8">You don't have access to this page.</p>;
  }

  return (
    <div className="flex flex-col p-8 max-w-sm gap-4">
      <a href="/admin" className="text-sm underline text-gray-600">
        Back to Admin Page
      </a>
      <h1 className="text-2xl font-bold">Add Writer</h1>
      <form onSubmit={handleAddWriter} className="flex flex-col gap-2">
        {writerMessage && <p className="text-sm text-gray-700">{writerMessage}</p>}
        <input
          type="email"
          value={writerEmail}
          onChange={(e) => setWriterEmail(e.target.value)}
          placeholder="Writer email"
          required
          className="rounded border border-gray-300 p-2 text-sm"
        />
        <input
          type="password"
          value={writerPassword}
          onChange={(e) => setWriterPassword(e.target.value)}
          placeholder="Writer password"
          required
          className="rounded border border-gray-300 p-2 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
        >
          Create writer
        </button>
      </form>

      <h2 className="mt-4 font-semibold text-gray-800">Existing writers</h2>
      <ul className="divide-y divide-gray-200 rounded border border-gray-200">
        {writers.map((writer) => (
          <li key={writer.id} className="flex items-center justify-between gap-4 p-3">
            <p className="truncate text-sm text-gray-900">{writer.email}</p>
            <button
              type="button"
              onClick={() => handleDeleteWriter(writer.id)}
              className="rounded border border-red-300 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </li>
        ))}
        {writers.length === 0 && (
          <li className="p-3 text-sm text-gray-500">No writers yet.</li>
        )}
      </ul>
    </div>
  );
}

export default AdminWriters;