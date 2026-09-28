import React from "react";
import { useContent } from "../../context/ContentContext";
import HeroSection from "../Ui/HeroSection";
function Travel(){
    const { travel } = useContent();

    return(
        <div className="max-w-auto  p-16">
        <div className=" border-t-2 border-black  pt-2">
            {travel.map((travel)=>(       
            <HeroSection {...travel} />
            ))}
        </div>
        
        </div>
    )
}
export default Travel