import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Filter, Grid3X3, LayoutGrid, Settings2, MessageCircle, Camera, ArrowRight, Wand2, ShoppingBag, Brain, Package } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { OrchestratorLog } from "@/components/admin/OrchestratorLog";
import { Button } from "@/components/ui/button";
import { mockProducts, Product } from "@/data/mockProducts";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  product: Product;
  quantity: number;
  deliveryMethod: "delivery" | "pickup";
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "large">("grid");

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return mockProducts;
    const query = searchQuery.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          deliveryMethod: product.local_store_availability ? "pickup" : "delivery",
        },
      ];
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateDelivery = (
    productId: string,
    method: "delivery" | "pickup"
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, deliveryMethod: method }
          : item
      )
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => {}}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-primary/10 border-l-4 border-primary mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                EY Techathon 6.0 | Multi-Agent AI Shopping
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-primary">Intelligent</span> Shopping
              <br />
              <span className="text-foreground">Powered by AI Agents</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Experience the future of retail with our multi-agent system. Get personalized
              recommendations, real-time inventory checks, and seamless checkout.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/shop">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/try-on">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Camera className="h-5 w-5 mr-2" />
                  Virtual Try-On
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Virtual Try-On Feature Banner */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-r from-card via-card to-primary/10 border border-border p-8 md:p-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-primary/10 border-l-4 border-primary">
                  <Wand2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">New Feature</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-primary">AI-Powered</span> Virtual Try-On
                </h2>
                <p className="text-muted-foreground">
                  See how clothes look on you before buying. Our AI technology creates realistic previews, 
                  helping you make confident purchase decisions without stepping into a store.
                </p>
                <ul className="space-y-3">
                  {[
                    "Upload your photo or use our models",
                    "Try unlimited outfits instantly",
                    "Get AI style recommendations",
                    "Save favorites and compare looks"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-6 h-6 rounded-sm bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/try-on">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                    Try It Now
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-card to-transparent z-10" />
                <div className="grid grid-cols-2 gap-4">
                  {mockProducts.slice(0, 4).map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="aspect-square overflow-hidden border border-border"
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Agents Overview */}
      <section className="py-12 px-4 md:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Meet Our <span className="text-primary">AI Agents</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our multi-agent system works together to provide you with the best shopping experience
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Recommendation Agent", desc: "Personalized suggestions based on your style", color: "text-primary" },
              { icon: Package, title: "Inventory Agent", desc: "Real-time stock across all stores", color: "text-accent" },
              { icon: Wand2, title: "Style Agent", desc: "AI-powered virtual try-on", color: "text-primary" },
              { icon: ShoppingBag, title: "Payment Agent", desc: "Secure and smart checkout", color: "text-warning" },
            ].map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border p-6 hover:border-primary/50 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-sm bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors`}>
                  <agent.icon className={`h-6 w-6 ${agent.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{agent.title}</h3>
                <p className="text-sm text-muted-foreground">{agent.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Hand-picked by our AI recommendation agent</p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Filters & View Toggle */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30"
                >
                  <span className="text-sm text-primary">"{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-primary hover:text-primary/80"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>
              <div className="flex items-center border border-glass-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${
                    viewMode === "grid" ? "bg-secondary" : ""
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("large")}
                  className={`p-1.5 rounded ${
                    viewMode === "large" ? "bg-secondary" : ""
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAdminOpen(true)}
                className="ml-2"
              >
                <Settings2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                No products found matching your search.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Floating Chat Button (when chat is closed) */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl glow-purple hover:scale-110 transition-transform"
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modals & Overlays */}
      <ChatInterface
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSearch={handleSearch}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateDelivery={handleUpdateDelivery}
      />

      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <OrchestratorLog isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
