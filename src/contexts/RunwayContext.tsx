import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface RunwayProduct {
  id: string;
  name: string;
  logoEmoji: string;
}

export type SlotStatus = "empty" | "committed" | "active";

interface SlotState {
  product: RunwayProduct | null;
  status: SlotStatus;
}

interface RunwayContextType {
  slots: SlotState[];
  lifetimeGoals: number;
  addToRunway: (product: RunwayProduct) => void;
  removeFromSlot: (index: number) => void;
  markActive: (index: number) => void;
  isInRunway: (productId: string) => boolean;
}

const RunwayContext = createContext<RunwayContextType | undefined>(undefined);

const STORAGE_KEY = "headstart-runway-v3";
const TALLY_KEY = "headstart-lifetime-tally";

const createEmptySlots = (): SlotState[] =>
  Array.from({ length: 5 }, () => ({ product: null, status: "empty" as SlotStatus }));

function loadSlots(): SlotState[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return createEmptySlots();
}

function loadTally(): number {
  try {
    const stored = localStorage.getItem(TALLY_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return 0;
}

export const RunwayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState(loadSlots);
  const [lifetimeGoals, setLifetimeGoals] = useState(loadTally);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  }, [slots]);

  useEffect(() => {
    localStorage.setItem(TALLY_KEY, JSON.stringify(lifetimeGoals));
  }, [lifetimeGoals]);

  const addToRunway = useCallback((product: RunwayProduct) => {
    setSlots((prev) => {
      const nextEmpty = prev.findIndex((s) => s.status === "empty");
      if (nextEmpty === -1) return prev;
      const updated = [...prev];
      updated[nextEmpty] = { product, status: "committed" };
      return updated;
    });
  }, []);

  const removeFromSlot = useCallback((index: number) => {
    setSlots((prev) => {
      const updated = [...prev];
      updated[index] = { product: null, status: "empty" };
      return updated;
    });
  }, []);

  const markActive = useCallback((index: number) => {
    setSlots((prev) => {
      if (prev[index].status !== "committed") return prev;
      const updated = [...prev];
      updated[index] = { ...updated[index], status: "active" };
      return updated;
    });
    setLifetimeGoals((prev) => prev + 1);
  }, []);

  const isInRunway = useCallback(
    (productId: string) => slots.some((s) => s.product?.id === productId),
    [slots]
  );

  return (
    <RunwayContext.Provider value={{ slots, lifetimeGoals, addToRunway, removeFromSlot, markActive, isInRunway }}>
      {children}
    </RunwayContext.Provider>
  );
};

export const useRunway = () => {
  const ctx = useContext(RunwayContext);
  if (!ctx) throw new Error("useRunway must be used within RunwayProvider");
  return ctx;
};
