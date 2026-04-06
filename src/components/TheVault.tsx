import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { RUNWAY_SLOTS, type RunwaySlot } from "@/contexts/RunwayContext";
import { Landmark, TrendingUp, Globe, CreditCard, Target } from "lucide-react";

const slotIcons: Record<RunwaySlot, React.ElementType> = {
  "digital-bank": Landmark,
  "local-broker": TrendingUp,
  "global-broker": Globe,
  "credit-builder": CreditCard,
  "long-term-goal": Target,
};

const TheVault = () => {
  return (
    <section id="the-vault" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">The Vault</h2>
          <p className="text-muted-foreground">Your curated selection of financial tools. Pick one per slot to complete your Runway.</p>
        </div>

        {RUNWAY_SLOTS.map((slot) => {
          const slotProducts = products.filter((p) => p.slot === slot.key);
          if (slotProducts.length === 0) return null;
          const Icon = slotIcons[slot.key];

          return (
            <div key={slot.key} className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{slot.label}</h3>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {slotProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TheVault;
