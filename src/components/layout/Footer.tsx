import { Link } from "react-router-dom";
import { Brain, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-glass-border">
      {/* EY Yellow Top Bar */}
      <div className="h-1 bg-primary w-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">EY</span>
              <div className="h-6 w-px bg-primary/50" />
              <span className="text-lg font-bold">BlockBusters</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Reimagining retail experiences through AI-driven personalization and human-like interactions.
            </p>
            <p className="text-sm text-primary font-medium">
              Shape the future with confidence
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/how-it-works", label: "How It Works" },
                { to: "/team", label: "Our Team" },
                { to: "/orders", label: "My Orders" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Agents */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">AI Agents</h4>
            <ul className="space-y-2">
              {[
                "Recommendation Agent",
                "Inventory Agent",
                "Payment Agent",
                "Support Agent",
                "Analytics Agent",
              ].map((agent) => (
                <li key={agent} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Brain className="h-3 w-3 text-primary" />
                  {agent}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                blockbusters@ey.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                EY Global Delivery Services, India
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="p-2 rounded-sm bg-secondary hover:bg-primary/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-sm bg-secondary hover:bg-primary/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-sm bg-secondary hover:bg-primary/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 EY Techathon 6.0 | Team BlockBusters. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
