import Herosection from "../components/Herosection";

const About = () => {
  const name = "ShoesKart Ecommerce";
  return (
    <div className="home">
      <Herosection myData={name} />
    </div>
  );
};

export default About;
