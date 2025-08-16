import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("");
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const term = parseFloat(loanTerm);
    const rate = parseFloat(interestRate) / 100 / 12;

    const loanAmount = price - down;
    const numberOfPayments = term * 12;

    const monthlyPayment = (loanAmount * (rate * Math.pow(1 + rate, numberOfPayments))) / 
                          (Math.pow(1 + rate, numberOfPayments) - 1);

    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;

    setResults({
      monthlyPayment,
      totalInterest,
      totalAmount: totalAmount + down
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-financial">Mortgage Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="homePrice">Home Price ($)</Label>
                <Input
                  id="homePrice"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                  placeholder="500000"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <Input
                  id="downPayment"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="100000"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="30"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="3.5"
                  type="number"
                  step="0.01"
                />
              </div>

              <Button 
                onClick={calculateMortgage}
                className="w-full bg-category-financial hover:bg-category-financial/80"
              >
                Calculate Mortgage
              </Button>
            </div>

            {results && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold text-category-financial">
                      ${results.monthlyPayment.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span>Total Interest:</span>
                    <span className="font-semibold">
                      ${results.totalInterest.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span>Total Amount:</span>
                    <span className="font-semibold">
                      ${results.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MortgageCalculator;