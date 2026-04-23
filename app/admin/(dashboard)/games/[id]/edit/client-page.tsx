"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AlertCircle, ArrowLeft, Save } from "lucide-react";
import { updateGame } from "@/app/actions/game";
import { useFormStatus } from "react-dom";

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled}>
      <Save className="w-4 h-4 mr-2" />
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </Button>
  );
}

export default function AdminGameEditPageClient({ game }: { game: any }) {
  const updateGameWithId = updateGame.bind(null, game.id);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 512 * 1024) { // 500KB
      setFileError("Ukuran file terlalu besar! Maksimal 500KB.");
      e.target.value = ""; // Reset input
    } else {
      setFileError(null);
    }
  };

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
            <Label htmlFor="image">Ganti Gambar / Logo (Maks 500KB)</Label>
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
              onChange={handleFileChange}
              className={fileError ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {fileError && (
              <p className="text-xs font-medium text-destructive flex items-center gap-1.5 mt-1">
                <AlertCircle className="w-3 h-3" /> {fileError}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-border/40 flex justify-end gap-2">
            <Link href="/admin/games">
              <Button variant="outline" type="button">Batal</Button>
            </Link>
            <SubmitButton disabled={!!fileError} />
          </div>
        </form>
      </div>
    </div>
  );
}
