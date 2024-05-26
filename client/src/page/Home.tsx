import Hero from "../components/home/Hero";
import MostRecent from "../components/home/MostRecent";
import Points from "../components/home/Points";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";

const Home = () => {
  return (
    <>
      <MainHeader />
      <Points />
      <Hero />
      <MostRecent />
      <MainFooter />
    </>
  );
};

export default Home;
