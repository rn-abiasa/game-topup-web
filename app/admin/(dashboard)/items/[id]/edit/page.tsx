import { getGames } from "@/app/actions/game";
import { getItems } from "@/app/actions/item";
import { notFound } from "next/navigation";
import AdminItemEditPageClient from "./client-page";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminItemEditPage({ params }: PageProps) {
  const resolvedParams = await params;
  const games = await getGames();
  const items = await getItems();
  const item = items.find((i: any) => i.id === resolvedParams.id);

  if (!item) {
    notFound();
  }

  return <AdminItemEditPageClient item={item} games={games} />;
}
