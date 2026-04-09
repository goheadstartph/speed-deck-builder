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
        <div className="px-6 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Top pick · {topPickCategory}s
          </span>
        </div>
      )}

      {/* Header: Logo + Name + Score */}
      <div className="flex items-center justify-between px-6 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm text-2xl border border-white/20">
            {product.logoEmoji}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-base leading-tight">{product.name}</h3>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>
        </div>
        <ScoreGauge score={product.score} size={56} tooltip={product.scoreTooltip} />
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-white/15" />

      {/* Data points grid — 4 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 px-6 py-4">
        {product.dataPoints.map((dp) => (
          <div key={dp.label}>
            <p className="text-[11px] text-muted-foreground">{dp.label}</p>
            <p className="text-sm font-bold text-foreground">{dp.value}</p>
          </div>
        ))}
      </div>

      {/* Feature pills */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 pb-4">
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className={`rounded-full px-3 py-1 text-xs font-medium border ${
                i < 2
                  ? "border-primary/30 text-primary bg-primary/5"
                  : "border-white/20 text-muted-foreground bg-white/5"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-3 px-6 pb-4">
        <Button asChild variant="outline" className="rounded-full" size="sm">
          <a href={product.applyUrl} target="_blank" rel="noopener noreferrer">
            Apply now
            <ExternalLink className="ml-1.5 h-3 w-3" />
          </a>
        </Button>
        <Button
          variant={inRunway ? "default" : "outline"}
          size="sm"
          className={`rounded-full transition-all ${justAdded ? "animate-bounce-in" : ""} ${
            !inRunway ? "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20" : ""
          }`}
          onClick={handleToggleRunway}
        >
          {inRunway ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5" />
              In Runway
            </>
          ) : (
            <>
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add to Runway
            </>
          )}
        </Button>
      </div>

      {/* Accordions */}
      <div className="border-t border-white/15 px-6 pb-2">
        <Accordion type="multiple">
          <AccordionItem value="breakdown" className="border-b border-white/10">
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline py-3">
              Product breakdown
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground leading-relaxed pb-2">{product.breakdown}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="details" className="border-b border-white/10">
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline py-3">
              Key details
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
            <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline py-3">
              The Headstart verdict
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
