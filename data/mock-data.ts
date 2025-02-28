import {
  Betcode,
  FreePrediction,
  Message,
  Notification,
  SubscriptionHistory,
  User,
} from "@/types";

export const mockBetcodes: Betcode[] = [
  {
    id: "1",
    code: "B365-XK789",
    platform: { id: "1", name: "Bet365", logo: "/bet365.jpg" },
    status: "won",
    odds: 2.5,
    createdAt: "2024-02-01T10:00:00Z",
    type: "vip",
  },
  {
    id: "2",
    code: "BW-452KL",
    platform: { id: "2", name: "Betway", logo: "/betway.png" },
    status: "pending",
    odds: 3.8,
    createdAt: "2024-02-01T09:30:00Z",
    type: "regular",
  },
  {
    id: "3",
    code: "B9J-789P",
    platform: { id: "3", name: "Bet9ja", logo: "/bet9ja.png" },
    status: "lost",
    odds: 1.95,
    createdAt: "2024-02-01T08:45:00Z",
    type: "vip",
  },
  {
    id: "4",
    code: "BP-KL098",
    platform: { id: "4", name: "BetPawa", logo: "/betpawa.jpeg" },
    status: "won",
    odds: 4.2,
    createdAt: "2024-01-31T15:20:00Z",
    type: "regular",
  },
  {
    id: "5",
    code: "SPB-567X",
    platform: { id: "5", name: "Sporty", logo: "/sporty.png" },
    status: "pending",
    odds: 2.1,
    createdAt: "2024-01-31T14:15:00Z",
    type: "vip",
  },
  {
    id: "6",
    code: "B365-YT456",
    platform: { id: "6", name: "Bet365", logo: "/bet365.jpg" },
    status: "won",
    odds: 3.0,
    createdAt: "2024-01-31T12:30:00Z",
    type: "regular",
  },
  {
    id: "7",
    code: "BW-789LM",
    platform: { id: "7", name: "Betway", logo: "/betway.png" },
    status: "lost",
    odds: 2.75,
    createdAt: "2024-01-31T11:45:00Z",
    type: "vip",
  },
  {
    id: "8",
    code: "B9J-234K",
    platform: { id: "8", name: "Bet9ja", logo: "/bet9ja.png" },
    status: "pending",
    odds: 1.85,
    createdAt: "2024-01-31T10:20:00Z",
    type: "regular",
  },
  {
    id: "9",
    code: "BP-QW891",
    platform: { id: "9", name: "BetPawa", logo: "/betpawa.jpeg" },
    status: "won",
    odds: 5.0,
    createdAt: "2024-01-31T09:15:00Z",
    type: "vip",
  },
  {
    id: "10",
    code: "SPB-901R",
    platform: { id: "10", name: "Sporty", logo: "/sporty.png" },
    status: "lost",
    odds: 2.25,
    createdAt: "2024-01-31T08:30:00Z",
    type: "regular",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "vipuser",
    title: "New VIP Betcode Available",
    message:
      "A new high-odds VIP betcode has been added for Premier League matches 🎯",
    createdAt: "2024-02-01T10:00:00Z",
    type: "betcode",
    isRead: false,
  },
  {
    id: "2",
    userId: "vipuser",
    title: "Subscription Expiring Soon",
    message:
      "Your VIP subscription will expire in 3 days. Renew now to keep access! 🔔",
    createdAt: "2024-02-01T09:30:00Z",
    type: "subscription",
    isRead: false,
  },
  {
    id: "3",
    userId: "vipuser",
    title: "Winning Betcode!",
    message: "Congratulations! The betcode B365-XK789 has won! 🎉",
    createdAt: "2024-02-01T08:45:00Z",
    type: "betcode",
    isRead: false,
  },
  {
    id: "4",
    userId: "vipuser",
    title: "New Free Prediction",
    message:
      "Check out our latest free prediction for the upcoming Champions League match ⚽",
    createdAt: "2024-01-31T15:20:00Z",
    type: "betcode",
    isRead: false,
  },
  {
    id: "5",
    userId: "vipuser",
    title: "Payment Successful",
    message: "Your VIP subscription payment has been processed successfully 💳",
    createdAt: "2024-01-31T14:15:00Z",
    type: "subscription",
    isRead: true,
  },
  {
    id: "6",
    userId: "vipuser",
    title: "Special Offer",
    message: "Limited time offer: Get 20% off on annual VIP subscription! 🎁",
    createdAt: "2024-01-31T12:30:00Z",
    type: "special",
    isRead: false,
  },
  {
    id: "7",
    userId: "vipuser",
    title: "New Chat Message",
    message: "You have a new message in the VIP chat group 💬",
    createdAt: "2024-01-31T11:45:00Z",
    type: "system",
    isRead: false,
  },
  {
    id: "8",
    userId: "user1",
    title: "Betcode Update",
    message: "The status of betcode BW-452KL has been updated to won 🎯",
    createdAt: "2024-01-31T10:20:00Z",
    type: "betcode",
    isRead: true,
  },
  {
    id: "9",
    userId: "vipuser",
    title: "Account Security",
    message:
      "We noticed a login from a new device. Please verify if this was you 🔒",
    createdAt: "2024-01-31T09:15:00Z",
    type: "system",
    isRead: false,
  },
  {
    id: "10",
    userId: "user1",
    title: "Weekend Special",
    message:
      "Don't miss our weekend special predictions for Premier League matches! ⚽",
    createdAt: "2024-01-31T08:30:00Z",
    type: "betcode",
    isRead: true,
  },
];

export const mockSubscriptionHistory: SubscriptionHistory[] = [
  {
    id: "1",
    userId: "vipuser",
    type: "vip",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-02-01T00:00:00Z",
    payment: {
      id: "1",
      userId: "vipuser",
      subscriptionType: "vip",
      createdAt: "2024-01-01T00:00:00Z",
      amount: 20,
      status: "completed",
      transactionId: "TRX-001",
    },
  },
  {
    id: "2",
    userId: "user1",
    type: "regular",
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2024-01-01T00:00:00Z",
    payment: {
      id: "2",
      userId: "user1",
      subscriptionType: "regular",
      createdAt: "2023-12-01T00:00:00Z",
      amount: 10,
      status: "completed",
      transactionId: "TRX-002",
    },
  },
  {
    id: "3",
    userId: "vipuser",
    type: "vip",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-02-15T00:00:00Z",
    payment: {
      id: "3",
      userId: "vipuser",
      subscriptionType: "vip",
      createdAt: "2024-01-15T00:00:00Z",
      amount: 20,
      status: "completed",
      transactionId: "TRX-003",
    },
  },
  {
    id: "4",
    userId: "user1",
    type: "regular",
    startDate: "2024-01-10T00:00:00Z",
    endDate: "2024-02-10T00:00:00Z",
    payment: {
      id: "4",
      userId: "user1",
      subscriptionType: "regular",
      createdAt: "2024-01-01T00:00:00Z",
      amount: 10,
      status: "failed",
      transactionId: "TRX-004",
    },
  },
  {
    id: "5",
    userId: "vipuser",
    type: "vip",
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2024-03-01T00:00:00Z",
    payment: {
      id: "5",
      userId: "vipuser",
      subscriptionType: "vip",
      createdAt: "2024-02-01T00:00:00Z",
      amount: 20,
      status: "pending",
      transactionId: "TRX-005",
    },
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    username: "user1",
    phoneNumber: "1234567890",
    subscriptionType: "regular",
    subscriptionExpiryDate: "2025-2-28",
    role: "user",
    isSuspended: false,
  },
  {
    id: "2",
    username: "vipuser",
    phoneNumber: "0987654321",
    subscriptionType: "vip",
    subscriptionExpiryDate: "2025-3-03",
    role: "user",
    isSuspended: false,
  },
  {
    id: "3",
    username: "admin",
    phoneNumber: "1122334455",
    subscriptionType: "vip",
    subscriptionExpiryDate: "2025-12-31",
    role: "admin",
    isSuspended: false,
  },
];

export const mockMessages: { regular: Message[]; vip: Message[] } = {
  regular: [
    {
      id: "1",
      content: "Hey everyone! Any good predictions for today's matches?",
      senderId: "user1",
      timestamp: "2024-02-01T10:00:00Z",
    },
    {
      id: "2",
      content: "Check out the new Premier League betcode I just posted!",
      senderId: "admin1",
      timestamp: "2024-02-01T10:05:00Z",
    },
    {
      id: "3",
      content: "Thanks for the previous tip, it won! 🎉",
      senderId: "user2",
      timestamp: "2024-02-01T10:10:00Z",
    },
    {
      id: "4",
      content: "Anyone following the NBA games tonight?",
      senderId: "user3",
      timestamp: "2024-02-01T10:15:00Z",
    },
    {
      id: "5",
      content: "Great win yesterday! Keep them coming 💪",
      senderId: "user4",
      timestamp: "2024-02-01T10:20:00Z",
    },
  ],
  vip: [
    {
      id: "1",
      content: "Exclusive VIP betcode for Champions League coming up!",
      senderId: "admin1",
      timestamp: "2024-02-01T11:00:00Z",
    },
    {
      id: "2",
      content: "The last 5 VIP predictions all won! Amazing streak! 🔥",
      senderId: "user5",
      timestamp: "2024-02-01T11:05:00Z",
    },
    {
      id: "3",
      content: "Special odds boost on today's VIP betcode",
      senderId: "admin2",
      timestamp: "2024-02-01T11:10:00Z",
    },
    {
      id: "4",
      content: "Thanks for the premium insights! Worth every penny",
      senderId: "user6",
      timestamp: "2024-02-01T11:15:00Z",
    },
    {
      id: "5",
      content: "New VIP member here! Excited to be part of the group",
      senderId: "user7",
      timestamp: "2024-02-01T11:20:00Z",
    },
  ],
};

export const mockFreePredictions: FreePrediction[] = [
  {
    id: "1",
    league: "Premier League",
    leagueFlag: "GB",
    leagueLogo: "/leagues/premierleague.png",
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    prediction: "Over 2.5 Goals",
    odds: 1.95,
    date: "2024-02-01",
    createdAt: "2024-02-01",
    status: "pending",
  },
  {
    id: "2",
    league: "La Liga",
    leagueFlag: "ES",
    leagueLogo: "/leagues/laliga.png",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    prediction: "Both Teams to Score",
    odds: 1.85,
    date: "2024-02-01",
    createdAt: "2024-02-01",
    status: "won",
  },
  {
    id: "3",
    league: "Bundesliga",
    leagueFlag: "DE",
    leagueLogo: "/leagues/bundesliga.jpg",
    homeTeam: "Bayern Munich",
    awayTeam: "Dortmund",
    prediction: "Home Win",
    odds: 1.75,
    date: "2024-02-02",
    createdAt: "2024-02-02",
    status: "pending",
  },
  {
    id: "4",
    league: "Serie A",
    leagueFlag: "IT",
    leagueLogo: "/leagues/seriea.png",
    homeTeam: "Inter Milan",
    awayTeam: "Juventus",
    prediction: "Under 2.5 Goals",
    odds: 1.75,
    date: "2024-02-02",
    createdAt: "2024-02-02",
    status: "pending",
  },
];
