import { useState } from "react";
import { Plus, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScoreGauge from "@/components/ScoreGauge";
import { useRunway } from "@/contexts/RunwayContext";
import { toast } from "sonner";

export interface ProductData {
  id: string;
  name: string;
  category: string;
  score: number;
  scoreTooltip?: string;
  dataPoints: { label: string; value: string }[];
  tags?: string[];
  proTip: string;
  applyUrl: string;
  logoEmoji: string;
  breakdown: string;
  keyDetails: string[];
  verdict: string;
}

const ProductCard = ({
  product,
  isTopPick,
  topPickCategory,
}: {
  product: ProductData;
  isTopPick?: boolean;
  topPickCategory?: string;
}) => {
  const { addToRunway, removeFromSlot, isInRunway, slots } = useRunway();
  const inRunway = isInRunway(product.id);
  const [justAdded, setJustAdded] = useState(false);

  const handleToggleRunway = () => {
    if (inRunway) {
      const idx = slots.findIndex((s) => s.product?.id === product.id);
      if (idx !== -1) removeFromSlot(idx);
      toast("Removed from your Runway");
    } else {
      const hasSpace = slots.some((s) => s.status === "empty");
      if (!hasSpace) {
        toast.error("Runway is full! Remove a slot first.");
        return;
      }
      addToRunway({ id: product.id, name: product.name, logoEmoji: product.logoEmoji });
      setJustAdded(true);
      toast.success("Added to your Runway! 🚀");
      setTimeout(() => setJustAdded(false), 500);
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden transition-all hover:shadow-xl w-full">
      {/* Top pick badge */}
      {isTopPick && topPickCategory && (
        <div className="px-8 pt-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Top pick · {topPickCategory}s
          </span>
        </div>
      )}

      {/* Header: Logo + Name + Score + Actions */}
      <div className="flex items-center gap-4 px-8 pt-6 pb-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm text-2xl border border-white/20">
          {product.logoEmoji}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground text-lg leading-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
        </div>
        <ScoreGauge score={product.score} size={48} tooltip={product.scoreTooltip} />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleToggleRunway}
            className={`group relative flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${justAdded ? "animate-bounce-in" : ""} ${
              inRunway
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border/40 bg-white/5 text-foreground hover:bg-white/10"
            }`}
          >
            {inRunway ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground text-background px-2 py-0.5 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {inRunway ? "Remove" : "Save for Later"}
            </span>
          </button>
          <div className="flex flex-col items-end">
            <Button asChild size="sm" className="rounded-md text-xs h-9 px-5">
              <a href={product.applyUrl} target="_blank" rel="noopener noreferrer">
                Apply now
                <ExternalLink className="ml-1.5 h-3 w-3" />
              </a>
            </Button>
            <p className="text-[10px] text-muted-foreground mt-1">
              on {product.name}'s website · Terms & Conditions apply
            </p>
          </div>
      </div>

      {/* Divider */}
      <div className="mx-8 border-t border-border" />

      {/* Data points with vertical dividers — center aligned */}
      <div className="flex items-center px-8 py-5">
        {product.dataPoints.map((dp, i) => (
          <div key={dp.label} className="flex items-center flex-1 min-w-0">
            <div className="min-w-0 text-center w-full">
              <p className="text-[11px] text-muted-foreground mb-0.5">{dp.label}</p>
              <p className="text-sm font-bold text-foreground">{dp.value}</p>
            </div>
            {i < product.dataPoints.length - 1 && (
              <div className="shrink-0 w-px h-8 bg-border" />
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-8 border-t border-border" />

      {/* Accordions */}
      <div className="px-8">
        <Accordion type="multiple">
          <AccordionItem value="breakdown" className="border-b border-border/50">
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline py-4">
              Product breakdown
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground leading-relaxed pb-3">{product.breakdown}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="details" className="border-b border-border/50">
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline py-4">
              Key details
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 pb-3">
                {product.keyDetails.map((detail, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="verdict" className="border-0">
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline py-4">
              The Headstart verdict
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground leading-relaxed pb-3">{product.verdict}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Divider */}
      <div className="mx-8 border-t border-border" />

      {/* Bottom apply section with subheaders */}
      <div className="flex flex-col items-center gap-1.5 px-8 py-6">
        <Button asChild size="lg" className="rounded-md text-sm h-11 px-10 w-full max-w-md">
          <a href={product.applyUrl} target="_blank" rel="noopener noreferrer">
            APPLY NOW
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <p className="text-xs text-muted-foreground">
          on {product.name}'s website
        </p>
        <a
          href={product.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-primary hover:underline"
        >
          Rates & Fees
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
