import Header from "./layout/Header";
import WorldCupSection from "./Home/WorldCupSection";
import EditorsPicks from "./Home/EditorsPicks";
import MoreNews from "./Home/MoreNews";
import Footer from "./layout/Footer";
import NewsColumns from "./Home/NewsColumns";
import FromBbc from "./Home/FromBbc";
import BestAudio from "./Home/BestAudio";
import Travel from "./Home/Travel";
import KaatyKay from "./Home/KaatyKay";
import Health from "./Home/Health";
import WorldNews from "./Home/WorldNews";
import LatestSportsAudio from "./Home/LatestSportsAudio";
import EntertainmentNews from "./Home/EntertainmentNews";
import ExploreSection from "./Home/ExploreSection";
import DiscoverMoreFromBbc from "./Home/DiscoverMoreFromBbc";
function App() {
  return (
    <div >
      <Header />
      <NewsColumns />
      <FromBbc />
      <WorldCupSection />
      <EditorsPicks />
      <BestAudio />
      <MoreNews />
      <Travel />
      <KaatyKay />
      <Health />
      <WorldNews />
      <LatestSportsAudio />
      <EntertainmentNews />
      <ExploreSection />
      <DiscoverMoreFromBbc />
      <Footer />
    </div>
  );
}

export default App;