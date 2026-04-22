import { getGames } from "@/app/actions/game";
import { notFound } from "next/navigation";
import AdminGameEditPageClient from "./client-page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminGameEditPage({ params }: PageProps) {
  const resolvedParams = await params;
  const games = await getGames();
  const game = games.find((g: any) => g.id === resolvedParams.id);

  if (!game) {
    notFound();
  }

  return <AdminGameEditPageClient game={game} />;
}
