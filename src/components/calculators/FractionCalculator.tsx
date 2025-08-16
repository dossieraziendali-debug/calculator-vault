import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FractionCalculator = () => {
  const [numerator1, setNumerator1] = useState("");
  const [denominator1, setDenominator1] = useState("");
  const [numerator2, setNumerator2] = useState("");
  const [denominator2, setDenominator2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<{
    numerator: number;
    denominator: number;
    decimal: number;
    mixed?: { whole: number; numerator: number; denominator: number };
  } | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (num: number, den: number) => {
    const divisor = gcd(Math.abs(num), Math.abs(den));
    return {
      numerator: num / divisor,
      denominator: den / divisor
    };
  };

  const toMixedNumber = (num: number, den: number) => {
    const whole = Math.floor(Math.abs(num) / Math.abs(den));
    const remainder = Math.abs(num) % Math.abs(den);
    const sign = num < 0 ? -1 : 1;
    
    if (whole === 0) return null;
    
    return {
      whole: whole * sign,
      numerator: remainder,
      denominator: Math.abs(den)
    };
  };

  const calculate = () => {
    const n1 = parseInt(numerator1);
    const d1 = parseInt(denominator1);
    const n2 = parseInt(numerator2);
    const d2 = parseInt(denominator2);

    if (!n1 || !d1 || !n2 || !d2 || d1 === 0 || d2 === 0) {
      alert("Please enter valid fractions");
      return;
    }

    let resultNum = 0;
    let resultDen = 0;

    switch (operation) {
      case "add":
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case "subtract":
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case "multiply":
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case "divide":
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    const mixed = toMixedNumber(simplified.numerator, simplified.denominator);

    setResult({
      numerator: simplified.numerator,
      denominator: simplified.denominator,
      decimal: simplified.numerator / simplified.denominator,
      mixed: mixed || undefined
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-math">Fraction Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 items-end">
                <div>
                  <Label>First Fraction</Label>
                  <Input
                    value={numerator1}
                    onChange={(e) => setNumerator1(e.target.value)}
                    placeholder="1"
                    type="number"
                  />
                </div>
                <div className="text-center text-2xl">/</div>
                <div>
                  <Label>&nbsp;</Label>
                  <Input
                    value={denominator1}
                    onChange={(e) => setDenominator1(e.target.value)}
                    placeholder="2"
                    type="number"
                  />
                </div>
              </div>

              <div>
                <Label>Operation</Label>
                <Select value={operation} onValueChange={setOperation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">+ Add</SelectItem>
                    <SelectItem value="subtract">- Subtract</SelectItem>
                    <SelectItem value="multiply">× Multiply</SelectItem>
                    <SelectItem value="divide">÷ Divide</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-2 items-end">
                <div>
                  <Label>Second Fraction</Label>
                  <Input
                    value={numerator2}
                    onChange={(e) => setNumerator2(e.target.value)}
                    placeholder="1"
                    type="number"
                  />
                </div>
                <div className="text-center text-2xl">/</div>
                <div>
                  <Label>&nbsp;</Label>
                  <Input
                    value={denominator2}
                    onChange={(e) => setDenominator2(e.target.value)}
                    placeholder="3"
                    type="number"
                  />
                </div>
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-category-math hover:bg-category-math/80"
              >
                Calculate
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Result</h3>
                <div className="space-y-3">
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-category-math mb-2">
                      {result.numerator}/{result.denominator}
                    </div>
                    {result.mixed && (
                      <div className="text-lg">
                        Mixed: {result.mixed.whole} {result.mixed.numerator}/{result.mixed.denominator}
                      </div>
                    )}
                    <div className="text-lg">
                      Decimal: {result.decimal.toFixed(6)}
                    </div>
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

export default FractionCalculator;