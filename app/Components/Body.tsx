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
    transition: { duration: 0.3 }
  }
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
    return `Oil change overdue! You've driven ${Math.abs(remainingKm)} km beyond the limit.`;
  }
  
  return `Remaining distance before oil change: ${Math.round(remainingKm)} km.`;
};

// Sample data
const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Royal 9 Premium Engine Oil",
    description: "High-performance synthetic engine oil for superior protection",
    price: 999,
    image: "/products/premium-oil.jpg",
    category: "Premium",
    viscosityGrade: "10W-30",
    volume: "4L",
    specifications: "API SN Plus, ILSAC GF-5",
    features: ["Superior wear protection", "Enhanced fuel efficiency", "Extended drain intervals"],
    benefits: ["Prolongs engine life", "Reduces maintenance costs", "Improves performance"]
  }
];

const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Engine Oil Grades",
    description: "Learn about different oil grades and their applications",
    image: "/blog/oil-grades.jpg",
    date: "2024-01-15",
    content: "Detailed content about engine oil grades..."
  }
];

// Components
const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("flex flex-col space-y-4", className)}
    >
      <h2 className="text-4xl font-black tracking-tight text-[#004526] font-anton uppercase">
        {typeof children === 'string' && children.split(' ').map((word, i) => (
          <span key={i}>
            {i % 2 === 0 ? <span className="text-[#DFFF00]">{word}</span> : ` ${word} `}
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
                With over two decades of experience in the industry, Royal 9 has established itself as a trusted name in automotive lubricants. Our commitment to quality and innovation drives us to deliver products that exceed industry standards.
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
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      </CardContent>
    </Card>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <CardDescription className="mb-4">{product.description}</CardDescription>
        <p className="text-lg font-bold text-[#004526] mb-4">₹{product.price}</p>
        
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
          {isExpanded ? 'Show Less' : 'More Details'}
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
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      </CardContent>
    </Card>
  );
};

const Body: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<"car" | "royal_enfield">("car");
  const [oilType, setOilType] = useState<"synthetic" | "semi_synthetic" | "conventional">("synthetic");
  const [distanceDriven, setDistanceDriven] = useState("");
  const [lastChangeDate, setLastChangeDate] = useState<string>("");
  const [drivingConditions, setDrivingConditions] = useState<"normal" | "severe">("normal");
  const [calculationResult, setCalculationResult] = useState<string>("");

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
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value as "car" | "royal_enfield")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#004526] focus:border-[#004526]"
                  >
                    <option value="car">Car</option>
                    <option value="royal_enfield">Royal Enfield</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="oilType" className="block text-sm font-medium text-gray-700 mb-2">
                    Oil Type
                  </label>
                  <select
                    id="oilType"
                    value={oilType}
                    onChange={(e) => setOilType(e.target.value as "synthetic" | "semi_synthetic" | "conventional")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#004526] focus:border-[#004526]"
                  >
                    <option value="synthetic">Synthetic</option>
                    <option value="semi_synthetic">Semi-Synthetic</option>
                    <option value="conventional">Conventional</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label htmlFor="lastChangeDate" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 mb-2">
                    Driving Conditions
                  </label>
                  <select
                    id="conditions"
                    value={drivingConditions}
                    onChange={(e) => setDrivingConditions(e.target.value as "normal" | "severe")}
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
        <section aria-label="Products" className="space-y-8">
          <SectionTitle>Our Products</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.map((product) => (
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
