import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useMineFunctions from "./hooks/useMineFunctions";
import useWalletData from "./hooks/useWalletData";
import InternalLayout from "./layouts/internal";
import AboutUs from "./views/about-us";
import AdminDashboard from "./views/admin-dashboard";
import CertifierRegistration from "./views/certifier/certifier-registration";
import ProfileCertifier from "./views/certifier/profile";
import Home from "./views/home";
import NotFound from "./views/not-found";
import Product from "./views/product";
import ProductRegistration from "./views/product/register";
import Products from "./views/products";
import Profile from "./views/profile";
import ProfileUser from "./views/user/profile";
import UserRegistration from "./views/user/user-registration";


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

  if (user === 'certifier') {
    return (
      <InternalLayout>
        <Box bg={'gray.50'}>
      
        <Routes>
          <>
            <Route path="/profile" element={<ProfileCertifier/>}/>
            <Route path="/acerca-de-nosotros" element={<AboutUs/>}/>
            <Route path="/bienes" element={<Products/>}/>
            <Route path="/product/:tokenId" element={<Product/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </>
        </Routes>
        </Box>
      </InternalLayout>
    )
  }

  if (user === 'admin') {
    return (
      <InternalLayout>
        <Box bg={'gray.50'}>

        
        <Routes>
          <>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/acerca-de-nosotros" element={<AboutUs/>}/>
            <Route path="/bienes" element={<Products/>}/>
            <Route path="/product/:tokenId" element={<Product/>}/>
            <Route path="/" element={<AdminDashboard/>}/>
            <Route path="*" element={<NotFound/>}/>
          </>
        </Routes>
        </Box>
      </InternalLayout>
    )
  }

  if (user === 'user') {
    return (
      <InternalLayout>
        <Box bg={'gray.50'}>
        <Routes>
          <>
            <Route path="/profile" element={<ProfileUser/>}/>
            <Route path="/acerca-de-nosotros" element={<AboutUs/>}/>
            <Route path="/bienes" element={<Products/>}/>
            <Route path="/bienes/registrar/" element={<ProductRegistration/>}/>
            <Route path="/product/:tokenId" element={<Product/>}/>
            <Route path="/" element={<Home/>}/>
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
        <Route path="/certifier" element={<CertifierRegistration/>}/>
        <Route path="/user" element={<UserRegistration/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </InternalLayout>
  );
}

export default App;
