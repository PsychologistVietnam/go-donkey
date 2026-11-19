import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

function MainLayout() {
  const { pathname } = useLocation();

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
