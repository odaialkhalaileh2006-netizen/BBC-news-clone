import { Link } from "react-router-dom";
import { Icon, BbcLogo } from "./Icon";

const navItemBase =
  "flex shrink-0 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition";

function AdminLayout({ role, onShowList, onLogout, children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <BbcLogo />
          <span className="hidden h-6 w-px bg-gray-300 sm:block" />
          <span className="hidden text-base font-semibold sm:block">Admin</span>
        </div>
        {role && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
            {role}
          </span>
        )}
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="flex w-full gap-1 overflow-x-auto border-b border-gray-200 bg-white p-3 md:min-h-[calc(100vh-4rem)] md:w-60 md:shrink-0 md:flex-col md:border-b-0 md:border-r md:p-4">
          <button
            type="button"
            onClick={onShowList}
            className={`${navItemBase} bg-gray-900 text-white`}
          >
            <Icon name="document" />
            Articles
          </button>

          {role === "admin" && (
            <Link
              to="/admin/writers"
              className={`${navItemBase} text-gray-700 hover:bg-gray-100`}
            >
              <Icon name="users" />
              Writers
            </Link>
          )}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className={`${navItemBase} text-gray-700 hover:bg-gray-100`}
          >
            <Icon name="external" />
            View site
          </a>

          <button
            type="button"
            onClick={onLogout}
            className={`${navItemBase} text-gray-700 hover:bg-gray-100 md:mt-auto`}
          >
            <Icon name="logout" />
            Log out
          </button>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;