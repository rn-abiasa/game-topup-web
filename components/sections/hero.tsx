import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const banners = ["/banner1.jpg", "/banner2.png"];

function Hero() {
  return (
    <section className="py-6 w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="relative">
        <Carousel 
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {banners.map((banner, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-2/3">
                <div className="relative aspect-[21/9] md:aspect-[24/9] overflow-hidden rounded-xl">
                  <img 
                    src={banner} 
                    alt={`Banner ${index + 1}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Hero;
