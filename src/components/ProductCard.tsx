import { useState } from "react";
import { Plus, Check, ExternalLink, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRunway, type RunwaySlot } from "@/contexts/RunwayContext";
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

  const handleToggleRunway = () => {
    if (inRunway) {
      removeFromRunway(product.slot);
      toast("Removed from your Runway");
    } else {
      addToRunway({ id: product.id, name: product.name, slot: product.slot });
      setJustAdded(true);
      toast.success("Added to your Runway! 🚀");
      setTimeout(() => setJustAdded(false), 500);
    }
  };

  const gradeColor =
    product.grade >= 90
      ? "bg-primary text-primary-foreground"
      : product.grade >= 75
        ? "bg-accent text-accent-foreground"
        : "bg-secondary text-secondary-foreground";

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-start gap-3 pb-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl">
          {product.logoEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
          <Badge className={`mt-1 ${gradeColor} border-0`}>
            {product.grade}% Fit
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 pb-3">
        {/* Data points */}
        <div className="grid grid-cols-2 gap-3">
          {product.dataPoints.map((dp) => (
            <div key={dp.label}>
              <p className="text-xs text-muted-foreground">{dp.label}</p>
              <p className="text-sm font-semibold text-foreground">{dp.value}</p>
            </div>
          ))}
        </div>

        {/* Operator box */}
        <div className="flex items-start gap-2 rounded-lg bg-muted p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-muted-foreground">{product.proTip}</p>
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-0">
        <Button asChild className="flex-1 rounded-full" size="sm">
          <a href={product.applyUrl} target="_blank" rel="noopener noreferrer">
            Apply Now
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
        <Button
          variant={inRunway ? "default" : "outline"}
          size="icon"
          className={`shrink-0 rounded-full transition-all ${justAdded ? "animate-bounce-in" : ""}`}
          onClick={handleToggleRunway}
          aria-label={inRunway ? "Remove from Runway" : "Add to Runway"}
        >
          {inRunway ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
