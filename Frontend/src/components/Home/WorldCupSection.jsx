import React from "react";
import HeroSection from "../Ui/HeroSection";
import { useContent } from "../../context/ContentContext";
import WorldCupStories from "./WorldCupStories";

function WorldCupSection(){
    const { worldCupHero } = useContent();

    return(
        <div className="border border-t-2 border-t-black p-16 pt-6">
            <HeroSection {...worldCupHero} />
            
         <WorldCupStories />
    
        </div>
    )
}
export default WorldCupSection;