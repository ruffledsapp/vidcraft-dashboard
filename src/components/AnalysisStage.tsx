import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { AnalysisPipeline } from "./AnalysisPipeline";
import { useToast } from "@/components/ui/use-toast";

export const AnalysisStage = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const { toast } = useToast();

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setChatExpanded(true);
    toast({
      title: "Analysis Started",
      description: "Your video is being analyzed with the selected modules...",
      duration: 3000,
    });
  };

  return (
    <div className="flex gap-4 h-full">
      <div className={`transition-all duration-500 ${
        chatExpanded ? 'w-2/3' : 'w-1/3'
      }`}>
        <ChatInterface />
      </div>
      
      <div className={`transition-all duration-500 ${
        chatExpanded ? 'w-1/3' : 'w-2/3'
      }`}>
        {!isAnalyzing ? (
          <div className="space-y-4">
            <AnalysisPipeline onModuleSelect={handleModuleSelect} />
            <Button
              onClick={handleStartAnalysis}
              disabled={selectedModules.length === 0}
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-all transform hover:scale-105"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Start Analysis
              <Sparkles className="ml-2 h-4 w-4 animate-pulse" />
            </Button>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            {/* Replace with your JSON animation component */}
            <div className="text-4xl animate-bounce">
              <Sparkles className="h-16 w-16 text-[#9b87f5]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};