import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [angleMode, setAngleMode] = useState<"deg" | "rad">("deg");

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "−":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "/":
        return firstValue / secondValue;
      case "^":
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  const performFunction = (func: string) => {
    const value = parseFloat(display);
    let result = 0;

    switch (func) {
      case "sin":
        result = angleMode === "deg" ? Math.sin(value * Math.PI / 180) : Math.sin(value);
        break;
      case "cos":
        result = angleMode === "deg" ? Math.cos(value * Math.PI / 180) : Math.cos(value);
        break;
      case "tan":
        result = angleMode === "deg" ? Math.tan(value * Math.PI / 180) : Math.tan(value);
        break;
      case "sin⁻¹":
        result = angleMode === "deg" ? Math.asin(value) * 180 / Math.PI : Math.asin(value);
        break;
      case "cos⁻¹":
        result = angleMode === "deg" ? Math.acos(value) * 180 / Math.PI : Math.acos(value);
        break;
      case "tan⁻¹":
        result = angleMode === "deg" ? Math.atan(value) * 180 / Math.PI : Math.atan(value);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "√":
        result = Math.sqrt(value);
        break;
      case "x²":
        result = value * value;
        break;
      case "x³":
        result = value * value * value;
        break;
      case "eˣ":
        result = Math.exp(value);
        break;
      case "10ˣ":
        result = Math.pow(10, value);
        break;
      case "1/x":
        result = 1 / value;
        break;
      case "n!":
        result = factorial(value);
        break;
      case "±":
        result = -value;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const calculateResult = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <Card className="p-6 bg-calculator-bg mx-auto max-w-4xl">
      <div className="grid grid-cols-2 gap-6">
        {/* Scientific Functions */}
        <div className="space-y-2">
          <div className="grid grid-cols-6 gap-1">
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("sin")}
            >
              sin
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("cos")}
            >
              cos
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("tan")}
            >
              tan
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => setAngleMode(angleMode === "deg" ? "rad" : "deg")}
            >
              {angleMode === "deg" ? "Deg" : "Rad"}
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover" disabled></Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover" disabled></Button>
          </div>

          <div className="grid grid-cols-6 gap-1">
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("sin⁻¹")}
            >
              sin⁻¹
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("cos⁻¹")}
            >
              cos⁻¹
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("tan⁻¹")}
            >
              tan⁻¹
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber(String(Math.PI))}
            >
              π
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber(String(Math.E))}
            >
              e
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover" disabled></Button>
          </div>

          <div className="grid grid-cols-6 gap-1">
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputOperation("^")}
            >
              xʸ
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("x³")}
            >
              x³
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("x²")}
            >
              x²
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("eˣ")}
            >
              eˣ
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("10ˣ")}
            >
              10ˣ
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover" disabled></Button>
          </div>

          <div className="grid grid-cols-6 gap-1">
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("√")}
            >
              √x
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("√")}
            >
              ³√x
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("√")}
            >
              √x
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("ln")}
            >
              ln
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("log")}
            >
              log
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover" disabled></Button>
          </div>

          <div className="grid grid-cols-6 gap-1">
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("(")}
            >
              (
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber(")")}
            >
              )
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("1/x")}
            >
              1/x
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("%")}
            >
              %
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("n!")}
            >
              n!
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover" disabled></Button>
          </div>
        </div>

        {/* Main Calculator */}
        <div className="space-y-2">
          {/* Display */}
          <div className="bg-calculator-display text-white p-4 rounded text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
            {display}
          </div>

          {/* Number pad and operations */}
          <div className="grid grid-cols-5 gap-1">
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("7")}
            >
              7
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("8")}
            >
              8
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("9")}
            >
              9
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button-operator text-white hover:bg-calculator-button-operator/80"
              onClick={() => inputOperation("+")}
            >
              +
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button-function text-white hover:bg-calculator-button-function/80"
              onClick={() => setDisplay(display.slice(0, -1) || "0")}
            >
              Back
            </Button>

            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("4")}
            >
              4
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("5")}
            >
              5
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("6")}
            >
              6
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button-operator text-white hover:bg-calculator-button-operator/80"
              onClick={() => inputOperation("−")}
            >
              −
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover">
              Ans
            </Button>

            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("1")}
            >
              1
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("2")}
            >
              2
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("3")}
            >
              3
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button-operator text-white hover:bg-calculator-button-operator/80"
              onClick={() => inputOperation("×")}
            >
              ×
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover">
              M+
            </Button>

            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("0")}
            >
              0
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber(".")}
            >
              .
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => inputNumber("EXP")}
            >
              EXP
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button-operator text-white hover:bg-calculator-button-operator/80"
              onClick={() => inputOperation("/")}
            >
              /
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover">
              M-
            </Button>

            <Button 
              variant="outline" 
              className="bg-calculator-button hover:bg-calculator-button-hover"
              onClick={() => performFunction("±")}
            >
              ±
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover">
              RND
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button-function text-white hover:bg-calculator-button-function/80"
              onClick={clear}
            >
              AC
            </Button>
            <Button 
              variant="outline" 
              className="bg-calculator-button-operator text-white hover:bg-calculator-button-operator/80"
              onClick={calculateResult}
            >
              =
            </Button>
            <Button variant="outline" className="bg-calculator-button hover:bg-calculator-button-hover">
              MR
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScientificCalculator;