import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface SignUpFormProps {
  onSubmit: (data: {
    email: string;
    name: string;
    source: string;
    subscribe: boolean;
  }) => void;
}

export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, name, source, subscribe });
  };

  return (
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
  );
};