import AudioSlider from "../Ui/AudioSlider";
import { useContent } from "../../context/ContentContext";

function BestAudio() {
  const { audioPicks } = useContent();

  return (
    <div className="max-w-auto  p-16">
    <AudioSlider
      title="Best Audio of the Week"
      href="/"
      items={audioPicks}
    />
    </div>
  );
}

export default BestAudio;