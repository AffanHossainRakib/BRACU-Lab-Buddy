import { Chip } from "@heroui/chip";
import { Github } from "lucide-react";
import { Alert } from "@heroui/alert";
import { useState, useEffect } from "react";

import { Navbar } from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showToast1, setShowToast1] = useState(() => {
    const cached = sessionStorage.getItem("toast1-dismissed");
    return cached !== "true";
  });
  // const [showToast2, setShowToast2] = useState(() => {
  //   const cached = sessionStorage.getItem("toast2-dismissed");
  //   return cached !== "true";
  // });
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-10-18T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown("Domain has moved!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGitHubClick = () => {
    window.open("https://github.com/AffanHossainRakib/", "_blank");
  };

  const handleToast1Close = () => {
    setShowToast1(false);
    sessionStorage.setItem("toast1-dismissed", "true");
  };

  // const handleToast2Close = () => {
  //   setShowToast2(false);
  //   sessionStorage.setItem("toast2-dismissed", "true");
  // };

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
        {/* {showToast2 && (
          // This alert will have a link which will be redirected to the new domain
          <Alert
            color="warning"
            title={`We are moving to a new domain in ${countdown}`}
            description={`Click here to visit the new site: https://bracu-lab-buddy.pages.dev/
      `} */}
            onClick={() =>
              window.open(
                "https://bracu-lab-buddy.pages.dev/",
                "_blank",
                "noopener noreferrer"
              )
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
