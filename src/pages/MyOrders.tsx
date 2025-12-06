import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, Truck, CheckCircle, Clock, MapPin, 
  RotateCcw, MessageSquare, ChevronRight, Calendar,
  Star, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipping" | "processing" | "returned";
  total: number;
  items: {
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  tracking?: string;
  deliveryDate?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-12-01",
    status: "delivered",
    total: 339.98,
    deliveryDate: "2024-12-04",
    items: [
      {
        name: "Quantum Runner Pro",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop",
        price: 189.99,
        quantity: 1,
      },
      {
        name: "Flux Training Set",
        image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=200&auto=format&fit=crop",
        price: 149.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-12-03",
    status: "shipping",
    total: 349.99,
    tracking: "1Z999AA10123456784",
    items: [
      {
        name: "NeoTech Blazer",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&auto=format&fit=crop",
        price: 349.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-12-05",
    status: "processing",
    total: 129.99,
    items: [
      {
        name: "Aurora Summer Dress",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&auto=format&fit=crop",
        price: 129.99,
        quantity: 1,
      },
    ],
  },
];

const statusConfig = {
  delivered: {
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    label: "Delivered",
  },
  shipping: {
    icon: Truck,
    color: "text-accent",
    bgColor: "bg-accent/10",
    label: "In Transit",
  },
  processing: {
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
    label: "Processing",
  },
  returned: {
    icon: RotateCcw,
    color: "text-muted-foreground",
    bgColor: "bg-muted/10",
    label: "Returned",
  },
};

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReturnChat, setShowReturnChat] = useState(false);

  const handleReturnExchange = (order: Order) => {
    setSelectedOrder(order);
    setShowReturnChat(true);
  };

  return (
    <div className="pt-[68px] min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-16 h-1 bg-primary mb-4" />
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-2">
            Track your orders and manage returns with AI assistance
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mockOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Button variant="glow" asChild>
              <a href="/shop">Browse Products</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order, i) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-lg border border-glass-border overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-4 sm:p-6 border-b border-glass-border">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-sm ${status.bgColor}`}>
                          <StatusIcon className={`h-5 w-5 ${status.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{order.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-sm ${status.bgColor} ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Ordered: {new Date(order.date).toLocaleDateString()}
                            </span>
                            {order.deliveryDate && (
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-success" />
                                Delivered: {new Date(order.deliveryDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6 space-y-4">
                    {order.items.map((item, j) => (
                      <div key={j} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="p-4 sm:p-6 bg-secondary/30 border-t border-glass-border">
                    <div className="flex flex-wrap gap-3">
                      {order.status === "shipping" && order.tracking && (
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReturnExchange(order)}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Return / Exchange
                          </Button>
                          <Button variant="outline" size="sm">
                            <Star className="h-4 w-4 mr-2" />
                            Leave Review
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Get Help
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Return/Exchange Chat Modal */}
      {showReturnChat && selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowReturnChat(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-card rounded-lg border border-glass-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-glass-border bg-success/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-success/20 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">Post-Purchase Support Agent</h3>
                  <p className="text-xs text-muted-foreground">Ready to help with your return</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm">
                  I see you'd like to return or exchange items from order <strong>{selectedOrder.id}</strong>. 
                  I'm here to help make this process as smooth as possible.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm mb-3">Is the size not right, or did you change your mind? I can arrange a pickup for tomorrow.</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowReturnChat(false)}>
                    Wrong Size
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowReturnChat(false)}>
                    Changed Mind
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowReturnChat(false)}>
                    Defective Item
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowReturnChat(false)}>
                    Other Reason
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-primary">Free Returns Available</p>
                  <p className="text-muted-foreground">
                    This order is eligible for free returns within 30 days. 
                    I can schedule a pickup at your convenience.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-glass-border">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShowReturnChat(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
