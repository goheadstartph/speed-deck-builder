import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import TheVault from "@/components/TheVault";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <CategoryGrid />
    <TheVault />
    <footer className="border-t bg-secondary/50 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © 2026 Headstart. Built for Filipino students who want to start building wealth today.
      </div>
    </footer>
  </div>
);

export default Index;
