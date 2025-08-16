import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compound, setCompound] = useState("12");
  const [contribution, setContribution] = useState("");
  const [contributionFreq, setContributionFreq] = useState("12");
  const [result, setResult] = useState<{
    finalAmount: number;
    totalInterest: number;
    totalContributions: number;
    yearlyBreakdown: Array<{
      year: number;
      startBalance: number;
      contributions: number;
      interest: number;
      endBalance: number;
    }>;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compound);
    const pmt = parseFloat(contribution) || 0;
    const pmtFreq = parseFloat(contributionFreq);

    if (!r || !t) {
      alert("Please enter interest rate and time period");
      return;
    }

    let balance = p;
    const yearlyBreakdown = [];
    const periodsPerYear = n;
    const contributionPerPeriod = pmt / (pmtFreq / periodsPerYear);
    let totalContributions = p;

    for (let year = 1; year <= t; year++) {
      const startBalance = balance;
      let yearlyContributions = 0;
      let yearlyInterest = 0;

      for (let period = 1; period <= periodsPerYear; period++) {
        // Add contribution
        if (contributionPerPeriod > 0) {
          balance += contributionPerPeriod;
          yearlyContributions += contributionPerPeriod;
          totalContributions += contributionPerPeriod;
        }

        // Calculate interest for this period
        const periodInterest = balance * (r / n);
        balance += periodInterest;
        yearlyInterest += periodInterest;
      }

      yearlyBreakdown.push({
        year,
        startBalance,
        contributions: yearlyContributions,
        interest: yearlyInterest,
        endBalance: balance
      });
    }

    const totalInterest = balance - totalContributions;

    setResult({
      finalAmount: balance,
      totalInterest,
      totalContributions,
      yearlyBreakdown
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-financial">Compound Interest Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="principal">Initial Principal ($)</Label>
                <Input
                  id="principal"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="10000"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input
                  id="rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="7"
                  type="number"
                  step="0.01"
                />
              </div>

              <div>
                <Label htmlFor="time">Time Period (years)</Label>
                <Input
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="10"
                  type="number"
                  step="0.1"
                />
              </div>

              <div>
                <Label htmlFor="compound">Compound Frequency</Label>
                <Select value={compound} onValueChange={setCompound}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semi-annually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="52">Weekly</SelectItem>
                    <SelectItem value="365">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contribution">Regular Contribution ($)</Label>
                <Input
                  id="contribution"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  placeholder="500"
                  type="number"
                />
              </div>

              <div>
                <Label htmlFor="contributionFreq">Contribution Frequency</Label>
                <Select value={contributionFreq} onValueChange={setContributionFreq}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="52">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-category-financial hover:bg-category-financial/80"
              >
                Calculate
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Summary</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Final Amount</div>
                    <div className="font-semibold text-category-financial text-xl">
                      ${result.finalAmount.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Total Interest Earned</div>
                    <div className="font-semibold text-lg">
                      ${result.totalInterest.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Total Contributions</div>
                    <div className="font-semibold">
                      ${result.totalContributions.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {result && result.yearlyBreakdown.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Yearly Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-2 text-left">Year</th>
                      <th className="border border-border p-2 text-left">Start Balance</th>
                      <th className="border border-border p-2 text-left">Contributions</th>
                      <th className="border border-border p-2 text-left">Interest</th>
                      <th className="border border-border p-2 text-left">End Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.map((year) => (
                      <tr key={year.year}>
                        <td className="border border-border p-2">{year.year}</td>
                        <td className="border border-border p-2">
                          ${year.startBalance.toFixed(2)}
                        </td>
                        <td className="border border-border p-2 text-category-financial">
                          ${year.contributions.toFixed(2)}
                        </td>
                        <td className="border border-border p-2">
                          ${year.interest.toFixed(2)}
                        </td>
                        <td className="border border-border p-2 font-semibold">
                          ${year.endBalance.toFixed(2)}
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

export default CompoundInterestCalculator;