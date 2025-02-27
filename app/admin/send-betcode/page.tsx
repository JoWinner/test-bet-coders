"use client";

import type React from "react";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BETTING_PLATFORMS = [
  {
    id: "sportybet-ng",
    name: "SportyBet",
    logo: "/sportybet-logo.png",
    country: "ng",
  },
  {
    id: "sportybet-gh",
    name: "SportyBet",
    logo: "/sportybet-logo.png",
    country: "gh",
  },
  { id: "msport", name: "M SPORT", logo: "/msport-logo.png" },
  { id: "bet9ja", name: "Bet9ja", logo: "/bet9ja-logo.png" },
];

const LEAGUES = [
  { id: "epl", name: "Premier League", flag: "gb-eng" },
  { id: "laliga", name: "LaLiga", flag: "es" },
  { id: "bundesliga", name: "Bundesliga", flag: "de" },
  { id: "seriea", name: "Serie A", flag: "it" },
  { id: "ligue1", name: "Ligue 1", flag: "fr" },
];

export default function SendBetcodePage() {
  const router = useRouter();
  const { currentUser, sendBetcode } = useAppContext();
  const [activeTab, setActiveTab] = useState("betcode");

  const [betcodeData, setBetcodeData] = useState({
    platform: "",
    code: "",
    odds: "",
    type: "regular" as "regular" | "vip",
  });

  const [predictionData, setPredictionData] = useState({
    league: "",
    homeTeam: "",
    awayTeam: "",
    prediction: "",
    odds: "",
    date: "",
  });

  if (!currentUser || currentUser.role !== "admin") {
    router.push("/");
    return null;
  }

  const handleBetcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const platform = BETTING_PLATFORMS.find(
      (p) => p.id === betcodeData.platform
    );
    if (!platform) return;

    sendBetcode({
      platform,
      code: betcodeData.code,
      odds: Number.parseFloat(betcodeData.odds),
      type: betcodeData.type,
    });

    toast({
      title: "Betcode Sent",
      description: `The betcode has been sent to ${betcodeData.type} subscribers.`,
    });
    setBetcodeData({ platform: "", code: "", odds: "", type: "regular" });
  };

  const handlePredictionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle free prediction submission
    toast({
      title: "Prediction Sent",
      description: "The free prediction has been published.",
    });
    setPredictionData({
      league: "",
      homeTeam: "",
      awayTeam: "",
      prediction: "",
      odds: "",
      date: "",
    });
  };

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
            <h1 className="text-2xl font-bold">Send Betcode</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="betcode">Booking Code</TabsTrigger>
              <TabsTrigger value="prediction">Free Prediction</TabsTrigger>
            </TabsList>

            <TabsContent value="betcode">
              <form onSubmit={handleBetcodeSubmit} className="space-y-8">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Betting Platform</Label>
                    <Select
                      value={betcodeData.platform}
                      onValueChange={(value) =>
                        setBetcodeData({ ...betcodeData, platform: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {BETTING_PLATFORMS.map((platform) => (
                          <SelectItem key={platform.id} value={platform.id}>
                            {platform.name}{" "}
                            {platform.country &&
                              `(${platform.country.toUpperCase()})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="code">Booking Code</Label>
                    <Input
                      id="code"
                      value={betcodeData.code}
                      onChange={(e) =>
                        setBetcodeData({ ...betcodeData, code: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="odds">Odds</Label>
                    <Input
                      id="odds"
                      type="number"
                      step="0.01"
                      value={betcodeData.odds}
                      onChange={(e) =>
                        setBetcodeData({ ...betcodeData, odds: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Subscription Type</Label>
                    <RadioGroup
                      value={betcodeData.type}
                      onValueChange={(value) =>
                        setBetcodeData({
                          ...betcodeData,
                          type: value as "regular" | "vip",
                        })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="regular" />
                        <Label htmlFor="regular">Regular</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vip" id="vip" />
                        <Label htmlFor="vip">VIP</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-white">
                  Send Betcode
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="prediction">
              <form onSubmit={handlePredictionSubmit} className="space-y-8">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>League</Label>
                    <Select
                      value={predictionData.league}
                      onValueChange={(value) =>
                        setPredictionData({ ...predictionData, league: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select league" />
                      </SelectTrigger>
                      <SelectContent>
                        {LEAGUES.map((league) => (
                          <SelectItem key={league.id} value={league.id}>
                            {league.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="homeTeam">Home Team</Label>
                    <Input
                      id="homeTeam"
                      value={predictionData.homeTeam}
                      onChange={(e) =>
                        setPredictionData({
                          ...predictionData,
                          homeTeam: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="awayTeam">Away Team</Label>
                    <Input
                      id="awayTeam"
                      value={predictionData.awayTeam}
                      onChange={(e) =>
                        setPredictionData({
                          ...predictionData,
                          awayTeam: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="prediction">Prediction</Label>
                    <Input
                      id="prediction"
                      value={predictionData.prediction}
                      onChange={(e) =>
                        setPredictionData({
                          ...predictionData,
                          prediction: e.target.value,
                        })
                      }
                      placeholder="e.g. Home team to win"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="predictionOdds">Odds</Label>
                    <Input
                      id="predictionOdds"
                      type="number"
                      step="0.01"
                      value={predictionData.odds}
                      onChange={(e) =>
                        setPredictionData({
                          ...predictionData,
                          odds: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="date">Match Date</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={predictionData.date}
                      onChange={(e) =>
                        setPredictionData({
                          ...predictionData,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-white">
                  Send Free Prediction
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
