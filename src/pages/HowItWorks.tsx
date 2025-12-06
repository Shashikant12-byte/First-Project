import { motion } from "framer-motion";
import { 
  Brain, Package, CreditCard, MessageSquare, Activity,
  ArrowRight, CheckCircle, Users, Zap, Target, BarChart3,
  ShoppingCart, RefreshCw, Shield, Sparkles, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const orchestratorFlow = [
  {
    step: 1,
    title: "User Query",
    description: "Customer initiates a request through chat, voice, or browsing behavior",
    icon: Users,
  },
  {
    step: 2,
    title: "AI Orchestrator",
    description: "Central brain analyzes intent and delegates to specialized agents",
    icon: Brain,
  },
  {
    step: 3,
    title: "Agent Execution",
    description: "Specialized agents work in parallel to fulfill the request",
    icon: Zap,
  },
  {
    step: 4,
    title: "Response",
    description: "Unified, personalized response delivered to the customer",
    icon: Target,
  },
];

const agents = [
  {
    icon: Brain,
    name: "Recommendation Agent",
    tagline: "AI suggests best-fit products",
    features: [
      "Style preference analysis",
      "Visual trials and size predictions",
      "Cross-sell and up-sell suggestions",
      "Outfit/furniture combination recommendations",
    ],
    color: "primary",
  },
  {
    icon: Package,
    name: "Inventory Agent",
    tagline: "Real-time stock visibility",
    features: [
      "Live inventory tracking across channels",
      "Nearby store availability",
      "Try-at-Home option suggestions",
      "Prevents cart drop-offs",
    ],
    color: "accent",
  },
  {
    icon: CreditCard,
    name: "Payment Agent",
    tagline: "Secure transaction processing",
    features: [
      "Failed payment detection",
      "Alternative payment suggestions",
      "Real-time fraud protection",
      "Biometric verification for high-value orders",
    ],
    color: "warning",
  },
  {
    icon: MessageSquare,
    name: "Support Agent",
    tagline: "Post-purchase assistance",
    features: [
      "Order tracking and updates",
      "Return/exchange initiation",
      "Pickup scheduling",
      "Issue resolution",
    ],
    color: "success",
  },
  {
    icon: Activity,
    name: "Feedback Agent",
    tagline: "Continuous improvement loop",
    features: [
      "Post-purchase data analysis",
      "Customer churn prediction",
      "Model refinement",
      "Satisfaction tracking",
    ],
    color: "accent",
  },
];

const benefits = [
  {
    icon: BarChart3,
    title: "71% Higher Conversion",
    description: "AI-driven personalization dramatically improves purchase rates",
  },
  {
    icon: RefreshCw,
    title: "43% Better Retention",
    description: "Seamless experiences keep customers coming back",
  },
  {
    icon: ShoppingCart,
    title: "35% Larger Orders",
    description: "Smart recommendations increase average order value",
  },
  {
    icon: Shield,
    title: "99.8% Success Rate",
    description: "Reliable transactions with fraud protection",
  },
];

export default function HowItWorks() {
  return (
    <div className="pt-[68px]">
      {/* Hero Section */}
      <section className="bg-card border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="w-16 h-1 bg-primary mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="text-primary">Agentic AI</span> Works
            </h1>
            <p className="text-lg text-muted-foreground">
              Our multi-agent ecosystem coordinates specialized AI workers to deliver 
              seamless, personalized retail experiences across all channels.
            </p>
          </div>
        </div>
      </section>

      {/* Orchestrator Flow */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">The Orchestration Flow</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every customer interaction flows through our intelligent orchestrator
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {orchestratorFlow.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                    <item.icon className="h-8 w-8 text-primary" />
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {i < orchestratorFlow.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%]">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Details */}
      <section className="py-20 bg-card border-y border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Specialized Agent Ecosystem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each agent is optimized for specific tasks, working in harmony to deliver exceptional experiences
            </p>
          </div>

          <div className="space-y-8">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`order-2 ${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                  <div className={`p-8 rounded-lg bg-${agent.color}/5 border border-glass-border`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-sm bg-${agent.color}/20 flex items-center justify-center`}>
                        <agent.icon className={`h-7 w-7 text-${agent.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">{agent.tagline}</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {agent.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle className={`h-5 w-5 text-${agent.color} shrink-0 mt-0.5`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`order-1 ${i % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                  <div className="h-64 rounded-lg bg-gradient-to-br from-secondary/50 to-secondary flex items-center justify-center">
                    <agent.icon className={`h-24 w-24 text-${agent.color}/30`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A centralized orchestrator coordinating specialized worker agents
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-lg bg-card border border-glass-border"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              {/* User */}
              <div className="text-center p-6 rounded-lg bg-secondary/50 border border-glass-border">
                <Users className="h-12 w-12 mx-auto mb-3 text-foreground" />
                <p className="font-semibold">Customer</p>
                <p className="text-xs text-muted-foreground mt-1">Web / Mobile / Store</p>
              </div>

              <div className="hidden md:flex justify-center">
                <ChevronRight className="h-8 w-8 text-muted-foreground" />
              </div>

              {/* Orchestrator */}
              <div className="text-center p-6 rounded-lg bg-primary/20 border border-primary/50 glow-yellow">
                <Brain className="h-12 w-12 mx-auto mb-3 text-primary" />
                <p className="font-semibold text-primary">AI Orchestrator</p>
                <p className="text-xs text-muted-foreground mt-1">Central Intelligence</p>
              </div>

              <div className="hidden md:flex justify-center">
                <ChevronRight className="h-8 w-8 text-muted-foreground" />
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-primary/10 border border-glass-border">
                  <Brain className="h-6 w-6 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-medium">Recommend</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-accent/10 border border-glass-border">
                  <Package className="h-6 w-6 mx-auto mb-1 text-accent" />
                  <p className="text-xs font-medium">Inventory</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-warning/10 border border-glass-border">
                  <CreditCard className="h-6 w-6 mx-auto mb-1 text-warning" />
                  <p className="text-xs font-medium">Payment</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-success/10 border border-glass-border">
                  <MessageSquare className="h-6 w-6 mx-auto mb-1 text-success" />
                  <p className="text-xs font-medium">Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card border-y border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Proven Results</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on McKinsey 2024 research on AI-powered retail
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-lg bg-secondary/30 border border-glass-border text-center"
              >
                <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-lg bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-glass-border"
          >
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Experience It Yourself</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Try our AI-powered shopping experience and see the future of retail in action.
            </p>
            <Button asChild variant="glow" size="lg">
              <Link to="/shop">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
