import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Mic, Upload, Sparkles, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AuthOverlay } from "./AuthOverlay";
import { useSession } from "@supabase/auth-helpers-react";

// Randy Pausch's Last Lecture
const DEFAULT_VIDEO = "https://www.youtube.com/watch?v=ji5_MqicxSo";

export const VideoInput = () => {
  const [videoUrl, setVideoUrl] = useState(DEFAULT_VIDEO);
  const [showPreview, setShowPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      const SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognitionImpl) {
        throw new Error("Speech recognition is not supported in this browser");
      }

      const recognition = new SpeechRecognitionImpl();
      recognition.lang = "en-US";
      
      recognition.onresult = (event: SpeechRecognitionResultEvent) => {
        const transcript = event.results[0][0].transcript;
        setVideoUrl(transcript);
        toast({
          title: "Voice Input Received",
          description: "Your speech has been converted to text!",
        });
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
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
      {/* Brutalist Title with Glitch Effect */}
      <div 
        className="relative font-mono transform -rotate-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="text-7xl font-black mb-6 tracking-tight uppercase mix-blend-difference">
          <span className="relative inline-block transform hover:scale-105 transition-transform">
            <span className="absolute -inset-0.5 bg-gradient-to-r from-[#9b87f5] to-[#F97316] blur opacity-75"></span>
            <span className="relative text-white">VIDEO</span>
          </span>
          <span className="relative inline-block ml-2 transform hover:scale-105 transition-transform">
            <span className="absolute -inset-0.5 bg-gradient-to-r from-[#F97316] to-[#9b87f5] blur opacity-75"></span>
            <span className="relative text-white">SITCH</span>
          </span>
        </h1>
        {isHovered && (
          <div className="absolute -top-4 right-0 animate-bounce">
            <Sparkles className="w-8 h-8 text-[#9b87f5]" />
          </div>
        )}
      </div>

      {/* Brutalist Form */}
      <form onSubmit={handleSubmit} className="space-y-8 relative">
        <div className="flex gap-2 transform hover:rotate-0.5 transition-transform">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter YouTube video URL or speak your search"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="h-14 text-lg bg-[#2A2F3C] border-[#7E69AB]/30 pl-12"
            />
            <Video className="absolute left-4 top-4 text-muted-foreground" />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={startVoiceInput}
            className="h-14 w-14 border-[#7E69AB]/30 hover:border-[#9b87f5] hover:bg-[#2A2F3C] transition-colors"
          >
            <Mic className="h-6 w-6" />
          </Button>
          <Button 
            type="submit" 
            className="h-14 px-8 bg-[#9b87f5] hover:bg-[#7E69AB] transition-all transform hover:translate-x-0.5 hover:-translate-y-0.5"
          >
            <Upload className="mr-2 h-5 w-5" />
            Analyze
          </Button>
        </div>
      </form>

      {/* Floating Elements */}
      <div className="absolute -right-20 top-0 rotate-12 opacity-20 pointer-events-none">
        <div className="w-40 h-40 border-4 border-[#9b87f5] animate-pulse" />
      </div>
      <div className="absolute -left-16 bottom-0 -rotate-6 opacity-20 pointer-events-none">
        <div className="w-32 h-32 bg-[#F97316] mix-blend-overlay animate-bounce" />
      </div>

      {showPreview && !session && <AuthOverlay />}
    </div>
  );
};