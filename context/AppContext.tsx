"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

import type {
  User,
  Betcode,
  Message,
  Notification,
  Payment,
  SubscriptionHistory,
  SubscriptionType,
  BettingPlatform,
} from "@/types";
import {
  mockBetcodes,
  mockNotifications,
  mockMessages,
  mockSubscriptionHistory,
  mockFreePredictions,
  mockUsers,
} from "@/data/mock-data";

type AppContextType = {
  currentUser: User | null;
  users: User[];
  betcodes: Betcode[];
  messages: { regular: Message[]; vip: Message[] };
  notifications: Notification[];
  subscriptionHistory: SubscriptionHistory[];
  freePredictions: any[];
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  subscribe: (type: SubscriptionType, phoneNumber: string) => Promise<void>;
  sendBetcode: (
    code: string,
    description: string,
    type: SubscriptionType,
    sport: string,
    odds: number
  ) => void;
  sendMessage: (content: string, type: SubscriptionType) => void;
  pinMessage: (messageId: string, type: SubscriptionType) => void;
  suspendUser: (userId: string) => void;
  setUserAsModerator: (userId: string) => void;
  addNotification: (
    userId: string,
    title: string,
    message: string,
    type: "betcode" | "subscription" | "payment" | "system"
  ) => void;
  markNotificationAsRead: (notificationId: string) => void;
  register: (data: {
    username: string;
    password: string;
    phoneNumber: string;
    subscriptionType: SubscriptionType;
  }) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("currentUser");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [betcodes, setBetcodes] = useState<Betcode[]>(mockBetcodes);
  const [messages, setMessages] = useState<{
    regular: Message[];
    vip: Message[];
  }>(mockMessages);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [subscriptionHistory, setSubscriptionHistory] = useState<
    SubscriptionHistory[]
  >(mockSubscriptionHistory);
  const [freePredictions, setFreePredictions] = useState(mockFreePredictions);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const login = async (username: string, password: string) => {
    // Simulate login
    const user = mockUsers.find((u) => u.username === username);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Set the current user with all user data
    setCurrentUser(user);

    // For debugging
    console.log("Logged in user:", user);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const subscribe = async (type: SubscriptionType, phoneNumber: string) => {
    if (!currentUser) throw new Error("User not logged in");

    // Simulate subscription process
    setCurrentUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        subscriptionType: type,
        subscriptionExpiryDate: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };
    });
  };

  const sendBetcode = (
    code: string,
    type: SubscriptionType,
    platform: BettingPlatform,
    odds: number
  ) => {
    const newBetcode: Betcode = {
      id: (betcodes.length + 1).toString(),
      code,
      platform,
      type,
      createdAt: new Date().toISOString(),
      odds,
      status: "pending",
      createdBy: currentUser?.username || "admin",
    };
    setBetcodes((prev) => [newBetcode, ...prev]);

    // Notify users of the new betcode
    users.forEach((user) => {
      if (user.subscriptionType === type) {
        addNotification(
          user.id,
          "New Betcode Available",
          `New ${type} betcode available: ${code}`,
          "betcode"
        );
      }
    });
  };

  const sendMessage = (content: string, type: SubscriptionType) => {
    if (!currentUser) throw new Error("User not logged in");

    const newMessage: Message = {
      id: (messages[type].length + 1).toString(),
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      isPinned: false,
      pinnedBy: null,
    };

    setMessages((prev) => ({
      ...prev,
      [type]: [...prev[type], newMessage],
    }));
  };

  const pinMessage = (messageId: string, type: SubscriptionType) => {
    if (
      !currentUser ||
      (currentUser.role !== "admin" && currentUser.role !== "moderator")
    ) {
      throw new Error("Unauthorized");
    }

    setMessages((prev) => ({
      ...prev,
      [type]: prev[type].map((message) =>
        message.id === messageId
          ? {
              ...message,
              isPinned: !message.isPinned,
              pinnedBy: currentUser.id,
            }
          : message
      ),
    }));
  };

  const suspendUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isSuspended: !user.isSuspended } : user
      )
    );
  };

  const setUserAsModerator = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, role: user.role === "moderator" ? "user" : "moderator" }
          : user
      )
    );
  };

  const addNotification = (
    userId: string,
    title: string,
    message: string,
    type: "betcode" | "subscription" | "payment" | "system"
  ) => {
    const newNotification: Notification = {
      id: (notifications.length + 1).toString(),
      userId,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const register = async (data: {
    username: string;
    password: string;
    phoneNumber: string;
    subscriptionType: SubscriptionType;
  }) => {
    // Simulate registration
    const newUser: User = {
      id: (users.length + 1).toString(),
      username: data.username,
      phoneNumber: data.phoneNumber,
      subscriptionType: data.subscriptionType,
      subscriptionExpiryDate: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      role: "user",
      isSuspended: false,
    };

    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        betcodes,
        messages,
        notifications,
        subscriptionHistory,
        freePredictions,
        login,
        logout,
        subscribe,
        sendBetcode,
        sendMessage,
        pinMessage,
        suspendUser,
        setUserAsModerator,
        addNotification,
        markNotificationAsRead,
        register,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
