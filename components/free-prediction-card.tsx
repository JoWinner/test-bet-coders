import { Card } from "@/components/ui/card";
import type { FreePrediction } from "@/types";
import Image from "next/image";

interface FreePredictionCardProps {
  prediction: FreePrediction;
}

export function FreePredictionCard({ prediction }: FreePredictionCardProps) {
  return (
    <Card className="bg-white hover:shadow-lg transition-shadow divide-y">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{prediction.league}</span>
              {prediction.leagueFlag && (
                <Image
                  src={`https://flagcdn.com/w20/${prediction.leagueFlag.toLowerCase()}.png`}
                  alt={prediction.league}
                  width={20}
                  height={15}
                  className="rounded"
                />
              )}
            </div>
         
          <span className="text-sm text-muted-foreground">
            {prediction.date}
          </span>
        </div>

        <div className=" flex flex-row items-center justify-around gap-2 ">
        {prediction.leagueLogo && (
              <div className="relative w-10 h-10">
                <Image
                  src={prediction.leagueLogo}
                  alt={prediction.league}
                  fill
                  className="object-cover"
                />
              </div>
            )}
        <div className="text-center space-y-1">

          <p className="font-medium">{`${prediction.homeTeam} - ${prediction.awayTeam}`}</p>
          <p className="text-sm text-muted-foreground">
            {prediction.prediction}
          </p>
        </div>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between bg-muted/5">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded text-sm ${
              prediction.status === "won"
                ? "bg-green-500 text-white"
                : prediction.status === "lost"
                ? "bg-red-500 text-white"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {prediction.status.toUpperCase()}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">odds</p>
          <p className="font-bold text-primary">{prediction.odds}</p>
        </div>
      </div>
    </Card>
  );
}
