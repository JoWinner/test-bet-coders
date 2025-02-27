"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function ManageUsersPage() {
  const router = useRouter();
  const { currentUser, users, suspendUser, setUserAsModerator } =
    useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (!currentUser || currentUser.role !== "admin") {
    router.push("/");
    return null;
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSuspendUser = (userId: string) => {
    suspendUser(userId);
    toast({
      title: "User Status Updated",
      description: "The user's suspension status has been toggled.",
    });
  };

  const handleSetModerator = (userId: string) => {
    setUserAsModerator(userId);
    toast({
      title: "User Role Updated",
      description: "The user's moderator status has been toggled.",
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
            <h1 className="text-2xl font-bold">Manage Users</h1>
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
            <Label htmlFor="search">Search Users</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter username..."
            />
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.subscriptionType} subscriber
                  </p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSuspendUser(user.id)}
                  >
                    {user.isSuspended ? "Unsuspend" : "Suspend"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSetModerator(user.id)}
                  >
                    {user.role === "moderator"
                      ? "Remove Moderator"
                      : "Make Moderator"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
