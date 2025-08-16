import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, DollarSign, Heart, Brain, Cog } from "lucide-react";

interface Calculator {
  name: string;
  path: string;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  calculators: Calculator[];
}

const categories: Category[] = [
  {
    id: "financial",
    title: "Financial Calculators",
    icon: <DollarSign className="w-12 h-12" />,
    color: "category-financial",
    calculators: [
      { name: "Mortgage Calculator", path: "/mortgage" },
      { name: "Loan Calculator", path: "/loan" },
      { name: "Auto Loan Calculator", path: "/auto-loan" },
      { name: "Interest Calculator", path: "/interest" },
      { name: "Payment Calculator", path: "/payment" },
      { name: "Retirement Calculator", path: "/retirement" },
      { name: "Amortization Calculator", path: "/amortization" },
      { name: "Investment Calculator", path: "/investment" },
      { name: "Inflation Calculator", path: "/inflation" },
      { name: "Finance Calculator", path: "/finance" },
      { name: "Income Tax Calculator", path: "/tax" },
      { name: "Compound Interest Calculator", path: "/compound-interest" },
      { name: "Salary Calculator", path: "/salary" },
      { name: "Interest Rate Calculator", path: "/interest-rate" },
      { name: "Sales Tax Calculator", path: "/sales-tax" }
    ]
  },
  {
    id: "health",
    title: "Fitness & Health Calculators",
    icon: <Heart className="w-12 h-12" />,
    color: "category-health",
    calculators: [
      { name: "BMI Calculator", path: "/bmi" },
      { name: "Calorie Calculator", path: "/calorie" },
      { name: "Body Fat Calculator", path: "/body-fat" },
      { name: "BMR Calculator", path: "/bmr" },
      { name: "Ideal Weight Calculator", path: "/ideal-weight" },
      { name: "Pace Calculator", path: "/pace" },
      { name: "Pregnancy Calculator", path: "/pregnancy" },
      { name: "Pregnancy Conception Calculator", path: "/pregnancy-conception" },
      { name: "Due Date Calculator", path: "/due-date" }
    ]
  },
  {
    id: "math",
    title: "Math Calculators",
    icon: <Brain className="w-12 h-12" />,
    color: "category-math",
    calculators: [
      { name: "Scientific Calculator", path: "/scientific" },
      { name: "Fraction Calculator", path: "/fraction" },
      { name: "Percentage Calculator", path: "/percentage" },
      { name: "Random Number Generator", path: "/random" },
      { name: "Triangle Calculator", path: "/triangle" },
      { name: "Standard Deviation Calculator", path: "/standard-deviation" }
    ]
  },
  {
    id: "other",
    title: "Other Calculators",
    icon: <Cog className="w-12 h-12" />,
    color: "category-other",
    calculators: [
      { name: "Age Calculator", path: "/age" },
      { name: "Date Calculator", path: "/date" },
      { name: "Time Calculator", path: "/time" },
      { name: "Hours Calculator", path: "/hours" },
      { name: "GPA Calculator", path: "/gpa" },
      { name: "Grade Calculator", path: "/grade" },
      { name: "Concrete Calculator", path: "/concrete" },
      { name: "Subnet Calculator", path: "/subnet" },
      { name: "Password Generator", path: "/password" },
      { name: "Conversion Calculator", path: "/conversion" }
    ]
  }
];

interface CategoryGridProps {
  onCalculatorSelect: (calculator: Calculator) => void;
}

const CategoryGrid = ({ onCalculatorSelect }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 py-8">
      {categories.map((category) => (
        <Card key={category.id} className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className={`mx-auto mb-4 w-20 h-20 rounded-full text-white flex items-center justify-center ${
              category.id === 'financial' ? 'bg-category-financial' :
              category.id === 'health' ? 'bg-category-health' :
              category.id === 'math' ? 'bg-category-math' :
              'bg-category-other'
            }`}>
              {category.icon}
            </div>
            <CardTitle className={`text-xl font-semibold ${
              category.id === 'financial' ? 'text-category-financial' :
              category.id === 'health' ? 'text-category-health' :
              category.id === 'math' ? 'text-category-math' :
              'text-category-other'
            }`}>
              {category.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {category.calculators.map((calculator, index) => (
              <button
                key={index}
                onClick={() => onCalculatorSelect(calculator)}
                className={`block w-full text-left text-sm hover:underline transition-colors duration-200 ${
                  category.id === 'financial' ? 'text-category-financial' :
                  category.id === 'health' ? 'text-category-health' :
                  category.id === 'math' ? 'text-category-math' :
                  'text-category-other'
                }`}
              >
                {calculator.name}
              </button>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoryGrid;