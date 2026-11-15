import { useState, useEffect } from "react";
import { Icon } from "./Icon";
import { UPLOADS_URL } from "./constants";
import RichTextEditor from "../RichTextEditor";

function ArticleForm({
  form,
  editingId,
  saving,
  imageFile,
  onChange,
  onContentChange,
  onImageChange,
  onSubmit,
  onCancel,
}) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const currentImage =
    previewUrl || (form.imageUrl ? `${UPLOADS_URL}/${form.imageUrl}` : null);

  return (
    <form onSubmit={onSubmit}>
      <button
        type="button"
        onClick={onCancel}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        <Icon name="back" className="h-4 w-4" />
        Back to articles
      </button>

      <h1 className="text-2xl font-bold">
        {editingId ? "Edit article" : "New article"}
      </h1>

      <div className="mt-6 space-y-6 rounded-lg border border-gray-200 bg-white p-6">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-semibold">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Write a clear headline"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div>
          <label htmlFor="summary" className="mb-1.5 block text-sm font-semibold">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={form.summary}
            onChange={onChange}
            placeholder="One or two sentences shown on the homepage card"
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-semibold">Content</span>
          <RichTextEditor
            key={editingId || "new"}
            value={form.content}
            onChange={onContentChange}
          />
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-semibold">Cover image</span>
          <div className="flex flex-wrap items-center gap-4">
            {currentImage ? (
              <img
                src={currentImage}
                alt="Cover preview"
                className="h-24 w-40 rounded-md border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-24 w-40 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                <Icon name="photo" className="h-7 w-7" />
              </div>
            )}
            <div>
              <label
                htmlFor="imageFile"
                className="inline-block cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                {currentImage ? "Change image" : "Choose image"}
              </label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files[0] || null)}
                className="hidden"
              />
              <p className="mt-2 max-w-xs truncate text-xs text-gray-500">
                {imageFile ? imageFile.name : "PNG or JPG, shown at the top of the article"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : editingId ? "Save changes" : "Add article"}
        </button>
      </div>
    </form>
  );
}

export default ArticleForm;