import { useEffect, useState } from "react";
import { IProduct, useGetProductsQuery } from "../../store/api/userProduct";
import Card from "./Card";
import { useSelector } from "react-redux";
import ProductNotFound from "../../assets/no product.jpg";

const ProductsView = () => {
  const { filter } = useSelector((state: any) => state.filter);
  const { data, error, isLoading } = useGetProductsQuery(filter);
  console.log(data);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error.data as any;
        setErrors(errorData);
      }
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-wrap justify-around gap-6 max-h-full p-4">
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              <div className="flex flex-col gap-4 w-64">
                <div className="skeleton h-40 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (errors) {
    return (
      <div className="w-full h-screen justify-center items-center">
        <h2 className="font-extrabold text-xl">
          Server Failed, Please try again letter!
        </h2>
      </div>
    );
  }

  if (data.products.length == 0) {
    return (
      <div className="w-full max-h-[90vh] flex flex-col justify-center items-center p-6 ">
        <h1 className="text-primary text-[5rem]">Product Not Found!</h1>
        <img
          src={ProductNotFound}
          className="w-96"
          alt="product not available"
        />
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-h-[90vh] overflow-y-scroll  flex flex-wrap justify-around p-6 gap-4">
        {data.products.map((product: IProduct, index: number) => (
          <Card index={index} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsView;
