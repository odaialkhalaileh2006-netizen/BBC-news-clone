import { useContent } from "../../context/ContentContext";
import StoryCard from "../Ui/StoryCard";

function KattyKay() {
  const { kattyKay } = useContent();

  return (
    <section className="max-w-auto mx-auto p-16">
      <div className="border-t-2 border-black pt-3 mb-6">
        <h3 className="inline-flex items-center gap-1 text-lg font-bold uppercase ">
          {kattyKay.section}
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {kattyKay.stories.map((story) => (
          <StoryCard
            key={story.id}
            variant="photo"
            title={story.title}
            summary={story.summary}
            imageUrl={story.imageUrl}
            href={story.href}
            videoIcon
          />
        ))}
      </div>
    </section>
  );
}

export default KattyKay;