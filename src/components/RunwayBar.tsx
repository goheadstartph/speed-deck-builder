import { useState } from "react";
import { Check, Trophy, ChevronDown } from "lucide-react";
import { useRunway } from "@/contexts/RunwayContext";
import { products } from "@/data/products";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const RunwayBar = () => {
  const { slots, lifetimeGoals, markActive, removeFromSlot, addToRunway, isInRunway } = useRunway();
  const [openSlot, setOpenSlot] = useState<number | null>(null);

  const committedCount = slots.filter((s) => s.status === "committed" || s.status === "active").length;
  const activeCount = slots.filter((s) => s.status === "active").length;

  const handleSlotClick = (index: number) => {
    const slot = slots[index];
    if (slot.status === "committed") {
      markActive(index);
      toast.success(`${slot.product?.name} is now Active! ✅`);
    }
  };

  const availableProducts = products.filter((p) => !isInRunway(p.id));

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="glass-strong rounded-2xl p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Your Runway
        </span>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {activeCount > 0 ? `${activeCount}/5 Active` : `${committedCount}/5 Committed`}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            <Trophy className="h-3 w-3" />
            Lifetime: {lifetimeGoals}
          </span>
        </div>
      </div>

      {/* Slots */}
      <div className="flex items-center justify-center">
        {slots.map((slot, i) => {
          const isActive = slot.status === "active";
          const isCommitted = slot.status === "committed";
          const isEmpty = slot.status === "empty";

          return (
            <div key={i} className="flex items-center">
              <div className="relative group">
                {isEmpty ? (
                  <Popover open={openSlot === i} onOpenChange={(open) => setOpenSlot(open ? i : null)}>
                    <PopoverTrigger asChild>
                      <button
                        className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-muted-foreground/20 bg-white/20 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-110 hover:border-primary/40"
                        title={`Slot ${i + 1} — Click to assign`}
                      >
                        <span className="text-sm font-semibold text-muted-foreground">{i + 1}</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="glass w-64 p-0 border-white/30" align="center">
                      <div className="p-3 border-b border-white/20">
                        <p className="text-xs font-semibold text-foreground">Assign to Slot {i + 1}</p>
                        <p className="text-[10px] text-muted-foreground">Pick a product from the vault</p>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {categories.map((cat) => {
                          const catProducts = availableProducts.filter((p) => p.category === cat);
                          if (catProducts.length === 0) return null;
                          return (
                            <div key={cat}>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 pt-2 pb-1">{cat}</p>
                              {catProducts
                                .sort((a, b) => b.score - a.score)
                                .map((p) => (
                                  <button
                                    key={p.id}
                                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/20 transition-colors text-left"
                                    onClick={() => {
                                      addToRunway({ id: p.id, name: p.name, logoEmoji: p.logoEmoji });
                                      setOpenSlot(null);
                                      toast.success(`${p.name} added to Slot ${i + 1}! 🚀`);
                                    }}
                                  >
                                    <span className="text-lg">{p.logoEmoji}</span>
                                    <div className="min-w-0">
                                      <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                                      <p className="text-[10px] text-primary font-bold">{p.score}/100</p>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          );
                        })}
                        {availableProducts.length === 0 && (
                          <p className="text-xs text-muted-foreground p-3 text-center">All products assigned!</p>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <button
                    onClick={() => handleSlotClick(i)}
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                      isActive
                        ? "border-primary bg-primary runway-glow animate-bounce-in"
                        : "border-primary/60 bg-primary/20 backdrop-blur-sm"
                    }`}
                    title={
                      isActive
                        ? `${slot.product?.name} — Done!`
                        : `${slot.product?.name} — Click to mark done`
                    }
                  >
                    {isActive ? (
                      <Check className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <span className="text-lg">{slot.product?.logoEmoji}</span>
                    )}
                  </button>
                )}

                {/* Remove button on hover */}
                {(isCommitted || isActive) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromSlot(i);
                      toast("Removed from Runway");
                    }}
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
              </div>

              {i < 4 && (
                <div
                  className={`h-0.5 w-8 transition-colors duration-300 ${
                    isActive && slots[i + 1]?.status === "active"
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
    </div>
  );
};

export default RunwayBar;
