import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "./types";

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 mb-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.sender === "user"
                ? "bg-[#9b87f5] text-white ml-4"
                : "bg-[#374151] text-gray-200 mr-4"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};