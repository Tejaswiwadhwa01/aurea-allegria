
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { CartProvider } from '@/contexts/CartContext';

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
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Orders from "@/pages/Orders";
import OrderConfirmation from "@/pages/OrderConfirmation";

// Styles
import "./App.css";

const App = () => {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
