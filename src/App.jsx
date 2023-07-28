import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addProductsFromDB, usePage } from "./redux/productSlice";
import { useEffect } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { getUserByToken, resetUser } from "./redux/userSlice";
export const SHOP_NAME = "eCommerce";
function App() {
  const dispatch = useDispatch();
  const page = useSelector(usePage);


  useEffect(() => {
    init();
  }, [page]);

  useEffect(() => {
    let userToken = localStorage.getItem("token");
    if (userToken) {
      dispatch(getUserByToken(userToken))
    } else {
      dispatch(resetUser());
    }
  }, []);

  const init = () => {
    dispatch(addProductsFromDB(page));
    console.log("added products from db.");
  };

  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
