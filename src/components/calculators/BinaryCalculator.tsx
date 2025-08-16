import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BinaryCalculator = () => {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [base1, setBase1] = useState("10");
  const [base2, setBase2] = useState("10");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<{
    binary: string;
    decimal: string;
    octal: string;
    hexadecimal: string;
  } | null>(null);

  const convertToDecimal = (num: string, base: string) => {
    return parseInt(num, parseInt(base));
  };

  const convertFromDecimal = (num: number, base: number) => {
    return num.toString(base).toUpperCase();
  };

  const isValidNumber = (num: string, base: string) => {
    const baseNum = parseInt(base);
    const validChars = "0123456789ABCDEF".slice(0, baseNum);
    return num.split('').every(char => validChars.includes(char.toUpperCase()));
  };

  const calculate = () => {
    if (!number1 || !number2) {
      alert("Please enter both numbers");
      return;
    }

    if (!isValidNumber(number1, base1) || !isValidNumber(number2, base2)) {
      alert("Invalid number for the selected base");
      return;
    }

    const decimal1 = convertToDecimal(number1, base1);
    const decimal2 = convertToDecimal(number2, base2);

    let resultDecimal = 0;

    switch (operation) {
      case "add":
        resultDecimal = decimal1 + decimal2;
        break;
      case "subtract":
        resultDecimal = decimal1 - decimal2;
        break;
      case "multiply":
        resultDecimal = decimal1 * decimal2;
        break;
      case "divide":
        if (decimal2 === 0) {
          alert("Cannot divide by zero");
          return;
        }
        resultDecimal = Math.floor(decimal1 / decimal2);
        break;
    }

    setResult({
      binary: convertFromDecimal(resultDecimal, 2),
      decimal: convertFromDecimal(resultDecimal, 10),
      octal: convertFromDecimal(resultDecimal, 8),
      hexadecimal: convertFromDecimal(resultDecimal, 16)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-math">Binary Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>First Number</Label>
                  <Input
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value.toUpperCase())}
                    placeholder="101"
                  />
                </div>
                <div>
                  <Label>Base</Label>
                  <Select value={base1} onValueChange={setBase1}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                    </SelectContent>
                  </Select>
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

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Second Number</Label>
                  <Input
                    value={number2}
                    onChange={(e) => setNumber2(e.target.value.toUpperCase())}
                    placeholder="11"
                  />
                </div>
                <div>
                  <Label>Base</Label>
                  <Select value={base2} onValueChange={setBase2}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Binary (Base 2)</div>
                    <div className="font-semibold text-category-math">{result.binary}</div>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Decimal (Base 10)</div>
                    <div className="font-semibold text-category-math">{result.decimal}</div>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Octal (Base 8)</div>
                    <div className="font-semibold text-category-math">{result.octal}</div>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Hexadecimal (Base 16)</div>
                    <div className="font-semibold text-category-math">{result.hexadecimal}</div>
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

export default BinaryCalculator;