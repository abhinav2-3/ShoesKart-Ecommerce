import Herosection from "../components/Herosection";
import Companies from "../components/Companies";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";
import adVideo from "../assets/Ad.mp4";
const Home = () => {
  const name = "ShoesKart";

  return (
    <section className="home">
      <Herosection myData={name} />
      <FeaturedProducts />
      <Services />
      <div className="advideo">
        <video loop type="video/mp4" muted autoPlay src={adVideo}></video>
      </div>
      <Companies />
    </section>
  );
};

export default Home;
