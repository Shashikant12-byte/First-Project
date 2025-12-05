import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, MapPin, Truck, RotateCcw, Sparkles, Camera, Loader2, Check, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, mockStores, Store as StoreType } from "@/data/mockProducts";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [isCheckingStock, setIsCheckingStock] = useState(false);
  const [showStores, setShowStores] = useState(false);
  const [stores, setStores] = useState<StoreType[]>([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isTryingOn, setIsTryingOn] = useState(false);

  const handleCheckStock = async () => {
    setIsCheckingStock(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStores(mockStores);
    setShowStores(true);
    setIsCheckingStock(false);
  };

  const handleTryOn = async () => {
    setIsTryingOn(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsTryingOn(false);
  };

  if (!product) return null;

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-auto md:h-full bg-secondary/30">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* AI Try-On Overlay */}
              <AnimatePresence>
                {isTryingOn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center"
                  >
                    <div className="relative">
                      <Camera className="h-16 w-16 text-primary animate-pulse" />
                      <motion.div
                        className="absolute inset-0 border-2 border-primary rounded-full"
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                    <p className="mt-4 text-lg font-medium">AI Try-On Processing</p>
                    <p className="text-sm text-muted-foreground">Analyzing body measurements...</p>
                    <div className="mt-4 w-48 h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Style Match Badge */}
              {product.styleMatch && (
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/90 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                  <span className="text-sm font-bold text-primary-foreground">
                    {product.styleMatch}% Style Match
                  </span>
                </div>
              )}

              {/* Close Button */}
              <Button
                variant="glass"
                size="icon"
                className="absolute top-4 right-4"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Details Section */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold">{product.name}</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Size</span>
                  <button className="text-xs text-primary hover:underline">Size Guide</button>
                </div>
                <div className="flex gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-glass-border hover:border-muted-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Try-On */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-glass-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Camera className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">AI Virtual Try-On</p>
                      <p className="text-xs text-muted-foreground">See how it looks on you</p>
                    </div>
                  </div>
                  <Button 
                    variant="glow" 
                    size="sm"
                    onClick={handleTryOn}
                    disabled={isTryingOn}
                  >
                    {isTryingOn ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Try Now"
                    )}
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="glow" 
                  className="flex-1" 
                  size="lg"
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Delivery Options */}
              <div className="space-y-3 pt-4 border-t border-glass-border">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-accent" />
                  <span>Free delivery on orders over $150</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="h-5 w-5 text-accent" />
                  <span>Free 30-day returns</span>
                </div>
              </div>

              {/* Nearby Stores */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="font-medium">Nearby Stores</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCheckStock}
                    disabled={isCheckingStock}
                  >
                    {isCheckingStock ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Check Local Stock"
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {showStores && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {stores.map((store, i) => (
                        <motion.div
                          key={store.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-3 rounded-xl bg-secondary/50 border border-glass-border"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Store className="h-4 w-4 text-primary" />
                                <span className="font-medium text-sm">{store.name}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{store.address}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-muted-foreground">{store.distance}</span>
                                <span className={`text-xs ${store.stock > 5 ? "text-success" : "text-warning"}`}>
                                  {store.stock} in stock
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Button variant="accent" size="sm">
                                Reserve
                              </Button>
                              {store.tryAtHome && (
                                <span className="text-xs text-accent flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  Try-at-Home
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
