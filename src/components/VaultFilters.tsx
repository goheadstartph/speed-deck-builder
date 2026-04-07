import type { RunwaySlot } from "@/contexts/RunwayContext";
import { Landmark, TrendingUp, Globe, CreditCard, Target } from "lucide-react";

const filters: { key: RunwaySlot | "all"; label: string; icon?: React.ElementType }[] = [
  { key: "all", label: "All" },
  { key: "digital-bank", label: "Digital Banks", icon: Landmark },
  { key: "local-broker", label: "Local Brokers", icon: TrendingUp },
  { key: "global-broker", label: "Global Brokers", icon: Globe },
  { key: "credit-builder", label: "Credit Builders", icon: CreditCard },
  { key: "long-term-goal", label: "Long-term Goals", icon: Target },
];

interface VaultFiltersProps {
  activeFilter: RunwaySlot | "all";
  onFilterChange: (filter: RunwaySlot | "all") => void;
}

const VaultFilters = ({ activeFilter, onFilterChange }: VaultFiltersProps) => {
  return (
    <div className="glass-strong rounded-full p-1.5 flex flex-wrap justify-center gap-1 max-w-3xl mx-auto">
      {filters.map((f) => {
        const isActive = activeFilter === f.key;
        const Icon = f.icon;
        return (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-white/20"
            }`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{f.label}</span>
            <span className="sm:hidden">{f.label.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
};

export default VaultFilters;
