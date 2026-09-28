import VariousInfoSection from "../Ui/VariousInfoSection";
import { useContent } from "../../context/ContentContext";

function VariousInfo() {
  const { variousInfo } = useContent();

  return (
    <div className="p-16 border-t-2 border-black">
      <VariousInfoSection columns={variousInfo} />
    </div>
  );
}

export default VariousInfo;