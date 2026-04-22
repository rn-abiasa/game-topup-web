import Link from "next/link";
import { getItems, deleteItem } from "@/app/actions/item";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminItemsPage() {
  const items = await getItems();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Kelola Item / Produk</h1>
          <p className="text-sm text-muted-foreground mt-1">Daftar semua item top-up untuk masing-masing game.</p>
        </div>
        <Link href="/admin/items/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Item
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead>Nama Item</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.games?.name}</TableCell>
                <TableCell>Rp {item.price.toLocaleString("id-ID")}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/admin/items/${item.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </Link>
                  <form action={async () => {
                    "use server";
                    await deleteItem(item.id);
                  }} className="inline-block">
                    <Button variant="destructive" size="sm" type="submit">
                      <Trash2 className="w-4 h-4 mr-1" /> Hapus
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Belum ada data item.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
