import PropType from "prop-types";
import hero from "../assets/hero.jpg";
import GetStartButton from "./GetStartButton";
const Herosection = ({ myData }) => {
  return (
    <section className="herosection">
      <aside className="heroData">
        <span>Welcome to</span>
        <h1>{myData}</h1>
        <p>
          Your ultimate destination for stylish and trendy footwear! Explore our
          extensive collection of shoes designed to match every style and
          occasion. With easy browsing and secure checkout, finding and
          purchasing your perfect pair has never been easier!
        </p>
        <GetStartButton />
      </aside>
      <aside className="heroImage">
        <img src={hero} alt="Hero" />
      </aside>
    </section>
  );
};

Herosection.propTypes = {
  myData: PropType.string,
};

export default Herosection;
