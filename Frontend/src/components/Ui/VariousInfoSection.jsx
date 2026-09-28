import { ChevronRight } from "lucide-react";
import StoryCard from "./StoryCard";

function VariousInfoSection({ columns }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-8  ">
      {columns.map((column) => (
        <div key={column.id}>
          <div className="border-t-2 border-black pt-2 mb-4">
            <a
              href={column.href}
              className="inline-flex items-center gap-1 text-md font-bold uppercase hover:underline"
            >
              {column.topic}
              <ChevronRight />
            </a>
          </div>

          <StoryCard {...column.featured} bordered={false} />

          <div className="mt-4 border-t border-gray-300 divide-y divide-gray-300">
            {column.items.map((item) => (
              <div key={item.id} className="py-3">
                <StoryCard
                  {...item}
                  bordered={false}
                  variant="text"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default VariousInfoSection;