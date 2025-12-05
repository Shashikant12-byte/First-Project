import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Filter, Grid3X3, LayoutGrid, Settings2, MessageCircle } from "lucide-react";
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
  const [isChatOpen, setIsChatOpen] = useState(true);
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

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Multi-Agent AI Shopping Experience
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Intelligent</span> Shopping
            <br />
            <span className="text-foreground">Powered by AI Agents</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of retail with our multi-agent system. Get personalized
            recommendations, real-time inventory checks, and seamless checkout.
          </p>
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
      </main>

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
