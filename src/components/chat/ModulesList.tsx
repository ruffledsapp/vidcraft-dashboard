import { Badge } from "@/components/ui/badge";
import { Brain, Crown, Loader2 } from "lucide-react";
import { AnalysisModule } from "./types";

interface ModulesListProps {
  modules: AnalysisModule[];
}

export const ModulesList = ({ modules }: ModulesListProps) => {
  return (
    <div className="flex gap-2">
      {modules.map((module) => (
        <Badge
          key={module.id}
          variant={module.status === "completed" ? "default" : "secondary"}
          className={`gap-1 ${
            module.isPro ? 'bg-gradient-to-r from-[#9b87f5] to-[#F97316] text-white' : ''
          }`}
        >
          {module.status === "running" ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : module.isPro ? (
            <Crown className="w-3 h-3" />
          ) : (
            <Brain className="w-3 h-3" />
          )}
          {module.name}
        </Badge>
      ))}
    </div>
  );
};