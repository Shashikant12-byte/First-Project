import { ShoppingCart, User, Search, Cpu, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

export function Navbar({ cartCount, onCartClick, onMenuClick }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Cpu className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold gradient-text">BlockBusters</span>
                <span className="text-[10px] text-muted-foreground -mt-1 tracking-widest uppercase">
                  AI Retail
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ask AI to find anything..."
                className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary/50 border border-glass-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center text-accent-foreground"
                >
                  {cartCount}
                </motion.span>
              )}
            </Button>
            <Button variant="glow" size="sm" className="hidden sm:flex">
              <Cpu className="h-4 w-4 mr-1" />
              AI Mode
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
