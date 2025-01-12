"use client";
import React, { memo } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

// Memoized Card component for better performance
const MemoizedCard = memo(Card);

// Separate banner component for better organization
const TitleBanner = memo(() => (
  <div className="relative flex justify-between p-6 bg-green-500 rounded-lg w-full shadow-lg">
    <div className="text-left space-y-3 w-full">
      <h1 className="transition-all duration-300">
        <div className="flex items-baseline">
          <span className="text-7xl font-black font-anton tracking-tight text-[#01411C] drop-shadow-md">
            Royal
          </span>
          <span className="text-7xl font-black font-anton tracking-tight text-[#ffc400] ml-3 drop-shadow-md">
            9
          </span>
        </div>
      </h1>
      <div 
        className="text-4xl font-bold font-oswald tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ff6f00] to-[#bcfd49] italic uppercase"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
      >
        Engine Oil
      </div>
    </div>
    {/* Optimized V-shaped cut using CSS clip-path */}
    <div 
      className="absolute right-0 top-0 h-full w-16 bg-white"
      style={{
        clipPath: 'polygon(100% 0, 0 50%, 100% 100%)'
      }}
    />
  </div>
));

TitleBanner.displayName = 'TitleBanner';

const carouselData = [
  {
    category: "PREMIUM SERVICES",
    title: "We offer a wide range of premium services to meet your needs.",
    src: "/4.jpeg",
    content: <div />,
  },
  {
    category: "DRIVE AS SMOOTH AS LIGHT",
    title: "We offer a wide range of premium services to meet your needs.",
    src: "/3.jpg",
    content: <div />,
  },
  {
    category: "VARIETY OF PRODUCTS",
    title: "We have a wide range of products to choose from.",
    src: "/7.jpeg",
    content: <div />,
  },
] as const;

export const Hero = () => {
  const cards = React.useMemo(() => 
    carouselData.map((card, index) => (
      <MemoizedCard key={card.src} card={card} index={index} layout={true} />
    )),
    []
  );

  return (
    <div className="w-full h-full py-10">
      <TitleBanner />
      <Carousel items={cards} />
    </div>
  );
};

export default memo(Hero);
