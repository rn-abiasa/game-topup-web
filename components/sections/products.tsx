import Link from "next/link";
import { getGames } from "@/app/actions/game";
import { ProductCard } from "@/components/ui/product-card";
import { LayoutGrid } from "lucide-react";

export default async function AllProducts() {
  const games = await getGames();

  return (
    <section className="py-5 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8 md:mb-12">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
          <LayoutGrid className="w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div>
          <h2 className="text-sm md:text-xl font-bold tracking-tight text-foreground">
            Semua Produk
          </h2>
          <p className="text-xs md:text-base text-muted-foreground mt-1">
            Pilih game favoritmu dan top-up sekarang.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {games.map((game: any) => (
          <Link href={`/game/${game.slug}`} key={game.id}>
            <ProductCard
              name={game.name}
              publisher={game.publisher}
              image={game.image_url}
            />
          </Link>
        ))}
        {games.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">
            Belum ada produk.
          </p>
        )}
      </div>
    </section>
  );
}
