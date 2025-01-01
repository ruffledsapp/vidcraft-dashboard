import { useState } from "react";
import { ModulesList } from "./chat/ModulesList";
import { MessageList } from "./chat/MessageList";
import { ModuleButtons } from "./chat/ModuleButtons";
import { MessageInput } from "./chat/MessageInput";
import { useGeminiResponse } from "./chat/useGeminiResponse";
import type { Message, AnalysisModule } from "./chat/types";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [modules, setModules] = useState<AnalysisModule[]>([
    {
      id: "demographics",
      name: "Demographics Analysis",
      description: "Understanding your audience demographics",
      isPro: false,
      isRunning: false,
      status: "idle"
    },
    {
      id: "market-share",
      name: "Market Share Insights",
      description: "Analyzing market positioning",
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

  const { generateResponse } = useGeminiResponse();

  const runModule = async (moduleId: string) => {
    // Update module status
    setModules(prev => prev.map(mod => 
      mod.id === moduleId ? { ...mod, isRunning: true, status: "running" } : mod
    ));

    // Add thinking message
    const thinkingMessage: Message = {
      id: Date.now(),
      text: await generateResponse(moduleId),
      sender: "system",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, thinkingMessage]);

    // Simulate module completion
    setTimeout(() => {
      setModules(prev => prev.map(mod => 
        mod.id === moduleId ? { ...mod, isRunning: false, status: "completed" } : mod
      ));

      const completionMessage: Message = {
        id: Date.now() + 1,
        text: `✨ ${moduleId.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} analysis complete! 
          Insights are being compiled...`,
        sender: "system",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, completionMessage]);
    }, 5000 + Math.random() * 5000);
  };

  const handleSendMessage = async (newMessage: string) => {
    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, message]);

    // Generate AI response
    setTimeout(async () => {
      const response: Message = {
        id: Date.now() + 1,
        text: await generateResponse("chat"),
        sender: "system",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#2A2F3C] to-[#1F2937] rounded-lg p-4 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Analysis Modules</h2>
        <ModulesList modules={modules} />
      </div>

      <MessageList messages={messages} />

      <div className="space-y-4">
        <ModuleButtons modules={modules} onRunModule={runModule} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};