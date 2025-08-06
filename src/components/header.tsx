import Link from "next/link";
import { Bot } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background border-b sticky top-0 z-50 overflow-hidden">
      <Link href="/" className="flex items-center justify-center gap-2 z-10 relative">
        <Bot className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg font-bold"> SPIKE Prime Guide</span>
      </Link>
      
      <div className="absolute right-20 top-1 h-full overflow-hidden">
        <Image 
          src="/models/ircctor-png.png" 
          alt="Circuit Board" 
          width={300} 
          height={300}
          className="opacity-100 rotate-12 translate-x-8 -translate-y-4 scale-[1]"
        />
      </div>
    </header>
  );
}