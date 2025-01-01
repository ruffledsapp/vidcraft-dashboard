import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const GoogleSignIn = () => {
  const { toast } = useToast();

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

  return (
    <>
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
    </>
  );
};