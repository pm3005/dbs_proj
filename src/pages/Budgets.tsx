
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import AddBudgetDialog from "@/components/AddBudgetDialog";
import BudgetCard from "@/components/BudgetCard";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { CurrencyDisplay} from "@/components/CurrencyDisplay";


const SAMPLE_BUDGETS = [
  {
    id: "b1",
    category: "Food",
    amount: 500,
    spent: 375.25,
    period: "Monthly",
  },
  {
    id: "b2",
    category: "Transportation",
    amount: 250,
    spent: 180.50,
    period: "Monthly",
  },
  {
    id: "b3",
    category: "Entertainment",
    amount: 200,
    spent: 215.75,
    period: "Monthly",
  },
  {
    id: "b4",
    category: "Shopping",
    amount: 300,
    spent: 120.30,
    period: "Monthly",
  },
  {
    id: "b5",
    category: "Travel",
    amount: 1500,
    spent: 450,
    period: "Yearly",
  },
];

export default function Budgets() {
  const [budgets, setBudgets] = useState(SAMPLE_BUDGETS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState<any | null>(null);

  const handleDelete = (budget: any) => {
    setBudgetToDelete(budget);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (budgetToDelete) {
      const newBudgets = budgets.filter(b => b.id !== budgetToDelete.id);
      setBudgets(newBudgets);
      toast.success("Budget deleted successfully");
      setDeleteDialogOpen(false);
      setBudgetToDelete(null);
    }
  };

  const handleAddBudget = (budget: any) => {
    const newBudget = {
      id: `b${Date.now()}`,
      ...budget,
      spent: 0,
    };
    
    setBudgets([...budgets, newBudget]);
    setIsDialogOpen(false);
    toast.success("Budget added successfully");
  };

  // Calculate total budget and spent
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-sm text-muted-foreground">Total Budget</div>
          <div className="text-2xl font-bold mt-1">
            <CurrencyDisplay amount={totalBudget} />
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-sm text-muted-foreground">Total Spent</div>
          <div className="text-2xl font-bold mt-1">
            <CurrencyDisplay amount={totalSpent} />
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-sm text-muted-foreground">Remaining</div>
          <div className={`text-2xl font-bold mt-1 ${totalRemaining >= 0 ? "text-green-500" : "text-red-500"}`}>
            <CurrencyDisplay amount={totalRemaining} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onDelete={() => handleDelete(budget)}
          />
        ))}
      </div>

      <AddBudgetDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onBudgetAdded={handleAddBudget}
      />
      
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Budget"
        description="Are you sure you want to delete this budget? This action cannot be undone."
      />
    </div>
  );
}
