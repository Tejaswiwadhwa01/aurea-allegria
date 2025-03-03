
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Women from "./pages/Women";
import WomenShirts from "./pages/WomenShirts";
import WomenDresses from "./pages/WomenDresses";
import WomenJeans from "./pages/WomenJeans";
import WomenKnitwear from "./pages/WomenKnitwear";
import WomenAccessories from "./pages/WomenAccessories";
import Men from "./pages/Men";
import MenShirts from "./pages/MenShirts";
import MenJeans from "./pages/MenJeans";
import MenBlazers from "./pages/MenBlazers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/women" element={<Women />} />
          <Route path="/women/shirts" element={<WomenShirts />} />
          <Route path="/women/dresses" element={<WomenDresses />} />
          <Route path="/women/jeans" element={<WomenJeans />} />
          <Route path="/women/knitwear" element={<WomenKnitwear />} />
          <Route path="/women/accessories" element={<WomenAccessories />} />
          <Route path="/men" element={<Men />} />
          <Route path="/men/shirts" element={<MenShirts />} />
          <Route path="/men/jeans" element={<MenJeans />} />
          <Route path="/men/blazers" element={<MenBlazers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
