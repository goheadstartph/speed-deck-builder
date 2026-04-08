import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import VaultFilters, { type FilterKey } from "@/components/VaultFilters";
import { products, personaBoost, type Persona } from "@/data/products";

const categoryMap: Record<string, FilterKey> = {
  "Digital Bank": "digital-bank",
  "Local Broker": "local-broker",
  "Global Broker": "global-broker",
  "Credit Builder": "credit-builder",
};

const personas: { value: Persona; label: string }[] = [
  { value: "recommended", label: "Headstart Recommended" },
  { value: "student", label: "College Student" },
  { value: "adult", label: "Adult" },
];

const TheVault = () => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [persona, setPersona] = useState<Persona>("recommended");
  const [personaOpen, setPersonaOpen] = useState(false);

  const filtered = useMemo(() => {
    const base = filter === "all"
      ? products
      : products.filter((p) => categoryMap[p.category] === filter);

    return [...base].sort((a, b) => {
      const boostA = personaBoost[a.id]?.[persona] ?? 0;
      const boostB = personaBoost[b.id]?.[persona] ?? 0;
      return (b.score + boostB) - (a.score + boostA);
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
          <div className="relative">
            <button
              onClick={() => setPersonaOpen(!personaOpen)}
              className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-foreground hover:bg-white/30 transition-all"
            >
              <span className="text-muted-foreground text-xs">Showing top picks for:</span>
              <span className="font-semibold">{personas.find((p) => p.value === persona)?.label}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${personaOpen ? "rotate-180" : ""}`} />
            </button>
            {personaOpen && (
              <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 glass rounded-xl overflow-hidden z-20 min-w-[200px]">
                {personas.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => { setPersona(p.value); setPersonaOpen(false); }}
                    className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/20 ${
                      persona === p.value ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <VaultFilters activeFilter={filter} onFilterChange={setFilter} />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheVault;
