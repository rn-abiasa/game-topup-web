import { DollarSign, Gamepad2, Package, ShoppingBag } from "lucide-react";
import { getDashboardStats } from "@/app/actions/order";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Pendapatan Bulan Ini",
      value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`,
      icon: DollarSign,
      sub: "Dari transaksi selesai",
    },
    {
      title: "Game Aktif",
      value: stats.gamesCount.toString(),
      icon: Gamepad2,
      sub: "Produk tersedia",
    },
    {
      title: "Total Item",
      value: stats.itemsCount.toString(),
      icon: Package,
      sub: "Nominal top-up",
    },
    {
      title: "Total Pesanan",
      value: stats.ordersCount.toString(),
      icon: ShoppingBag,
      sub: "Semua status",
    },
  ];

  const statusColors: Record<string, string> = {
    pending:    "text-warning",
    processing: "text-info",
    done:       "text-success",
    failed:     "text-destructive",
  };
  const statusLabels: Record<string, string> = {
    pending: "Menunggu", processing: "Diproses", done: "Selesai", failed: "Gagal",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Ringkasan statistik dan aktivitas terbaru.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-card p-6 rounded-xl border border-border/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-foreground">{stat.value}</h2>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Pesanan Terbaru</h3>
          <a href="/admin/orders" className="text-xs text-primary hover:underline">Lihat semua →</a>
        </div>
        {stats.recentOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Belum ada pesanan.</p>
        ) : (
          <div className="space-y-5">
            {stats.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground font-mono">{order.order_code}</p>
                    <p className="text-xs text-muted-foreground">{order.game_name} — {order.item_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">Rp {order.price.toLocaleString("id-ID")}</p>
                  <p className={`text-xs font-medium ${statusColors[order.status] || "text-muted-foreground"}`}>
                    {statusLabels[order.status] || order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
