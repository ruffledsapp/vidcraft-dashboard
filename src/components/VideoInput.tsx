import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AuthOverlay } from "./AuthOverlay";
import { useSession } from "@supabase/auth-helpers-react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const DEFAULT_VIDEO = "https://www.youtube.com/watch?v=vsMydMDi3rI";

export const VideoInput = () => {
  const [videoUrl, setVideoUrl] = useState(DEFAULT_VIDEO);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl) {
      if (session) {
        console.log("Navigating to dashboard with URL:", videoUrl);
        navigate(`/dashboard?url=${encodeURIComponent(videoUrl)}`);
      } else {
        setShowPreview(true);
      }
    }
  };

  const startVoiceInput = async () => {
    try {
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      recognition.lang = "en-US";
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVideoUrl(transcript);
      };

      recognition.onerror = () => {
        toast({
          title: "Error",
          description: "Could not access microphone. Please check permissions.",
          variant: "destructive",
        });
      };

      recognition.start();
    } catch (error) {
      toast({
        title: "Error",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-8 animate-fade-in relative">
      <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-[#9b87f5] to-[#F97316] bg-clip-text text-transparent">
        VideoSich
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter YouTube video URL or speak your search"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="flex-1 h-12 text-lg bg-[#2A2F3C] border-[#7E69AB]/30"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={startVoiceInput}
            className="h-12 w-12 border-[#7E69AB]/30"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button type="submit" className="h-12 px-8 bg-[#9b87f5] hover:bg-[#7E69AB]">
            Analyze
          </Button>
        </div>
      </form>
      {showPreview && !session && <AuthOverlay />}
    </div>
  );
};