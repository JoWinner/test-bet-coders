"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionHistoryPage() {
  const router = useRouter();
  const { currentUser, subscriptionHistory } = useAppContext();

  if (!currentUser) {
    router.push("/login");
    return null;
  }

  // Changed filtering logic to match the mock data structure
  const userHistory = subscriptionHistory.filter(
    (history) => history.userId === currentUser.username
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
            <h1 className="text-2xl font-bold">Subscription History</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {userHistory.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No subscription history found
          </div>
        ) : (
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
            {userHistory.map((subscription) => (
              <motion.div
                key={subscription.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="capitalize">
                        {subscription.type} Subscription
                      </CardTitle>
                      <Badge
                        variant={
                          subscription.payment.status === "completed"
                            ? "success"
                            : subscription.payment.status === "pending"
                            ? "warning"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {subscription.payment.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {new Date(subscription.startDate).toLocaleDateString()} -{" "}
                      {new Date(subscription.endDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-medium">
                          ${subscription.payment.amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Transaction ID
                        </span>
                        <span className="font-medium">
                          {subscription.payment.transactionId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Payment Date
                        </span>
                        <span className="font-medium">
                          {new Date(
                            subscription.payment.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
