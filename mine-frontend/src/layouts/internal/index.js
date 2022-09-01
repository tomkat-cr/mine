import Footer from "./footer";
import NavBar from "./nav-bar";

function InternalLayout({children}) {
    return (
        <>
            <NavBar/>
            {children}
            <Footer/>
        </>
    )
}

export default InternalLayout