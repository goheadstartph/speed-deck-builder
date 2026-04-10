import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import VaultFilters, { type FilterKey } from "@/components/VaultFilters";
import { products, personaBoost, type Persona } from "@/data/products";
import { ChevronDown } from "lucide-react";

const categoryMap: Record<string, FilterKey> = {
  "Digital Bank": "digital-bank",
  "Local Broker": "local-broker",
  "Global Broker": "global-broker",
  "Credit Card": "credit-card",
};

const personas: { key: Persona; label: string }[] = [
  { key: "recommended", label: "Headstart Recommended" },
  { key: "student", label: "College Student" },
  { key: "adult", label: "Adult" },
];

const TheVault = () => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [persona, setPersona] = useState<Persona>("recommended");

  const filtered = useMemo(() => {
    const base =
      filter === "all"
        ? products
        : products.filter((p) => categoryMap[p.category] === filter);

    return [...base].sort((a, b) => {
      const boostA = personaBoost[a.id]?.[persona] ?? 0;
      const boostB = personaBoost[b.id]?.[persona] ?? 0;
      return b.score + boostB - (a.score + boostA);
    });
  }, [filter, persona]);

  return (
    <section id="the-vault" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">The Vault</h2>
          <p className="text-muted-foreground">
            Your curated selection of financial tools. Pick your favorites to build your Runway.
          </p>
        </div>

        {/* Persona selector */}
        <div className="flex justify-center mb-4">
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Showing top picks for:</span>
            <div className="relative">
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value as Persona)}
                className="appearance-none bg-transparent text-xs font-semibold text-foreground pr-5 cursor-pointer focus:outline-none"
              >
                {personas.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <VaultFilters activeFilter={filter} onFilterChange={setFilter} />
        </div>

        {/* Cards directly below filters */}
        <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              isTopPick={i === 0 && filter !== "all"}
              topPickCategory={filter !== "all" ? product.category : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheVault;
