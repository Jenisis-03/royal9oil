"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export const AppleCardsCarouselDemo = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your iSad.
      </h2>
      <Carousel items={cards} />
    </div>
  );
};

const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "",
    content: <div />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "",
    content: <div />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "",
    content: <div />,
  },
  // More data...
];

export default AppleCardsCarouselDemo;
