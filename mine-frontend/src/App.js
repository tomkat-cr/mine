import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useMineFunctions from "./hooks/useMineFunctions";
import useWalletData from "./hooks/useWalletData";
import InternalLayout from "./layouts/internal";
import AboutUs from "./views/about-us";
import AdminDashboard from "./views/admin-dashboard";
import Certifier from "./views/certifier";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Product from "./views/product";
import Products from "./views/products";
import Profile from "./views/profile";



function App() {
  const [user, setUser] = useState('');
  const {active} = useWalletData()
  const {
    guessUserType
  } = useMineFunctions()

  useEffect(() => {
    guessUserType().then(
      type => setUser(type)
    )
  }, [guessUserType])

  if (user === 'admin') {
    return (
      <InternalLayout>
        <Box bg={'gray.50'}>

        
        <Routes>
          <>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/acerca-de-nosotros" element={<AboutUs/>}/>
            <Route path="/bienes" element={<Products/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/" element={<AdminDashboard/>}/>
            <Route path="*" element={<NotFound/>}/>
          </>
        </Routes>
        </Box>
      </InternalLayout>
    )
  }

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
        <Route path="/certifier" element={<Certifier/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </InternalLayout>
  );
}

export default App;
