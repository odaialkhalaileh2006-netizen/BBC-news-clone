import StoryCard from "../Ui/StoryCard";
import { useContent } from "../../context/ContentContext";

function FromBbc() {
  const { fromBbc } = useContent();

  return (
    <section className="w-full max-w-screen-auto   p-16">
      <div className="border-t-2  border-black  mb-6">
        <h2 className="font-display font-extrabold uppercase tracking-wide text-black text-sm pt-3">
          Only From The BBC
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fromBbc.map((story) => (
          <a
            key={story.id}
            href={story.href}
            className="block h-full transition-all duration-200 hover:brightness-125 "
          >
            <StoryCard bordered={false} {...story} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default FromBbc;