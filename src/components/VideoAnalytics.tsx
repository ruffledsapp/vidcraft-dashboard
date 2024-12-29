import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, Sparkles } from "lucide-react";

export const VideoAnalytics = ({ videoUrl }: { videoUrl: string }) => {
  const navigate = useNavigate();
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const toggleModule = (moduleName: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleName) 
        ? prev.filter(m => m !== moduleName)
        : [...prev, moduleName]
    );
    console.log(`Module ${moduleName} toggled`);
  };

  const modules = [
    { id: 'demographics', title: 'Demographics', isPro: false },
    { id: 'market-share', title: 'Market Share', isPro: false },
    { id: 'video-overview', title: 'Video Overview', isPro: false },
    { id: 'concept-breakdown', title: 'Concept Breakdown', isPro: true },
    { id: 'video-essence', title: 'Video Essence', isPro: true },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
              selectedModules.includes(module.id)
                ? 'ring-2 ring-[#9b87f5] shadow-lg shadow-[#9b87f5]/20'
                : ''
            }`}
            onClick={() => toggleModule(module.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">
                {module.title}
              </CardTitle>
              {module.isPro && (
                <Badge 
                  variant="secondary" 
                  className="bg-gradient-to-r from-[#9b87f5] to-[#F97316] text-white"
                >
                  <Crown className="w-3 h-3 mr-1" />
                  PRO
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {selectedModules.includes(module.id) 
                  ? "Click to deselect this module"
                  : "Click to select this module for analysis"}
              </p>
              {module.isPro && (
                <div className="mt-2 flex items-center gap-1 text-sm text-[#9b87f5]">
                  <Sparkles className="w-3 h-3" />
                  Advanced AI-powered analysis
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedModules.length > 0 && (
        <Card className="mt-6 bg-gradient-to-r from-[#1A1F2C] to-[#2A2F3C] border-[#7E69AB]/20">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Selected modules: {selectedModules.length}
              <br />
              Ready to analyze using Google Cloud Video Intelligence API and Gemini API for enhanced results.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};