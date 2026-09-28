import StoryCard from "../Ui/StoryCard";
import { useContent } from '../../context/ContentContext';
import {Link} from "react-router-dom";
function NewsColumns() {
  const { newsFeatured, newsLeftColumn, newsRightColumn, adminArticles } = useContent();

  return (
    <div className="p-16 pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 divide-y divide-gray-200 ">
          {newsLeftColumn.map((story) => (
            <div key={story.id} className="py-4 first:pt-0 ">
              <a href={story.href}>
                <StoryCard bordered={false} {...story} />
              </a>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 ">
          <a href={newsFeatured.href}>
            <StoryCard bordered={false} size="large" {...newsFeatured} />
          </a>
        </div>

        <div className="lg:col-span-1 divide-y divide-gray-200">
          {newsRightColumn.map((story) => (
            <div key={story.id} className="py-4 first:pt-0">
              <a href={story.href}>
                <StoryCard bordered={false} variant="text" {...story} />
              </a>
            </div>
          ))}
        </div>
      </div>

    {adminArticles.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {[...adminArticles].reverse().map((article) => (
          <Link key={article.id} to={`/article/${article.id}`}>
            <StoryCard
              bordered={false}
              title={article.title}
              summary={article.summary}
              imageUrl={`http://localhost:5000/uploads/${article.imageUrl}`}
            />
          </Link>
        ))}
      </div>
    )}
    </div>
  );
}

export default NewsColumns;