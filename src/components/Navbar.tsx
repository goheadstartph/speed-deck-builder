import { useState, useEffect } from "react";
import { Search, Menu, X, Home, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", icon: Home },
  { label: "Articles", icon: FileText },
  { label: "Education", icon: GraduationCap },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const collapsed = scrolled && !hovered;

  return (
    <nav
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 glass rounded-full transition-all duration-500 ease-in-out ${
        collapsed ? "max-w-xs py-2 px-3" : "max-w-2xl py-3 px-6"
      } w-[95%]`}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`flex items-center justify-center rounded-xl bg-primary transition-all duration-300 ${collapsed ? "h-7 w-7" : "h-9 w-9"}`}>
            <span className={`font-bold text-primary-foreground ${collapsed ? "text-xs" : "text-sm"}`}>H</span>
          </div>
          <span className={`font-bold tracking-tight text-foreground transition-all duration-300 overflow-hidden whitespace-nowrap ${
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}>
            Headstart
          </span>
        </div>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/20 transition-all"
            >
              <link.icon className="h-4 w-4 shrink-0" />
              <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}>
                {link.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className={`flex items-center gap-1.5 shrink-0 transition-all duration-300 ${collapsed ? "gap-1" : "gap-2"}`}>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 hidden md:flex gap-1.5"}`}>
            <Button variant="ghost" size="sm" className="rounded-full text-sm font-medium text-muted-foreground">
              Login
            </Button>
            <Button size="sm" className="rounded-full text-sm font-semibold">
              Sign Up
            </Button>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-muted-foreground h-8 w-8"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-1 border-t border-white/20 pt-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 text-left transition-all"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
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
