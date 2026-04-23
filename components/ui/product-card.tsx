import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  publisher: string;
  image: string;
  popular?: boolean;
  className?: string;
}

export function ProductCard({ name, publisher, image, popular, className }: ProductCardProps) {
  return (
    <div className={cn("block group cursor-pointer", className)}>
      <div 
        className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/20"
      >
        <Image 
          src={image} 
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white font-bold text-lg leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{name}</p>
          <p className="text-primary font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{publisher}</p>
        </div>
      </div>
    </div>
  );
}
