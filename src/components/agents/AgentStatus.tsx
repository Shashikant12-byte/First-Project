import { motion } from "framer-motion";
import { Brain, Package, CreditCard, MessageSquare, Loader2 } from "lucide-react";

export type AgentType = "orchestrator" | "recommendation" | "inventory" | "payment" | "support";

interface AgentStatusProps {
  agent: AgentType;
  status: "idle" | "thinking" | "active" | "complete";
  message?: string;
}

const agentConfig = {
  orchestrator: {
    icon: Brain,
    name: "Orchestrator",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  recommendation: {
    icon: Brain,
    name: "Recommendation Agent",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  inventory: {
    icon: Package,
    name: "Inventory Agent",
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
  payment: {
    icon: CreditCard,
    name: "Payment Agent",
    color: "text-warning",
    bgColor: "bg-warning/20",
  },
  support: {
    icon: MessageSquare,
    name: "Support Agent",
    color: "text-success",
    bgColor: "bg-success/20",
  },
};

export function AgentStatus({ agent, status, message }: AgentStatusProps) {
  const config = agentConfig[agent];
  const Icon = config.icon;

  if (status === "idle") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-glass-border"
    >
      <div className={`relative p-2 rounded-lg ${config.bgColor}`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
        {status === "thinking" && (
          <div className="absolute inset-0 rounded-lg animate-pulse-ring bg-primary/30" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${config.color}`}>
            {config.name}
          </span>
          {status === "thinking" && (
            <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
          )}
          {status === "complete" && (
            <span className="text-xs text-success">✓</span>
          )}
        </div>
        {message && (
          <p className="text-xs text-muted-foreground truncate">{message}</p>
        )}
      </div>
    </motion.div>
  );
}

export function AgentThinking({ agent, message }: { agent: AgentType; message: string }) {
  const config = agentConfig[agent];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-start gap-3 p-4"
    >
      <div className={`relative p-2 rounded-xl ${config.bgColor} shrink-0`}>
        <Icon className={`h-5 w-5 ${config.color}`} />
        <motion.div
          className={`absolute inset-0 rounded-xl ${config.bgColor}`}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${config.color}`}>
            {config.name}
          </span>
          <motion.div
            className="flex gap-1"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
          </motion.div>
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </motion.div>
  );
}
