import { Link } from "react-router-dom";
import { ProductView } from "../../store/api/userProduct";

const HomeProductsCard: React.FC<ProductView> = ({ data }) => {
  const { id, name, description, category, state, images } = data;

  return (
    <div className="w-full h-full group bg-green-400 relative">
      {images.length === 0 ? (
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="placeholder"
          className="w-full absolute z-10 h-full object-fill"
        />
      ) : (
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover"
        />
      )}

      <Link
        to={`/products/${id}`}
        className="w-full h-full absolute z-10 bg-gray-900 opacity-80 hidden group-hover:block py-4 px-4 text-white"
      >
        <h2 className="text-lg py-3">{name}</h2>
        <p className="pb-4">{description.slice(0, 100)}...</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline p-4">{category}</div>
          <div className="badge badge-outline p-4">{state}</div>
        </div>
      </Link>
    </div>
  );
};

export default HomeProductsCard;
