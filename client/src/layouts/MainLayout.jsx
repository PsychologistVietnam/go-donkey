import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useEffect } from "react";



function MainLayout() {
  const { pathname } = useLocation();
   useEffect(() => {
    // Scroll to the top of the page when the pathname changes
    window.scrollTo(0, 0);
   }, [pathname]);
  return (
    <>
      <Header key={pathname} />
      <main className="main-layout__main" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
