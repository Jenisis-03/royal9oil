"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// Types
interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  content: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: "Premium" | "Performance Premium" | "Royal Enfield";
  viscosityGrade: string;
  volume: string;
  specifications: string;
  features: string[];
  benefits: string[];
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const expandAnimation = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// Oil calculator logic
const oilChangeCalculator = (
  vehicleType: "car" | "royal_enfield",
  oilType: "synthetic" | "semi_synthetic" | "conventional",
  distanceDriven: number,
  lastChangeDate: Date | null = null,
  drivingConditions: "normal" | "severe" = "normal"
) => {
  const oilIntervals = {
    car: {
      synthetic: { km: 15000, months: 12 },
      semi_synthetic: { km: 10000, months: 6 },
      conventional: { km: 7500, months: 6 },
    },
    royal_enfield: {
      synthetic: { km: 10000, months: 12 },
      semi_synthetic: { km: 8000, months: 9 },
      conventional: { km: 6000, months: 6 },
    },
  };

  if (!oilIntervals[vehicleType][oilType]) {
    return "Invalid vehicle type or oil type.";
  }

  let recommendedKm = oilIntervals[vehicleType][oilType].km;
  const recommendedMonths = oilIntervals[vehicleType][oilType].months;

  if (drivingConditions === "severe") {
    recommendedKm *= 0.8;
  }

  const remainingKm = recommendedKm - distanceDriven;

  if (lastChangeDate) {
    const currentDate = new Date();
    const elapsedMonths =
      (currentDate.getFullYear() - lastChangeDate.getFullYear()) * 12 +
      (currentDate.getMonth() - lastChangeDate.getMonth());

    if (elapsedMonths > recommendedMonths) {
      return "Oil change due based on time.";
    }
  }

  if (remainingKm <= 0) {
    return `Oil change overdue! You've driven ${Math.abs(
      remainingKm
    )} km beyond the limit.`;
  }

  return `Remaining distance before oil change: ${Math.round(remainingKm)} km.`;
};

// data
const Products: Product[] = [
  {
    id: "1",
    title: "Semi Synthetic (NB-5G)",
    description: "High-performance semi-synthetic engine oil",
    image: "/products/oil.jpg",
    category: "Semi Synthetic",
    viscosityGrade: "20W40",
    specifications: "API SM JASO MA2",
    features: [
      "Superior wear protection",
      "Enhanced fuel efficiency",
      "Extended drain intervals",
    ],
    benefits: [
      "Prolongs engine life",
      "Reduces maintenance costs",
      "Improves performance",
    ],
    productPrices: {
      "800ml": 397,
      "1L": 417,
      "1.2L": 507,
      "3.5L": 1457,
      "5L": 2087,
      "7.5L": 3127,
      "10L": 4177,
      "20L": 8347,
      "50L": 20857,
    },
    productGrade: "Semi Synthetic",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "2",
    title: "Semi Synthetic (BB-5G)",
    description: "Advanced semi-synthetic engine oil",
    image: "/products/oil.jpg",
    category: "Semi Synthetic",
    viscosityGrade: "20W50",
    specifications: "API SM JASO MA2",
    features: [
      "Superior wear protection",
      "Enhanced fuel efficiency",
      "Extended drain intervals",
    ],
    benefits: [
      "Prolongs engine life",
      "Reduces maintenance costs",
      "Improves performance",
    ],
    productPrices: {
      "800ml": 487,
      "1L": 517,
      "1.2L": 627,
      "3.5L": 1807,
      "5L": 2587,
      "7.5L": 3877,
      "10L": 5177,
      "20L": 10347,
      "50L": 25857,
    },
    productGrade: "Semi Synthetic",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "3",
    title: "Synthetic (BS4-SG)",
    description: "Premium synthetic engine oil",
    image: "/products/oil.jpg",
    category: "Synthetic",
    viscosityGrade: "10W30",
    specifications: "API SN",
    features: [
      "Superior protection",
      "Enhanced performance",
      "Extended service life",
    ],
    benefits: [
      "Maximum engine protection",
      "Optimal efficiency",
      "Longer engine life",
    ],
    productPrices: {
      "800ml": 487,
      "1L": 517,
      "1.2L": 627,
      "3.5L": 1807,
      "5L": 2587,
      "7.5L": 3877,
      "10L": 5177,
      "20L": 10347,
      "50L": 25857,
    },
    productGrade: "Synthetic",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "4",
    title: "Synthetic (BS6-SG)",
    description: "Advanced synthetic engine oil",
    image: "/products/oil.jpg",
    category: "Synthetic",
    viscosityGrade: "5W30",
    specifications: "API SN+",
    features: [
      "Premium protection",
      "Superior performance",
      "Maximum efficiency",
    ],
    benefits: [
      "Extended engine life",
      "Optimal protection",
      "Enhanced performance",
    ],
    productPrices: {
      "800ml": 507,
      "1L": 547,
      "1.2L": 657,
      "3.5L": 1917,
      "5L": 2737,
      "7.5L": 4107,
      "10L": 5477,
      "20L": 10947,
      "50L": 27357,
    },
    productGrade: "Synthetic",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "5",
    title: "Semi Synthetic CNG",
    description: "CNG-specific engine oil",
    image: "/products/oil.jpg",
    category: "Semi Synthetic",
    viscosityGrade: "20W50",
    specifications: "API SL-CF",
    features: [
      "CNG engine protection",
      "Thermal stability",
      "Extended oil life",
    ],
    benefits: [
      "Specialized protection",
      "Better performance",
      "Reduced maintenance",
    ],
    productPrices: {
      "800ml": 377,
      "1L": 397,
      "1.2L": 477,
      "3.5L": 1397,
      "5L": 1987,
      "7.5L": 2977,
      "10L": 3977,
      "20L": 7947,
      "50L": 19857,
    },
    productGrade: "Semi Synthetic CNG",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "6",
    title: "Multi Grade (AC-5G)",
    description: "High-quality multi-grade engine oil",
    image: "/products/oil.jpg",
    category: "Multi Grade",
    viscosityGrade: "15W40",
    specifications: "API CI4+",
    features: [
      "All-season protection",
      "Extended service intervals",
      "Superior engine cleanliness",
    ],
    benefits: [
      "Year-round performance",
      "Reduced maintenance",
      "Engine longevity",
    ],
    productPrices: {
      "800ml": 397,
      "1L": 417,
      "1.2L": 507,
      "3.5L": 1457,
      "5L": 2087,
      "7.5L": 3127,
      "10L": 4177,
      "20L": 8347,
      "50L": 20857,
    },
    productGrade: "Multi Grade",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "7",
    title: "GEAR-X-EP-90",
    description: "Premium gear oil",
    image: "/products/gear-oil.jpg",
    category: "Gear Oil",
    viscosityGrade: "EP-90",
    specifications: "MINAREL GEAR OIL",
    features: [
      "Extreme pressure protection",
      "Superior gear protection",
      "Enhanced performance",
    ],
    benefits: ["Extended gear life", "Smooth operation", "Reduced wear"],
    productPrices: {
      "800ml": 347,
      "1L": 387,
      "1.2L": 467,
      "3.5L": 1357,
      "5L": 1937,
      "7.5L": 2907,
      "10L": 3877,
      "20L": 7747,
      "50L": 19357,
    },
    productGrade: "Mineral",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "8",
    title: "Synthetic 68-(H.O-SG)",
    description: "High-performance hydraulic oil",
    image: "/products/hydraulic-oil.jpg",
    category: "Hydraulic",
    viscosityGrade: "68",
    specifications: "HLP-68",
    features: [
      "Superior wear protection",
      "Excellent oxidation stability",
      "Enhanced system efficiency",
    ],
    benefits: [
      "Extended service life",
      "System protection",
      "Improved performance",
    ],
    productPrices: {
      "800ml": 397,
      "1L": 447,
      "1.2L": 537,
      "3.5L": 1567,
      "5L": 2237,
      "7.5L": 3357,
      "10L": 4477,
      "20L": 8947,
      "50L": 22357,
    },
    productGrade: "Synthetic",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "9",
    title: "Synthetic 46-(H.O-SG)",
    description: "Premium hydraulic oil",
    image: "/products/hydraulic-oil.jpg",
    category: "Hydraulic",
    viscosityGrade: "46",
    specifications: "HLP-46",
    features: [
      "Advanced wear protection",
      "Superior thermal stability",
      "Enhanced system efficiency",
    ],
    benefits: [
      "Extended equipment life",
      "Reduced downtime",
      "Improved performance",
    ],
    productPrices: {
      "800ml": 417,
      "1L": 497,
      "1.2L": 597,
      "3.5L": 1747,
      "5L": 2487,
      "7.5L": 3727,
      "10L": 4977,
      "20L": 9947,
      "50L": 24857,
    },
    productGrade: "Synthetic",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "10",
    title: "4*40 (PSO)",
    description: "Standard monograde engine oil",
    image: "/products/oil.jpg",
    category: "Monograde",
    viscosityGrade: "40",
    specifications: "PSO Standard",
    features: [
      "Basic engine protection",
      "Standard performance",
      "Cost-effective",
    ],
    benefits: ["Engine protection", "Regular maintenance", "Economic choice"],
    productPrices: {
      "800ml": 347,
      "1L": 387,
      "1.2L": 467,
      "3.5L": 1357,
      "5L": 1937,
      "7.5L": 2907,
      "10L": 3877,
      "20L": 7747,
      "50L": 19357,
    },
    productGrade: "Standard",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "11",
    title: "GL-5G",
    description: "Multi-purpose grease",
    image: "/products/grease.jpg",
    category: "Grease",
    viscosityGrade: "AP3",
    specifications: "GREASE AP3",
    features: [
      "Multi-purpose application",
      "Water resistant",
      "Good mechanical stability",
    ],
    benefits: ["Extended lubrication", "Component protection", "Versatile use"],
    productPrices: {
      "500gm": 257,
      "1KG": 517,
      "5KG": 2587,
      "10KG": 5167,
      "18KG": 9307,
      "50KG": 25857,
    },
    productGrade: "Standard",
    availableQuantities: ["500gm", "1KG", "5KG", "10KG", "18KG", "50KG"],
  },
  {
    id: "12",
    title: "SHOCKER TB 5G",
    description: "Premium shock absorber oil",
    image: "/products/shocker-oil.jpg",
    category: "Specialty",
    viscosityGrade: "TB 5G",
    specifications: "SHOCKER OIL",
    features: [
      "Optimized damping",
      "Temperature stable",
      "Enhanced performance",
    ],
    benefits: ["Smooth operation", "Better control", "Extended service life"],
    productPrices: {
      "175ml": 87,
      "350ml": 187,
      "1L": 517,
      "1.2L": 627,
      "3.5L": 1807,
      "5L": 2587,
      "7.5L": 3877,
      "10L": 5177,
      "20L": 10347,
      "50L": 25857,
    },
    productGrade: "Premium",
    availableQuantities: [
      "175ml",
      "350ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
  {
    id: "13",
    title: "MINAREL",
    description: "Basic mineral engine oil",
    image: "/products/oil.jpg",
    category: "Mineral",
    viscosityGrade: "20W40",
    specifications: "API-SL",
    features: [
      "Basic protection",
      "Standard performance",
      "Regular maintenance",
    ],
    benefits: ["Engine protection", "Cost-effective", "Basic maintenance"],
    productPrices: {
      "800ml": 347,
      "1L": 397,
      "1.2L": 477,
      "3.5L": 1387,
      "5L": 1987,
      "7.5L": 2977,
      "10L": 3977,
      "20L": 7947,
      "50L": 19857,
    },
    productGrade: "Mineral",
    availableQuantities: [
      "800ml",
      "1L",
      "1.2L",
      "3.5L",
      "5L",
      "7.5L",
      "10L",
      "20L",
      "50L",
    ],
  },
];

const sampleBlogPosts: BlogPost[] = [
  {
  id: "1",
  title: "Understanding Engine Oil Grades",
  description: "Learn about different oil grades and their applications",
  image: "/CEO.png",
  date: "2024-01-15",
  content:"Understanding Engine Oil Grades: Choosing the right engine oil is crucial for performance and longevity, as oil grades determine viscosity and temperature performance. Viscosity, indicated by numbers like 5W-30 or 10W-40, affects flow at different temperatures, with lower numbers ensuring better cold-weather performance. Common grades include 5W-30, offering balanced protection; 10W-40, ideal for older engines due to its thickness; and 0W-20, enhancing fuel efficiency in modern cars. Using the correct grade ensures lubrication, reduces wear, and improves fuel economy—always check manufacturer recommendations. How Engine Oils Are Made: Engine oil production involves selecting a base—mineral, synthetic, or semi-synthetic—comprising 70-90% of the formula. Crude oil undergoes hydrocracking to remove impurities, followed by the addition of key additives like detergents (for cleanliness), anti-wear agents (for metal protection), viscosity modifiers (for flow stability), and antioxidants (to prevent degradation). These components are blended under precise conditions and rigorously tested for viscosity, heat resistance, and wear protection. Once finalized, the oil is packaged and distributed globally. High-quality engine oil extends engine life, improves efficiency, and enhances performance. Choosing the right one ensures optimal function and reliability."
  },
  {
  id: "2",
  title: "How Engine Oils Are Made: A Peek Behind the Scenes",
  description: "Discover the science and process behind engine oil production.",
  image: "/Oil_making.png",
  date: "2024-01-31",
  content: "Engine oil production is a complex process involving science and engineering to ensure optimal engine performance. It begins with selecting a base oil, which can be mineral, synthetic, or semi-synthetic, making up 70-90% of the final product. The crude oil undergoes refining and hydrocracking to remove impurities, improving viscosity and stability. Next, powerful additives are blended in to enhance performance—detergents and dispersants keep engines clean, anti-wear agents protect metal surfaces, viscosity modifiers ensure smooth flow in varying temperatures, and antioxidants prevent degradation. This precise blending process occurs under controlled conditions, followed by rigorous testing to confirm viscosity, heat resistance, oxidation stability, and overall wear protection. Once approved, the oil is bottled, labeled, and distributed globally for use in vehicles of all types. High-quality engine oil plays a critical role in engine longevity, efficiency, and power, helping reduce friction, prevent deposits, and optimize fuel economy. Choosing the right oil is essential for maintaining engine health, as different formulations cater to varying performance needs and environmental conditions. Understanding the process behind engine oil production highlights the importance of using high-quality products to keep vehicles running smoothly and efficiently."
  }
  ];
  
  
// Components
const SectionTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("flex flex-col space-y-4", className)}
    >
      <h2 className="text-4xl font-black tracking-tight text-[#004526] font-anton uppercase">
        {typeof children === "string" &&
          children
            .split(" ")
            .map((word, i) => (
              <span key={i}>
                {i % 2 === 0 ? (
                  <span className="text-[#DFFF00]">{word}</span>
                ) : (
                  ` ${word} `
                )}
              </span>
            ))}
      </h2>
      <div className="h-1 w-20 bg-[#004526] rounded-full" />
    </motion.div>
  );
};

const AboutUsCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <CardTitle className="text-2xl mb-4">Welcome to Royal 9</CardTitle>
        <CardDescription className="mb-4">
          Leading manufacturer of premium engine oils and lubricants.
        </CardDescription>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={expandAnimation}
              className="space-y-4"
            >
              <p className="text-gray-700">
                With over two decades of experience in the industry, Royal 9 has
                established itself as a trusted name in automotive lubricants.
                Our commitment to quality and innovation drives us to deliver
                products that exceed industry standards.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Premium quality products</li>
                <li>Advanced research facilities</li>
                <li>Nationwide distribution network</li>
                <li>24/7 customer support</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-[#004526] font-medium hover:underline"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </CardContent>
    </Card>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState<string>("1L"); // Default selected quantity
  const price = product.productPrices[selectedQuantity]; // Get the price based on selected quantity

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
        <CardDescription className="mb-4">
          {product.description}
        </CardDescription>

        {/* Price will change based on selected quantity */}
        <div className="mb-4">
          <p className="text-lg font-bold text-[#004526]">₹{price}</p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mr-2">
            Select Quantity:
          </label>
          <select
            id="quantity"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(e.target.value)}
            className="p-2 border rounded-md"
          >
            {product.availableQuantities.map((quantity, index) => (
              <option key={index} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={expandAnimation}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Category:</p>
                  <p>{product.category}</p>
                </div>
                <div>
                  <p className="font-semibold">Viscosity Grade:</p>
                  <p>{product.viscosityGrade}</p>
                </div>
                <div>
                  <p className="font-semibold">Volume:</p>
                  <p>{product.volume}</p>
                </div>
                <div>
                  <p className="font-semibold">Specifications:</p>
                  <p>{product.specifications}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-[#004526] font-medium hover:underline"
        >
          {isExpanded ? "Show Less" : "More Details"}
        </button>
      </CardContent>
    </Card>
  );
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
        <p className="text-sm text-gray-500 mb-2">{post.date}</p>
        <CardDescription className="mb-4">{post.description}</CardDescription>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={expandAnimation}
              className="mt-4"
            >
              <p className="text-gray-700">{post.content}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-[#004526] font-medium hover:underline"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </CardContent>
    </Card>
  );
};

const Body: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<"car" | "royal_enfield">(
    "car"
  );
  const [oilType, setOilType] = useState<
    "synthetic" | "semi_synthetic" | "conventional"
  >("synthetic");
  const [distanceDriven, setDistanceDriven] = useState("");
  const [lastChangeDate, setLastChangeDate] = useState<string>("");
  const [drivingConditions, setDrivingConditions] = useState<
    "normal" | "severe"
  >("normal");
  const [calculationResult, setCalculationResult] = useState<string>("");

  // New state for product filter
  const [productFilter, setProductFilter] = useState<string>("all");

  // Function to filter products based on selected category
  const filteredProducts = Products.filter((product) => {
    if (productFilter === "all") return true; // Show all products if "all" is selected
    return product.category.toLowerCase() === productFilter.toLowerCase(); // Filter based on selected category
  });

  const handleCalculate = () => {
    const distance = parseFloat(distanceDriven);
    if (isNaN(distance)) {
      setCalculationResult("Please enter a valid distance.");
      return;
    }

    const result = oilChangeCalculator(
      vehicleType,
      oilType,
      distance,
      lastChangeDate ? new Date(lastChangeDate) : null,
      drivingConditions
    );

    setCalculationResult(result);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-16 p-4 md:p-8 pt-6">
        {/* About Us Section */}
        <section aria-label="About Us" className="space-y-8">
          <SectionTitle>Know More About Us</SectionTitle>
          <AboutUsCard />
        </section>

        {/* Engine Oil Calculator Section */}
        <section aria-label="Engine Oil Calculator" className="space-y-8">
          <SectionTitle>Engine Oil Calculator</SectionTitle>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="vehicleType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    value={vehicleType}
                    onChange={(e) =>
                      setVehicleType(e.target.value as "car" | "royal_enfield")
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#004526] focus:border-[#004526]"
                  >
                    <option value="car">Car</option>
                    <option value="royal_enfield">Royal Enfield</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="oilType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Oil Type
                  </label>
                  <select
                    id="oilType"
                    value={oilType}
                    onChange={(e) =>
                      setOilType(
                        e.target.value as
                          | "synthetic"
                          | "semi_synthetic"
                          | "conventional"
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#004526] focus:border-[#004526]"
                  >
                    <option value="synthetic">Synthetic</option>
                    <option value="semi_synthetic">Semi-Synthetic</option>
                    <option value="conventional">Conventional</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="distance"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Distance Driven (km)
                  </label>
                  <input
                    id="distance"
                    type="number"
                    value={distanceDriven}
                    onChange={(e) => setDistanceDriven(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#004526] focus:border-[#004526]"
                    placeholder="Enter distance"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="lastChangeDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Oil Change Date
                  </label>
                  <input
                    id="lastChangeDate"
                    type="date"
                    value={lastChangeDate}
                    onChange={(e) => setLastChangeDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#004526] focus:border-[#004526]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="conditions"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Driving Conditions
                  </label>
                  <select
                    id="conditions"
                    value={drivingConditions}
                    onChange={(e) =>
                      setDrivingConditions(
                        e.target.value as "normal" | "severe"
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#004526] focus:border-[#004526]"
                  >
                    <option value="normal">Normal</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-[#004526] text-white py-3 px-6 rounded-md hover:bg-[#004526]/90 transition-colors shadow-lg font-medium text-lg mt-4"
                >
                  Calculate
                </button>
              </div>
            </div>

            {calculationResult && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xl font-medium text-[#004526] text-center">
                  {calculationResult}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Products Section */}
        <section aria-label="Products" className="space-y-9">
          <SectionTitle>Our Products</SectionTitle>

          {/* Filter Options */}
          <div className="mb-4">
            <label htmlFor="productFilter" className="mr-2">
              Filter by Category:
            </label>
            <select
              id="productFilter"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="all">All</option>
              <option value="synthetic">Synthetic</option>
              <option value="semi synthetic">Semi Synthetic</option>
              <option value="multi grade">Multi Grade</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section aria-label="Latest Blog Posts" className="space-y-8">
          <SectionTitle>Latest Blog Posts</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleBlogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default Body;
