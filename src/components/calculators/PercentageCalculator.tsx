import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PercentageCalculator = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [results, setResults] = useState<{ [key: string]: number }>({});

  const calculatePercentage = (type: string) => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    const v3 = parseFloat(value3);

    let result = 0;

    switch (type) {
      case "of":
        // What is X% of Y?
        result = (v1 / 100) * v2;
        break;
      case "is":
        // X is what % of Y?
        result = (v1 / v2) * 100;
        break;
      case "change":
        // % change from X to Y
        result = ((v2 - v1) / v1) * 100;
        break;
      case "increase":
        // X increased by Y%
        result = v1 * (1 + v2 / 100);
        break;
      case "decrease":
        // X decreased by Y%
        result = v1 * (1 - v2 / 100);
        break;
    }

    setResults({ ...results, [type]: result });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-math">Percentage Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="of" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="of">X% of Y</TabsTrigger>
              <TabsTrigger value="is">X is Y%</TabsTrigger>
              <TabsTrigger value="change">% Change</TabsTrigger>
              <TabsTrigger value="increase">Increase</TabsTrigger>
              <TabsTrigger value="decrease">Decrease</TabsTrigger>
            </TabsList>

            <TabsContent value="of" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>What is</Label>
                  <Input
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="15"
                    type="number"
                  />
                </div>
                <span className="mt-6">% of</span>
                <div className="flex-1">
                  <Label>&nbsp;</Label>
                  <Input
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="200"
                    type="number"
                  />
                </div>
                <Button 
                  onClick={() => calculatePercentage("of")}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Calculate
                </Button>
              </div>
              {results.of !== undefined && (
                <div className="p-4 bg-muted rounded">
                  <span className="font-semibold text-category-math">
                    Result: {results.of.toFixed(2)}
                  </span>
                </div>
              )}
            </TabsContent>

            <TabsContent value="is" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>&nbsp;</Label>
                  <Input
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="30"
                    type="number"
                  />
                </div>
                <span className="mt-6">is what % of</span>
                <div className="flex-1">
                  <Label>&nbsp;</Label>
                  <Input
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="200"
                    type="number"
                  />
                </div>
                <Button 
                  onClick={() => calculatePercentage("is")}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Calculate
                </Button>
              </div>
              {results.is !== undefined && (
                <div className="p-4 bg-muted rounded">
                  <span className="font-semibold text-category-math">
                    Result: {results.is.toFixed(2)}%
                  </span>
                </div>
              )}
            </TabsContent>

            <TabsContent value="change" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>From</Label>
                  <Input
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="100"
                    type="number"
                  />
                </div>
                <span className="mt-6">to</span>
                <div className="flex-1">
                  <Label>&nbsp;</Label>
                  <Input
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="120"
                    type="number"
                  />
                </div>
                <Button 
                  onClick={() => calculatePercentage("change")}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Calculate
                </Button>
              </div>
              {results.change !== undefined && (
                <div className="p-4 bg-muted rounded">
                  <span className="font-semibold text-category-math">
                    % Change: {results.change.toFixed(2)}%
                  </span>
                </div>
              )}
            </TabsContent>

            <TabsContent value="increase" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>&nbsp;</Label>
                  <Input
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="100"
                    type="number"
                  />
                </div>
                <span className="mt-6">increased by</span>
                <div className="flex-1">
                  <Label>&nbsp;</Label>
                  <Input
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="20"
                    type="number"
                  />
                </div>
                <span className="mt-6">%</span>
                <Button 
                  onClick={() => calculatePercentage("increase")}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Calculate
                </Button>
              </div>
              {results.increase !== undefined && (
                <div className="p-4 bg-muted rounded">
                  <span className="font-semibold text-category-math">
                    Result: {results.increase.toFixed(2)}
                  </span>
                </div>
              )}
            </TabsContent>

            <TabsContent value="decrease" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>&nbsp;</Label>
                  <Input
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="100"
                    type="number"
                  />
                </div>
                <span className="mt-6">decreased by</span>
                <div className="flex-1">
                  <Label>&nbsp;</Label>
                  <Input
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="20"
                    type="number"
                  />
                </div>
                <span className="mt-6">%</span>
                <Button 
                  onClick={() => calculatePercentage("decrease")}
                  className="mt-6 bg-category-math hover:bg-category-math/80"
                >
                  Calculate
                </Button>
              </div>
              {results.decrease !== undefined && (
                <div className="p-4 bg-muted rounded">
                  <span className="font-semibold text-category-math">
                    Result: {results.decrease.toFixed(2)}
                  </span>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PercentageCalculator;