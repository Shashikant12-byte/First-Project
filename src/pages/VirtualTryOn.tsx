import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Upload, User, Shirt, Sparkles, ChevronLeft, ChevronRight, 
  Heart, ShoppingBag, RotateCcw, Wand2, Check, X, Loader2,
  Maximize2, ZoomIn, Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockProducts, Product } from "@/data/mockProducts";
import { toast } from "@/hooks/use-toast";

type BodyType = "slim" | "athletic" | "average" | "curvy";
type Gender = "male" | "female" | "neutral";

interface TryOnState {
  selectedProduct: Product | null;
  bodyType: BodyType;
  gender: Gender;
  userImage: string | null;
  isProcessing: boolean;
  showResult: boolean;
  styleScore: number | null;
  recommendations: string[];
}

const bodyTypes: { id: BodyType; label: string; icon: string }[] = [
  { id: "slim", label: "Slim", icon: "◇" },
  { id: "athletic", label: "Athletic", icon: "◆" },
  { id: "average", label: "Average", icon: "▢" },
  { id: "curvy", label: "Curvy", icon: "⬡" },
];

const modelImages: Record<Gender, string> = {
  male: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
  female: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
  neutral: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop",
};

export default function VirtualTryOn() {
  const [state, setState] = useState<TryOnState>({
    selectedProduct: null,
    bodyType: "average",
    gender: "neutral",
    userImage: null,
    isProcessing: false,
    showResult: false,
    styleScore: null,
    recommendations: [],
  });

  const [activeTab, setActiveTab] = useState<"upload" | "model">("model");
  const [clothingCategory, setClothingCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);

  const clothingProducts = mockProducts.filter(p => 
    clothingCategory === "all" || p.category.toLowerCase().includes(clothingCategory)
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setState(prev => ({ ...prev, userImage: event.target?.result as string }));
        toast({ title: "Photo uploaded!", description: "Now select an outfit to try on." });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!state.selectedProduct) {
      toast({ title: "Select an outfit", description: "Please choose a clothing item to try on.", variant: "destructive" });
      return;
    }

    setState(prev => ({ ...prev, isProcessing: true }));

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    const styleScore = Math.floor(Math.random() * 20) + 80;
    const recommendations = [
      "This color complements your skin tone perfectly",
      "Consider pairing with slim-fit pants for a balanced silhouette",
      "Accessorize with a minimal watch for a complete look",
    ];

    setState(prev => ({
      ...prev,
      isProcessing: false,
      showResult: true,
      styleScore,
      recommendations,
    }));

    toast({ title: "Try-On Complete!", description: `Style Match: ${styleScore}%` });
  };

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      showResult: false,
      styleScore: null,
      recommendations: [],
    }));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const currentImage = state.userImage || modelImages[state.gender];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-primary/10 border-l-4 border-primary mb-6">
              <Wand2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Virtual Try-On</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">Try Before</span> You Buy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience clothes virtually with our AI-powered try-on technology. 
              See how outfits look on you before making a purchase.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Try-On Interface */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Panel - Model/Upload Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-none p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Choose Your Model
                </h3>

                {/* Tab Selection */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setActiveTab("model")}
                    className={`flex-1 py-2 px-4 text-sm font-medium transition-all ${
                      activeTab === "model"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    Use Model
                  </button>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className={`flex-1 py-2 px-4 text-sm font-medium transition-all ${
                      activeTab === "upload"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    Upload Photo
                  </button>
                </div>

                {activeTab === "model" ? (
                  <div className="space-y-4">
                    {/* Gender Selection */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Select Model Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["male", "female", "neutral"] as Gender[]).map((g) => (
                          <button
                            key={g}
                            onClick={() => setState(prev => ({ ...prev, gender: g }))}
                            className={`py-2 px-3 text-sm font-medium capitalize transition-all border ${
                              state.gender === g
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-secondary border-border hover:border-primary/50"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Body Type Selection */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Body Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {bodyTypes.map((bt) => (
                          <button
                            key={bt.id}
                            onClick={() => setState(prev => ({ ...prev, bodyType: bt.id }))}
                            className={`py-3 px-4 text-sm font-medium transition-all border flex items-center gap-2 ${
                              state.bodyType === bt.id
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-secondary border-border hover:border-primary/50"
                            }`}
                          >
                            <span className="text-lg">{bt.icon}</span>
                            {bt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm font-medium mb-1">Upload your photo</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                      </label>
                    </div>
                    {state.userImage && (
                      <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/30 rounded-lg">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-sm text-success">Photo uploaded successfully</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Clothing Selector */}
              <div className="bg-card border border-border rounded-none p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-primary" />
                  Select Outfit
                </h3>

                {/* Category Filter */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin">
                  {["all", "tops", "outerwear", "footwear", "activewear"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setClothingCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all border ${
                        clothingCategory === cat
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary border-border hover:border-primary/50"
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
                  {clothingProducts.map((product) => (
                    <motion.button
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setState(prev => ({ ...prev, selectedProduct: product }))}
                      className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                        state.selectedProduct?.id === product.id
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-xs font-medium truncate">{product.name}</p>
                          <p className="text-xs text-primary">${product.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart 
                          className={`h-3 w-3 ${favorites.includes(product.id) ? "fill-destructive text-destructive" : ""}`} 
                        />
                      </button>
                      {state.selectedProduct?.id === product.id && (
                        <div className="absolute top-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Center Panel - Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-card border border-border rounded-none p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    Try-On Preview
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                      className="p-1.5 bg-secondary rounded hover:bg-secondary/80"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
                    <button
                      onClick={() => setZoom(z => Math.min(2, z + 0.25))}
                      className="p-1.5 bg-secondary rounded hover:bg-secondary/80"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Preview Area */}
                <div className="relative aspect-[3/4] bg-secondary/30 rounded-lg overflow-hidden mb-4">
                  <AnimatePresence mode="wait">
                    {state.isProcessing ? (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10"
                      >
                        <div className="relative mb-4">
                          <Wand2 className="h-12 w-12 text-primary animate-pulse" />
                          <motion.div
                            className="absolute inset-0 border-2 border-primary rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                        <p className="font-medium mb-2">AI Processing...</p>
                        <p className="text-sm text-muted-foreground">Generating virtual try-on</p>
                        <div className="mt-4 w-48 h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5 }}
                          />
                        </div>
                      </motion.div>
                    ) : state.showResult ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={currentImage}
                          alt="Try-on result"
                          className="w-full h-full object-cover"
                          style={{ transform: `scale(${zoom})` }}
                        />
                        {state.selectedProduct && (
                          <motion.img
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.85, y: 0 }}
                            src={state.selectedProduct.image}
                            alt="Overlay"
                            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                          />
                        )}
                        {/* Style Score Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="absolute top-4 right-4 px-4 py-2 bg-primary text-primary-foreground font-bold"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            <span>{state.styleScore}% Match</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={currentImage}
                          alt="Model preview"
                          className="w-full h-full object-cover transition-transform duration-300"
                          style={{ transform: `scale(${zoom})` }}
                        />
                        {state.selectedProduct && (
                          <div className="absolute bottom-4 left-4 right-4 p-3 bg-background/90 backdrop-blur-sm border border-border">
                            <p className="text-sm font-medium">{state.selectedProduct.name}</p>
                            <p className="text-xs text-muted-foreground">{state.selectedProduct.category}</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {state.showResult ? (
                    <>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="w-full"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Try Another Outfit
                      </Button>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => {
                          toast({ title: "Added to cart!", description: `${state.selectedProduct?.name} has been added.` });
                        }}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart - ${state.selectedProduct?.price}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleTryOn}
                      disabled={!state.selectedProduct || state.isProcessing}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {state.isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Try On Now
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Panel - AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Style Analysis */}
              <div className="bg-card border border-border rounded-none p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Style Analysis
                </h3>

                <AnimatePresence mode="wait">
                  {state.showResult && state.recommendations.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Score Breakdown */}
                      <div className="p-4 bg-primary/10 border border-primary/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Overall Style Score</span>
                          <span className="text-2xl font-bold text-primary">{state.styleScore}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${state.styleScore}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">Stylist Recommendations:</p>
                        {state.recommendations.map((rec, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 p-3 bg-secondary/50 border border-border"
                          >
                            <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                            <p className="text-sm">{rec}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-muted-foreground"
                    >
                      <Palette className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Try on an outfit to get personalized style recommendations</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Color Matching */}
              <div className="bg-card border border-border rounded-none p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Color Palette Suggestions
                </h3>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {["#FFE600", "#2D2D2D", "#FFFFFF", "#1A1A2E", "#4A90D9"].map((color, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg border border-border cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Colors that complement your selected outfit and body type
                </p>
              </div>

              {/* Favorites */}
              {favorites.length > 0 && (
                <div className="bg-card border border-border rounded-none p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-destructive" />
                    Your Favorites ({favorites.length})
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {favorites.map(id => {
                      const product = mockProducts.find(p => p.id === id);
                      if (!product) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => setState(prev => ({ ...prev, selectedProduct: product }))}
                          className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
                        >
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-none p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Upload a front-facing photo for best results
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Good lighting helps AI analysis accuracy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Try different body types to see fit variations
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
