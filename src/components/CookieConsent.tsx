import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
    toast({
      title: "Preferences saved",
      description: "Your cookie preferences have been saved.",
    });
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
    toast({
      title: "Preferences saved",
      description: "You've chosen to reject optional cookies.",
    });
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg animate-fade-in z-50">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <p>
            We use cookies to enhance your experience and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. 
            View our{' '}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            {' '}for more information.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReject}>
            Reject All
          </Button>
          <Button onClick={handleAccept}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};