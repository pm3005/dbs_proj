import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-bold text-foreground">
          Welcome to <span className="text-primary">Tango</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          A simple finance management app to track your expenses, 
          budgets, and financial goals.
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 max-w-lg mx-auto">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </div>
        
        <div className="pt-12 grid gap-6 sm:grid-cols-3">
          <div className="p-4 rounded-lg bg-card border">
            <h3 className="font-semibold text-lg mb-2">Track Spending</h3>
            <p className="text-muted-foreground">Monitor your transactions and accounts</p>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <h3 className="font-semibold text-lg mb-2">Budget Wisely</h3>
            <p className="text-muted-foreground">Create and manage your budgets</p>
          </div>
          <div className="p-4 rounded-lg bg-card border">
            <h3 className="font-semibold text-lg mb-2">Financial Insights</h3>
            <p className="text-muted-foreground">View your spending patterns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;