"use client";

import { ArrowLeft, Users, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { currentUser, users, betcodes } = useAppContext();

  // In the admin page:
console.log("Current user in admin page:", currentUser);
console.log("User role:", currentUser?.role);

  if (!currentUser || currentUser.role !== "admin") {
    router.push("/");
    return null;
  }

  const activeUsers = users.filter((user) => !user.isSuspended).length;
  const totalRevenue = users.reduce((sum, user) => {
    return sum + (user.subscriptionType === "vip" ? 20 : 10);
  }, 0);
  const totalBetcodes = betcodes.length;

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
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeUsers}</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue}</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Betcodes
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBetcodes}</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Admin Actions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/admin/send-betcode">
              <Button className="w-full">Send Betcode</Button>
            </Link>
            <Link href="/admin/manage-users">
              <Button className="w-full">Manage Users</Button>
            </Link>
            <Link href="/admin/betcode-history">
              <Button className="w-full">Betcode History</Button>
            </Link>
            <Link href="/admin/settings">
              <Button className="w-full">Admin Settings</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
