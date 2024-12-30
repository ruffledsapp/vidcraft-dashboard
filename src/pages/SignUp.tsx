import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      console.error('Google sign in error:', error);
      toast({
        title: "Error signing in",
        description: "There was a problem signing in with Google. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { email, name, source, subscribe });
    
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

          <Button 
            className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
            onClick={handleGoogleSignIn}
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-4 h-4 mr-2"
            />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">How did you find us?</Label>
                <Input
                  id="source"
                  placeholder="Google, Friend, Social Media, etc."
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribe"
                  checked={subscribe}
                  onCheckedChange={(checked) => setSubscribe(checked as boolean)}
                />
                <Label htmlFor="subscribe" className="text-sm">
                  Keep me updated about new features and announcements
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;