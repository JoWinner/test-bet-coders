"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface SubscriptionStatusProps {
  type: "regular" | "vip"
  expiryDate: Date
}

export function SubscriptionStatus({ type, expiryDate }: SubscriptionStatusProps) {
  const router = useRouter()

  const isExpired = expiryDate < new Date()
  const daysLeft = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="bg-white rounded-xl p-4 card-shadow">
      <CardHeader>
        <CardTitle>{type.toUpperCase()} Subscription</CardTitle>
        <CardDescription>{isExpired ? "Expired" : `${daysLeft} days left`}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full bg-primary text-white" onClick={() => router.push("/subscribe")}>
          {isExpired ? "Renew Subscription" : "Upgrade to VIP"}
        </Button>
      </CardContent>
    </Card>
  )
}

