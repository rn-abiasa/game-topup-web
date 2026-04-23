import Navbar from "@/components/ui/navbar";
import Footer from "@/components/sections/footer";
import { getOrderByCode } from "@/app/actions/order";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, MessageCircle, Search, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: Promise<{ order_code: string }>;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending:    { label: "Menunggu Pembayaran", color: "text-warning",  icon: Clock },
  processing: { label: "Sedang Diproses",     color: "text-info",     icon: Clock },
  done:       { label: "Selesai",             color: "text-success",  icon: CheckCircle2 },
  failed:     { label: "Gagal",               color: "text-destructive", icon: Clock },
};

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { order_code } = await params;
  const order = await getOrderByCode(order_code);

  if (!order) notFound();

  const status = statusConfig[order.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
  const waMessage = `Halo Admin, saya ingin konfirmasi pembayaran pesanan:\n\n*Kode Pesanan:* ${order.order_code}\n*Game:* ${order.game_name}\n*Item:* ${order.item_name}\n*User ID:* ${order.user_id_game}${order.server_id ? ` (Server: ${order.server_id})` : ""}\n*Total:* Rp ${order.price.toLocaleString("id-ID")}\n\nTerlampir bukti pembayaran.`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-16">
          {/* Status Banner */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 text-lg font-semibold ${status.color} mb-2`}>
              <StatusIcon className="w-6 h-6" />
              {status.label}
            </div>
            <h1 className="text-3xl font-bold text-foreground mt-2">Pesanan Dibuat!</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Simpan kode pesanan Anda untuk melacak status transaksi.
            </p>
          </div>

          {/* Order Code Card */}
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center mb-6">
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Kode Pesanan</p>
            <p className="text-3xl font-mono font-bold text-primary tracking-widest">{order.order_code}</p>
            <p className="text-xs text-muted-foreground mt-2">Gunakan kode ini untuk lacak status di halaman Lacak Pesanan</p>
          </div>

          {/* Order Detail */}
          <div className="bg-card border border-border/40 rounded-xl p-6 space-y-4 mb-6">
            <h2 className="font-semibold text-foreground">Detail Pesanan</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: "Game", value: order.game_name },
                { label: "Item", value: order.item_name },
                { label: "User ID", value: order.user_id_game + (order.server_id ? ` (${order.server_id})` : "") },
                { label: "Nomor WA", value: order.contact_wa },
                { label: "Total", value: `Rp ${order.price.toLocaleString("id-ID")}`, bold: true },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center border-b border-border/30 pb-3 last:border-0 last:pb-0">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className={`font-medium text-foreground ${row.bold ? "text-primary text-base" : ""}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-card border border-border/40 rounded-xl p-6 mb-6">
            <h2 className="font-semibold text-foreground mb-4">Langkah Selanjutnya</h2>
            <ol className="space-y-3 text-sm text-muted-foreground list-none">
              {[
                "Klik tombol WhatsApp di bawah untuk menghubungi admin.",
                "Kirim bukti transfer sesuai total pembayaran.",
                "Admin akan memproses pesanan Anda (1–5 menit).",
                "Lacak status pesanan Anda dengan kode di atas.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="lg" className="w-full gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat Admin via WhatsApp
              </Button>
            </a>
            <Link href={`/lacak?code=${order.order_code}`} className="flex-1">
              <Button size="lg" variant="outline" className="w-full gap-2">
                <Search className="w-5 h-5" />
                Lacak Pesanan
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
