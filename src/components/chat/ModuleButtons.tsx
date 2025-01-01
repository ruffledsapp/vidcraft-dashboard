import { Button } from "@/components/ui/button";
import { Brain, ChartBar, Users, TrendingUp } from "lucide-react";
import type { AnalysisModule } from "./types";

interface ModuleButtonsProps {
  modules: AnalysisModule[];
  onRunModule: (moduleId: string) => void;
}

export const ModuleButtons = ({ modules, onRunModule }: ModuleButtonsProps) => {
  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case "demographics":
        return Users;
      case "market-share":
        return TrendingUp;
      case "video-overview":
        return ChartBar;
      default:
        return Brain;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {modules.map((module) => {
        const Icon = getModuleIcon(module.id);
        return (
          <Button
            key={module.id}
            onClick={() => onRunModule(module.id)}
            disabled={module.isRunning || module.status === "coming-soon"}
            className={`gap-2 ${
              module.isRunning
                ? "bg-[#7E69AB] animate-pulse"
                : module.status === "coming-soon"
                ? "bg-gradient-to-r from-[#2A2F3C] to-[#1F2937] opacity-75"
                : "bg-[#9b87f5] hover:bg-[#7E69AB]"
            }`}
          >
            <Icon className="w-4 h-4" />
            {module.name}
            {module.status === "coming-soon" && (
              <span className="text-xs opacity-75">(Coming Soon)</span>
            )}
          </Button>
        );
      })}
    </div>
  );
};