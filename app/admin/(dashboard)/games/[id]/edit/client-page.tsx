"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { updateGame } from "@/app/actions/game";
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

export default function AdminGameEditPageClient({ game }: { game: any }) {
  const updateGameWithId = updateGame.bind(null, game.id);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/games">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Game</h1>
          <p className="text-sm text-muted-foreground mt-1">Ubah data game yang sudah ada.</p>
        </div>
      </div>

      <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
        <form action={updateGameWithId} className="space-y-6">
          <input type="hidden" name="old_image_url" value={game.image_url} />

          <div className="space-y-2">
            <Label htmlFor="name">Nama Game</Label>
            <Input id="name" name="name" defaultValue={game.name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Produk</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={game.description}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publisher">Publisher</Label>
            <Input id="publisher" name="publisher" defaultValue={game.publisher} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan Transaksi</Label>
            <Textarea
              id="notes"
              name="notes"
              defaultValue={game.notes || "Pastikan User ID yang dimasukkan sudah benar."}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Ganti Gambar / Logo</Label>
            <div className="flex items-center gap-4 mb-2">
              {game.image_url && (
                <img src={game.image_url} alt="Current logo" className="w-12 h-12 rounded-md object-cover" />
              )}
              <span className="text-xs text-muted-foreground">Kosongkan jika tidak ingin mengganti gambar.</span>
            </div>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
            />
          </div>

          <div className="pt-4 border-t border-border/40 flex justify-end gap-2">
            <Link href="/admin/games">
              <Button variant="outline" type="button">Batal</Button>
            </Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
