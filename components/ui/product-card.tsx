import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  publisher: string;
  image: string;
  className?: string;
}

export function ProductCard({ id, name, publisher, image, className }: ProductCardProps) {
  return (
    <Link href={`/game/${id}`} className={cn("block group", className)}>
      <div 
        className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary bg-cover bg-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/20"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white font-bold text-lg leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{name}</p>
          <p className="text-primary font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{publisher}</p>
        </div>
      </div>
    </Link>
  );
}
