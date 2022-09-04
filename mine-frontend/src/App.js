import { Route, Routes } from "react-router-dom";
import useWalletData from "./hooks/useWalletData";
import InternalLayout from "./layouts/internal";
import AboutUs from "./views/about-us";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Product from "./views/product";
import Products from "./views/products";
import Profile from "./views/profile";

function App() {
  const {active} = useWalletData()
  return (
    <InternalLayout>
      <Routes>
        {active &&
          <>
            <Route path="/profile" element={<Profile/>}/>
          </>
        }
        <Route path="/acerca-de-nosotros" element={<AboutUs/>}/>
        <Route path="/bienes" element={<Products/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </InternalLayout>
  );
}

export default App;
