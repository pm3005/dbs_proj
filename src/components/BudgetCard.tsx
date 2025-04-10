
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trash2 } from "lucide-react";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";

interface BudgetCardProps {
  budget: {
    id: string;
    category: string;
    amount: number;
    spent: number;
    period: string;
  };
  onDelete: () => void;
}

const BudgetCard = ({ budget, onDelete }: BudgetCardProps) => {
  const { category, amount, spent, period } = budget;
  const progress = Math.min((spent / amount) * 100, 100);
  const remaining = amount - spent;
  const isOverBudget = remaining < 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-lg">{category}</h3>
            <p className="text-sm text-muted-foreground">{period}</p>
          </div>
          <div className="text-right">
            <div className="text-md font-medium">
              <CurrencyDisplay amount={spent} /> / <CurrencyDisplay amount={amount} />
            </div>
            <p className={`text-sm ${isOverBudget ? "text-red-500" : "text-green-500"}`}>
              {isOverBudget ? "Over by " : "Remaining: "}
              <CurrencyDisplay amount={Math.abs(remaining)} />
            </p>
          </div>
        </div>
        
        <Progress value={progress} className={`h-2 ${isOverBudget ? "bg-red-200" : ""}`} />
        
        <div className="mt-2 text-sm text-muted-foreground">
          {progress.toFixed(0)}% used
        </div>
      </CardContent>
      <CardFooter className="pt-1 px-6 pb-4">
        <div className="flex justify-end items-center w-full">
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BudgetCard;
