
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-foreground">
          Welcome to <span className="bg-gradient-to-r from-teal-400 to-purple-700 bg-clip-text text-transparent">
  Tango
</span>

        </h1>
        <p className="text-xl text-muted-foreground">
          A modern finance management application to track your expenses, 
          budgets, and achieve your financial goals.
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 max-w-lg mx-auto">
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/login')}
          >
            Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
          
        </div>
        
        <div className="pt-12 grid gap-6 sm:grid-cols-3">
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2">Track Spending</h3>
            <p className="text-muted-foreground">Monitor all your transactions and accounts in one place</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2">Budget Wisely</h3>
            <p className="text-muted-foreground">Create and manage budgets to reach your financial goals</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-lg mb-2">Financial Insights</h3>
            <p className="text-muted-foreground">Get visual reports to understand your financial habits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
