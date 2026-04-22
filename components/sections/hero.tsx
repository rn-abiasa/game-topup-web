"use client";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const banners = ["/banner1.jpg", "/banner2.png"];

export default function Hero() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section className="py-6 w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-21/5 overflow-hidden rounded-xl">
                  <img
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 opacity-80 hover:opacity-100" />
          <CarouselNext className="right-3 opacity-80 hover:opacity-100" />
        </Carousel>
      </div>
    </section>
  );
}
