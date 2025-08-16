import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const QuadraticCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<{
    discriminant: number;
    x1: number | string;
    x2: number | string;
    vertex: { x: number; y: number };
    axisOfSymmetry: number;
  } | null>(null);

  const calculate = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      alert("Please enter valid numbers");
      return;
    }

    if (aNum === 0) {
      alert("Coefficient 'a' cannot be zero for a quadratic equation");
      return;
    }

    const discriminant = bNum * bNum - 4 * aNum * cNum;

    let x1: number | string;
    let x2: number | string;

    if (discriminant > 0) {
      x1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
      x2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);
    } else if (discriminant === 0) {
      x1 = x2 = -bNum / (2 * aNum);
    } else {
      const realPart = -bNum / (2 * aNum);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * aNum);
      x1 = `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`;
      x2 = `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`;
    }

    const vertexX = -bNum / (2 * aNum);
    const vertexY = aNum * vertexX * vertexX + bNum * vertexX + cNum;

    setResult({
      discriminant,
      x1,
      x2,
      vertex: { x: vertexX, y: vertexY },
      axisOfSymmetry: vertexX
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-math">Quadratic Formula Calculator</CardTitle>
          <p className="text-muted-foreground">
            Solve quadratic equations of the form ax² + bx + c = 0
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-center text-lg mb-4">
                <span className="bg-muted px-4 py-2 rounded">
                  ax² + bx + c = 0
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="a">Coefficient a</Label>
                  <Input
                    id="a"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    placeholder="1"
                    type="number"
                    step="any"
                  />
                </div>
                <div>
                  <Label htmlFor="b">Coefficient b</Label>
                  <Input
                    id="b"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    placeholder="-5"
                    type="number"
                    step="any"
                  />
                </div>
                <div>
                  <Label htmlFor="c">Coefficient c</Label>
                  <Input
                    id="c"
                    value={c}
                    onChange={(e) => setC(e.target.value)}
                    placeholder="6"
                    type="number"
                    step="any"
                  />
                </div>
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-category-math hover:bg-category-math/80"
              >
                Solve Equation
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Solution</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Discriminant</div>
                    <div className="font-semibold text-category-math">
                      Δ = {result.discriminant.toFixed(4)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {result.discriminant > 0 ? "Two real solutions" : 
                       result.discriminant === 0 ? "One real solution" : 
                       "Two complex solutions"}
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Solutions</div>
                    <div className="font-semibold text-category-math">
                      x₁ = {typeof result.x1 === 'number' ? result.x1.toFixed(4) : result.x1}
                    </div>
                    <div className="font-semibold text-category-math">
                      x₂ = {typeof result.x2 === 'number' ? result.x2.toFixed(4) : result.x2}
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Vertex</div>
                    <div className="font-semibold text-category-math">
                      ({result.vertex.x.toFixed(4)}, {result.vertex.y.toFixed(4)})
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Axis of Symmetry</div>
                    <div className="font-semibold text-category-math">
                      x = {result.axisOfSymmetry.toFixed(4)}
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

export default QuadraticCalculator;