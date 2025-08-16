import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Calculator.net</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">Free Online Calculators</h2>
            <div className="flex items-center space-x-2">
              <Input 
                placeholder="Search calculators..." 
                className="w-64 bg-white text-black"
              />
              <Button variant="secondary" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80">
            sign in
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;