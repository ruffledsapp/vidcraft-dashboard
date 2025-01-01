import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Sparkles, Brain, ChartBar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhyUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-8">
      <div className="max-w-6xl mx-auto space-y-16 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-7xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#F97316]">
              TRANSFORM YOUR
            </span>
            <br />
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-[#9b87f5] to-[#F97316] blur-lg opacity-50"></span>
              <span className="relative text-white">VIDEO CONTENT</span>
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Unlock deep insights and market intelligence with our AI-powered video analysis platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 bg-card/50 backdrop-blur border-[#7E69AB]/30 hover:border-[#9b87f5] transition-colors">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-[#9b87f5]/20 flex items-center justify-center">
                <Brain className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold">Video Overview</h3>
              <p className="text-muted-foreground">
                Get comprehensive insights about your video's performance and reach.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-[#7E69AB]/30 hover:border-[#9b87f5] transition-colors">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-[#9b87f5]/20 flex items-center justify-center">
                <ChartBar className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold">Market Share Analysis</h3>
              <p className="text-muted-foreground">
                Understand your content's position in the market landscape.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-[#7E69AB]/30 hover:border-[#9b87f5] transition-colors">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-[#9b87f5]/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-[#9b87f5]" />
              </div>
              <h3 className="text-xl font-bold">Concept Breakdown</h3>
              <p className="text-muted-foreground">
                Deep dive into the themes and concepts within your content.
              </p>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8">
          <div className="inline-block">
            <Button 
              size="lg" 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold group"
              onClick={() => navigate("/signup")}
            >
              <Crown className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;