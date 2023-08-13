import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Home/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFromDB, usePage } from "./redux/productSlice";
import { useEffect } from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { getUserByID, resetUser, useUser } from "./redux/userSlice";
import Error404 from "./pages/Error404";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./ProtectedRoute";
import { Button } from "antd";
import { getBasket } from "./redux/basketSlice";
import getUID from "./utilities/getUID";
import Basket from "./pages/Basket/index.jsx";
export const SHOP_NAME = "eCommerce";
function App() {
  const dispatch = useDispatch();
  const page = useSelector(usePage);
  const uid = getUID()

  useEffect(() => {
    let userToken = localStorage.getItem("token");
    if (userToken) {
      dispatch(getUserByID());
    } else {
      dispatch(resetUser());
    }
    init()
  }, []);

  const init = () => {
    dispatch(getProductsFromDB(page));
     dispatch(getBasket({uid}))
  };


  return (
    <div id="App">
      <Navbar />
      { <Routes>
        <Route path="/" element={<Home />} />
        <Route path={import.meta.env.VITE_PAGE_LOGIN} element={<Login />} />
        <Route path={import.meta.env.VITE_PAGE_REGISTER} element={<Register />} />
        <Route path={import.meta.env.VITE_DB_FAVORITE}
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path={import.meta.env.VITE_PAGE_BASKET} element={<Basket/>} />
        <Route path={`${import.meta.env.VITE_PAGE_DETAIL}/:id`} element={<Detail />} />
        <Route path="*" element={<Error404 message={"Sayfa Bulunamadı."} />} />
      </Routes> }
    </div>
  );
}

export default App;
