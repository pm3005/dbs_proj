import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Landmark, CreditCard, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { CurrencyDisplay } from "@/components/CurrencyDisplay";

// Sample data for accounts
const SAMPLE_ACCOUNTS = [
  { id: "a1", name: "Main Checking", type: "Checking", balance: 5432.10, institution: "Bank of America" },
  { id: "a2", name: "Savings", type: "Savings", balance: 12500, institution: "Bank of America" },
  { id: "a3", name: "Credit Card", type: "Credit", balance: -1250.75, institution: "Chase" },
  { id: "a4", name: "Investment", type: "Investment", balance: 8700.50, institution: "Vanguard" },
];

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Please select an account type.",
  }),
  balance: z.coerce.number(),
  institution: z.string().min(2, {
    message: "Institution name must be at least 2 characters.",
  }),
});

type AccountFormData = z.infer<typeof formSchema>;

export default function Accounts() {
  const [accounts, setAccounts] = useState(SAMPLE_ACCOUNTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<any | null>(null);
  
  const form = useForm<AccountFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      balance: 0,
      institution: "",
    },
  });

  const handleDelete = (account: any) => {
    setAccountToDelete(account);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (accountToDelete) {
      const newAccounts = accounts.filter(a => a.id !== accountToDelete.id);
      setAccounts(newAccounts);
      toast.success("Account deleted successfully");
      setDeleteDialogOpen(false);
      setAccountToDelete(null);
    }
  };

  const onSubmit = (data: AccountFormData) => {
    const newAccount = {
      id: `a${Date.now()}`,
      name: data.name,
      type: data.type,
      balance: data.balance,
      institution: data.institution,
    };

    setAccounts([...accounts, newAccount]);
    setIsDialogOpen(false);
    toast.success("Account added successfully");
    form.reset();
  };
  
  // Calculate total assets, liabilities, and net worth
  const totalAssets = accounts
    .filter(account => account.balance > 0)
    .reduce((sum, account) => sum + account.balance, 0);
    
  const totalLiabilities = accounts
    .filter(account => account.balance < 0)
    .reduce((sum, account) => sum + Math.abs(account.balance), 0);
    
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Assets</CardDescription>
            <CardTitle className="text-2xl text-green-500">
              <CurrencyDisplay amount={totalAssets} />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Liabilities</CardDescription>
            <CardTitle className="text-2xl text-red-500">
              <CurrencyDisplay amount={totalLiabilities} />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Worth</CardDescription>
            <CardTitle className={`text-2xl ${netWorth >= 0 ? "text-green-500" : "text-red-500"}`}>
              <CurrencyDisplay amount={netWorth} />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="space-y-1">
                  <CardTitle>{account.name}</CardTitle>
                  <CardDescription>{account.institution}</CardDescription>
                </div>
                <div className="flex items-center">
                  {account.type === "Checking" || account.type === "Savings" ? (
                    <Landmark className="h-6 w-6 mr-2" />
                  ) : account.type === "Credit" ? (
                    <CreditCard className="h-6 w-6 mr-2" />
                  ) : (
                    <div className="h-6 w-6 mr-2 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                      $
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm">Balance</div>
                <div className={`text-xl font-medium ${account.balance >= 0 ? "text-green-500" : "text-red-500"}`}>
                  <CurrencyDisplay amount={account.balance} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-1">
              <div className="flex justify-between w-full">
                <div className="text-xs text-muted-foreground">{account.type}</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(account)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Account</DialogTitle>
            <DialogDescription>
              Enter the details of your financial account.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Main Checking" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Checking">Checking</SelectItem>
                        <SelectItem value="Savings">Savings</SelectItem>
                        <SelectItem value="Credit">Credit Card</SelectItem>
                        <SelectItem value="Investment">Investment</SelectItem>
                        <SelectItem value="Loan">Loan</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Balance</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank of America" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Add Account</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Account"
        description="Are you sure you want to delete this account? This action cannot be undone."
      />
    </div>
  );
}
