import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid3X3, LayoutGrid, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetail } from "@/components/products/ProductDetail";
import { mockProducts, Product } from "@/data/mockProducts";
import { useOutletContext } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  product: Product;
  quantity: number;
  deliveryMethod: "delivery" | "pickup";
}

interface ContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const categories = ["All", "Footwear", "Outerwear", "Dresses", "Activewear", "Accessories", "Tops"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $300", min: 200, max: 300 },
  { label: "Over $300", min: 300, max: Infinity },
];

export default function Shop() {
  const { setCartItems } = useOutletContext<ContextType>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "large">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];
    
    // Category filter
    if (selectedCategory !== "All") {
      products = products.filter(p => p.category === selectedCategory);
    }
    
    // Price filter
    products = products.filter(
      p => p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max
    );
    
    // Sorting
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "match":
        products.sort((a, b) => (b.styleMatch || 0) - (a.styleMatch || 0));
        break;
    }
    
    return products;
  }, [selectedCategory, selectedPriceRange, sortBy]);

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

  const activeFiltersCount = 
    (selectedCategory !== "All" ? 1 : 0) + 
    (selectedPriceRange.label !== "All Prices" ? 1 : 0);

  return (
    <div className="pt-[68px] min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-16 h-1 bg-primary mb-4" />
          <h1 className="text-3xl font-bold">Shop All Products</h1>
          <p className="text-muted-foreground mt-2">
            Discover AI-curated products with personalized style matching
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 w-5 h-5 rounded-full bg-primary-foreground text-primary text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            {/* Active Filters */}
            <div className="flex items-center gap-2">
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-sm bg-primary/10 text-primary text-sm">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedPriceRange.label !== "All Prices" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-sm bg-primary/10 text-primary text-sm">
                  {selectedPriceRange.label}
                  <button onClick={() => setSelectedPriceRange(priceRanges[0])}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 rounded-sm bg-secondary border border-glass-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="featured">Featured</option>
              <option value="match">Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <div className="flex items-center border border-glass-border rounded-sm p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-sm ${viewMode === "grid" ? "bg-secondary" : ""}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("large")}
                className={`p-1.5 rounded-sm ${viewMode === "large" ? "bg-secondary" : ""}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 rounded-lg bg-card border border-glass-border">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-4">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                            selectedCategory === category
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold mb-4">Price Range</h3>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((range) => (
                        <button
                          key={range.label}
                          onClick={() => setSelectedPriceRange(range)}
                          className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                            selectedPriceRange.label === range.label
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
              No products found matching your filters.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedPriceRange(priceRanges[0]);
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>

      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
