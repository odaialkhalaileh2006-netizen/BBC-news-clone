import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../api/articlesApi";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle(id)
      .then(setArticle)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="p-8">{error}</p>;
  }

  if (!article) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <a href="/" className="text-sm underline text-gray-600">
        Back to Home
      </a>
      <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
      <img
        src={`http://localhost:5000/uploads/${article.imageUrl}`}
        alt={article.title}
        className="w-full rounded mt-4"
      />
      <div
        className="mt-6"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}

export default ArticlePage;