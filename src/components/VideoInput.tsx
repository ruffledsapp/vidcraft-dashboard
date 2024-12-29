import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const VideoInput = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl) {
      navigate(`/dashboard?url=${encodeURIComponent(videoUrl)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-8">YouTube Video Analyzer</h1>
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter YouTube video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit">Analyze</Button>
      </div>
    </form>
  );
};