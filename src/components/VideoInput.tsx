import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Upload, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AuthOverlay } from "./AuthOverlay";
import { useSession } from "@supabase/auth-helpers-react";

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

  return (
    <div className="w-full max-w-3xl space-y-8 animate-fade-in relative">
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
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative">
        <div className="flex gap-2 transform hover:rotate-0.5 transition-transform">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Enter YouTube video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="h-14 text-lg bg-[#2A2F3C] border-[#7E69AB]/30 pl-12"
            />
            <Video className="absolute left-4 top-4 text-muted-foreground" />
          </div>
          <Button 
            type="submit" 
            className="h-14 px-8 bg-[#9b87f5] hover:bg-[#7E69AB] transition-all transform hover:translate-x-0.5 hover:-translate-y-0.5"
          >
            <Upload className="mr-2 h-5 w-5" />
            Analyze
          </Button>
        </div>
      </form>

      {showPreview && !session && <AuthOverlay />}
    </div>
  );
};