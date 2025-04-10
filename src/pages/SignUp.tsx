
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  currency: z.string().min(1, { message: "Please select a currency." }),
});

type FormValues = z.infer<typeof formSchema>;

const currencies = [
  { label: "US Dollar ($)", value: "USD", symbol: "$" },
  { label: "Euro (€)", value: "EUR", symbol: "€" },
  { label: "British Pound (£)", value: "GBP", symbol: "£" },
  { label: "Japanese Yen (¥)", value: "JPY", symbol: "¥" },
  { label: "Indian Rupee (₹)", value: "INR", symbol: "₹" },
  { label: "Swiss Franc (Fr)", value: "CHF", symbol: "Fr" },
  { label: "Russian Ruble (₽)", value: "RUB", symbol: "₽" },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      currency: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // Find the selected currency with its symbol
    const selectedCurrency = currencies.find(c => c.value === data.currency);
    
    // In a real app, this would make an API call to create the user account
    // For demo purposes, we'll simulate a delay and then store in localStorage
    setTimeout(() => {
      // Store user data and currency preference
      localStorage.setItem("user", JSON.stringify({
        name: data.name,
        email: data.email,
        isLoggedIn: true,
      }));
      
      localStorage.setItem("userCurrency", JSON.stringify({
        code: selectedCurrency?.value || "USD",
        symbol: selectedCurrency?.symbol || "$"
      }));
      
      toast.success("Account created successfully!");
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Currency</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This currency will be used throughout the app.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <CardFooter className="px-0 pt-4 flex flex-col items-center gap-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
                <div className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button variant="link" className="text-sm text-muted-foreground" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
