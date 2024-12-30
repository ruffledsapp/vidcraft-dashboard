import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AuthOverlay = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full text-center space-y-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#F97316] bg-clip-text text-transparent">
          Sign Up to See Full Results
        </h2>
        <p className="text-muted-foreground">
          Create a free account to unlock all analysis features and view detailed results.
        </p>
        <Button 
          size="lg" 
          className="bg-[#9b87f5] hover:bg-[#7E69AB] w-full"
          onClick={() => navigate("/signup")}
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Create Free Account
        </Button>
      </div>
    </div>
  );
};