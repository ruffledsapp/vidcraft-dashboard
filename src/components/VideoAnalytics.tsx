import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const VideoAnalytics = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Demographics analysis coming soon...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Market share analysis coming soon...</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Video Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Detailed video analysis coming soon...</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Concept Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Content concept analysis coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};