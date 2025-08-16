import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const calculate = () => {
    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const activityNum = parseFloat(activity);

    if (!ageNum || !heightNum || !weightNum || !gender || !activity) {
      alert("Please fill in all fields");
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityNum;

    // Calculate goal calories
    let goalCalories = tdee;
    switch (goal) {
      case "lose-fast":
        goalCalories = tdee - 750; // 1.5 lbs per week
        break;
      case "lose":
        goalCalories = tdee - 500; // 1 lb per week
        break;
      case "lose-slow":
        goalCalories = tdee - 250; // 0.5 lbs per week
        break;
      case "gain-slow":
        goalCalories = tdee + 250; // 0.5 lbs per week
        break;
      case "gain":
        goalCalories = tdee + 500; // 1 lb per week
        break;
      case "gain-fast":
        goalCalories = tdee + 750; // 1.5 lbs per week
        break;
    }

    // Calculate macronutrients (rough guidelines)
    const protein = (goalCalories * 0.25) / 4; // 25% of calories, 4 cal/g
    const fat = (goalCalories * 0.25) / 9; // 25% of calories, 9 cal/g
    const carbs = (goalCalories * 0.50) / 4; // 50% of calories, 4 cal/g

    setResult({
      bmr,
      tdee,
      goalCalories,
      protein,
      carbs,
      fat
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-health">Calorie Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    type="number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.2">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="1.375">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="1.55">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="1.725">Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="1.9">Very Active (very hard exercise & physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal">Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-fast">Lose 1.5 lbs/week</SelectItem>
                    <SelectItem value="lose">Lose 1 lb/week</SelectItem>
                    <SelectItem value="lose-slow">Lose 0.5 lb/week</SelectItem>
                    <SelectItem value="maintain">Maintain weight</SelectItem>
                    <SelectItem value="gain-slow">Gain 0.5 lb/week</SelectItem>
                    <SelectItem value="gain">Gain 1 lb/week</SelectItem>
                    <SelectItem value="gain-fast">Gain 1.5 lbs/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculate}
                className="w-full bg-category-health hover:bg-category-health/80"
              >
                Calculate Calories
              </Button>
            </div>

            {result && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Results</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">BMR (Basal Metabolic Rate)</div>
                    <div className="font-semibold">{result.bmr.toFixed(0)} calories/day</div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">TDEE (Total Daily Energy Expenditure)</div>
                    <div className="font-semibold">{result.tdee.toFixed(0)} calories/day</div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Goal Calories</div>
                    <div className="font-semibold text-category-health text-xl">
                      {result.goalCalories.toFixed(0)} calories/day
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Macronutrient Breakdown</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="p-2 bg-muted rounded text-center">
                        <div className="font-semibold text-category-health">{result.protein.toFixed(0)}g</div>
                        <div className="text-xs text-muted-foreground">Protein</div>
                      </div>
                      <div className="p-2 bg-muted rounded text-center">
                        <div className="font-semibold text-category-health">{result.carbs.toFixed(0)}g</div>
                        <div className="text-xs text-muted-foreground">Carbs</div>
                      </div>
                      <div className="p-2 bg-muted rounded text-center">
                        <div className="font-semibold text-category-health">{result.fat.toFixed(0)}g</div>
                        <div className="text-xs text-muted-foreground">Fat</div>
                      </div>
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

export default CalorieCalculator;