import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useRunway, RUNWAY_SLOTS, type RunwaySlot } from "@/contexts/RunwayContext";
import { products } from "@/data/products";
import { toast } from "sonner";

const categoryLabels: Record<RunwaySlot, string> = {
  "digital-bank": "Digital Banks",
  "local-broker": "Local Brokers",
  "global-broker": "Global Brokers",
  "credit-builder": "Credit Builders",
  "long-term-goal": "Long-term Goals",
};

const RunwayBar = () => {
  const { slots, committedCount, activeCount, toggleActive, addToRunway, removeFromRunway } = useRunway();
  const [dropdownSlot, setDropdownSlot] = useState<RunwaySlot | null>(null);

  const handleSlotClick = (slotKey: RunwaySlot, index: number) => {
    const state = slots[slotKey];

    if (state.status === "committed") {
      // Check sequential: all previous must be active
      let canActivate = true;
      for (let i = 0; i < index; i++) {
        if (slots[RUNWAY_SLOTS[i].key].status !== "active") {
          canActivate = false;
          break;
        }
      }
      if (canActivate) {
        toggleActive(slotKey);
        toast.success(`${state.product?.name} is now Active! ✅`);
      } else {
        toast.error("Activate previous slots first!");
      }
    } else if (state.status === "active") {
      toggleActive(slotKey);
    } else {
      // Empty slot — open dropdown
      setDropdownSlot(dropdownSlot === slotKey ? null : slotKey);
    }
  };

  const handleDropdownSelect = (slotKey: RunwaySlot, productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToRunway({ id: product.id, name: product.name, slot: slotKey, logoEmoji: product.logoEmoji });
      toast.success(`${product.name} committed! 🚀`);
    }
    setDropdownSlot(null);
  };

  const statusLabel = activeCount > 0 ? `${activeCount}/5 Active` : `${committedCount}/5 Committed`;

  return (
    <div className="glass-strong rounded-2xl p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Your Runway
        </span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {statusLabel}
        </span>
      </div>

      <div className="flex items-center justify-center gap-0">
        {RUNWAY_SLOTS.map((slot, i) => {
          const state = slots[slot.key];
          const isActive = state.status === "active";
          const isCommitted = state.status === "committed";
          const isEmpty = state.status === "empty";

          return (
            <div key={slot.key} className="flex items-center relative">
              <button
                onClick={() => handleSlotClick(slot.key, i)}
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                  isActive
                    ? "border-primary bg-primary runway-glow animate-bounce-in"
                    : isCommitted
                      ? "border-primary/60 bg-primary/20"
                      : "border-muted-foreground/20 bg-white/20 backdrop-blur-sm"
                }`}
                title={`${slot.label}${state.product ? `: ${state.product.name}` : ""}`}
              >
                {isActive ? (
                  <Check className="h-5 w-5 text-primary-foreground" />
                ) : isCommitted ? (
                  <span className="text-lg">{state.product?.logoEmoji}</span>
                ) : (
                  <span className="text-sm font-semibold text-muted-foreground">{i + 1}</span>
                )}
              </button>

              {/* Dropdown for empty slot */}
              {dropdownSlot === slot.key && isEmpty && (
                <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-xl p-3 min-w-[200px] shadow-xl">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    {categoryLabels[slot.key]} <ChevronDown className="h-3 w-3" />
                  </p>
                  <div className="flex flex-col gap-1">
                    {products
                      .filter((p) => p.slot === slot.key)
                      .map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleDropdownSelect(slot.key, p.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-white/30 transition-all text-left"
                        >
                          <span className="text-base">{p.logoEmoji}</span>
                          <span className="font-medium">{p.name}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {i < RUNWAY_SLOTS.length - 1 && (
                <div
                  className={`h-0.5 w-8 transition-colors duration-300 ${
                    isActive && slots[RUNWAY_SLOTS[i + 1]?.key]?.status === "active"
                      ? "bg-primary"
                      : isActive || isCommitted
                        ? "bg-primary/30"
                        : "bg-muted-foreground/15"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs text-muted-foreground">
        {RUNWAY_SLOTS.map((slot) => {
          const state = slots[slot.key];
          return (
            <div key={slot.key} className="flex flex-col items-center gap-0.5">
              <span
                className={
                  state.status === "active"
                    ? "font-bold text-primary"
                    : state.status === "committed"
                      ? "font-semibold text-primary/70"
                      : ""
                }
              >
                {slot.label}
              </span>
              {state.product && (
                <button
                  onClick={() => removeFromRunway(slot.key)}
                  className="text-[10px] text-destructive/60 hover:text-destructive transition-colors"
                >
                  remove
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RunwayBar;
