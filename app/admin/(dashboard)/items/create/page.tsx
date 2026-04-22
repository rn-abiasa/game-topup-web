import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { getGames } from "@/app/actions/game";
import { createItem } from "@/app/actions/item";

export default async function AdminItemCreatePage() {
  const games = await getGames();

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/items">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tambah Item</h1>
          <p className="text-sm text-muted-foreground mt-1">Tambahkan item baru (contoh: Diamond) ke sebuah game.</p>
        </div>
      </div>

      <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
        <form action={createItem} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="game_id">Pilih Game</Label>
            <Select name="game_id" required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih game tujuan..." />
              </SelectTrigger>
              <SelectContent>
                {games.map((game: any) => (
                  <SelectItem key={game.id} value={game.id}>
                    {game.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nama Item / Produk</Label>
            <Input id="name" name="name" required placeholder="Contoh: 100 Diamonds" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Harga (Rp)</Label>
            <Input id="price" name="price" type="number" required placeholder="Contoh: 15000" />
          </div>

          <div className="pt-4 border-t border-border/40 flex justify-end gap-2">
            <Link href="/admin/items">
              <Button variant="outline" type="button">Batal</Button>
            </Link>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" /> Simpan Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
