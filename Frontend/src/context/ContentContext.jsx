import { createContext, useContext, useEffect, useState } from 'react';
import { fetchContent } from '../api/contentApi';
import { fetchAdminArticles } from '../api/articlesApi';

export const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent()
      .then((data) => {
        fetchAdminArticles().then((articles) => {
          data.adminArticles = articles;
          setContent(data);
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <p className="font-display text-xl font-bold text-gray-900">
            Couldn't load content
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Make sure the content API is running at{' '}
            {import.meta.env.VITE_API_URL || 'http://localhost:5000'}.
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-display text-lg font-semibold text-gray-500">
          Loading…
        </p>
      </div>
    );
  }

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}