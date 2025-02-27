"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

export default function NotificationsPage() {
  const router = useRouter();
  const { currentUser, notifications, markNotificationAsRead } =
    useAppContext();

  if (!currentUser) {
    router.push("/login");
    return null;
  }

  // Changed filtering logic to match the mock data structure
  const userNotifications = notifications
    .filter(
      (notification) =>
        // Include notifications for the current user or if no userId is specified
        !notification.userId || notification.userId === currentUser.username
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {userNotifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          <motion.div
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
            className="space-y-4"
          >
            {userNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={`p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  !notification.isRead ? "border-l-4 border-primary" : ""
                }`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()} at{" "}
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
