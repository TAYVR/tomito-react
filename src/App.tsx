import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WatchMovie from "./pages/WatchMovie";
import WatchTV from "./pages/WatchTV";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import ActorPage from "./pages/ActorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/watch/:id" element={<WatchMovie />} />
          <Route path="/watch-tv/:id" element={<WatchTV />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:type/:genreId" element={<CategoryPage />} />
          <Route path="/actor/:id" element={<ActorPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
