
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const categories = [
  { id: 1, name: "Housing" },
  { id: 2, name: "Transportation" },
  { id: 3, name: "Food" },
  { id: 4, name: "Utilities" },
  { id: 5, name: "Healthcare" },
  { id: 6, name: "Entertainment" },
  { id: 7, name: "Personal Care" },
  { id: 8, name: "Education" },
  { id: 9, name: "Savings" },
  { id: 10, name: "Other" }
];

const formSchema = z.object({
  category: z.string().min(1, { message: "Please select a category" }),
  amount: z.string().min(1, { message: "Please enter an amount" })
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, { 
      message: "Amount must be a positive number" 
    }),
  month: z.string().min(1, { message: "Please select a month" }),
  year: z.string().min(4, { message: "Please enter a valid year" })
    .refine(val => !isNaN(Number(val)) && Number(val) >= 2023, {
      message: "Year must be 2023 or later"
    })
});

export interface Budget {
  id: string;
  category: string;
  amount: number;
  month: string;
  year: string;
  spent: number;
}

interface AddBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBudgetAdded: (budget: Budget) => void;
}

export default function AddBudgetDialog({ open, onOpenChange, onBudgetAdded }: AddBudgetDialogProps) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: "",
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear().toString()
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newBudget: Budget = {
      id: Math.random().toString(36).substr(2, 9),
      category: values.category,
      amount: Number(values.amount),
      month: values.month,
      year: values.year,
      spent: Math.random() * Number(values.amount) * 0.7 // Mock data for spent amount
    };

    onBudgetAdded(newBudget);
    toast({
      title: "Budget added",
      description: `Budget of $${values.amount} added for ${values.category} in ${values.month} ${values.year}`,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
          <DialogDescription>
            Create a new budget for a specific category
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      {...field}
                      type="number"
                      step="0.01"
                      min="0"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the maximum amount for this budget
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="2023"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Budget</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
