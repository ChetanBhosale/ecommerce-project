import HeroImage from "../../assets/smartPhonePic.jpg";
import HomeProductsCard from "./HomeProductsCard";

const Hero = () => {
  return (
    <div className="pb-8 ">
      <h2 className=" pl-12 pt-4 text-2xl font-head font-bold mb-4">
        Most Selling Products
      </h2>
      <div className="w-full h-[60rem] 1000px:h-[60vh] gap-4 800px:gap-0 flex flex-col 1000px:flex-row justify-center items-center bg-primary-content">
        <div className=" w-full 1000px:w-[43%] h-full flex flex-col flex-wrap justify-between">
          <div className="w-full h-full grid grid-cols-2 gap-2 px-2">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="bg-red-400 h-full w-full">
                  <HomeProductsCard />
                </div>
              ))}
          </div>
        </div>
        <div className="w-full 1000px:w-[55%] h-full">
          <img
            src={HeroImage}
            className="w-full h-full object-cover"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
