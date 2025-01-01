import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Lock } from "lucide-react";

interface AnalysisProgressProps {
  currentStep: string;
  progress: number;
  isAuthenticated: boolean;
}

export const AnalysisProgress = ({ 
  currentStep, 
  progress, 
  isAuthenticated 
}: AnalysisProgressProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Analyzing Video</h2>
            {!isAuthenticated && (
              <Badge variant="outline" className="gap-1">
                <Lock className="w-3 h-3" />
                Limited Preview
              </Badge>
            )}
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4" />
            <span>{currentStep}</span>
          </div>
          
          {!isAuthenticated && (
            <div className="bg-muted/50 p-4 rounded-lg text-sm">
              <p className="text-muted-foreground">
                Sign up to access full analysis results and advanced features.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};