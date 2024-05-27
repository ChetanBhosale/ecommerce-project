import FilterBar from "./Filter/FilterBar";
import ProductViews from "./products/ProductsView";
const ProductsPage = () => {
  return (
    <>
      <div className="w-full min-h-[90vh] flex relative">
        <FilterBar />
        <ProductViews />
      </div>
    </>
  );
};

export default ProductsPage;
