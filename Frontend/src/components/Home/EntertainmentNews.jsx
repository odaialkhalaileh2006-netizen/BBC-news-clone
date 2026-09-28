import VariousInfoSection from "../Ui/VariousInfoSection";
import { useContent } from "../../context/ContentContext";

function EntertainmentNews() {
  const { entertainmentNews } = useContent();

  return (
    <div className="p-16 border-t-2 border-black ">
      <VariousInfoSection columns={entertainmentNews} />
    </div>
  );
}

export default EntertainmentNews;