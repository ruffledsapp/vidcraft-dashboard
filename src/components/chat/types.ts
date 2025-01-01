export interface Message {
  id: number;
  text: string;
  sender: "user" | "system";
  timestamp: Date;
}

export interface AnalysisModule {
  id: string;
  name: string;
  description: string;
  isPro: boolean;
  isRunning: boolean;
  status: "idle" | "running" | "completed" | "coming-soon";
}