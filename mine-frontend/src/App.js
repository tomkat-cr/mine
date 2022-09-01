import { Route, Routes } from "react-router-dom";
import InternalLayout from "./layouts/internal";
import AboutUs from "./views/about-us";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Product from "./views/product";
import Products from "./views/products";
import Profile from "./views/profile";

function App() {
  return (
    <InternalLayout>
      <Routes>
        <Route path="/acerca-de-nosotros" element={<AboutUs/>}/>
        <Route path="/bienes" element={<Products/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </InternalLayout>
  );
}

export default App;
