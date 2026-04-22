import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/footer";
import { getOrderByCode } from "@/app/actions/order";
import { CheckCircle2, Clock, XCircle, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ code?: string }>;
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  pending:    { label: "Menunggu Pembayaran", color: "text-yellow-500",  bgColor: "bg-yellow-500/10 border-yellow-500/30", icon: Clock },
  processing: { label: "Sedang Diproses",     color: "text-blue-500",   bgColor: "bg-blue-500/10 border-blue-500/30",    icon: Loader2 },
  done:       { label: "Selesai ✓",           color: "text-green-500",  bgColor: "bg-green-500/10 border-green-500/30",  icon: CheckCircle2 },
  failed:     { label: "Gagal",               color: "text-destructive", bgColor: "bg-destructive/10 border-destructive/30", icon: XCircle },
};

export default async function LacakPesananPage({ searchParams }: PageProps) {
  const { code } = await searchParams;
  const order = code ? await getOrderByCode(code.toUpperCase()) : null;
  const status = order ? (statusConfig[order.status] || statusConfig.pending) : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Lacak Pesanan</h1>
            <p className="text-muted-foreground mt-2 text-sm">Masukkan kode pesanan yang dikirim ke WhatsApp Anda.</p>
          </div>

          {/* Search Form */}
          <form method="GET" action="/lacak" className="flex gap-2 mb-10">
            <Input
              name="code"
              defaultValue={code}
              placeholder="Contoh: ORD-20240422-ABCD"
              className="font-mono"
            />
            <Button type="submit" className="gap-2">
              <Search className="w-4 h-4" />
              Cari
            </Button>
          </form>

          {/* Results */}
          {code && !order && (
            <div className="text-center py-16 bg-card border border-border/40 rounded-xl">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-lg font-semibold text-foreground">Pesanan Tidak Ditemukan</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Pastikan kode pesanan yang dimasukkan sudah benar.
              </p>
            </div>
          )}

          {order && status && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div className={`border rounded-xl p-5 flex items-center gap-4 ${status.bgColor}`}>
                <status.icon className={`w-8 h-8 flex-shrink-0 ${status.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status Pesanan</p>
                  <p className={`text-lg font-bold ${status.color}`}>{status.label}</p>
                  {order.notes && <p className="text-sm text-muted-foreground mt-1">{order.notes}</p>}
                </div>
              </div>

              {/* Order Detail */}
              <div className="bg-card border border-border/40 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-semibold text-foreground">Detail Pesanan</h2>
                  <span className="font-mono text-sm text-primary font-bold">{order.order_code}</span>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Game",    value: order.game_name },
                    { label: "Item",    value: order.item_name },
                    { label: "User ID", value: order.user_id_game + (order.server_id ? ` (${order.server_id})` : "") },
                    { label: "Tanggal", value: new Date(order.created_at).toLocaleString("id-ID") },
                    { label: "Total",   value: `Rp ${order.price.toLocaleString("id-ID")}`, bold: true },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center border-b border-border/30 pb-3 last:border-0 last:pb-0">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className={`font-medium text-foreground ${row.bold ? "text-primary" : ""}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {order.status === "pending" && (
                <p className="text-center text-sm text-muted-foreground">
                  Belum bayar? <Link href={`/order/${order.order_code}`} className="text-primary hover:underline">Kembali ke halaman pesanan →</Link>
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
