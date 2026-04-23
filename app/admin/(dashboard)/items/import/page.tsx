import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getGames } from "@/app/actions/game";
import ImportItemsForm from "@/components/admin/import-items-form";

export default async function AdminItemImportPage() {
  const games = await getGames();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/items">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Import Item (CSV)</h1>
          <p className="text-sm text-muted-foreground mt-1">Tambahkan banyak item sekaligus menggunakan file CSV.</p>
        </div>
      </div>

      <ImportItemsForm games={games} />
    </div>
  );
}
