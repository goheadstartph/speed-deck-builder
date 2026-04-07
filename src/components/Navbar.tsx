import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = ["Home", "Articles", "Education"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const compact = scrolled && !hovered;

  return (
    <nav
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-5xl glass rounded-2xl transition-all duration-300 ${
        compact ? "py-2 px-4" : "py-3 px-6"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5">
          <div className={`flex items-center justify-center rounded-xl bg-primary transition-all duration-300 ${compact ? "h-8 w-8" : "h-9 w-9"}`}>
            <span className="text-sm font-bold text-primary-foreground">H</span>
          </div>
          <span className={`font-bold tracking-tight text-foreground transition-all duration-300 ${compact ? "text-base" : "text-lg"}`}>
            Headstart
          </span>
        </div>

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/20 transition-all"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:inline-flex rounded-full text-sm font-medium text-muted-foreground">
            Login
          </Button>
          <Button size="sm" className="hidden md:inline-flex rounded-full text-sm font-semibold">
            Sign Up
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-1 border-t border-white/20 pt-3">
          {navLinks.map((link) => (
            <button
              key={link}
              className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 text-left transition-all"
            >
              {link}
            </button>
          ))}
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="flex-1 rounded-full">Login</Button>
            <Button size="sm" className="flex-1 rounded-full">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
