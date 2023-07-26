import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector} from "react-redux";
import { addProductsFromDB, usePage} from "./redux/productSlice";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { useEffect } from "react";
export const SHOP_NAME = "eCommerce";
function App() {
  const dispatch = useDispatch();
  const page = useSelector(usePage)
  useEffect(() => {
    init();
  }, [page]); 

  const init = () => {
    dispatch(addProductsFromDB(page));
    console.log("added products from db.");
  };

  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
