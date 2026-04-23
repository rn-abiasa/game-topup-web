"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Papa from "papaparse";
import { bulkCreateItems } from "@/app/actions/item";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Game {
  id: string;
  name: string;
}

interface ParsedItem {
  name: string;
  price: number;
  status: "pending" | "valid" | "invalid";
  error?: string;
}

export default function ImportItemsForm({ games }: { games: Game[] }) {
  const router = useRouter();
  const [selectedGameId, setSelectedGameId] = useState<string>("");
  const [items, setItems] = useState<ParsedItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as any[];
        const validatedItems: ParsedItem[] = parsedData.map((row) => {
          const name = row.name || row.Name || row.nama || row.Nama;
          const priceStr = row.price || row.Price || row.harga || row.Harga;
          const price = parseInt(priceStr);

          if (!name) {
            return { name: "Tanpa Nama", price: 0, status: "invalid", error: "Nama kosong" };
          }
          if (isNaN(price)) {
            return { name, price: 0, status: "invalid", error: "Harga tidak valid" };
          }

          return { name, price, status: "valid" };
        });

        setItems(validatedItems);
      },
      error: (error) => {
        setErrorMessage("Gagal membaca file CSV: " + error.message);
      }
    });
  };

  const handleImport = async () => {
    if (!selectedGameId) {
      setErrorMessage("Silakan pilih game terlebih dahulu.");
      return;
    }

    const validItems = items.filter(item => item.status === "valid");
    if (validItems.length === 0) {
      setErrorMessage("Tidak ada item valid untuk diimport.");
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      await bulkCreateItems(selectedGameId, validItems.map(i => ({ name: i.name, price: i.price })));
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/admin/items");
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan saat mengimport data.");
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "name,price\n5 Diamonds,1500\n10 Diamonds,3000\n50 Diamonds,14500";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_import_item.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isSuccess) {
    return (
      <div className="bg-card border border-border/40 rounded-xl p-12 text-center space-y-4 shadow-sm">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-success animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold">Import Berhasil!</h2>
        <p className="text-muted-foreground">Berhasil mengimport {items.filter(i => i.status === "valid").length} item.</p>
        <p className="text-sm text-muted-foreground italic">Mengalihkan ke halaman daftar item...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>1. Pilih Game Tujuan</Label>
            <Select onValueChange={setSelectedGameId} value={selectedGameId}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih game..." />
              </SelectTrigger>
              <SelectContent>
                {games.map((game) => (
                  <SelectItem key={game.id} value={game.id}>
                    {game.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>2. Unduh Template</Label>
            <Button variant="outline" className="w-full" onClick={downloadTemplate}>
              <FileText className="w-4 h-4 mr-2" /> Unduh Template CSV
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>3. Upload File CSV</Label>
          <div className="border-2 border-dashed border-border/60 rounded-xl p-8 text-center hover:border-primary/50 transition-colors bg-secondary/10 relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2 pointer-events-none">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
              <p className="font-medium text-foreground">Klik atau drag file CSV ke sini</p>
              <p className="text-xs text-muted-foreground">Format: name, price (Contoh: 10 Diamonds, 3000)</p>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border/40 bg-secondary/30 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Preview Data ({items.length} baris)</h3>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full border border-success/20">
                {items.filter(i => i.status === "valid").length} Valid
              </span>
              {items.filter(i => i.status === "invalid").length > 0 && (
                <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded-full border border-destructive/20">
                  {items.filter(i => i.status === "invalid").length} Invalid
                </span>
              )}
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Item</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={idx} className={item.status === "invalid" ? "bg-destructive/5" : ""}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>Rp {item.price.toLocaleString("id-ID")}</TableCell>
                    <TableCell>
                      {item.status === "valid" ? (
                        <span className="text-success flex items-center gap-1 text-xs font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      ) : (
                        <span className="text-destructive flex items-center gap-1 text-xs font-medium">
                          <AlertCircle className="w-3 h-3" /> {item.error}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 bg-secondary/20 border-t border-border/40 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setItems([])}>Reset</Button>
            <Button 
              disabled={isUploading || items.filter(i => i.status === "valid").length === 0} 
              onClick={handleImport}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengimport...
                </>
              ) : (
                <>Simpan {items.filter(i => i.status === "valid").length} Item</>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
