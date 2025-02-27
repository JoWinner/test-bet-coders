"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { BetcodeCard } from "@/components/betcode-card";

export default function BetcodeHistoryPage() {
  const router = useRouter();
  const { currentUser, betcodes } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (!currentUser || currentUser.role !== "admin") {
    router.push("/");
    return null;
  }

  const filteredBetcodes = betcodes.filter(
    (betcode) =>
      betcode.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">Betcode History</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="search">Search Betcodes</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter betcode or description..."
            />
          </div>

          <div className="space-y-4">
            {filteredBetcodes.map((betcode) => (
              <BetcodeCard key={betcode.id} betcode={betcode} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
