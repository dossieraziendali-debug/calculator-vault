import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compoundFreq, setCompoundFreq] = useState("12");
  const [results, setResults] = useState<{
    simple: { interest: number; total: number };
    compound: { interest: number; total: number };
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFreq);

    if (!p || !r || !t) {
      alert("Please fill in all fields");
      return;
    }

    // Simple Interest: I = PRT
    const simpleInterest = p * r * t;
    const simpleTotal = p + simpleInterest;

    // Compound Interest: A = P(1 + r/n)^(nt)
    const compoundTotal = p * Math.pow(1 + r / n, n * t);
    const compoundInterest = compoundTotal - p;

    setResults({
      simple: { interest: simpleInterest, total: simpleTotal },
      compound: { interest: compoundInterest, total: compoundTotal }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-financial">Interest Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="principal">Principal Amount ($)</Label>
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
                  placeholder="5"
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
                  placeholder="5"
                  type="number"
                  step="0.1"
                />
              </div>

              <div>
                <Label htmlFor="compound">Compound Frequency (per year)</Label>
                <Select value={compoundFreq} onValueChange={setCompoundFreq}>
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

              <Button 
                onClick={calculate}
                className="w-full bg-category-financial hover:bg-category-financial/80"
              >
                Calculate Interest
              </Button>
            </div>

            {results && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Results</h3>
                <Tabs defaultValue="simple" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="simple">Simple Interest</TabsTrigger>
                    <TabsTrigger value="compound">Compound Interest</TabsTrigger>
                  </TabsList>

                  <TabsContent value="simple" className="space-y-3">
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Interest Earned</div>
                      <div className="font-semibold text-category-financial text-lg">
                        ${results.simple.interest.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="font-semibold text-lg">
                        ${results.simple.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Formula: I = P × R × T
                    </div>
                  </TabsContent>

                  <TabsContent value="compound" className="space-y-3">
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Interest Earned</div>
                      <div className="font-semibold text-category-financial text-lg">
                        ${results.compound.interest.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="font-semibold text-lg">
                        ${results.compound.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Formula: A = P(1 + r/n)^(nt)
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterestCalculator;