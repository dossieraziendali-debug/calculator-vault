import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [results, setResults] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
  } | null>(null);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      alert("Birth date cannot be after target date");
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const daysInPrevMonth = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += daysInPrevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const timeDiff = target.getTime() - birth.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    setResults({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-category-other">Age Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="birthDate">Birth Date</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="targetDate">Calculate Age On</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>

              <Button 
                onClick={calculateAge}
                className="w-full bg-category-other hover:bg-category-other/80"
                disabled={!birthDate}
              >
                Calculate Age
              </Button>
            </div>

            {results && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Results</h3>
                <div className="space-y-3">
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-category-other">
                      {results.years} years, {results.months} months, {results.days} days
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded text-center">
                      <div className="font-semibold text-category-other">
                        {results.totalDays.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Days</div>
                    </div>
                    <div className="p-3 bg-muted rounded text-center">
                      <div className="font-semibold text-category-other">
                        {results.totalWeeks.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Weeks</div>
                    </div>
                    <div className="p-3 bg-muted rounded text-center">
                      <div className="font-semibold text-category-other">
                        {results.totalMonths.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Months</div>
                    </div>
                    <div className="p-3 bg-muted rounded text-center">
                      <div className="font-semibold text-category-other">
                        {(results.totalDays * 24).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Hours</div>
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

export default AgeCalculator;