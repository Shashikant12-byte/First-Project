import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, Truck, Store, ShieldCheck, CreditCard, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/mockProducts";
import { useState } from "react";

interface CartItem {
  product: Product;
  quantity: number;
  deliveryMethod: "delivery" | "pickup";
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onUpdateDelivery: (productId: string, method: "delivery" | "pickup") => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateDelivery,
}: CartSidebarProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFraudAlert, setShowFraudAlert] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate payment agent verification
    setTimeout(() => {
      if (total > 500) {
        setShowFraudAlert(true);
      }
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md glass border-l border-glass-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <h2 className="text-lg font-semibold">Shopping Cart ({items.length})</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Store className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button variant="outline" className="mt-4" onClick={onClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="glass-card rounded-xl p-4 space-y-3"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                        <p className="text-lg font-bold mt-1">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                            onClick={() => onRemoveItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Method */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdateDelivery(item.product.id, "delivery")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                          item.deliveryMethod === "delivery"
                            ? "bg-primary/20 text-primary border border-primary"
                            : "bg-secondary border border-glass-border hover:bg-secondary/80"
                        }`}
                      >
                        <Truck className="h-4 w-4" />
                        Delivery
                      </button>
                      <button
                        onClick={() => onUpdateDelivery(item.product.id, "pickup")}
                        disabled={!item.product.local_store_availability}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                          item.deliveryMethod === "pickup"
                            ? "bg-accent/20 text-accent border border-accent"
                            : "bg-secondary border border-glass-border hover:bg-secondary/80"
                        } ${!item.product.local_store_availability ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <Store className="h-4 w-4" />
                        Pickup
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-glass-border p-4 space-y-4">
                {/* Fraud Alert */}
                <AnimatePresence>
                  {showFraudAlert && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-warning/10 border border-warning/30 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Security Verification Required</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Payment Agent detected unusual amount. Please verify your identity.
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setShowFraudAlert(false)}>
                        Verify with Biometrics
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? "text-success" : ""}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-glass-border">
                    <span>Total</span>
                    <span className="gradient-text">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span>Secured by Payment Agent</span>
                </div>

                {/* Checkout Button */}
                <Button
                  variant="glow"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <CreditCard className="h-5 w-5 mr-2 animate-pulse" />
                      Verifying Transaction...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Secure Checkout
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
