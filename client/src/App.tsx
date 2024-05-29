import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Products from "./page/ProductsSection";
import CartSection from "./page/CartSection";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/cart" element={<CartSection />} />
        <Route path="*" element={<h3>No Page Found!</h3>} />
      </Routes>
    </>
  );
};

export default App;
