import { Chip } from "@heroui/chip";
import { Github } from "lucide-react";
import { Alert } from "@heroui/alert";
import { useState } from "react";

import { Navbar } from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showToast1, setShowToast1] = useState(() => {
    const cached = localStorage.getItem('toast1-dismissed');
    return cached !== 'true';
  });
  const [showToast2, setShowToast2] = useState(() => {
    const cached = localStorage.getItem('toast2-dismissed');
    return cached !== 'true';
  });

  const handleGitHubClick = () => {
    window.open("https://github.com/AffanHossainRakib/", "_blank");
  };

  const handleToast1Close = () => {
    setShowToast1(false);
    localStorage.setItem('toast1-dismissed', 'true');
  };

  const handleToast2Close = () => {
    setShowToast2(false);
    localStorage.setItem('toast2-dismissed', 'true');
  };

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />

      {/* Toast notifications */}
      <div className="container mx-auto max-w-7xl px-6 pt-4 space-y-2">
        {showToast1 && (
          <Alert
            color="primary"
            title="Last Updated Fall 2025"
            isClosable
            onClose={handleToast1Close}
          />
        )}
        {showToast2 && (
          // This alert will have a link which will be redirected to the new domain
          <Alert
            color="warning"
            title="We are moving to a new domain!"
            description={`Click here to visit the new site. 
              https://bracu-lab-buddy.pages.dev/`}

            onClick={() =>
              window.open("https://bracu-lab-buddy.pages.dev/", "_blank", "noopener noreferrer")
            }
            className="cursor-pointer"
            isClosable
            onClose={handleToast2Close}
          />
        )}
      </div>

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
