import { motion } from "framer-motion";
import { 
  Code, Brain, BarChart3, Palette, Database,
  Linkedin, Github, Mail, ArrowRight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Akshita Tyagi",
    role: "Team Leader",
    skills: ["Flutter", "MERN", "Agentic AI"],
    icon: Brain,
    color: "primary",
    description: "Leading the vision and AI architecture of our retail assistant platform.",
  },
  {
    name: "Yasaswini Chebolu",
    role: "AI/ML Engineer",
    skills: ["AI", "ML", "Docker", "GitHub", "Python"],
    icon: Database,
    color: "accent",
    description: "Building intelligent models that power our recommendation and analytics systems.",
  },
  {
    name: "Harshi Gupta",
    role: "Data Scientist",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
    icon: BarChart3,
    color: "warning",
    description: "Analyzing customer data to drive personalization and business insights.",
  },
  {
    name: "Shivangi Singh",
    role: "Full Stack Developer",
    skills: ["MERN Stack", "React", "Node.js"],
    icon: Code,
    color: "success",
    description: "Crafting seamless user experiences across web and mobile platforms.",
  },
  {
    name: "Vaishnavi Shukla",
    role: "Full Stack Developer",
    skills: ["MERN Stack", "MongoDB", "Express"],
    icon: Palette,
    color: "accent",
    description: "Building robust backend systems and beautiful frontend interfaces.",
  },
];

const achievements = [
  {
    title: "EY Techathon 6.0",
    description: "Selected for advanced rounds among thousands of participants",
  },
  {
    title: "AI Innovation",
    description: "Pioneering multi-agent architecture for retail applications",
  },
  {
    title: "Full Stack Solution",
    description: "End-to-end development from AI models to production deployment",
  },
];

export default function Team() {
  return (
    <div className="pt-[68px]">
      {/* Hero Section */}
      <section className="bg-card border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Team <span className="text-primary">BlockBusters</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A team of passionate innovators turning ideas into impactful tech solutions.
              Each member brings unique technical strengths — from Full Stack Development 
              and AI/ML to Data Science and UI/UX Design.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-lg bg-card border border-glass-border hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-sm bg-${member.color}/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <member.icon className={`h-7 w-7 text-${member.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className={`text-sm text-${member.color}`}>{member.role}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {member.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-sm bg-secondary text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-glass-border">
                  <a href="#" className="p-2 rounded-sm bg-secondary hover:bg-primary/20 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" className="p-2 rounded-sm bg-secondary hover:bg-primary/20 transition-colors">
                    <Github className="h-4 w-4" />
                  </a>
                  <a href="#" className="p-2 rounded-sm bg-secondary hover:bg-primary/20 transition-colors">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About EY Techathon */}
      <section className="py-20 bg-card border-y border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-1 bg-primary mb-6" />
              <h2 className="text-3xl font-bold mb-6">About EY Techathon 6.0</h2>
              <p className="text-muted-foreground mb-6">
                EY Techathon is one of India's largest innovation challenges, bringing together 
                the brightest minds to solve real-world business problems using cutting-edge technology.
              </p>
              <p className="text-muted-foreground mb-6">
                For the 6.0 edition, we chose to tackle the challenge of "Reimagining Retail 
                Experiences through AI-driven Personalization and Human-like Interactions" — 
                a problem that affects millions of customers and retailers worldwide.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">EY</span>
                <div className="h-8 w-px bg-glass-border" />
                <div>
                  <p className="font-semibold">Shape the future</p>
                  <p className="text-sm text-muted-foreground">with confidence</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {achievements.map((achievement, i) => (
                <div
                  key={achievement.title}
                  className="p-6 rounded-lg bg-secondary/30 border border-glass-border border-l-4 border-l-primary"
                >
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Problem Statement</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-8 rounded-lg bg-card border border-glass-border"
          >
            <h3 className="text-xl font-semibold text-primary mb-4">
              Reimagining Retail Experiences through AI-driven Personalization 
              and Human-like Interactions
            </h3>
            <p className="text-muted-foreground mb-6">
              Retail experiences today are disconnected. Customers face inconsistent journeys 
              when switching between online platforms, chat apps, and physical stores. This leads 
              to poor personalization, payment failures, and missed opportunities for up-sell and cross-sell.
            </p>
            <p className="text-muted-foreground">
              Our goal is to create a unified, AI-driven retail assistant that bridges online 
              and offline experiences through intelligent, context-aware interactions — 
              behaving like a real salesperson who understands customer needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card border-t border-glass-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Experience Our Solution</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              See how Team BlockBusters is revolutionizing retail with Agentic AI.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="glow" size="lg">
                <Link to="/shop">
                  Try the Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/how-it-works">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
