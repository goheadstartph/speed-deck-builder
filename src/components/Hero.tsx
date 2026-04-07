import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="relative overflow-hidden py-20 text-center">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Your Financial
          <span className="block text-primary">Runway</span>
        </h1>
        <p className="mx-auto max-w-lg text-lg text-muted-foreground">
          The all-in-one financial OS for Gen Z Filipinos. Compare, commit, and launch your wealth-building stack in 5 simple steps.
        </p>
        <Button
          size="lg"
          className="rounded-full px-8 text-base font-semibold shadow-lg"
          onClick={() => document.getElementById("the-vault")?.scrollIntoView({ behavior: "smooth" })}
        >
          Explore The Vault
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </section>
);

export default Hero;
