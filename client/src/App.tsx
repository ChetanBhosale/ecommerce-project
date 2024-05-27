import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Products from "./page/ProductsSection";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
