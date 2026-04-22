import { ProductCard } from "@/components/ui/product-card";
import { games } from "@/lib/data";

function Products() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Semua Game
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Pilih game favoritmu dan top up sekarang juga!
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {games.map((game) => (
            <ProductCard
              key={game.id}
              id={game.id}
              name={game.name}
              publisher={game.publisher}
              image={game.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
