import { FC } from "react";
import { IProduct } from "../../store/api/userProduct";
import noImage from "../../assets/front-Product.jpg";
import "../home/MostRecent.css";

interface Props {
  index: number;
  product: IProduct | any;
}

const Card: FC<Props> = ({ index, product }) => {
  return (
    <div
      key={index}
      className="remove group hover:scale-105 transition-all ease-out duration-500 cursor-pointer w-64 flex-shrink-0 h-[20rem] flex flex-col items-center  shadow-sm shadow-accent rounded-lg"
    >
      <div className="w-full h-2/3 overflow-hidden">
        <img
          src={product.images.length === 0 ? noImage : product.images[0].url}
          alt={product.name}
          className="h-full w-full object-cover rounded-t-lg "
        />
      </div>
      <div className="w-full font-head px-2 ">
        <h2 className="flex gap-2 text-lg  pt-3">
          <span className="font-bold ">
            ${product.less}
            {"  "}
          </span>
          <span className="font-bold text-xs text-red-400 line-through">
            ${product.price}
            {"    "}
          </span>
        </h2>
        <h3 className="font-para text-md">
          {product.name.split("").splice(0, 26).join("")}
          {product.name.length > 25 && "..."}
        </h3>
        <div className=" mt-3 badge badge-outline rounded-lg">
          {product.state}
        </div>
      </div>
    </div>
  );
};

export default Card;
