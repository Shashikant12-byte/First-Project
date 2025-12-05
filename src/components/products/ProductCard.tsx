import { motion } from "framer-motion";
import { Heart, ShoppingBag, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/mockProducts";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onAddToCart, onViewDetails, index }: ProductCardProps) {
  const stockColors = {
    high: "text-success bg-success/10",
    medium: "text-warning bg-warning/10",
    low: "text-destructive bg-destructive/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              variant="glass"
              size="sm"
              className="flex-1"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/50 backdrop-blur-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {/* Style Match Badge */}
          {product.styleMatch && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 text-primary-foreground" />
              <span className="text-xs font-semibold text-primary-foreground">
                {product.styleMatch}% Match
              </span>
            </motion.div>
          )}

          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Local Availability Badge */}
        {product.local_store_availability && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-accent/90 backdrop-blur-sm opacity-0 group-hover:opacity-0 transition-opacity">
            <MapPin className="h-3 w-3 text-accent-foreground" />
            <span className="text-xs font-medium text-accent-foreground">In Store</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>
          <h3 
            className="font-semibold text-foreground line-clamp-1 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${stockColors[product.stock_level]}`}>
            {product.stock_level === "high" ? "In Stock" : product.stock_level === "medium" ? "Limited" : "Low Stock"}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 pt-2 border-t border-glass-border">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-warning"
                    : "text-muted"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>
      </div>
    </motion.div>
  );
}
