import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="container" style={{ minHeight: 'calc(100vh - 140px)', paddingTop: '70px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;