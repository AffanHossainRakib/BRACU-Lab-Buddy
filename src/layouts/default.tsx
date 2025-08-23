import { Chip } from "@heroui/chip";
import { Github } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleGitHubClick = () => {
    window.open("https://github.com/AffanHossainRakib/", "_blank");
  };

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-6">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 pb-safe">
        <Chip
          startContent={<Github size={16} />}
          variant="flat"
          color="primary"
          className="cursor-pointer hover:bg-primary-100 transition-colors"
          onClick={handleGitHubClick}
        >
          Made by Affan Hossain Rakib
        </Chip>
      </footer>
      <Analytics />
    </div>
  );
}
