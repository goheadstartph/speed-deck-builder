import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import VaultFilters from "@/components/VaultFilters";
import { products } from "@/data/products";
import type { RunwaySlot } from "@/contexts/RunwayContext";

const TheVault = () => {
  const [filter, setFilter] = useState<RunwaySlot | "all">("all");

  const filtered = filter === "all" ? products : products.filter((p) => p.slot === filter);

  return (
    <section id="the-vault" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">The Vault</h2>
          <p className="text-muted-foreground">Your curated selection of financial tools. Pick one per slot to complete your Runway.</p>
        </div>

        <div className="mb-8">
          <VaultFilters activeFilter={filter} onFilterChange={setFilter} />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheVault;
