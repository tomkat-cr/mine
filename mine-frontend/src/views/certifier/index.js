import { Route, Routes } from "react-router-dom";
import CertifierRegistration from "./certifier-registration";


function Certifier() {

  return (
      <Routes>
        <Route path="/" element={<CertifierRegistration/>}/>
      </Routes>
  );
}

export default Certifier;
