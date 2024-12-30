import { VideoInput } from "@/components/VideoInput";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingTitles from "@/components/FloatingTitles";
import { AnalysisHistory } from "@/components/AnalysisHistory";
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