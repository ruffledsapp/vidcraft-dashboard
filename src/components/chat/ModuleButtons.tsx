import { Button } from "@/components/ui/button";
import { Crown, Loader2, Sparkles } from "lucide-react";
import { AnalysisModule } from "./types";

interface ModuleButtonsProps {
  modules: AnalysisModule[];
  onRunModule: (moduleId: string) => void;
}

export const ModuleButtons = ({ modules, onRunModule }: ModuleButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {modules.map((module) => (
        <Button
          key={module.id}
          onClick={() => !module.isPro && onRunModule(module.id)}
          disabled={module.isPro || module.isRunning || module.status === "completed"}
          className={`relative overflow-hidden ${
            module.status === "coming-soon" 
              ? "bg-gradient-to-r from-[#9b87f5] to-[#F97316] text-white"
              : ""
          }`}
        >
          {module.status === "running" ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : module.isPro ? (
            <Crown className="w-4 h-4 mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          {module.name}
          {module.status === "coming-soon" && (
            <span className="absolute top-0 right-0 bg-[#F97316] px-2 py-0.5 text-xs rounded-bl-md">
              Coming Soon
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};