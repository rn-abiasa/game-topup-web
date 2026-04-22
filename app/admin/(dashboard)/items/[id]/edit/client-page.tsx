"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { updateItem } from "@/app/actions/item";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Save className="w-4 h-4 mr-2" /> 
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </Button>
  );
}

export default function AdminItemEditPageClient({ item, games }: { item: any, games: any[] }) {
  const updateItemWithId = updateItem.bind(null, item.id);

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/items">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Item</h1>
          <p className="text-sm text-muted-foreground mt-1">Ubah data harga atau nama item.</p>
        </div>
      </div>

      <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
        <form action={updateItemWithId} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="game_id">Game</Label>
            <Select name="game_id" defaultValue={item.game_id} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih game..." />
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
            <Input id="name" name="name" defaultValue={item.name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Harga (Rp)</Label>
            <Input id="price" name="price" type="number" defaultValue={item.price} required />
          </div>

          <div className="pt-4 border-t border-border/40 flex justify-end gap-2">
            <Link href="/admin/items">
              <Button variant="outline" type="button">Batal</Button>
            </Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
