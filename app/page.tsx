"use client";

import { Bell, LogOut, Home, TicketMinus,  MessagesSquare, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { BetcodeCard } from "@/components/betcode-card";
import { FreePredictionCard } from "@/components/free-prediction-card";
import { SubscriptionStatus } from "@/components/subscription-status";

export default function HomePage() {
  const router = useRouter();
  const { currentUser, betcodes, logout, freePredictions } = useAppContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [latestBetcodes, setLatestBetcodes] = useState([]);
  const [latestPredictions, setLatestPredictions] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else {
      const filteredBetcodes = betcodes
        .filter((betcode) => betcode.type === currentUser.subscriptionType)
        .slice(0, 2);
      setLatestBetcodes(filteredBetcodes);

      const filteredPredictions = freePredictions.slice(0, 2);
      setLatestPredictions(filteredPredictions);
    }
  }, [currentUser, betcodes, router, freePredictions]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    router.push("/login");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/profile">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">
                  {currentUser.username[0].toUpperCase()}
                </span>
              </div>
              </Link>
              <div>
                <h1 className="text-lg font-medium">BetCode</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome, {currentUser.username}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => router.push("/notifications")}
              >
                <Bell className="w-6 h-6 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="w-6 h-6 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pb-32 space-y-8">
        <SubscriptionStatus
          type={currentUser.subscriptionType}
          expiryDate={new Date(currentUser.subscriptionExpiryDate)}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Latest Betcodes</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => router.push("/betcodes")}
            >
              See All
            </Button>
          </div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {latestBetcodes.map((betcode) => (
              <motion.div
                key={betcode.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <BetcodeCard betcode={betcode} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Latest Predictions</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => router.push("/free-predictions")}
            >
              See All
            </Button>
          </div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {latestPredictions.map((prediction) => (
              <motion.div
                key={prediction.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <FreePredictionCard prediction={prediction} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-border">
        <div className="max-w-xl mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <Link href="/">
              <Button
                variant="ghost"
                className="flex flex-col items-center"
              >
                <Home fill="#9400d3" strokeWidth={0}/>
              </Button>
            </Link>
            <Link href="/chat">
            <Button
                variant="ghost"
                className="flex flex-col items-center "
              >
                <MessageSquare fill="#9400d3" strokeWidth={0}/>
              </Button>
            </Link>
            <Link href="/subscription-history">
            <Button
                variant="ghost"
                className="flex flex-col items-center"
              >
                <TicketMinus fill="#9400d3" strokeWidth={0}/>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
