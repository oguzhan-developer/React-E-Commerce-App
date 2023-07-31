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
import { getUserByToken, resetUser, useUser } from "./redux/userSlice";
import Error404 from "./pages/Error404";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./ProtectedRoute";
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
      dispatch(getUserByToken(userToken));
    } else {
      dispatch(resetUser());
    }
  }, []);

  const init = () => {
    dispatch(addProductsFromDB(page));
  };

  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/uyeol" element={<Register />} />
        <Route path="/favoriler"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="detay/:id" element={<Detail />} />
        <Route path="*" element={<Error404 message={"Sayfa Bulunamadı."} />} />
      </Routes>
    </div>
  );
}

export default App;
