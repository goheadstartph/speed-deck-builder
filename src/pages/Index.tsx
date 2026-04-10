import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RunwayBar from "@/components/RunwayBar";
import TheVault from "@/components/TheVault";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-24">
      <Hero />
      <TheVault />
      <footer className="glass-strong mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 Headstart. Built for Filipino students who want to start building wealth today.
        </div>
      </footer>
    </div>
  </div>
);

export default Index;
