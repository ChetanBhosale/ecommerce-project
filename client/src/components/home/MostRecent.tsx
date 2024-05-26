import { IProduct, useGetProductsQuery } from "../../store/api/userProduct";
import "./MostRecent.css";
import Card from "../products/Card";

const MostRecent = () => {
  const { data, isLoading } = useGetProductsQuery({
    order: "asc",
  });

  return (
    <div className="w-full mb-8">
      <h2 className="pl-12 pt-4 text-2xl font-head font-bold mb-4">
        Recently Added
      </h2>
      <div className="relative remove flex gap-4 overflow-y-hidden overflow-x-auto px-6 py-3">
        {isLoading ? (
          <>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex flex-col h-full gap-4 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              ))}
          </>
        ) : (
          <>
            {data?.products.map((product: IProduct, index: number) => (
              <Card key={index} index={index} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MostRecent;
