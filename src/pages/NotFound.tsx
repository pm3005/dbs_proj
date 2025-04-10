
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-thrift-100 rounded-full flex items-center justify-center">
            <FileQuestion className="h-12 w-12 text-thrift-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        <Button className="bg-thrift-500 hover:bg-thrift-600" asChild>
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
