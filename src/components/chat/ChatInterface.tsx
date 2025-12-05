import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentThinking, AgentType } from "@/components/agents/AgentStatus";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  agent?: AgentType;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  onProductRecommend?: (productId: string) => void;
}

const quickActions = [
  "Show me summer outfits",
  "Find running shoes under $200",
  "What's trending this week?",
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

  const simulateAgentResponse = async (userMessage: string) => {
    setIsThinking(true);
    
    // Determine which agent should respond
    const lowerMessage = userMessage.toLowerCase();
    let agent: AgentType = "orchestrator";
    let thinkingMessage = "Analyzing your request...";
    
    if (lowerMessage.includes("summer") || lowerMessage.includes("outfit") || lowerMessage.includes("recommend") || lowerMessage.includes("find") || lowerMessage.includes("show")) {
      agent = "recommendation";
      thinkingMessage = "Analyzing your style preferences...";
    } else if (lowerMessage.includes("stock") || lowerMessage.includes("store") || lowerMessage.includes("pickup") || lowerMessage.includes("available")) {
      agent = "inventory";
      thinkingMessage = "Checking local inventory...";
    } else if (lowerMessage.includes("pay") || lowerMessage.includes("checkout") || lowerMessage.includes("purchase")) {
      agent = "payment";
      thinkingMessage = "Preparing secure checkout...";
    } else if (lowerMessage.includes("return") || lowerMessage.includes("exchange") || lowerMessage.includes("refund") || lowerMessage.includes("help")) {
      agent = "support";
      thinkingMessage = "Connecting you with support...";
    }

    setActiveAgent(agent);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate response based on agent
    let response = "";
    let suggestions: string[] = [];

    switch (agent) {
      case "recommendation":
        response = "I found some great options for you! I've updated the product grid with items matching your style. The 'Flux Training Set' has a 96% style match based on your preferences.";
        suggestions = ["Show more like this", "Filter by price", "Check availability"];
        onSearch(userMessage);
        break;
      case "inventory":
        response = "I've checked inventory across 3 nearby stores. The Downtown Flagship has 12 units in stock with same-day pickup available. Would you like me to reserve one?";
        suggestions = ["Reserve item", "Show all stores", "Delivery options"];
        break;
      case "payment":
        response = "I'm ready to process your order. All items are verified for secure checkout. Your total includes free shipping on orders over $150.";
        suggestions = ["Proceed to checkout", "Apply coupon", "Split payment"];
        break;
      case "support":
        response = "I'm here to help! Is there an issue with a recent order, or would you like to initiate a return? I can arrange a pickup for tomorrow if needed.";
        suggestions = ["Start a return", "Track my order", "Talk to human"];
        break;
      default:
        response = "I'm coordinating with our specialized agents to assist you. How can I help you today?";
        suggestions = quickActions;
    }

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "agent",
        content: response,
        agent,
        timestamp: new Date(),
        suggestions,
      },
    ]);

    setIsThinking(false);
    setActiveAgent(null);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = input;
    setInput("");
    simulateAgentResponse(messageText);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: suggestion,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    simulateAgentResponse(suggestion);
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
            <h3 className="font-semibold text-sm">AI Orchestrator</h3>
            <p className="text-xs text-muted-foreground">Multi-Agent System Active</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3"
                        : "space-y-3"
                    }`}
                  >
                    {message.type === "agent" && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary capitalize">
                          {message.agent} Agent
                        </span>
                      </div>
                    )}
                    <p className={`text-sm ${message.type === "agent" ? "text-foreground" : ""}`}>
                      {message.content}
                    </p>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
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

            {/* Thinking Indicator */}
            <AnimatePresence>
              {isThinking && activeAgent && (
                <AgentThinking
                  agent={activeAgent}
                  message={
                    activeAgent === "recommendation"
                      ? "Analyzing your style preferences..."
                      : activeAgent === "inventory"
                      ? "Scanning local store databases..."
                      : activeAgent === "payment"
                      ? "Verifying transaction security..."
                      : "Processing your request..."
                  }
                />
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-glass-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 h-10 px-4 rounded-xl bg-secondary/50 border border-glass-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Button
                variant="glow"
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
