import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Chat with AI while analysis runs..."
        className="flex-1 bg-[#374151] border-[#4B5563] text-white placeholder-gray-400"
      />
      <Button 
        type="submit"
        className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
      >
        Send
      </Button>
    </form>
  );
};