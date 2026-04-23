import { getAllOrders, updateOrderStatus } from "@/app/actions/order";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusColors: Record<string, string> = {
  pending:    "bg-warning/20 text-warning border-warning/30",
  processing: "bg-info/20 text-info border-info/30",
  done:       "bg-success/20 text-success border-success/30",
  failed:     "bg-destructive/20 text-destructive border-destructive/30",
};

const statusLabels: Record<string, string> = {
  pending:    "Menunggu",
  processing: "Diproses",
  done:       "Selesai",
  failed:     "Gagal",
};

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Kelola Pesanan</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Daftar semua pesanan yang masuk. Update status setelah menerima pembayaran.
        </p>
      </div>

      <div className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Game / Item</TableHead>
              <TableHead>User ID Game</TableHead>
              <TableHead>No. WA</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs font-bold text-primary">{order.order_code}</TableCell>
                <TableCell>
                  <p className="font-medium text-sm">{order.game_name}</p>
                  <p className="text-xs text-muted-foreground">{order.item_name}</p>
                </TableCell>
                <TableCell className="text-sm">
                  {order.user_id_game}
                  {order.server_id && <span className="text-muted-foreground"> ({order.server_id})</span>}
                </TableCell>
                <TableCell className="text-sm">{order.contact_wa}</TableCell>
                <TableCell className="font-semibold text-sm">Rp {order.price.toLocaleString("id-ID")}</TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusColors[order.status] || statusColors.pending}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <form className="flex justify-end gap-2 items-center">
                    <input type="hidden" name="orderId" value={order.id} />
                    <Select name="status" defaultValue={order.status}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Menunggu</SelectItem>
                        <SelectItem value="processing">Diproses</SelectItem>
                        <SelectItem value="done">Selesai</SelectItem>
                        <SelectItem value="failed">Gagal</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="submit"
                      size="sm"
                      formAction={async (fd) => {
                        "use server";
                        const status = fd.get("status") as string;
                        await updateOrderStatus(order.id, status);
                      }}
                    >
                      Update
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  Belum ada pesanan masuk.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
