import { VideoInput } from "@/components/VideoInput";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingTitles from "@/components/FloatingTitles";
import { AnalysisHistory } from "@/components/AnalysisHistory";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A1F2C] p-4 pt-16 pb-12">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#9b87f5,#F97316)] opacity-5 blur-3xl">
            <div className="absolute inset-0 animate-pulse" style={{ animationDuration: "10s" }} />
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="w-full max-w-5xl mx-auto mb-16 text-center">
          <h1 className="text-7xl font-black mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#F97316]">
              ANALYZE YOUR
            </span>
            <br />
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-[#9b87f5] to-[#F97316] blur-lg opacity-50"></span>
              <span className="relative text-white">VIDEO CONTENT</span>
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Unlock the full potential of your video content with AI-powered analytics and insights.
          </p>
          <Button 
            size="lg" 
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold"
          >
            <UserPlus className="mr-2" />
            Create Free Account
          </Button>
        </div>

        <div className="container mx-auto flex flex-col items-center gap-12 relative z-10">
          <VideoInput />
          <FloatingTitles onTitleClick={(title) => setVideoUrl(title)} />
          <AnalysisHistory />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;