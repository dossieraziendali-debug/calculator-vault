import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Math Calculators
import PercentageCalculator from "./components/calculators/PercentageCalculator";
import FractionCalculator from "./components/calculators/FractionCalculator";
import BinaryCalculator from "./components/calculators/BinaryCalculator";
import QuadraticCalculator from "./components/calculators/QuadraticCalculator";
import LogCalculator from "./components/calculators/LogCalculator";
import RatioCalculator from "./components/calculators/RatioCalculator";

// Financial Calculators
import MortgageCalculator from "./components/calculators/MortgageCalculator";
import LoanCalculator from "./components/calculators/LoanCalculator";
import InterestCalculator from "./components/calculators/InterestCalculator";
import CompoundInterestCalculator from "./components/calculators/CompoundInterestCalculator";
import FinanceCalculator from "./components/calculators/FinanceCalculator";

// Health & Fitness Calculators
import BMICalculator from "./components/calculators/BMICalculator";
import CalorieCalculator from "./components/calculators/CalorieCalculator";

// Other Calculators
import AgeCalculator from "./components/calculators/AgeCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Math Calculators */}
          <Route path="/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/fraction-calculator" element={<FractionCalculator />} />
          <Route path="/binary-calculator" element={<BinaryCalculator />} />
          <Route path="/quadratic-calculator" element={<QuadraticCalculator />} />
          <Route path="/log-calculator" element={<LogCalculator />} />
          <Route path="/ratio-calculator" element={<RatioCalculator />} />
          
          {/* Financial Calculators */}
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/interest-calculator" element={<InterestCalculator />} />
          <Route path="/compound-interest-calculator" element={<CompoundInterestCalculator />} />
          <Route path="/finance-calculator" element={<FinanceCalculator />} />
          
          {/* Health & Fitness Calculators */}
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          
          {/* Other Calculators */}
          <Route path="/age-calculator" element={<AgeCalculator />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
