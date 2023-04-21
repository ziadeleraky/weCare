import Header from "../../Layout/Header/Header";
import BetterLiving from "../../Layout/BetterLiving/BetterLiving";
import ServiceSection from "../../UI/Sections/ServiceSection/ServiceSection";
import AlbumSection from "../../UI/Sections/AlbumSection/AlbumSection";
import Footer from "../../Layout/Footer/Footer";

function Home() {
  return (
    <>
      <Header></Header>
      <div className="py-4">
        <ServiceSection />
      </div>
      <div className="py-5">
      <BetterLiving />
      </div>
      <AlbumSection />
      <Footer />
    </>
  );
}

export default Home;
