import { useState } from "react";
import { Icon } from "./Icon";
import { UPLOADS_URL } from "./constants";

function ArticleList({ articles, loading, onNew, onEdit, onDelete }) {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = articles.filter((a) =>
    `${a.title || ""} ${a.summary || ""}`.toLowerCase().includes(query)
  );

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Articles</h1>
          <p className="mt-1 text-sm text-gray-500">
            {loading
              ? "Loading..."
              : `${articles.length} ${articles.length === 1 ? "article" : "articles"} published`}
          </p>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          <Icon name="plus" className="h-4 w-4" />
          New article
        </button>
      </div>

      <div className="relative mt-6">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Icon name="search" className="h-4 w-4" />
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or summary"
          className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <ul className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
        {loading &&
          [0, 1, 2].map((i) => (
            <li key={i} className="flex animate-pulse items-center gap-4 p-4">
              <div className="h-14 w-20 rounded bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/2 rounded bg-gray-200" />
                <div className="h-3 w-3/4 rounded bg-gray-100" />
              </div>
            </li>
          ))}

        {!loading &&
          filtered.map((article) => (
            <li
              key={article.id}
              className="flex items-center gap-4 p-4 transition hover:bg-gray-50"
            >
              {article.imageUrl ? (
                <img
                  src={`${UPLOADS_URL}/${article.imageUrl}`}
                  alt=""
                  className="h-14 w-20 shrink-0 rounded object-cover"
                />
              ) : (
                <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-400">
                  <Icon name="photo" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-gray-900">{article.title}</p>
                <p className="mt-0.5 truncate text-sm text-gray-500">
                  {article.summary || "No summary"}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(article)}
                  aria-label={`Edit ${article.title}`}
                  title="Edit"
                  className="rounded-md p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
                >
                  <Icon name="pencil" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(article)}
                  aria-label={`Delete ${article.title}`}
                  title="Delete"
                  className="rounded-md p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Icon name="trash" className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}

        {!loading && articles.length === 0 && (
          <li className="flex flex-col items-center px-6 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
              <Icon name="document" className="h-6 w-6" />
            </div>
            <p className="mt-4 font-semibold">No articles yet</p>
            <p className="mt-1 text-sm text-gray-500">
              Add your first article and it will show up on the homepage.
            </p>
            <button
              type="button"
              onClick={onNew}
              className="mt-5 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              New article
            </button>
          </li>
        )}

        {!loading && articles.length > 0 && filtered.length === 0 && (
          <li className="px-6 py-10 text-center text-sm text-gray-500">
            No articles match "{search}".
          </li>
        )}
      </ul>
    </>
  );
}

export default ArticleList;