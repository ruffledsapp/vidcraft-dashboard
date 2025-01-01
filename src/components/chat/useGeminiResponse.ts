import { supabase } from "@/integrations/supabase/client";

export const useGeminiResponse = () => {
  const generateResponse = async (moduleId: string) => {
    try {
      // Fetch Gemini API key from video_analyses table
      const { data: analysisData, error: analysisError } = await supabase
        .from('video_analyses')
        .select('*')
        .single();
      
      if (analysisError) {
        console.error("Error fetching analysis data:", analysisError);
        return "Error processing analysis. Please try again.";
      }

      // Module-specific responses
      const moduleResponses: Record<string, string> = {
        demographics: "📊 Analyzing viewer demographics and engagement patterns...",
        "market-share": "📈 Examining market positioning and competitive landscape...",
        "video-overview": "🎥 Processing comprehensive video content analysis...",
        "neural-synthesis": "🧠 Initializing neural pattern recognition (Coming Soon)..."
      };

      return moduleResponses[moduleId] || "🔍 Processing advanced analysis...";
    } catch (error) {
      console.error("Error in Gemini response:", error);
      return "Error processing analysis. Please try again.";
    }
  };

  return { generateResponse };
};