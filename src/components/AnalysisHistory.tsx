import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, PlayCircle, CheckCircle2, XCircle } from "lucide-react";

export const AnalysisHistory = () => {
  const { data: analyses, isLoading } = useQuery({
    queryKey: ["video-analyses"],
    queryFn: async () => {
      console.log("Fetching video analyses history...");
      const { data, error } = await supabase
        .from("video_analyses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching analyses:", error);
        throw error;
      }
      
      console.log("Fetched analyses:", data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Analysis History</h2>
      {analyses?.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              No analysis history yet. Try analyzing a video!
            </p>
          </CardContent>
        </Card>
      ) : (
        analyses?.map((analysis) => (
          <Card key={analysis.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-muted-foreground" />
                  <span className="truncate max-w-[300px]">{analysis.video_url}</span>
                </div>
                <StatusBadge status={analysis.status} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Clock className="w-4 h-4" />
                <time>
                  {new Date(analysis.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.modules_selected.map((module) => (
                  <Badge key={module} variant="secondary">
                    {module}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          variant: "success" as const,
          icon: CheckCircle2,
        };
      case "failed":
        return {
          label: "Failed",
          variant: "destructive" as const,
          icon: XCircle,
        };
      default:
        return {
          label: "Processing",
          variant: "secondary" as const,
          icon: Clock,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};