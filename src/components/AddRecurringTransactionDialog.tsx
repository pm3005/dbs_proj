
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { useCurrency } from "@/hooks/use-currency";

type RecurringTransaction = {
  description: string;
  amount: number;
  category: string;
  frequency: string;
  nextDueDate: string;
  account: string;
};

type AddRecurringTransactionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: RecurringTransaction) => void;
};

export default function AddRecurringTransactionDialog({
  isOpen,
  onClose,
  onAdd
}: AddRecurringTransactionDialogProps) {
  const [transaction, setTransaction] = useState<RecurringTransaction>({
    description: "",
    amount: 0,
    category: "",
    frequency: "Monthly",
    nextDueDate: new Date().toISOString().split('T')[0],
    account: "",
  });

  const { formatAmount } = useCurrency();

  
  // Mock data - in a real app, this would come from your API
  const categories = ["Food", "Housing", "Transportation", "Entertainment", "Health", "Insurance", "Income", "Utilities", "Other"];
  const accounts = ["Checking", "Savings", "Credit Card", "Investment", "Cash"];
  const frequencies = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"];
  
  const handleInputChange = (field: keyof RecurringTransaction, value: string | number) => {
    setTransaction(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if transaction is an expense or income
    const finalAmount = transaction.category === "Income" ? 
      Math.abs(Number(transaction.amount)) : 
      -Math.abs(Number(transaction.amount));
    
    onAdd({
      ...transaction,
      amount: finalAmount
    });
    
    // Reset form
    setTransaction({
      description: "",
      amount: 0,
      category: "",
      frequency: "Monthly",
      nextDueDate: new Date().toISOString().split('T')[0],
      account: "",
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Recurring Transaction</DialogTitle>
            <DialogDescription>
              Add a new recurring transaction to track regular income or expenses.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="e.g., Netflix Subscription"
                className="col-span-3"
                required
                value={transaction.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="col-span-3"
                required
                value={transaction.amount === 0 ? "" : Math.abs(transaction.amount)}
                onChange={(e) => handleInputChange("amount", parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <div className="col-span-3">
                <Select 
                  required
                  value={transaction.category} 
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <div className="col-span-3">
                <Select
                  required
                  value={transaction.frequency}
                  onValueChange={(value) => handleInputChange("frequency", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {frequencies.map((frequency) => (
                        <SelectItem key={frequency} value={frequency}>
                          {frequency}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nextDueDate" className="text-right">
                Next Due Date
              </Label>
              <Input
                id="nextDueDate"
                type="date"
                className="col-span-3"
                required
                value={transaction.nextDueDate}
                onChange={(e) => handleInputChange("nextDueDate", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="account" className="text-right">
                Account
              </Label>
              <div className="col-span-3">
                <Select
                  required
                  value={transaction.account}
                  onValueChange={(value) => handleInputChange("account", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {accounts.map((account) => (
                        <SelectItem key={account} value={account}>
                          {account}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-thrift-500 hover:bg-thrift-600">
              Add Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
