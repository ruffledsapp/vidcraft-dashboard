import { useEffect, useState } from "react";

const sampleTitles = [
  "10 Secrets to Viral YouTube Success",
  "Ultimate Guide to Content Creation",
  "How I Gained 1M Subscribers in 30 Days",
  "The Perfect YouTube Algorithm Strategy",
  "Behind the Scenes of Viral Videos",
  "YouTube SEO Mastery Guide",
  "Content Creation Tips & Tricks",
  "Viral Video Formula Revealed",
  "YouTube Success Story 2024",
  "How to Create Trending Content",
  "YouTube Analytics Explained",
  "Growing Your Channel Fast",
];

const FloatingTitles = ({ onTitleClick }: { onTitleClick: (title: string) => void }) => {
  const [rows, setRows] = useState<string[][]>([[], [], []]);

  useEffect(() => {
    // Distribute titles across 3 rows
    const shuffled = [...sampleTitles].sort(() => Math.random() - 0.5);
    const rowSize = Math.ceil(shuffled.length / 3);
    setRows([
      shuffled.slice(0, rowSize),
      shuffled.slice(rowSize, rowSize * 2),
      shuffled.slice(rowSize * 2),
    ]);
  }, []);

  return (
    <div className="w-full overflow-hidden py-8">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`flex gap-8 py-2 animate-scroll whitespace-nowrap ${
            i % 2 === 0 ? "justify-start" : "justify-end"
          }`}
          style={{
            animation: `scroll${i % 2 === 0 ? "Left" : "Right"} ${30 + i * 5}s linear infinite`,
          }}
        >
          {row.map((title, j) => (
            <button
              key={j}
              onClick={() => onTitleClick(title)}
              className="px-4 py-2 rounded-full bg-[#7E69AB]/10 hover:bg-[#7E69AB]/20 text-[#9b87f5] transition-colors cursor-pointer whitespace-nowrap"
            >
              {title}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FloatingTitles;