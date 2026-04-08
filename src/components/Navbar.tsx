import { useState, useEffect, useRef } from "react";
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
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const authRef = useRef<HTMLDivElement>(null);

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
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 glass rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-auto"
      style={{ padding: collapsed ? "8px 12px" : "12px 24px" }}
    >
      <div className="flex items-center gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`flex items-center justify-center rounded-xl bg-primary transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${collapsed ? "h-7 w-7" : "h-9 w-9"}`}>
            <span className={`font-bold text-primary-foreground transition-all duration-500 ${collapsed ? "text-xs" : "text-sm"}`}>H</span>
          </div>
          <span
            ref={logoTextRef}
            className="font-bold tracking-tight text-foreground whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ width: collapsed ? 0 : logoTextRef.current?.scrollWidth ?? 80, opacity: collapsed ? 0 : 1 }}
          >
            Headstart
          </span>
        </div>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/20 transition-colors"
            >
              <link.icon className="h-4 w-4 shrink-0" />
              <span
                ref={(el) => { labelRefs.current[i] = el; }}
                className="whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{ width: collapsed ? 0 : labelRefs.current[i]?.scrollWidth ?? 60, opacity: collapsed ? 0 : 1 }}
              >
                {link.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <div
            ref={authRef}
            className="hidden md:flex items-center gap-1.5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ width: collapsed ? 0 : authRef.current?.scrollWidth ?? 160, opacity: collapsed ? 0 : 1 }}
          >
            <Button variant="ghost" size="sm" className="rounded-full text-sm font-medium text-muted-foreground whitespace-nowrap">
              Login
            </Button>
            <Button size="sm" className="rounded-full text-sm font-semibold whitespace-nowrap">
              Sign Up
            </Button>
          </div>
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
