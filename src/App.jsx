import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar/Navbar";
import { getProducts } from "./api";
import { useDispatch } from "react-redux";
import { addProducts } from "./redux/productSlice";
export const SHOP_NAME = "clothing shop"
function App() {
  
  const dispatch = useDispatch()
  const init = async() => {
    
    dispatch(addProducts(await getProducts()));
  }

  init()
  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;