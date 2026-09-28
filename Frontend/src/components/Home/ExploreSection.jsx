import React,{useState} from "react";
import { useContent } from "../../context/ContentContext";
import HeroSection from "../Ui/HeroSection";
import VariousInfoSection from "../Ui/VariousInfoSection";
import { Play } from "lucide-react";

function ExploreSection(){
    const { watchSection, exploreSections } = useContent();

    return(
        <div className="max-w-auto  p-16 border-t-2 border-black">
            <div className="mb-8 border-t-2 border-black pt-2 ">
                <a
                    href={watchSection.href}
                    className="inline-flex items-center gap-1 text-md font-bold uppercase hover:underline pb-6"
                >
                    
                    {watchSection.topic}
                    <svg
                        viewBox="0 0 32 32"
                        className="w-4 h-4"
                        fill="currentColor"
                    >
                        <path d="M21.6 14.3 5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7v-3.4z" />
                    </svg>               
                </a>
                <a href={watchSection.featured.href} className="flex flex-col md:flex-row gap-8 items-center  hover:opacity-90 w-full h-full  bg-black">
                <img
                    src={watchSection.featured.imageUrl}
                    alt={watchSection.featured.title}
                    className="max-w-3xl max-h-full object-cover "
                />
                <div >
                <h2 className="text-2xl font-bold text-white hover:underline">
                    {watchSection.featured.title}
                </h2>
                <p className="mt-4 text-gray-200">{watchSection.featured.summary}</p>
                <button className="mt-4 px-4 py-2 border-2 border-white  text-white font-bold  hover:bg-gray-200 hover:text-black transition-colors duration-300">
                    {watchSection.featured.buttonText}
                </button>
                </div>
                </a>
            </div>  
        <div className=" ">
            <VariousInfoSection columns={exploreSections} />
        </div>
        </div>
    )
}
export default ExploreSection;