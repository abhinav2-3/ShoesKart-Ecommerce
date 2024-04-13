import Herosection from "../components/Herosection";
import Companies from "../components/Companies";
import Services from "../components/Services";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  const data = {
    name: "ShoesKart",
  };

  return (
    <section className="home">
      <Herosection myData={data} />
      <FeaturedProducts />
      <Services />
      <Companies />
    </section>
  );
};

export default Home;
