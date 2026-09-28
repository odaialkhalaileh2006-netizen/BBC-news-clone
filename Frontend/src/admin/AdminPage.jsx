import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../api/articlesApi";
import { logout, verifyToken } from "../api/authApi";
import Login from "./Login";
import RichTextEditor from "./RichTextEditor";

const EMPTY_FORM = {
  title: "",
  summary: "",
  imageUrl: "",
  content: "",
};

function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    verifyToken().then(({ valid, role }) => {
      if (valid) {
        setLoggedIn(true);
        setRole(role);
      } else {
        logout();
        setLoggedIn(false);
      }
      setChecking(false);
    });
  }, []);

  function loadArticles() {
    fetchArticles().then((data) => {
      setArticles(data);
    }).catch((err) => {
      if (err.status === 401 || err.status === 403) {
        logout();
        setLoggedIn(false);
      } else {
        setError(err.message);
      }
    });
  }

  useEffect(loadArticles, []);

  function displayPosts() {
    setShow(!show);
  }

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let newForm = { ...form };
    newForm[name] = value;
    setForm(newForm);
  }

  async function handleDelete(id) {
    var confirmed = window.confirm("Delete this article?");
    if (!confirmed) {
      return;
    }
    setError(null);
    try {
      await deleteArticle(id);
      loadArticles();
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        logout();
        setLoggedIn(false);
      } else {
        setError(err.message);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('summary', form.summary);
      formData.append('content', form.content);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      if (editingId) {
        await updateArticle(editingId, formData);
      } else {
        await createArticle(formData);
      }
      cancelEdit();
      loadArticles();
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        logout();
        setLoggedIn(false);
      } else {
        setError(err.message);
      }
    }
  }

  function startEdit(article) {
  setEditingId(article.id);
  setForm({
    title: article.title || "",
    summary: article.summary || "",
    imageUrl: article.imageUrl || "",
    content: article.content || "",
  });
  setImageFile(null);
}

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
  }

  function handleContentChange(html) {
  let newForm = { ...form };
  newForm.content = html;
  setForm(newForm);
}

  if (checking) {
    return <p className="p-8">Checking login...</p>;
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="flex flex-col p-8">
      <div className=" gap-2 pb-8">
        <a href="/" className="flex shrink-0 gap-2 " aria-label="BBC Home">
          {["B", "B", "C"].map((letter, i) => (
            <span
              key={i}
              className="w-8 h-8 text-2xl bg-black text-white flex items-center justify-center font-black"
            >
              {letter}
            </span>
          ))}
        </a>
        <h1 className="text-2xl font-bold">Admin Page</h1>
        <div className="pt-6">
        {role === 'admin' && (
      <Link
        to="/admin/writers"
        className="rounded bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700"
      >
        Add writer
      </Link>
      )};
          </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="bg-blue-950 col-span-2 h-screen">
          <div className="flex flex-col items-center justify-center gap-4 font-bold text-m pt-6">
            <button
              className="   hover:text-white transition"
              onClick={displayPosts}
            >
              posts
            </button>
            <button
              onClick={async () => {
                await logout();
                setLoggedIn(false);
              }}
              className=" hover:text-white transition"
            >
              Log out
            </button>
          </div>
        </div>
        <div className=" pl-16 col-span-8 h-screen">
          {show && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <h1 className="text-xl font-bold">
                Posts will be displayed here:
              </h1>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full rounded border border-gray-300 p-2 text-sm"
              />
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="Summary"
                rows={2}
                className="w-full rounded border border-gray-300 p-2 text-sm"
              />
              <RichTextEditor
              key={editingId || 'new'}
              value={form.content}
              onChange={handleContentChange}
            />
              <div className="flex items-center gap-3">
                <label
                  htmlFor="imageFile"
                  className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Choose image
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden"
                />
                <span className="text-sm text-gray-500 truncate">
                  {imageFile ? imageFile.name : "No file chosen"}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700"
                >
                  {editingId ? "Save changes" : "Add article"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <h2 className="mt-8 font-semibold text-gray-800">
                Existing articles
              </h2>
              <ul className="mt-3 divide-y divide-gray-200 rounded border border-gray-200">
                {articles.map((article) => (
                  <li
                    key={article.id}
                    className="flex items-center justify-between gap-4 p-3"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${article.imageUrl}`}
                      alt={article.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-900">
                        {article.title}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {article.summary}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(article)}
                        className="rounded border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(article.id)}
                        className="rounded border border-red-300 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
                {articles.length === 0 && (
                  <li className="p-3 text-sm text-gray-500">
                    No articles yet.
                  </li>
                )}
              </ul>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
export default AdminPage;