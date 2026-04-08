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
  dataPoints: [{ label: string; value: string }, { label: string; value: string }, { label: string; value: string }];
  proTip: string;
  applyUrl: string;
  logoEmoji: string;
  breakdown: string;
  keyDetails: string[];
  verdict: string;
}

const ProductCard = ({ product }: { product: ProductData }) => {
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
      {/* Main content row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-5 gap-5">
        {/* Left: Brand + Score */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm text-2xl border border-white/20">
            {product.logoEmoji}
          </div>
          <div className="mr-2">
            <h3 className="font-semibold text-foreground text-sm leading-tight">{product.name}</h3>
            <p className="text-[11px] text-muted-foreground">{product.category}</p>
          </div>
          <ScoreGauge score={product.score} tooltip={product.scoreTooltip} />
        </div>

        {/* Middle: Data */}
        <div className="grid grid-cols-3 gap-4 flex-1 min-w-0">
          {product.dataPoints.map((dp) => (
            <div key={dp.label} className="min-w-0">
              <p className="text-[10px] text-muted-foreground truncate">{dp.label}</p>
              <p className="text-xs font-bold text-foreground truncate">{dp.value}</p>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button asChild className="rounded-full" size="sm">
            <a href={product.applyUrl} target="_blank" rel="noopener noreferrer">
              Apply Now
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </Button>
          <Button
            variant={inRunway ? "default" : "outline"}
            size="icon"
            className={`shrink-0 rounded-full h-9 w-9 transition-all ${justAdded ? "animate-bounce-in" : ""} ${
              !inRunway ? "bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/40" : ""
            }`}
            onClick={handleToggleRunway}
            aria-label={inRunway ? "Remove from Runway" : "Add to Runway"}
          >
            {inRunway ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Accordions */}
      <div className="border-t border-white/20 px-5 pb-2">
        <Accordion type="multiple">
          <AccordionItem value="breakdown" className="border-b border-white/10">
            <AccordionTrigger className="text-xs font-semibold text-primary hover:no-underline py-3">
              Product Breakdown
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground leading-relaxed pb-2">{product.breakdown}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="details" className="border-b border-white/10">
            <AccordionTrigger className="text-xs font-semibold text-primary hover:no-underline py-3">
              Key Details
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 pb-2">
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
            <AccordionTrigger className="text-xs font-semibold text-primary hover:no-underline py-3">
              The Headstart Verdict
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground leading-relaxed pb-2">{product.verdict}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductCard;
