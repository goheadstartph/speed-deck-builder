import { useRunway, RUNWAY_SLOTS } from "@/contexts/RunwayContext";
import { Check } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-fit rounded-full border bg-background/60 backdrop-blur-xl shadow-lg px-6 py-2">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
          <span className="text-sm font-bold text-primary-foreground">H</span>
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">Headstart</span>
      </div>
    </nav>
  );
};

export const RunwayBar = () => {
  const { runway, filledCount } = useRunway();

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your Runway</span>
      <div className="flex items-center gap-1">
        {RUNWAY_SLOTS.map((slot, i) => {
          const filled = !!runway[slot.key];
          return (
            <div key={slot.key} className="flex items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  filled
                    ? "border-primary bg-primary runway-glow animate-bounce-in"
                    : "border-muted-foreground/30 bg-muted"
                }`}
                title={slot.label}
              >
                {filled ? (
                  <Check className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">{i + 1}</span>
                )}
              </div>
              {i < RUNWAY_SLOTS.length - 1 && (
                <div
                  className={`h-0.5 w-6 transition-colors duration-300 ${
                    filled && runway[RUNWAY_SLOTS[i + 1]?.key] ? "bg-primary" : "bg-muted-foreground/20"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {filledCount}/5 Complete
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-2 text-[11px] text-muted-foreground">
        {RUNWAY_SLOTS.map((slot) => {
          const filled = !!runway[slot.key];
          return (
            <span key={slot.key} className={filled ? "font-medium text-primary" : ""}>
              {slot.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
