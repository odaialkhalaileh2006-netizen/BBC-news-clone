import React from "react";
import { useContent } from "../../context/ContentContext";
import StoryCard from '../Ui/StoryCard';

function WorldCupStories(){
    const { worldCupStories } = useContent();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 ">  
                   
            {worldCupStories.map((story) => (
          <a
            key={story.id}
            href={story.href}
            className="block h-full transition-all duration-200 hover:brightness-125 "
          >
            <StoryCard bordered={false} {...story} />
          </a>
      ))}
       
    </div> 
    )
}
export default WorldCupStories;