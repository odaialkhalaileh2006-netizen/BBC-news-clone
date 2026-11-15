function DeleteModal({ article, deleting, onCancel, onConfirm }) {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 id="delete-title" className="text-lg font-bold">
          Delete this article?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          "{article.title}" will be removed from the site. This can't be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete article"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;