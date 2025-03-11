
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { FavoritesProvider } from "./contexts/FavoritesContext";

// Pages
import Index from "./pages/Index";
import Women from "./pages/Women";
import Men from "./pages/Men";
import WomenJeans from "./pages/WomenJeans";
import WomenDresses from "./pages/WomenDresses";
import WomenKnitwear from "./pages/WomenKnitwear";
import WomenShirts from "./pages/WomenShirts";
import WomenAccessories from "./pages/WomenAccessories";
import MenShirts from "./pages/MenShirts";
import MenJeans from "./pages/MenJeans";
import MenBlazers from "./pages/MenBlazers";
import Collections from "./pages/Collections";
import FeaturedCollections from "./pages/FeaturedCollections";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

// Styles
import "./App.css";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/women" element={<Women />} />
          <Route path="/women/jeans" element={<WomenJeans />} />
          <Route path="/women/dresses" element={<WomenDresses />} />
          <Route path="/women/knitwear" element={<WomenKnitwear />} />
          <Route path="/women/shirts" element={<WomenShirts />} />
          <Route path="/women/accessories" element={<WomenAccessories />} />
          <Route path="/men" element={<Men />} />
          <Route path="/men/shirts" element={<MenShirts />} />
          <Route path="/men/jeans" element={<MenJeans />} />
          <Route path="/men/blazers" element={<MenBlazers />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/featured-collections" element={<FeaturedCollections />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </FavoritesProvider>
  );
}

export default App;
