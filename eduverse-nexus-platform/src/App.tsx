
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Academics from "./pages/features/Academics";
import Token from "./pages/features/Token";
import Identity from "./pages/features/Identity";
import Learning from "./pages/features/Learning";
import DAOGovernance from "./pages/DAOGovernance";
import Alumni from "./pages/Alumni";
import About from "./pages/About";
import { TokenProvider } from "./context/TokenContext";
import TestingPanel from "./components/TestingPanel";

// Create a query client for React Query
const queryClient = new QueryClient();

const App = () => {
  // Determine if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TokenProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/features/academics" element={<Academics />} />
              <Route path="/features/token" element={<Token />} />
              <Route path="/features/identity" element={<Identity />} />
              <Route path="/features/learning" element={<Learning />} />
              <Route path="/dao" element={<DAOGovernance />} />
              <Route path="/alumni" element={<Alumni />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          
          {/* Show testing panel in development mode */}
          {isDevelopment && <TestingPanel />}
        </TokenProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
