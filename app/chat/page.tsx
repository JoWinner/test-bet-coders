"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ChatPage() {
  const router = useRouter();
  const { currentUser, messages, sendMessage } = useAppContext();
  const [newMessage, setNewMessage] = useState("");

  if (!currentUser) {
    router.push("/login");
    return null;
  }

  const handleSendMessage = (type: "regular" | "vip") => {
    if (newMessage.trim()) {
      sendMessage(newMessage.trim(), type);
      setNewMessage("");
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
            <h1 className="text-2xl font-bold">Chat</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue={currentUser.subscriptionType} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="regular">Regular Chat</TabsTrigger>
            <TabsTrigger
              value="vip"
              disabled={currentUser.subscriptionType !== "vip"}
            >
              VIP Chat
            </TabsTrigger>
          </TabsList>
          <TabsContent value="regular">
            <motion.div
              className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto p-4"
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
              {messages.regular.map((message) => (
                <motion.div
                  key={message.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`flex ${
                    message.senderId === currentUser.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderId === currentUser.id
                        ? "bg-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex gap-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage("regular")
                }
              />
              <Button onClick={() => handleSendMessage("regular")}>Send</Button>
            </div>
          </TabsContent>
          <TabsContent value="vip">
            <motion.div
              className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto p-4"
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
              {messages.vip.map((message) => (
                <motion.div
                  key={message.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`flex ${
                    message.senderId === currentUser.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderId === currentUser.id
                        ? "bg-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex gap-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage("vip")
                }
              />
              <Button onClick={() => handleSendMessage("vip")}>Send</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
