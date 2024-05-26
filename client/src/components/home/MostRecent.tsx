import { IProduct, useGetProductsQuery } from "../../store/api/userProduct";

const MostRecent = () => {
  const { data, isLoading } = useGetProductsQuery({
    order: "asc",
  });

  return (
    <div className="w-full">
      <h2 className=" pl-12 pt-4 text-2xl font-head font-bold mb-4">
        Newly Lauched
      </h2>
      <div className="max-w-full h-56 overflow-x-hidden flex px-6 gap-2">
        {isLoading ? (
          <div>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex flex-col gap-4 w-72 h-full">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-8 w-28"></div>
                  <div className="skeleton h-8 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              ))}
          </div>
        ) : (
          <>
            {data.products.map((ele: IProduct, index: number) => (
              <div key={index} className="w-full bg-green-400">
                {ele.images.length === 0 ? (
                  <>
                    <img src="" alt="" />
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MostRecent;
