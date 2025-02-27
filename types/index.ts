export type SubscriptionType = "regular" | "vip" | "free";
export type UserRole = "user" | "moderator" | "admin";
export type PaymentStatus = "pending" | "completed" | "failed";
export type BetStatus = "pending" | "won" | "lost";

export type BettingPlatform = {
  id: string;
  name: string;
  logo: string;
  country?: string;
};

export type User = {
  id: string;
  username: string;
  phoneNumber: string;
  subscriptionType: SubscriptionType;
  subscriptionExpiryDate: string;
  role: UserRole;
  isSuspended: boolean;
};

export type Betcode = {
  id: string;
  platform: BettingPlatform;
  code: string;
  odds: number;
  type: SubscriptionType;
  status: BetStatus;
  createdAt: string;
  createdBy?: string;
};

export type FreePrediction = {
  id: string;
  league: string;
  leagueFlag?: string;
  leagueLogo?: string; // Add this new field
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  odds: number;
  status: BetStatus;
  date: string;
  createdAt: string;
  createdBy?: string;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isPinned?: boolean;
  pinnedBy?: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "betcode" | "subscription" | "payment" | "system" | "special";
  isRead: boolean;
  createdAt: string;
};

export type Payment = {
  id: string;
  userId: string;
  amount: number;
  subscriptionType: SubscriptionType;
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
};

export type SubscriptionHistory = {
  id: string;
  userId: string;
  type: SubscriptionType;
  startDate: string;
  endDate: string;
  payment: Payment;
};
