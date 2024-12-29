import { useSearchParams } from "react-router-dom";
import { VideoAnalytics } from "@/components/VideoAnalytics";
import { ChatInterface } from "@/components/ChatInterface";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const videoUrl = searchParams.get("url") || "";

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex gap-4 h-[calc(100vh-2rem)]">
        <div className="w-2/3 overflow-auto">
          <VideoAnalytics videoUrl={videoUrl} />
        </div>
        <div className="w-1/3">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;