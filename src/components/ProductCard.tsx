import { useState } from "react";
import { Plus, Check, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRunway, type RunwaySlot } from "@/contexts/RunwayContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";

export interface ProductData {
  id: string;
  name: string;
  slot: RunwaySlot;
  grade: number;
  dataPoints: [{ label: string; value: string }, { label: string; value: string }];
  proTip: string;
  applyUrl: string;
  logoEmoji: string;
}

const ProductCard = ({ product }: { product: ProductData }) => {
  const { addToRunway, removeFromRunway, isInRunway } = useRunway();
  const inRunway = isInRunway(product.id);
  const [justAdded, setJustAdded] = useState(false);
  const [verdictOpen, setVerdictOpen] = useState(false);

  const handleToggleRunway = () => {
    if (inRunway) {
      removeFromRunway(product.slot);
      toast("Removed from your Runway");
    } else {
      addToRunway({ id: product.id, name: product.name, slot: product.slot, logoEmoji: product.logoEmoji });
      setJustAdded(true);
      toast.success("Added to your Runway! 🚀");
      setTimeout(() => setJustAdded(false), 500);
    }
  };

  return (
    <Collapsible open={verdictOpen} onOpenChange={setVerdictOpen}>
      <div className="glass rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5 w-full">
        {/* Main card content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-5 gap-4">
          {/* Left: Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/30 backdrop-blur-sm text-2xl border border-white/20">
              {product.logoEmoji}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate text-base">{product.name}</h3>
              <Badge className="mt-1 bg-primary/15 text-primary border-0 font-bold text-xs">
                {product.grade}% Fit
              </Badge>
            </div>
          </div>

          {/* Middle: Data */}
          <div className="flex items-center gap-6">
            {product.dataPoints.map((dp) => (
              <div key={dp.label}>
                <p className="text-[11px] text-muted-foreground">{dp.label}</p>
                <p className="text-sm font-bold text-foreground">{dp.value}</p>
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

        {/* Verdict Accordion */}
        <div className="border-t border-white/20">
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-primary hover:bg-white/10 transition-all">
              View Headstart Verdict
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${verdictOpen ? "rotate-180" : ""}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-5 pb-5 space-y-3">
              <div>
                <h4 className="text-sm font-bold text-primary mb-1">✅ The Good</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.proTip} Industry-leading features with competitive rates that make it a standout choice for Filipino students starting their financial journey.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-destructive mb-1">⚠️ The Bad</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Some features may require a minimum balance or additional verification. Customer support response times can vary during peak hours.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">💡 Headstart Tips</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.proTip} Start small and build consistency. Set up automatic deposits to make saving effortless.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  );
};

export default ProductCard;
