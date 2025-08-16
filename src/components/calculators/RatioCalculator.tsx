import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RatioCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [ratio1, setRatio1] = useState("");
  const [ratio2, setRatio2] = useState("");
  const [total, setTotal] = useState("");
  const [results, setResults] = useState<{ [key: string]: any }>({});

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyRatio = (num1: number, num2: number) => {
    const divisor = gcd(num1, num2);
    return {
      first: num1 / divisor,
      second: num2 / divisor,
      decimal: num1 / num2
    };
  };

  const calculateSimplify = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);

    if (isNaN(aNum) || isNaN(bNum) || bNum === 0) {
      alert("Please enter valid numbers");
      return;
    }

    const simplified = simplifyRatio(aNum, bNum);
    setResults({
      ...results,
      simplify: simplified
    });
  };

  const calculateProportion = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || bNum === 0) {
      alert("Please enter valid numbers");
      return;
    }

    const x = (aNum * cNum) / bNum;
    setResults({
      ...results,
      proportion: { x, equation: `${a}:${b} = ${c}:${x.toFixed(2)}` }
    });
  };

  const calculateEquivalent = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);
    const dNum = parseFloat(d);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || isNaN(dNum) || bNum === 0 || dNum === 0) {
      alert("Please enter valid numbers");
      return;
    }

    const isEquivalent = (aNum / bNum) === (cNum / dNum);
    const crossProduct1 = aNum * dNum;
    const crossProduct2 = bNum * cNum;

    setResults({
      ...results,
      equivalent: {
        isEquivalent,
        ratio1: `${a}:${b}`,
        ratio2: `${c}:${d}`,
        crossProduct1,
        crossProduct2
      }
    });
  };

  const calculateDistribute = () => {
    const ratio1Num = parseFloat(ratio1);
    const ratio2Num = parseFloat(ratio2);
    const totalNum = parseFloat(total);

    if (isNaN(ratio1Num) || isNaN(ratio2Num) || isNaN(totalNum)) {
      alert("Please enter valid numbers");
      return;
    }

    const sum = ratio1Num + ratio2Num;
    const part1 = (ratio1Num / sum) * totalNum;
    const part2 = (ratio2Num / sum) * totalNum;

    setResults({
      ...results,
      distribute: {
        ratio: `${ratio1}:${ratio2}`,
        total: totalNum,
        part1,
        part2
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-math">Ratio Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="simplify" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="simplify">Simplify</TabsTrigger>
              <TabsTrigger value="proportion">Proportion</TabsTrigger>
              <TabsTrigger value="equivalent">Equivalent</TabsTrigger>
              <TabsTrigger value="distribute">Distribute</TabsTrigger>
            </TabsList>

            <TabsContent value="simplify" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>First Number</Label>
                  <Input
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="12"
                    type="number"
                  />
                </div>
                <span className="mt-6">:</span>
                <div className="flex-1">
                  <Label>Second Number</Label>
                  <Input
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    placeholder="8"
                    type="number"
                  />
                </div>
                <Button 
                  onClick={calculateSimplify}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Simplify
                </Button>
              </div>
              {results.simplify && (
                <div className="p-4 bg-muted rounded">
                  <div className="font-semibold text-category-math">
                    Simplified ratio: {results.simplify.first}:{results.simplify.second}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Decimal: {results.simplify.decimal.toFixed(4)}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="proportion" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>A</Label>
                  <Input
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="2"
                    type="number"
                  />
                </div>
                <span className="mt-6">:</span>
                <div className="flex-1">
                  <Label>B</Label>
                  <Input
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    placeholder="3"
                    type="number"
                  />
                </div>
                <span className="mt-6">=</span>
                <div className="flex-1">
                  <Label>C</Label>
                  <Input
                    value={c}
                    onChange={(e) => setC(e.target.value)}
                    placeholder="4"
                    type="number"
                  />
                </div>
                <span className="mt-6">: X</span>
                <Button 
                  onClick={calculateProportion}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Find X
                </Button>
              </div>
              {results.proportion && (
                <div className="p-4 bg-muted rounded">
                  <div className="font-semibold text-category-math">
                    X = {results.proportion.x.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {results.proportion.equation}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="equivalent" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>A</Label>
                  <Input
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="2"
                    type="number"
                  />
                </div>
                <span className="mt-6">:</span>
                <div className="flex-1">
                  <Label>B</Label>
                  <Input
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    placeholder="3"
                    type="number"
                  />
                </div>
                <span className="mt-6">=</span>
                <div className="flex-1">
                  <Label>C</Label>
                  <Input
                    value={c}
                    onChange={(e) => setC(e.target.value)}
                    placeholder="4"
                    type="number"
                  />
                </div>
                <span className="mt-6">:</span>
                <div className="flex-1">
                  <Label>D</Label>
                  <Input
                    value={d}
                    onChange={(e) => setD(e.target.value)}
                    placeholder="6"
                    type="number"
                  />
                </div>
                <Button 
                  onClick={calculateEquivalent}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Check
                </Button>
              </div>
              {results.equivalent && (
                <div className="p-4 bg-muted rounded">
                  <div className="font-semibold text-category-math mb-2">
                    {results.equivalent.ratio1} {results.equivalent.isEquivalent ? "=" : "≠"} {results.equivalent.ratio2}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cross products: {results.equivalent.crossProduct1} and {results.equivalent.crossProduct2}
                  </div>
                  <div className="text-sm">
                    {results.equivalent.isEquivalent ? "Ratios are equivalent" : "Ratios are not equivalent"}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="distribute" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>Ratio Part 1</Label>
                  <Input
                    value={ratio1}
                    onChange={(e) => setRatio1(e.target.value)}
                    placeholder="3"
                    type="number"
                  />
                </div>
                <span className="mt-6">:</span>
                <div className="flex-1">
                  <Label>Ratio Part 2</Label>
                  <Input
                    value={ratio2}
                    onChange={(e) => setRatio2(e.target.value)}
                    placeholder="5"
                    type="number"
                  />
                </div>
                <span className="mt-6">of</span>
                <div className="flex-1">
                  <Label>Total</Label>
                  <Input
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    placeholder="80"
                    type="number"
                  />
                </div>
                <Button 
                  onClick={calculateDistribute}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Distribute
                </Button>
              </div>
              {results.distribute && (
                <div className="p-4 bg-muted rounded">
                  <div className="font-semibold text-category-math mb-2">
                    Distributing {results.distribute.total} in ratio {results.distribute.ratio}
                  </div>
                  <div>Part 1: {results.distribute.part1.toFixed(2)}</div>
                  <div>Part 2: {results.distribute.part2.toFixed(2)}</div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatioCalculator;