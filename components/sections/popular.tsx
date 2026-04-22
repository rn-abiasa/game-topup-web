import Link from "next/link";
import { games } from "@/lib/data";

function Popular() {
  // Take first 4 games as popular
  const populars = games.slice(0, 4);

  return (
    <section className="bg-secondary/30 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            🔥 POPULAR SEKARANG
          </h2>
          <p className="text-sm md:text-base font-normal text-muted-foreground mt-1">
            Berikut adalah beberapa produk yang paling popular saat ini.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {populars.map((popular) => (
            <Link href={`/game/${popular.id}`} key={popular.id}>
              <div className="bg-card hover:bg-secondary/50 border border-border/50 rounded-xl flex items-center gap-3 px-4 py-3 transition-colors duration-200">
                <img 
                  src={popular.image} 
                  alt={popular.name}
                  className="h-12 w-12 rounded-lg object-cover" 
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-foreground truncate">{popular.name}</p>
                  <p className="text-xs font-normal text-muted-foreground truncate">
                    {popular.publisher}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Popular;
