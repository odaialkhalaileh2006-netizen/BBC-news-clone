import React from "react";
import { useContent } from "../../context/ContentContext";
import StoryCard from "../Ui/StoryCard";
function DiscoverMoreFromBbc() {
  const { discoverHero, discoverCards } = useContent();

  return (
    <div className="max-w-auto p-16 pt-10">
        <div className="mb-8 border-t-2 border-black pt-2 ">
            <h1 className="text-md font-bold mb-4">{discoverHero.topic}</h1>
            
        </div>
        <a href={discoverHero.href} className="hover:opacity-70">
            
        <div className="flex flex-row gap-4 pt-4 max-w-auto">
            <div className=" flex-col pt-32 ">
            <h2 className="text-2xl font-bold hover:underline">{discoverHero.title}</h2>
            <p className="text-gray-800 py-4">{discoverHero.summary}</p>
            <button className="bg-transparent text-black font-bold py-2 px-4 border-2 border-black hover:bg-gray-800 hover:text-white transition-colors duration-300">
                {discoverHero.buttonText}
            </button>
            
            </div>
            <img
                src={discoverHero.imageUrl}
                alt={discoverHero.title}
                className=" max-w-4xl  h-full object-cover "
            />

        </div>
        </a>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-12">
            {discoverCards.map((card, index) => (
                <StoryCard bordered={false} {...card}/>
            ))}
        </div>
    </div>
  )
}
export default DiscoverMoreFromBbc; 