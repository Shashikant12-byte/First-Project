import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Package, CreditCard, MessageSquare, Activity, Zap, TrendingUp, Users, Server, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogEntry {
  timestamp: string;
  event: string;
  agent: string;
}

const agentIcons: Record<string, typeof Brain> = {
  Orchestrator: Brain,
  Recommendation: Brain,
  Inventory: Package,
  Payment: CreditCard,
  Support: MessageSquare,
  Analytics: Activity,
};

const agentColors: Record<string, string> = {
  Orchestrator: "text-primary",
  Recommendation: "text-primary",
  Inventory: "text-accent",
  Payment: "text-warning",
  Support: "text-success",
  Analytics: "text-purple-400",
};

interface OrchestratorLogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrchestratorLog({ isOpen, onClose }: OrchestratorLogProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState({
    activeAgents: 4,
    requestsPerMin: 127,
    avgLatency: 45,
    successRate: 99.8,
  });

  useEffect(() => {
    if (!isOpen) return;

    // Initial logs
    const initialLogs: LogEntry[] = [
      { timestamp: "10:01:23", event: "System initialized", agent: "Orchestrator" },
      { timestamp: "10:01:24", event: "All agents online", agent: "Orchestrator" },
    ];
    setLogs(initialLogs);

    // Simulate real-time logs
    const events = [
      { event: "User Intent: 'Find summer styles'", agent: "Orchestrator" },
      { event: "Delegated to Recommendation Agent", agent: "Orchestrator" },
      { event: "Analyzing user preferences...", agent: "Recommendation" },
      { event: "Style profile: Casual-Modern (87%)", agent: "Recommendation" },
      { event: "Found 8 matching products", agent: "Recommendation" },
      { event: "Checking inventory across 3 stores", agent: "Inventory" },
      { event: "Stock confirmed at Store #402", agent: "Inventory" },
      { event: "Reserving units...", agent: "Inventory" },
      { event: "Risk assessment initiated", agent: "Payment" },
      { event: "Risk Score: 12/100 (Safe)", agent: "Payment" },
      { event: "User session: 4m 32s", agent: "Analytics" },
      { event: "Cart value trending up 23%", agent: "Analytics" },
      { event: "New user intent detected", agent: "Orchestrator" },
      { event: "Processing 'check local stock'", agent: "Inventory" },
      { event: "Scanning database...", agent: "Inventory" },
      { event: "3 stores within 5 miles", agent: "Inventory" },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < events.length) {
        const now = new Date();
        const timestamp = now.toLocaleTimeString("en-US", { hour12: false });
        setLogs(prev => [...prev.slice(-20), { ...events[index], timestamp }]);
        index++;
      } else {
        index = 0; // Loop the demo
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto"
    >
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Server className="h-7 w-7 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-success"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Orchestrator Command Center</h1>
              <p className="text-muted-foreground">Multi-Agent System Monitor</p>
            </div>
          </div>
          <Button variant="outline" onClick={onClose}>
            Exit Admin View
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold">{stats.activeAgents}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Activity className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Requests/min</p>
                  <p className="text-2xl font-bold">{stats.requestsPerMin}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <TrendingUp className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Latency</p>
                  <p className="text-2xl font-bold">{stats.avgLatency}ms</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{stats.successRate}%</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Agent Status Grid */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Agent Status
            </h2>
            <div className="space-y-3">
              {["Orchestrator", "Recommendation", "Inventory", "Payment", "Support", "Analytics"].map((agent, i) => {
                const Icon = agentIcons[agent] || Brain;
                const color = agentColors[agent];
                return (
                  <motion.div
                    key={agent}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-secondary`}>
                        <Icon className={`h-5 w-5 ${color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{agent}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Log Stream */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              Real-Time Event Stream
            </h2>
            <div className="glass-card rounded-xl p-4 h-[500px] overflow-hidden">
              <div className="h-full overflow-y-auto space-y-2 scrollbar-thin">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, i) => {
                    const Icon = agentIcons[log.agent] || Brain;
                    const color = agentColors[log.agent];
                    return (
                      <motion.div
                        key={`${log.timestamp}-${i}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        layout
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-glass-border"
                      >
                        <span className="text-xs text-muted-foreground font-mono shrink-0">
                          [{log.timestamp}]
                        </span>
                        <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${color}`} />
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs font-medium ${color}`}>
                            {log.agent}:
                          </span>
                          <span className="text-sm ml-2">{log.event}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Diagram Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 glass-card rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">System Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* User */}
            <div className="text-center p-4 rounded-xl bg-secondary/50 border border-glass-border">
              <Users className="h-8 w-8 mx-auto mb-2 text-foreground" />
              <p className="text-sm font-medium">User</p>
            </div>
            
            <div className="hidden md:flex justify-center">
              <ChevronRight className="h-8 w-8 text-muted-foreground" />
            </div>

            {/* Orchestrator */}
            <div className="text-center p-4 rounded-xl bg-primary/20 border border-primary/50 glow-purple">
              <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Orchestrator</p>
            </div>

            <div className="hidden md:flex justify-center">
              <ChevronRight className="h-8 w-8 text-muted-foreground" />
            </div>

            {/* Agents */}
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded-lg bg-primary/10 border border-glass-border">
                <Brain className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs">Recommend</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-accent/10 border border-glass-border">
                <Package className="h-5 w-5 mx-auto mb-1 text-accent" />
                <p className="text-xs">Inventory</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-warning/10 border border-glass-border">
                <CreditCard className="h-5 w-5 mx-auto mb-1 text-warning" />
                <p className="text-xs">Payment</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-success/10 border border-glass-border">
                <MessageSquare className="h-5 w-5 mx-auto mb-1 text-success" />
                <p className="text-xs">Support</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
