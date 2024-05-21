import { Route, Routes } from "react-router";
import MainHeader from "./components/MainHeader";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHeader />} />
      </Routes>
    </>
  );
};

export default App;
