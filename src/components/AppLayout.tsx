import { Outlet, Navigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1">
        <div className="container mx-auto py-6 max-w-6xl">
          <Outlet />
        </div>
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
}