import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type RunwaySlot = "digital-bank" | "local-broker" | "global-broker" | "credit-builder" | "long-term-goal";

export const RUNWAY_SLOTS: { key: RunwaySlot; label: string }[] = [
  { key: "digital-bank", label: "Digital Bank" },
  { key: "local-broker", label: "Local Broker" },
  { key: "global-broker", label: "Global Broker" },
  { key: "credit-builder", label: "Credit Builder" },
  { key: "long-term-goal", label: "Long-term Goal" },
];

export type SlotStatus = "empty" | "committed" | "active";

export interface RunwayProduct {
  id: string;
  name: string;
  slot: RunwaySlot;
  logoEmoji: string;
}

interface SlotState {
  product: RunwayProduct | null;
  status: SlotStatus;
}

interface RunwayContextType {
  slots: Record<RunwaySlot, SlotState>;
  committedCount: number;
  activeCount: number;
  addToRunway: (product: RunwayProduct) => void;
  removeFromRunway: (slot: RunwaySlot) => void;
  toggleActive: (slot: RunwaySlot) => void;
  isInRunway: (productId: string) => boolean;
  getNextAvailableSlot: () => RunwaySlot | null;
}

const RunwayContext = createContext<RunwayContextType | undefined>(undefined);

const STORAGE_KEY = "headstart-runway-v2";

const emptySlots: Record<RunwaySlot, SlotState> = {
  "digital-bank": { product: null, status: "empty" },
  "local-broker": { product: null, status: "empty" },
  "global-broker": { product: null, status: "empty" },
  "credit-builder": { product: null, status: "empty" },
  "long-term-goal": { product: null, status: "empty" },
};

function loadSlots(): Record<RunwaySlot, SlotState> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { ...emptySlots };
}

export const RunwayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState(loadSlots);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  }, [slots]);

  const committedCount = Object.values(slots).filter((s) => s.status === "committed" || s.status === "active").length;
  const activeCount = Object.values(slots).filter((s) => s.status === "active").length;

  const getNextAvailableSlot = useCallback((): RunwaySlot | null => {
    for (const s of RUNWAY_SLOTS) {
      if (slots[s.key].status === "empty") return s.key;
    }
    return null;
  }, [slots]);

  const addToRunway = useCallback((product: RunwayProduct) => {
    setSlots((prev) => ({
      ...prev,
      [product.slot]: { product, status: "committed" },
    }));
  }, []);

  const removeFromRunway = useCallback((slot: RunwaySlot) => {
    setSlots((prev) => ({
      ...prev,
      [slot]: { product: null, status: "empty" },
    }));
  }, []);

  const toggleActive = useCallback((slot: RunwaySlot) => {
    setSlots((prev) => {
      const current = prev[slot];
      if (!current.product) return prev;
      // Sequential enforcement: previous slots must be active
      const slotIndex = RUNWAY_SLOTS.findIndex((s) => s.key === slot);
      for (let i = 0; i < slotIndex; i++) {
        if (prev[RUNWAY_SLOTS[i].key].status !== "active") return prev;
      }
      return {
        ...prev,
        [slot]: {
          ...current,
          status: current.status === "active" ? "committed" : "active",
        },
      };
    });
  }, []);

  const isInRunway = useCallback(
    (productId: string) => Object.values(slots).some((s) => s.product?.id === productId),
    [slots]
  );

  return (
    <RunwayContext.Provider
      value={{ slots, committedCount, activeCount, addToRunway, removeFromRunway, toggleActive, isInRunway, getNextAvailableSlot }}
    >
      {children}
    </RunwayContext.Provider>
  );
};

export const useRunway = () => {
  const ctx = useContext(RunwayContext);
  if (!ctx) throw new Error("useRunway must be used within RunwayProvider");
  return ctx;
};
