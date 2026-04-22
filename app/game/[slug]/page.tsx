import { notFound } from "next/navigation";
import { getGameBySlug } from "@/app/actions/game";
import { getItemsByGame } from "@/app/actions/item";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/footer";
import CheckoutClient from "@/components/sections/checkout-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: PageProps) {
  const resolvedParams = await params;
  const game = await getGameBySlug(resolvedParams.slug);

  if (!game) {
    notFound();
  }

  const items = await getItemsByGame(game.id);

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-background">
        {/* Banner Section */}
        <div className="relative h-64 md:h-80 w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${game.banner_url || game.image_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        {/* Client Component for interactive elements */}
        <CheckoutClient game={game} items={items} />
      </main>
      <Footer />
    </>
  );
}
