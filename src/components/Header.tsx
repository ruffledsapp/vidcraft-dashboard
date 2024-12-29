import { Video } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1A1F2C] border-b border-[#7E69AB]/20 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6 text-[#9b87f5]" />
          <span className="font-bold text-xl bg-gradient-to-r from-[#9b87f5] to-[#F97316] bg-clip-text text-transparent">
            VideoSich
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-[#9b87f5] transition-colors">Dashboard</a>
          <a href="#" className="hover:text-[#9b87f5] transition-colors">Analytics</a>
          <a href="#" className="hover:text-[#9b87f5] transition-colors">Help</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;