import { Landmark, TrendingUp, Globe, CreditCard } from "lucide-react";

type FilterKey = "all" | "digital-bank" | "local-broker" | "global-broker" | "credit-card";

const filters: { key: FilterKey; label: string; icon?: React.ElementType }[] = [
  { key: "all", label: "All" },
  { key: "digital-bank", label: "Digital Banks", icon: Landmark },
  { key: "local-broker", label: "Local Brokers", icon: TrendingUp },
  { key: "global-broker", label: "Global Brokers", icon: Globe },
  { key: "credit-card", label: "Credit Cards", icon: CreditCard },
];

interface VaultFiltersProps {
  activeFilter: FilterKey;
  onFilterChange: (filter: FilterKey) => void;
}

const VaultFilters = ({ activeFilter, onFilterChange }: VaultFiltersProps) => (
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

export default VaultFilters;
export type { FilterKey };
