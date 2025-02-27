"use client";

import type React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

export default function SubscribePage() {
  const router = useRouter();
  const { currentUser, subscribe } = useAppContext();
  const [subscriptionType, setSubscriptionType] = useState<"regular" | "vip">(
    "regular"
  );
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  if (!currentUser) {
    router.push("/login");
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await subscribe(subscriptionType, phoneNumber);
      toast({
        title: "Subscription Successful",
        description: `You are now subscribed to the ${subscriptionType} plan.`,
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description:
          "An error occurred while processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            <h1 className="text-2xl font-bold">Subscribe</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <form onSubmit={handleSubscribe} className="space-y-8">
            <div className="space-y-4">
              <Label>Subscription Type</Label>
              <RadioGroup
                value={subscriptionType}
                onValueChange={(value) =>
                  setSubscriptionType(value as "regular" | "vip")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regular" id="regular" />
                  <Label htmlFor="regular">Regular ($10/month)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vip" id="vip" />
                  <Label htmlFor="vip">VIP ($20/month)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative flex items-center justify-center gap-3 bg-[#FFD100] hover:bg-[#FFD100]/90 text-white font-medium py-1 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              <Image
                src="/mtn-momo.webp"
                alt="MTN MoMo"
                width={80}
                height={30}
                className="object-contain"
              />
              <span className="border-l border-black/20 pl-3">{isLoading ? "Processing..." : "Pay with MoMo"}</span>
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
