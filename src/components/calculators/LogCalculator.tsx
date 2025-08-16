import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LogCalculator = () => {
  const [number, setNumber] = useState("");
  const [base, setBase] = useState("10");
  const [customBase, setCustomBase] = useState("");
  const [result, setResult] = useState<{
    value: number;
    calculation: string;
  } | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    
    if (isNaN(num) || num <= 0) {
      alert("Please enter a positive number");
      return;
    }

    let baseNum = 0;
    let calculation = "";
    let value = 0;

    if (base === "custom") {
      baseNum = parseFloat(customBase);
      if (isNaN(baseNum) || baseNum <= 0 || baseNum === 1) {
        alert("Please enter a valid base (positive number ≠ 1)");
        return;
      }
      value = Math.log(num) / Math.log(baseNum);
      calculation = `log₍${baseNum}₎(${num})`;
    } else {
      baseNum = parseFloat(base);
      if (base === "e") {
        value = Math.log(num);
        calculation = `ln(${num})`;
      } else if (base === "2") {
        value = Math.log2(num);
        calculation = `log₂(${num})`;
      } else {
        value = Math.log10(num);
        calculation = `log₁₀(${num})`;
      }
    }

    setResult({
      value,
      calculation
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-math">Logarithm Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="100"
                  type="number"
                  step="any"
                />
              </div>

              <div>
                <Label htmlFor="base">Base</Label>
                <Select value={base} onValueChange={setBase}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 (Common logarithm)</SelectItem>
                    <SelectItem value="e">e (Natural logarithm)</SelectItem>
                    <SelectItem value="2">2 (Binary logarithm)</SelectItem>
                    <SelectItem value="custom">Custom base</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {base === "custom" && (
                <div>
                  <Label htmlFor="customBase">Custom Base</Label>
                  <Input
                    id="customBase"
                    value={customBase}
                    onChange={(e) => setCustomBase(e.target.value)}
                    placeholder="5"
                    type="number"
                    step="any"
                  />
                </div>
              )}

              <Button 
                onClick={calculate}
                className="w-full bg-category-math hover:bg-category-math/80"
              >
                Calculate Logarithm
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Result</h3>
                <div className="space-y-3">
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <div className="text-lg text-muted-foreground mb-2">
                      {result.calculation}
                    </div>
                    <div className="text-3xl font-bold text-category-math">
                      {result.value.toFixed(8)}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">Scientific notation:</div>
                      <div>{result.value.toExponential(6)}</div>
                    </div>
                    
                    {base !== "custom" && (
                      <div className="p-3 bg-muted rounded">
                        <div className="font-semibold">Formula used:</div>
                        <div>
                          {base === "e" && "ln(x) = log_e(x)"}
                          {base === "2" && "log₂(x) = ln(x) / ln(2)"}
                          {base === "10" && "log₁₀(x) = ln(x) / ln(10)"}
                        </div>
                      </div>
                    )}
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

export default LogCalculator;