"use client";

import type React from "react";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function AdminSettingsPage() {
  const router = useRouter();
  const { currentUser } = useAppContext();
  const [settings, setSettings] = useState({
    regularSubscriptionPrice: 10,
    vipSubscriptionPrice: 20,
    allowNewRegistrations: true,
    enableChatFeature: true,
  });

  if (!currentUser || currentUser.role !== "admin") {
    router.push("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update logic
    console.log("Updated settings:", settings);
    toast({
      title: "Settings Updated",
      description: "The admin settings have been successfully updated.",
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
            <h1 className="text-2xl font-bold">Admin Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="regularPrice">
                  Regular Subscription Price ($)
                </Label>
                <Input
                  id="regularPrice"
                  type="number"
                  value={settings.regularSubscriptionPrice}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      regularSubscriptionPrice: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vipPrice">VIP Subscription Price ($)</Label>
                <Input
                  id="vipPrice"
                  type="number"
                  value={settings.vipSubscriptionPrice}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      vipSubscriptionPrice: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allowRegistrations">
                  Allow New Registrations
                </Label>
                <Switch
                  id="allowRegistrations"
                  checked={settings.allowNewRegistrations}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, allowNewRegistrations: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enableChat">Enable Chat Feature</Label>
                <Switch
                  id="enableChat"
                  checked={settings.enableChatFeature}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableChatFeature: checked })
                  }
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary text-white">
              Save Settings
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
