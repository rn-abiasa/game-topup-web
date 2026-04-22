import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/footer";
import { ProductCard } from "@/components/ui/product-card";
import { getGames } from "@/app/actions/game";
import { Search } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const allGames = await getGames();

  const results = query
    ? allGames.filter((game: any) =>
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        game.publisher?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Hasil Pencarian
              </h1>
            </div>
            {query ? (
              <p className="text-muted-foreground text-sm md:text-base">
                Menampilkan <span className="text-foreground font-semibold">{results.length}</span> hasil untuk &ldquo;<span className="text-primary font-semibold">{query}</span>&rdquo;
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">Masukkan kata kunci di bilah pencarian untuk mulai mencari.</p>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {results.map((game: any) => (
                <Link href={`/game/${game.slug}`} key={game.id}>
                  <ProductCard
                    name={game.name}
                    publisher={game.publisher}
                    image={game.image_url}
                  />
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Game tidak ditemukan</h2>
              <p className="text-muted-foreground text-sm">Coba gunakan kata kunci yang berbeda.</p>
              <Link href="/" className="mt-6 inline-block text-primary hover:underline text-sm">
                &larr; Kembali ke Beranda
              </Link>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
