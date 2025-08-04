import Link from "next/link";
import { Bot } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background border-b sticky top-0 z-50">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Bot className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg font-bold">SPIKE Prime Guide</span>
      </Link>
    </header>
  );
}
