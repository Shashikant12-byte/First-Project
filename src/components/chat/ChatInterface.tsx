import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, X, Minimize2, Maximize2, MapPin, ShoppingBag, CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentThinking, AgentType } from "@/components/agents/AgentStatus";
import { sendMessageToAgent } from "@/services/api";

// --- Types ---
interface ProductData {
  name: string;
  price: number;
  imageUrl: string;
  stock: {
    inStore: {
      available: boolean;
      location: string;
    };
  };
}

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  agent?: AgentType;
  timestamp: Date;
  suggestions?: string[];
  dataType?: "inventory_response" | "payment_response" | "recommendation_response" | "text";
  data?: any; 
  product?: ProductData;
  status?: "success" | "failed";
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  // This prop connects the Chat to the Main Grid
  onSearch: (query: string) => void;
}

const quickActions = [
  "Show me summer outfits",
  "Check stock for denim jacket",
  "I want to checkout",
  "Help me with returns",
];

export function ChatInterface({ isOpen, onClose, onSearch }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "agent",
      content: "Hello! I'm your AI shopping assistant. I can help you find products, check inventory, process returns, and more. What would you like to explore today?",
      agent: "orchestrator",
      timestamp: new Date(),
      suggestions: quickActions,
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- THE UPDATED SEND HANDLER ---
  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    // 1. Add User Message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: textToSend,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // 2. UI Optimistic Updates (Guessing the Agent)
    const lowerMsg = textToSend.toLowerCase();
    if (lowerMsg.includes("stock") || lowerMsg.includes("have")) setActiveAgent("inventory");
    else if (lowerMsg.includes("buy") || lowerMsg.includes("pay")) setActiveAgent("payment");
    else setActiveAgent("recommendation");

    try {
      // 3. CALL THE BACKEND (Gemini Orchestrator)
      const response = await sendMessageToAgent(textToSend);

      // 4. HANDLE "ACTION AT A DISTANCE"
      // If Gemini decided this was a SEARCH intent, we trigger the grid update immediately
      if (response.type === 'recommendation_response' && response.searchQuery) {
        console.log("🤖 Orchestrator Triggering Search:", response.searchQuery);
        onSearch(response.searchQuery);
      }

      // 5. Format the Agent Message for UI
      const agentMessage: Message = {
        id: Date.now().toString(),
        type: "agent",
        content: response.message,
        // Map backend types to frontend agent personas
        agent: response.type === 'inventory_response' ? 'inventory' 
             : response.type === 'payment_response' ? 'payment' 
             : response.type === 'recommendation_response' ? 'recommendation'
             : 'orchestrator',
        timestamp: new Date(),
        dataType: response.type,
        data: response.data,
        product: response.product, // Inventory data
        status: response.status,   // Payment status
        suggestions: ["Show similar items", "Check other stores"]
      };

      setMessages(prev => [...prev, agentMessage]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: "agent",
        content: "I'm having trouble connecting to the store server. Please try again.",
        agent: "orchestrator",
        timestamp: new Date()
      }]);
    } finally {
      setIsThinking(false);
      setActiveAgent(null);
    }
  };

  // --- RENDER HELPERS (Unchanged visual logic) ---
  const renderProductCard = (msg: Message) => {
    if (!msg.product) return null;
    const { name, price, imageUrl, stock } = msg.product;
    
    return (
      <div className="mt-3 p-3 bg-secondary/50 rounded-xl border border-glass-border">
        <div className="flex gap-3">
          <img src={imageUrl} alt={name} className="w-16 h-16 object-cover rounded-lg bg-white" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{name}</h4>
            <p className="text-sm text-muted-foreground">₹{price}</p>
            <div className="flex items-center gap-1 mt-1 text-xs">
              {stock.inStore.available ? (
                <span className="text-green-500 flex items-center gap-1">
                  <MapPin size={12} /> Available at {stock.inStore.location}
                </span>
              ) : (
                <span className="text-orange-500 flex items-center gap-1">
                  <ShoppingBag size={12} /> Online Only
                </span>
              )}
            </div>
          </div>
        </div>
        <Button size="sm" className="w-full mt-3 h-8 text-xs">
          {stock.inStore.available ? "Reserve for Pickup" : "Add to Cart"}
        </Button>
      </div>
    );
  };

  const renderPaymentCard = (msg: Message) => {
    const isSuccess = msg.status === 'success';
    return (
      <div className={`mt-3 p-3 rounded-xl border ${isSuccess ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
        <div className="flex items-center gap-2 mb-2">
          {isSuccess ? <CreditCard className="text-green-500 h-4 w-4" /> : <AlertCircle className="text-red-500 h-4 w-4" />}
          <span className={`font-semibold text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {isSuccess ? "Payment Successful" : "Payment Failed"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{msg.content}</p>
        {!isSuccess && (
          <Button size="sm" variant="outline" className="w-full mt-2 h-7 text-xs border-red-500/30 hover:bg-red-500/10">
            Retry Transaction
          </Button>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`fixed right-4 bottom-4 z-50 ${
        isMinimized ? "w-80" : "w-96 h-[600px]"
      } glass-card rounded-2xl overflow-hidden flex flex-col shadow-2xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-glass-border bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">BlockBusters AI</h3>
            <p className="text-xs text-muted-foreground">Orchestrator Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${message.type === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3" : "space-y-1"}`}>
                    
                    {/* Agent Label */}
                    {message.type === "agent" && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary capitalize px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                          {message.agent || "Orchestrator"} Agent
                        </span>
                      </div>
                    )}

                    {/* Main Content */}
                    <div className={message.type === "agent" ? "bg-secondary/30 p-3 rounded-2xl rounded-tl-none" : ""}>
                      <p className={`text-sm ${message.type === "agent" ? "text-foreground" : ""}`}>
                        {message.content}
                      </p>

                      {/* Dynamic Cards based on Backend Data */}
                      {message.dataType === 'inventory_response' && renderProductCard(message)}
                      {message.dataType === 'payment_response' && renderPaymentCard(message)}
                    </div>

                    {/* Suggestions Chips */}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2 ml-1">
                        {message.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(suggestion)}
                            className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors border border-glass-border"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Thinking State */}
            <AnimatePresence>
              {isThinking && activeAgent && (
                <AgentThinking
                  agent={activeAgent}
                  message={
                    activeAgent === "recommendation" ? "Analyzing style preferences..." :
                    activeAgent === "inventory" ? "Checking warehouse & store stock..." :
                    activeAgent === "payment" ? "Securely communicating with gateway..." :
                    "Orchestrator is routing your request..."
                  }
                />
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-glass-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type 'check stock' or 'buy now'..."
                className="flex-1 h-10 px-4 rounded-xl bg-secondary/50 border border-glass-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Button variant="glow" size="icon" onClick={() => handleSend()} disabled={!input.trim() || isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}