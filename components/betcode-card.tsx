import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Betcode } from "@/types";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

interface BetcodeCardProps {
  betcode: Betcode;
}

export function BetcodeCard({ betcode }: BetcodeCardProps) {
  const timeAgo = formatDistanceToNow(new Date(betcode.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="bg-white hover:shadow-lg transition-shadow">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {betcode.platform.logo && (
              <div className="relative w-24 h-8">
                <Image
                  src={betcode.platform.logo}
                  alt={betcode.platform.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
          <span className="text-sm text-muted-foreground">{timeAgo}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg font-mono font-medium tracking-wider">
              {betcode.code}
            </p>
            <p className="text-sm text-muted-foreground">Booking Code</p>
          </div>
          <Badge
            variant={
              betcode.status === "won"
                ? "success"
                : betcode.status === "lost"
                ? "destructive"
                : "outline"
            }
            className="capitalize"
          >
            {betcode.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm font-medium text-muted-foreground">
            Odds
          </span>
          <span className="text-lg font-bold text-primary">
            {betcode.odds}'
          </span>
        </div>
      </div>
    </Card>
  );
}
