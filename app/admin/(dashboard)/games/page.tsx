import Link from "next/link";
import { getGames, deleteGame } from "@/app/actions/game";
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

export default async function AdminGamesPage() {
  const games = await getGames();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Kelola Game</h1>
          <p className="text-sm text-muted-foreground mt-1">Daftar semua game yang tersedia di aplikasi.</p>
        </div>
        <Link href="/admin/games/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Game
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead className="w-[80px]">Logo</TableHead>
              <TableHead>Nama Game</TableHead>
              <TableHead>Publisher</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {games.map((game: any) => (
              <TableRow key={game.id}>
                <TableCell>
                  <img src={game.image_url} alt={game.name} className="w-10 h-10 rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium">{game.name}</TableCell>
                <TableCell>{game.publisher}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/admin/games/${game.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </Link>
                  <form action={async () => {
                    "use server";
                    await deleteGame(game.id);
                  }} className="inline-block">
                    <Button variant="destructive" size="sm" type="submit">
                      <Trash2 className="w-4 h-4 mr-1" /> Hapus
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            {games.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Belum ada data game.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
