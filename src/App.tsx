import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { LanguageProvider } from "@/lib/i18n";
import { PageTransition } from "@/components/site/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import Join from "./pages/Join";
import Terms from "./pages/Terms";
import ListingDetail from "./pages/ListingDetail";
import PropertyBrief from "./pages/PropertyBrief";
import Homes from "./pages/Homes";
import NewHomes from "./pages/NewHomes";
import NewHomeDetail from "./pages/NewHomeDetail";
import Calculator from "./pages/Calculator";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import Story from "./pages/Story";
import Markets from "./pages/Markets";
import MarketDetail from "./pages/MarketDetail";
import Compare from "./pages/Compare";
import RentVsBuy from "./pages/RentVsBuy";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminListings from "./pages/admin/AdminListings";
import AdminListingNew from "./pages/admin/AdminListingNew";
import AdminListingEdit from "./pages/admin/AdminListingEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/homes" element={<Homes />} />
                <Route path="/new-homes" element={<NewHomes />} />
                <Route path="/new-homes/:slug" element={<NewHomeDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/rent-vs-buy" element={<RentVsBuy />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/stories/:slug" element={<Story />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/markets/:slug" element={<MarketDetail />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/support" element={<Support />} />
                <Route path="/join" element={<Join />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/listing/:id" element={<ListingDetail />} />
                <Route path="/listing/:id/brief" element={<PropertyBrief />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route
                    index
                    element={<Navigate to="/admin/listings" replace />}
                  />
                  <Route path="listings" element={<AdminListings />} />
                  <Route path="listings/new" element={<AdminListingNew />} />
                  <Route
                    path="listings/:id/edit"
                    element={<AdminListingEdit />}
                  />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
