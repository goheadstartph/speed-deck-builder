import { Check, Trophy } from "lucide-react";
import { useRunway } from "@/contexts/RunwayContext";
import { toast } from "sonner";

const RunwayBar = () => {
  const { slots, lifetimeGoals, markActive, removeFromSlot } = useRunway();

  const committedCount = slots.filter((s) => s.status === "committed" || s.status === "active").length;
  const activeCount = slots.filter((s) => s.status === "active").length;

  const handleSlotClick = (index: number) => {
    const slot = slots[index];
    if (slot.status === "committed") {
      markActive(index);
      toast.success(`${slot.product?.name} is now Active! ✅`);
    } else if (slot.status === "active") {
      // do nothing, already done
    }
  };

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

          return (
            <div key={i} className="flex items-center">
              <div className="relative group">
                <button
                  onClick={() => handleSlotClick(i)}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                    isActive
                      ? "border-primary bg-primary runway-glow animate-bounce-in"
                      : isCommitted
                        ? "border-primary/60 bg-primary/20 backdrop-blur-sm"
                        : "border-muted-foreground/20 bg-white/20 backdrop-blur-sm"
                  }`}
                  title={
                    isActive
                      ? `${slot.product?.name} — Done!`
                      : isCommitted
                        ? `${slot.product?.name} — Click to mark done`
                        : `Slot ${i + 1} — Empty`
                  }
                >
                  {isActive ? (
                    <Check className="h-5 w-5 text-primary-foreground" />
                  ) : isCommitted ? (
                    <span className="text-lg">{slot.product?.logoEmoji}</span>
                  ) : (
                    <span className="text-sm font-semibold text-muted-foreground">{i + 1}</span>
                  )}
                </button>
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
