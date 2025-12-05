export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock_level: 'high' | 'medium' | 'low';
  local_store_availability: boolean;
  tags: string[];
  styleMatch?: number;
  rating: number;
  reviews: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
  stock: number;
  tryAtHome: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Quantum Runner Pro",
    description: "AI-optimized running shoes with adaptive cushioning technology",
    price: 189.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
    category: "Footwear",
    stock_level: "high",
    local_store_availability: true,
    tags: ["running", "sports", "summer", "outdoor"],
    styleMatch: 94,
    rating: 4.8,
    reviews: 1247
  },
  {
    id: "2",
    name: "NeoTech Blazer",
    description: "Smart fabric blazer with temperature regulation",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop",
    category: "Outerwear",
    stock_level: "medium",
    local_store_availability: true,
    tags: ["formal", "smart", "business", "winter"],
    styleMatch: 87,
    rating: 4.6,
    reviews: 834
  },
  {
    id: "3",
    name: "Aurora Summer Dress",
    description: "Breathable cotton blend with UV protection weave",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop",
    category: "Dresses",
    stock_level: "low",
    local_store_availability: false,
    tags: ["summer", "casual", "beach", "outdoor"],
    styleMatch: 91,
    rating: 4.9,
    reviews: 2156
  },
  {
    id: "4",
    name: "Cyber Denim Jacket",
    description: "Recycled denim with embedded NFC chip for authenticity",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop",
    category: "Outerwear",
    stock_level: "high",
    local_store_availability: true,
    tags: ["casual", "denim", "streetwear", "summer"],
    styleMatch: 88,
    rating: 4.7,
    reviews: 943
  },
  {
    id: "5",
    name: "Flux Training Set",
    description: "High-performance moisture-wicking activewear set",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&auto=format&fit=crop",
    category: "Activewear",
    stock_level: "high",
    local_store_availability: true,
    tags: ["sports", "gym", "summer", "fitness"],
    styleMatch: 96,
    rating: 4.8,
    reviews: 1892
  },
  {
    id: "6",
    name: "Prism Sunglasses",
    description: "Polarized lenses with smart tint adjustment",
    price: 279.99,
    originalPrice: 329.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop",
    category: "Accessories",
    stock_level: "medium",
    local_store_availability: true,
    tags: ["summer", "beach", "outdoor", "accessories"],
    styleMatch: 82,
    rating: 4.5,
    reviews: 567
  },
  {
    id: "7",
    name: "Terra Hiking Boots",
    description: "All-terrain boots with self-cleaning nano coating",
    price: 259.99,
    image: "https://images.unsplash.com/photo-1520219306100-ec4afeeefe58?w=800&auto=format&fit=crop",
    category: "Footwear",
    stock_level: "low",
    local_store_availability: false,
    tags: ["outdoor", "hiking", "adventure", "winter"],
    styleMatch: 79,
    rating: 4.9,
    reviews: 1034
  },
  {
    id: "8",
    name: "Linen Summer Shirt",
    description: "Premium organic linen with wrinkle-resistant finish",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop",
    category: "Tops",
    stock_level: "high",
    local_store_availability: true,
    tags: ["summer", "casual", "beach", "vacation"],
    styleMatch: 93,
    rating: 4.7,
    reviews: 1456
  }
];

export const mockStores: Store[] = [
  {
    id: "s1",
    name: "BlockBusters Flagship - Downtown",
    address: "123 Innovation Ave, Tech District",
    distance: "0.8 mi",
    stock: 12,
    tryAtHome: true
  },
  {
    id: "s2",
    name: "BlockBusters Express - Mall Plaza",
    address: "456 Commerce Blvd, Level 2",
    distance: "2.3 mi",
    stock: 5,
    tryAtHome: false
  },
  {
    id: "s3",
    name: "BlockBusters Premium - Uptown",
    address: "789 Luxury Lane, Suite 100",
    distance: "4.1 mi",
    stock: 8,
    tryAtHome: true
  }
];

export const agentLogs = [
  { timestamp: "10:01:23", event: "User Intent: 'Show me summer outfits'", agent: "Orchestrator" },
  { timestamp: "10:01:24", event: "Delegated to Recommendation Agent", agent: "Orchestrator" },
  { timestamp: "10:01:25", event: "Analyzing user style preferences...", agent: "Recommendation" },
  { timestamp: "10:01:26", event: "Found 6 matching products", agent: "Recommendation" },
  { timestamp: "10:01:27", event: "Checking local inventory...", agent: "Inventory" },
  { timestamp: "10:01:28", event: "Stock locked at Store #402", agent: "Inventory" },
  { timestamp: "10:01:29", event: "Risk Score: 12/100 (Safe)", agent: "Payment" },
  { timestamp: "10:01:30", event: "Session analytics updated", agent: "Analytics" },
];
