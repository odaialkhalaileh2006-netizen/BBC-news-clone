import { useState, useEffect } from "react";
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../api/articlesApi";
import { logout, verifyToken } from "../api/authApi";
import Login from "./Login";
import AdminLayout from "./components/AdminLayout";
import ArticleList from "./components/ArticleList";
import ArticleForm from "./components/ArticleForm";
import DeleteModal from "./components/DeleteModal";
import Toast from "./components/Toast";
import { EMPTY_FORM } from "./components/constants";

function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [role, setRole] = useState(null);
  const [view, setView] = useState("list");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

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

  useEffect(() => {
    if (loggedIn) loadArticles();
  }, [loggedIn]);

  function showToast(type, message) {
    setToast({ type, message });
  }

  function handleApiError(err) {
    if (err.status === 401 || err.status === 403) {
      logout();
      setLoggedIn(false);
    } else {
      showToast("error", err.message || "Something went wrong. Please try again.");
    }
  }

  function loadArticles() {
    setLoadingArticles(true);
    fetchArticles()
      .then((data) => setArticles(data))
      .catch(handleApiError)
      .finally(() => setLoadingArticles(false));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleContentChange(html) {
    setForm((prev) => ({ ...prev, content: html }));
  }

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setView("editor");
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
    setView("editor");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setView("list");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("summary", form.summary);
      formData.append("content", form.content);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (editingId) {
        await updateArticle(editingId, formData);
        showToast("success", "Changes saved.");
      } else {
        await createArticle(formData);
        showToast("success", "Article added.");
      }
      cancelEdit();
      loadArticles();
    } catch (err) {
      handleApiError(err);
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteArticle(deleteTarget.id);
      showToast("success", "Article deleted.");
      setDeleteTarget(null);
      loadArticles();
    } catch (err) {
      setDeleteTarget(null);
      handleApiError(err);
    } finally {
      setDeleting(false);
    }
  }

  async function handleLogout() {
    await logout();
    setLoggedIn(false);
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">
        Checking login...
      </div>
    );
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <AdminLayout role={role} onShowList={() => setView("list")} onLogout={handleLogout}>
      {view === "list" && (
        <ArticleList
          articles={articles}
          loading={loadingArticles}
          onNew={openNew}
          onEdit={startEdit}
          onDelete={setDeleteTarget}
        />
      )}

      {view === "editor" && (
        <ArticleForm
          form={form}
          editingId={editingId}
          saving={saving}
          imageFile={imageFile}
          onChange={handleChange}
          onContentChange={handleContentChange}
          onImageChange={setImageFile}
          onSubmit={handleSubmit}
          onCancel={cancelEdit}
        />
      )}

      <DeleteModal
        article={deleteTarget}
        deleting={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </AdminLayout>
  );
}

export default AdminPage;