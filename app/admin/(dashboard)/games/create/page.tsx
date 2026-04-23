"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createGame } from "@/app/actions/game";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { AlertCircle, ArrowLeft, Save } from "lucide-react";

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled}>
      <Save className="w-4 h-4 mr-2" /> 
      {pending ? "Menyimpan..." : "Simpan Game"}
    </Button>
  );
}

export default function AdminGameCreatePage() {
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tambah Game</h1>
          <p className="text-sm text-muted-foreground mt-1">Tambahkan data game baru ke dalam sistem.</p>
        </div>
      </div>

      <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
        <form action={createGame} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Game</Label>
            <Input id="name" name="name" required placeholder="Contoh: Free Fire" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Produk</Label>
            <Textarea 
              id="description" 
              name="description"
              required
              placeholder="Masukkan deskripsi produk..." 
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publisher">Publisher</Label>
            <Input id="publisher" name="publisher" required placeholder="Contoh: Garena" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan Transaksi</Label>
            <Textarea 
              id="notes" 
              name="notes"
              placeholder="Masukkan catatan penting untuk pembeli..." 
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Gambar / Logo (Maks 500KB)</Label>
            <Input 
              id="image" 
              name="image" 
              type="file" 
              accept="image/*" 
              required
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
