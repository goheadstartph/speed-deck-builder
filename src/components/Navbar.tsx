import { useRunway, RUNWAY_SLOTS } from "@/contexts/RunwayContext";
import { Check } from "lucide-react";

const Navbar = () => {
  const { runway, filledCount } = useRunway();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">H</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Headstart</span>
        </div>

        {/* Runway Progress */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            {RUNWAY_SLOTS.map((slot, i) => {
              const filled = !!runway[slot.key];
              return (
                <div key={slot.key} className="flex items-center">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      filled
                        ? "border-primary bg-primary runway-glow animate-bounce-in"
                        : "border-muted-foreground/30 bg-muted"
                    }`}
                    title={slot.label}
                  >
                    {filled ? (
                      <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    ) : (
                      <span className="text-[10px] font-medium text-muted-foreground">{i + 1}</span>
                    )}
                  </div>
                  {i < RUNWAY_SLOTS.length - 1 && (
                    <div
                      className={`h-0.5 w-4 transition-colors duration-300 ${
                        filled && runway[RUNWAY_SLOTS[i + 1]?.key] ? "bg-primary" : "bg-muted-foreground/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            Runway: {filledCount}/5
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
