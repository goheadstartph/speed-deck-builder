import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import VaultFilters, { type FilterKey } from "@/components/VaultFilters";
import { products } from "@/data/products";

const categoryMap: Record<string, FilterKey> = {
  "Digital Bank": "digital-bank",
  "Local Broker": "local-broker",
  "Global Broker": "global-broker",
  "Credit Builder": "credit-builder",
};

const TheVault = () => {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => categoryMap[p.category] === filter);

  return (
    <section id="the-vault" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">The Vault</h2>
          <p className="text-muted-foreground">
            Your curated selection of financial tools. Pick your favorites to build your Runway.
          </p>
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
