import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type RunwaySlot = "digital-bank" | "local-broker" | "global-broker" | "credit-builder" | "long-term-goal";

export const RUNWAY_SLOTS: { key: RunwaySlot; label: string }[] = [
  { key: "digital-bank", label: "Digital Bank" },
  { key: "local-broker", label: "Local Broker" },
  { key: "global-broker", label: "Global Broker" },
  { key: "credit-builder", label: "Credit Builder" },
  { key: "long-term-goal", label: "Long-term Goal" },
];

export interface RunwayProduct {
  id: string;
  name: string;
  slot: RunwaySlot;
}

interface RunwayContextType {
  runway: Record<RunwaySlot, RunwayProduct | null>;
  filledCount: number;
  addToRunway: (product: RunwayProduct) => void;
  removeFromRunway: (slot: RunwaySlot) => void;
  isInRunway: (productId: string) => boolean;
}

const RunwayContext = createContext<RunwayContextType | undefined>(undefined);

const STORAGE_KEY = "headstart-runway";

function loadRunway(): Record<RunwaySlot, RunwayProduct | null> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    "digital-bank": null,
    "local-broker": null,
    "global-broker": null,
    "credit-builder": null,
    "long-term-goal": null,
  };
}

export const RunwayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [runway, setRunway] = useState(loadRunway);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(runway));
  }, [runway]);

  const filledCount = Object.values(runway).filter(Boolean).length;

  const addToRunway = useCallback((product: RunwayProduct) => {
    setRunway((prev) => ({ ...prev, [product.slot]: product }));
  }, []);

  const removeFromRunway = useCallback((slot: RunwaySlot) => {
    setRunway((prev) => ({ ...prev, [slot]: null }));
  }, []);

  const isInRunway = useCallback(
    (productId: string) => Object.values(runway).some((p) => p?.id === productId),
    [runway]
  );

  return (
    <RunwayContext.Provider value={{ runway, filledCount, addToRunway, removeFromRunway, isInRunway }}>
      {children}
    </RunwayContext.Provider>
  );
};

export const useRunway = () => {
  const ctx = useContext(RunwayContext);
  if (!ctx) throw new Error("useRunway must be used within RunwayProvider");
  return ctx;
};
