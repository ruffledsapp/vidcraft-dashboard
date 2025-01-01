import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Sparkles, Crown, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  text: string;
  sender: "user" | "system";
  timestamp: Date;
}

interface AnalysisModule {
  id: string;
  name: string;
  description: string;
  isPro: boolean;
  isRunning: boolean;
  status: "idle" | "running" | "completed" | "coming-soon";
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [modules, setModules] = useState<AnalysisModule[]>([
    {
      id: "demographics",
      name: "Demographics Analysis",
      description: "Understand your audience demographics",
      isPro: false,
      isRunning: false,
      status: "idle"
    },
    {
      id: "market-share",
      name: "Market Share Insights",
      description: "Analyze market positioning",
      isPro: false,
      isRunning: false,
      status: "idle"
    },
    {
      id: "video-overview",
      name: "Video Overview",
      description: "Get comprehensive video insights",
      isPro: false,
      isRunning: false,
      status: "idle"
    },
    {
      id: "neural-synthesis",
      name: "Neural Synthesis",
      description: "Advanced AI-powered creative analysis",
      isPro: true,
      isRunning: false,
      status: "coming-soon"
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate Gemini's response
      setTimeout(() => {
        const response: Message = {
          id: Date.now() + 1,
          text: "I'm analyzing your content with advanced AI algorithms. Feel free to chat while I process the modules! 🚀",
          sender: "system",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const runModule = (moduleId: string) => {
    setModules(prev => prev.map(mod => {
      if (mod.id === moduleId) {
        return { ...mod, isRunning: true, status: "running" };
      }
      return mod;
    }));

    // Simulate module completion
    setTimeout(() => {
      setModules(prev => prev.map(mod => {
        if (mod.id === moduleId) {
          return { ...mod, isRunning: false, status: "completed" };
        }
        return mod;
      }));

      const completionMessage: Message = {
        id: Date.now(),
        text: `✨ ${moduleId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} module has finished processing! The insights are being compiled...`,
        sender: "system",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, completionMessage]);
    }, 5000 + Math.random() * 5000);
  };

  const isAnyModuleRunning = modules.some(mod => mod.isRunning);

  return (
    <div className="flex flex-col h-full bg-secondary/50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Analysis Modules</h2>
        <div className="flex gap-2">
          {modules.map((module) => (
            <Badge
              key={module.id}
              variant={module.status === "completed" ? "default" : "secondary"}
              className={`gap-1 ${module.isPro ? 'bg-gradient-to-r from-[#9b87f5] to-[#F97316] text-white' : ''}`}
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
      </div>

      <ScrollArea className="flex-1 mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground ml-4"
                  : "bg-muted text-muted-foreground mr-4"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {modules.map((module) => (
            <Button
              key={module.id}
              onClick={() => !module.isPro && runModule(module.id)}
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

        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Chat with AI while analysis runs..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};