import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FinanceCalculator = () => {
  const [n, setN] = useState(""); // number of periods
  const [iy, setIY] = useState(""); // interest per year
  const [pv, setPV] = useState(""); // present value
  const [pmt, setPMT] = useState(""); // periodic payment
  const [fv, setFV] = useState(""); // future value
  const [py, setPY] = useState("12"); // periods per year
  const [cy, setCY] = useState("12"); // compounding periods per year
  const [pmtTime, setPmtTime] = useState("end"); // payment timing
  const [calculate, setCalculate] = useState("FV");
  const [result, setResult] = useState<number | null>(null);

  const calculateValue = () => {
    const periods = parseFloat(n);
    const interestRate = parseFloat(iy) / 100;
    const periodsPerYear = parseFloat(py);
    const compoundPerYear = parseFloat(cy);
    const presentValue = parseFloat(pv) || 0;
    const payment = parseFloat(pmt) || 0;
    const futureValue = parseFloat(fv) || 0;

    // Convert annual rate to period rate
    const periodRate = interestRate / periodsPerYear;
    
    let calculatedValue = 0;

    switch (calculate) {
      case "FV": // Future Value
        if (payment === 0) {
          // Simple compound interest
          calculatedValue = presentValue * Math.pow(1 + periodRate, periods);
        } else {
          // Annuity calculation
          const pvAnnuity = payment * ((1 - Math.pow(1 + periodRate, -periods)) / periodRate);
          const fvFromPV = presentValue * Math.pow(1 + periodRate, periods);
          const fvFromPMT = payment * ((Math.pow(1 + periodRate, periods) - 1) / periodRate);
          calculatedValue = fvFromPV + fvFromPMT;
        }
        break;
        
      case "PV": // Present Value
        if (payment === 0) {
          calculatedValue = futureValue / Math.pow(1 + periodRate, periods);
        } else {
          const pvFromFV = futureValue / Math.pow(1 + periodRate, periods);
          const pvFromPMT = payment * ((1 - Math.pow(1 + periodRate, -periods)) / periodRate);
          calculatedValue = pvFromFV - pvFromPMT;
        }
        break;
        
      case "PMT": // Payment
        if (presentValue === 0 && futureValue !== 0) {
          calculatedValue = futureValue / ((Math.pow(1 + periodRate, periods) - 1) / periodRate);
        } else if (futureValue === 0 && presentValue !== 0) {
          calculatedValue = presentValue / ((1 - Math.pow(1 + periodRate, -periods)) / periodRate);
        } else {
          const numerator = presentValue * periodRate + futureValue * periodRate / Math.pow(1 + periodRate, periods);
          const denominator = (1 - Math.pow(1 + periodRate, -periods));
          calculatedValue = numerator / denominator;
        }
        break;
        
      case "N": // Number of periods
        if (payment === 0) {
          calculatedValue = Math.log(futureValue / presentValue) / Math.log(1 + periodRate);
        } else {
          // More complex calculation for annuities
          const ratio = (futureValue + payment / periodRate) / (presentValue + payment / periodRate);
          calculatedValue = Math.log(ratio) / Math.log(1 + periodRate);
        }
        break;
        
      case "IY": // Interest rate
        // This requires iterative solution - simplified approximation
        let guess = 0.1;
        let tolerance = 0.0001;
        let maxIterations = 1000;
        
        for (let i = 0; i < maxIterations; i++) {
          const rate = guess / periodsPerYear;
          let pv_calc = 0;
          
          if (payment === 0) {
            pv_calc = futureValue / Math.pow(1 + rate, periods);
          } else {
            pv_calc = payment * ((1 - Math.pow(1 + rate, -periods)) / rate) - 
                     futureValue / Math.pow(1 + rate, periods);
          }
          
          if (Math.abs(pv_calc - presentValue) < tolerance) {
            calculatedValue = guess * 100;
            break;
          }
          
          // Simple adjustment
          if (pv_calc > presentValue) {
            guess += 0.001;
          } else {
            guess -= 0.001;
          }
        }
        break;
    }

    setResult(calculatedValue);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-financial">Finance Calculator</CardTitle>
          <p className="text-muted-foreground">
            Calculate Future Value (FV), Present Value (PV), Payment (PMT), Interest Rate (I/Y), or Number of Periods (N)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Calculate</Label>
                <Select value={calculate} onValueChange={setCalculate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FV">Future Value (FV)</SelectItem>
                    <SelectItem value="PV">Present Value (PV)</SelectItem>
                    <SelectItem value="PMT">Payment (PMT)</SelectItem>
                    <SelectItem value="IY">Interest Rate (I/Y)</SelectItem>
                    <SelectItem value="N">Number of Periods (N)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="n">N (# of periods)</Label>
                  <Input
                    id="n"
                    value={n}
                    onChange={(e) => setN(e.target.value)}
                    placeholder="60"
                    type="number"
                    disabled={calculate === "N"}
                  />
                </div>
                <div>
                  <Label htmlFor="iy">I/Y (Interest per year %)</Label>
                  <Input
                    id="iy"
                    value={iy}
                    onChange={(e) => setIY(e.target.value)}
                    placeholder="5"
                    type="number"
                    step="0.01"
                    disabled={calculate === "IY"}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pv">PV (Present Value $)</Label>
                <Input
                  id="pv"
                  value={pv}
                  onChange={(e) => setPV(e.target.value)}
                  placeholder="10000"
                  type="number"
                  disabled={calculate === "PV"}
                />
              </div>

              <div>
                <Label htmlFor="pmt">PMT (Periodic Payment $)</Label>
                <Input
                  id="pmt"
                  value={pmt}
                  onChange={(e) => setPMT(e.target.value)}
                  placeholder="500"
                  type="number"
                  disabled={calculate === "PMT"}
                />
              </div>

              <div>
                <Label htmlFor="fv">FV (Future Value $)</Label>
                <Input
                  id="fv"
                  value={fv}
                  onChange={(e) => setFV(e.target.value)}
                  placeholder="20000"
                  type="number"
                  disabled={calculate === "FV"}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>P/Y (Periods per year)</Label>
                  <Select value={py} onValueChange={setPY}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Annual)</SelectItem>
                      <SelectItem value="2">2 (Semi-annual)</SelectItem>
                      <SelectItem value="4">4 (Quarterly)</SelectItem>
                      <SelectItem value="12">12 (Monthly)</SelectItem>
                      <SelectItem value="52">52 (Weekly)</SelectItem>
                      <SelectItem value="365">365 (Daily)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>C/Y (Compound per year)</Label>
                  <Select value={cy} onValueChange={setCY}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Annual)</SelectItem>
                      <SelectItem value="2">2 (Semi-annual)</SelectItem>
                      <SelectItem value="4">4 (Quarterly)</SelectItem>
                      <SelectItem value="12">12 (Monthly)</SelectItem>
                      <SelectItem value="52">52 (Weekly)</SelectItem>
                      <SelectItem value="365">365 (Daily)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Payment Timing</Label>
                <Select value={pmtTime} onValueChange={setPmtTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="end">End of Period</SelectItem>
                    <SelectItem value="begin">Beginning of Period</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateValue}
                className="w-full bg-category-financial hover:bg-category-financial/80"
              >
                Calculate {calculate}
              </Button>
            </div>

            {result !== null && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Result</h3>
                <div className="p-6 bg-muted rounded-lg text-center">
                  <div className="text-lg text-muted-foreground mb-2">
                    {calculate} =
                  </div>
                  <div className="text-3xl font-bold text-category-financial">
                    {calculate === "IY" ? `${result.toFixed(4)}%` : 
                     calculate === "N" ? result.toFixed(2) :
                     `$${result.toFixed(2)}`}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Formula: Time Value of Money (TVM)</div>
                  <div>This calculator uses standard financial formulas for present value, future value, and annuity calculations.</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceCalculator;