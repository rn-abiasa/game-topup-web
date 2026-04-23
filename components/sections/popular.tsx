import Image from "next/image";
import Link from "next/link";
import { getGames } from "@/app/actions/game";
import { Flame } from "lucide-react";

export default async function PopularGames() {
  const allGames = await getGames();
  const popularGames = allGames.slice(0, 6);

  return (
    <section className="py-5 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8 md:mb-12">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
          <Flame className="w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div>
          <h2 className="text-sm md:text-xl font-bold tracking-tight text-foreground">
            Populer Saat Ini
          </h2>
          <p className="text-xs md:text-base text-muted-foreground mt-1">
            Game yang paling populer minggu ini.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {popularGames.map((game: any) => (
          <Link href={`/game/${game.slug}`} key={game.id}>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card hover:bg-secondary/50 hover:border-primary/40 transition-all duration-200 group">
              <div className="w-14 h-14 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={game.image_url}
                  alt={game.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                  {game.name}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {game.publisher}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {popularGames.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">
            Belum ada game populer.
          </p>
        )}
      </div>
    </section>
  );
}
