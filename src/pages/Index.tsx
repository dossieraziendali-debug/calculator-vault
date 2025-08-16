import { useState } from "react";
import Header from "@/components/Header";
import ScientificCalculator from "@/components/ScientificCalculator";
import CategoryGrid from "@/components/CategoryGrid";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import BMICalculator from "@/components/calculators/BMICalculator";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Calculator {
  name: string;
  path: string;
}

const Index = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<Calculator | null>(null);

  const renderCalculator = () => {
    if (!selectedCalculator) return null;

    switch (selectedCalculator.path) {
      case "/mortgage":
        return <MortgageCalculator />;
      case "/bmi":
        return <BMICalculator />;
      case "/percentage":
        return <PercentageCalculator />;
      case "/age":
        return <AgeCalculator />;
      default:
        return (
          <div className="max-w-4xl mx-auto px-6 py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{selectedCalculator.name}</h2>
            <p className="text-muted-foreground">This calculator is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {selectedCalculator ? (
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedCalculator(null)}
              className="mb-6 text-primary hover:text-primary/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Calculators
            </Button>
          </div>
          {renderCalculator()}
        </div>
      ) : (
        <>
          <div className="py-8">
            <ScientificCalculator />
          </div>
          
          <div className="py-8 bg-muted/30">
            <CategoryGrid onCalculatorSelect={setSelectedCalculator} />
          </div>
          
          <footer className="bg-primary text-primary-foreground py-8 text-center">
            <div className="max-w-7xl mx-auto px-6">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-accent hover:bg-accent/80 text-accent-foreground"
              >
                All Calculators
              </Button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;