import { Link } from "react-router-dom";

const HomeProductsCard = () => {
  return (
    <div className="w-full h-full group bg-green-400 relative">
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        alt="img-st"
        className="w-full absolute z-10 h-full object-fill"
      />
      <Link
        to="/name"
        className="w-full h-full absolute z-10 bg-gray-900 opacity-80 hidden group-hover:block py-4 px-4 text-white"
      >
        <h2 className="text-lg">
          Shoes!
          <div className="badge badge-secondary ml-3">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline p-4">Fashion</div>
          <div className="badge badge-outline p-4">Products</div>
        </div>
      </Link>
    </div>
  );
};

export default HomeProductsCard;
