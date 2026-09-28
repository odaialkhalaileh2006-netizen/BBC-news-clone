import { useContent } from '../../context/ContentContext';
import StoryCard from '../Ui/StoryCard';
import HeroSection from '../Ui/HeroSection';
function MoreNews() {
  const { moreNewsHero, moreNewsMiddle, moreNewsRight } = useContent();

  return (
    <section className="border-t-2 border-black pt-3 p-16">
      <div className="grid grid-cols-12 gap-4 items-start">

        <div className="col-span-9 flex flex-col">

          <HeroSection {...moreNewsHero} />

          <div className="grid grid-cols-3 gap-5 pt-8">
            {moreNewsMiddle.map((card) => (
              <a href={card.href} key={card.id}>
                <StoryCard {...card} bordered={false} />
              </a>
            ))}
          </div>

        </div>
  
        <div className="col-span-3 flex flex-col divide-y divide-gray-300 pt-12">
          {moreNewsRight.map((card, index) => (
            <a
              href={card.href}
              key={card.id}
              className={index === 0 ? "pb-5" : "py-5"}
            >
              <StoryCard
                {...card}
                bordered={false}
                variant={card.imageUrl ? undefined : "text"}
              />
            </a>
          ))}
    </div>

      </div>
    </section>
  );
}
export default MoreNews;