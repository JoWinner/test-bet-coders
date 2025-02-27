"use client";

import type React from "react";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser } = useAppContext();
  const [profile, setProfile] = useState({
    username: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (currentUser) {
      setProfile({
        username: currentUser.username,
        phoneNumber: currentUser.phoneNumber,
      });
    } else {
      router.push("/login");
    }
  }, [currentUser, router]);

  const handleChange =
    (field: keyof typeof profile) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfile((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log("Profile data:", profile);
  };

  if (!currentUser) {
    return null;
  }

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
            <h1 className="text-2xl font-semibold">Profile</h1>
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
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={handleChange("username")}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={profile.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary text-white">
              Save Profile
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
