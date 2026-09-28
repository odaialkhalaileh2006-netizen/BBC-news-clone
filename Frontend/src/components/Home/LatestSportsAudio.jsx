import React from "react";
import AudioSlider from "../Ui/AudioSlider";
import { useContent } from "../../context/ContentContext";
function LatestSportsAudio(){
    const { latestSportAudio } = useContent();

    return(
        <div className="max-w-auto  p-16">
            <AudioSlider
            title="Latest Sports Audio"
            href="/"
            items={latestSportAudio}
            />
        </div>
    )
}
export default LatestSportsAudio