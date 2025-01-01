import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    email: string;
    name: string;
    source: string;
    subscribe: boolean;
  }) => {
    console.log("Form submitted:", data);
    
    toast({
      title: "Account created successfully!",
      description: "Welcome to VideoSich. You can now access all analysis features.",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Image section (2/3) */}
      <div className="hidden lg:block w-2/3 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5] to-[#F97316] opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/placeholder.svg')",
            mixBlendMode: "overlay"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white space-y-6 max-w-2xl">
            <h1 className="text-6xl font-bold">
              Transform Your Video Content
            </h1>
            <p className="text-xl opacity-90">
              Join VideoSich and unlock powerful AI-driven insights for your video content.
              Analyze engagement, demographics, and more with our cutting-edge platform.
            </p>
          </div>
        </div>
      </div>

      {/* Form section (1/3) */}
      <div className="w-full lg:w-1/3 bg-background p-8 lg:p-12 flex items-center">
        <div className="w-full max-w-md space-y-8">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
            <p className="text-muted-foreground">
              Enter your information below to get started
            </p>
          </div>

          <GoogleSignIn />
          <SignUpForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;