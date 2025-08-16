import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [termUnit, setTermUnit] = useState("years");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
    schedule: Array<{
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }>;
  } | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = termUnit === "years" ? parseFloat(loanTerm) * 12 : parseFloat(loanTerm);

    if (!principal || !rate || !term) {
      alert("Please fill in all fields");
      return;
    }

    const monthlyPayment = (principal * (rate * Math.pow(1 + rate, term))) / 
                          (Math.pow(1 + rate, term) - 1);

    const totalAmount = monthlyPayment * term;
    const totalInterest = totalAmount - principal;

    // Calculate amortization schedule (first 12 payments)
    const schedule = [];
    let balance = principal;

    for (let i = 1; i <= Math.min(12, term); i++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        payment: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance
      });
    }

    setResult({
      monthlyPayment,
      totalInterest,
      totalAmount,
      schedule
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-financial">Loan Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="250000"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="4.5"
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="loanTerm">Loan Term</Label>
                  <Input
                    id="loanTerm"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    placeholder="30"
                    type="number"
                  />
                </div>
                <div>
                  <Label>&nbsp;</Label>
                  <Select value={termUnit} onValueChange={setTermUnit}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="years">Years</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={calculateLoan}
                className="w-full bg-category-financial hover:bg-category-financial/80"
              >
                Calculate Loan
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Loan Summary</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="font-semibold text-category-financial text-xl">
                      ${result.monthlyPayment.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Total Interest</div>
                    <div className="font-semibold">
                      ${result.totalInterest.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                    <div className="font-semibold">
                      ${result.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {result && result.schedule.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Payment Schedule (First 12 Months)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-2 text-left">Payment #</th>
                      <th className="border border-border p-2 text-left">Principal</th>
                      <th className="border border-border p-2 text-left">Interest</th>
                      <th className="border border-border p-2 text-left">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((payment) => (
                      <tr key={payment.payment}>
                        <td className="border border-border p-2">{payment.payment}</td>
                        <td className="border border-border p-2 text-category-financial">
                          ${payment.principal.toFixed(2)}
                        </td>
                        <td className="border border-border p-2">
                          ${payment.interest.toFixed(2)}
                        </td>
                        <td className="border border-border p-2">
                          ${payment.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanCalculator;