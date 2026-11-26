import { BrowserRouter, Outlet, Route, Routes, useParams } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import Donate from "./pages/donate/Donate";
import Donkey from "./pages/donkey/Donkey";
import Hope from "./pages/hope/Hope";
import Home from "./pages/home/Home";
import Journey from "./pages/journey/Journey";
import NotFound from "./pages/not-found/NotFound";
import Video from "./pages/video/Video";
import WalkWithUs from "./pages/walk/WalkWithUs";
import { SUPPORTED_LANGUAGES } from "./routing/paths";

function LocalizedRoutes() {
  const { locale } = useParams();

  if (!SUPPORTED_LANGUAGES.includes(locale)) {
    return <NotFound />;
  }

  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="journey" element={<Journey />} />
          <Route path="donkey" element={<Donkey />} />
          <Route path="walk-with-us" element={<WalkWithUs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="stories" element={<Blog />} />
          <Route path="video" element={<Video />} />
          <Route path="videos" element={<Video />} />
          <Route path="hope" element={<Hope />} />
          <Route path="donate" element={<Donate />} />
          <Route path="about" element={<About />} />

          <Route path=":locale" element={<LocalizedRoutes />}>
            <Route index element={<Home />} />
            <Route path="journey" element={<Journey />} />
            <Route path="donkey" element={<Donkey />} />
            <Route path="walk-with-us" element={<WalkWithUs />} />
            <Route path="blog" element={<Blog />} />
            <Route path="stories" element={<Blog />} />
            <Route path="video" element={<Video />} />
            <Route path="videos" element={<Video />} />
            <Route path="hope" element={<Hope />} />
            <Route path="donate" element={<Donate />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
