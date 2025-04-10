import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Calendar, Repeat, Trash2 } from "lucide-react";
import AddRecurringTransactionDialog from "@/components/AddRecurringTransactionDialog";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";


type RecurringTransaction = {
  id: number;
  description: string;
  amount: number;
  category: string;
  frequency: string;
  nextDueDate: string;
  account: string;
};

export default function Recurring() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<RecurringTransaction | null>(null);
  const { toast } = useToast();
  
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([
    { 
      id: 1, 
      description: "Netflix Subscription", 
      amount: -14.99, 
      category: "Entertainment", 
      frequency: "Monthly", 
      nextDueDate: "2023-11-15", 
      account: "Credit Card" 
    },
    { 
      id: 2, 
      description: "Rent Payment", 
      amount: -1200.00, 
      category: "Housing", 
      frequency: "Monthly", 
      nextDueDate: "2023-11-01", 
      account: "Checking" 
    },
    { 
      id: 3, 
      description: "Gym Membership", 
      amount: -49.99, 
      category: "Health", 
      frequency: "Monthly", 
      nextDueDate: "2023-11-05", 
      account: "Credit Card" 
    },
    { 
      id: 4, 
      description: "Salary", 
      amount: 3500.00, 
      category: "Income", 
      frequency: "Monthly", 
      nextDueDate: "2023-11-30", 
      account: "Checking" 
    },
    { 
      id: 5, 
      description: "Car Insurance", 
      amount: -89.50, 
      category: "Insurance", 
      frequency: "Monthly", 
      nextDueDate: "2023-11-10", 
      account: "Checking" 
    }
  ]);

  const handleAddRecurring = (newTransaction: Omit<RecurringTransaction, "id">) => {
    const newId = recurringTransactions.length > 0 ? 
      Math.max(...recurringTransactions.map(t => t.id)) + 1 : 1;
      
    setRecurringTransactions([
      ...recurringTransactions,
      { id: newId, ...newTransaction }
    ]);
    
    toast({
      title: "Recurring transaction added",
      description: `${newTransaction.description} has been added to your recurring transactions.`,
    });
    
    setIsAddDialogOpen(false);
  };

  const handleDeleteClick = (transaction: RecurringTransaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteTransaction = () => {
    if (transactionToDelete) {
      setRecurringTransactions(prev => 
        prev.filter(transaction => transaction.id !== transactionToDelete.id)
      );
      toast({
        title: "Recurring transaction deleted",
        description: `${transactionToDelete.description} has been removed.`,
      });
      setTransactionToDelete(null);
    }
  };

  const calculateMonthlyTotal = () => {
    return recurringTransactions
      .filter(t => t.amount < 0)
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  const calculateMonthlyIncome = () => {
    return recurringTransactions
      .filter(t => t.amount > 0)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency.toLowerCase()) {
      case 'daily':
        return <Repeat className="h-4 w-4" />;
      case 'weekly':
        return <Repeat className="h-4 w-4" />;
      case 'monthly':
        return <Calendar className="h-4 w-4" />;
      case 'yearly':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Repeat className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recurring Transactions</h1>
          <p className="text-muted-foreground">
            Manage your regularly occurring expenses and income.
          </p>
        </div>
        <Button 
          className="bg-thrift-500 hover:bg-thrift-600"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Recurring
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Recurring Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
            <CurrencyDisplay amount={calculateMonthlyTotal()} />            </div>
            <p className="text-xs text-muted-foreground">
              Total of all monthly recurring expenses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Recurring Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
            <CurrencyDisplay amount={calculateMonthlyIncome()} />
            </div>
            <p className="text-xs text-muted-foreground">
              Total of all monthly recurring income
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Net Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              calculateMonthlyIncome() - calculateMonthlyTotal() >= 0 ? 
              'text-green-600' : 'text-red-500'
            }`}>
              <CurrencyDisplay amount={calculateMonthlyIncome() - calculateMonthlyTotal()} />
              </div>
            <p className="text-xs text-muted-foreground">
              Difference between income and expenses
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recurring Transactions</CardTitle>
          <CardDescription>
            All your scheduled recurring transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Due Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recurringTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getFrequencyIcon(transaction.frequency)}
                        {transaction.frequency}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.nextDueDate}</TableCell>
                    <TableCell>{transaction.account}</TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.amount >= 0 ? 'text-green-600' : 'text-red-500'
                    }`}>
                      <CurrencyDisplay amount={transaction.amount} />
                      </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteClick(transaction)}
                        aria-label={`Delete ${transaction.description}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <AddRecurringTransactionDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddRecurring}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteTransaction}
        title="Delete Recurring Transaction"
        description={`Are you sure you want to delete the recurring transaction "${transactionToDelete?.description}"? This action cannot be undone.`}
      />
    </div>
  );
}
