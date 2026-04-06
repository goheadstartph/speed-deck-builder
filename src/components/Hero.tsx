import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="relative overflow-hidden border-b bg-background py-20 md:py-28">
    <div className="container mx-auto px-4 text-center">
      <div className="mx-auto max-w-3xl">
        <span className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
          🇵🇭 Built for Filipino Students
        </span>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
          Stop studying.{" "}
          <span className="text-primary">Start doing.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Build your financial runway in 5 minutes. No BS, just the exact apps you need to start growing your money today.
        </p>
        <Button
          size="lg"
          className="gap-2 rounded-full px-8"
          onClick={() => document.getElementById("the-vault")?.scrollIntoView({ behavior: "smooth" })}
        >
          Explore The Vault
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </div>

    {/* Decorative blobs */}
    <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-10 -left-20 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />
  </section>
);

export default Hero;
