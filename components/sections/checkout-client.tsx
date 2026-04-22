"use client";

import { useState } from "react";
import { InputCard } from "@/components/ui/input-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { createOrder } from "@/app/actions/order";
import { useRouter } from "next/navigation";

interface CheckoutClientProps {
  game: any;
  items: any[];
}

export default function CheckoutClient({ game, items }: CheckoutClientProps) {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!userId || !selectedItem || !contact) {
      alert("Mohon lengkapi semua data transaksi!");
      return;
    }

    setLoading(true);
    try {
      const orderCode = await createOrder({
        game_id: game.id,
        item_id: selectedItem.id,
        game_name: game.name,
        item_name: selectedItem.name,
        price: selectedItem.price,
        user_id_game: userId,
        server_id: serverId || undefined,
        contact_wa: contact,
      });
      router.push(`/order/${orderCode}`);
    } catch (err) {
      alert("Terjadi kesalahan, coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 -mt-20 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Game Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm flex flex-col items-center lg:items-start text-center lg:text-left">
            <img src={game.image_url} alt={game.name} className="w-24 h-24 rounded-2xl shadow-lg border-4 border-card -mt-16 mb-4 object-cover" />
            <h1 className="text-2xl font-bold text-foreground">{game.name}</h1>
            <p className="text-sm font-medium text-primary mb-6">{game.publisher}</p>
            
            <div className="w-full grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Proses Cepat</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>Chat 24/7</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Pembayaran Aman</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="transaksi" className="w-full">
            <TabsList className="w-full max-w-sm mb-6 grid grid-cols-2">
              <TabsTrigger value="transaksi">Transaksi</TabsTrigger>
              <TabsTrigger value="keterangan">Keterangan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transaksi" className="space-y-6">
              <InputCard number={1} title="Masukkan Data Akun">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input 
                      id="userId" 
                      placeholder="Masukkan User ID" 
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">User ID dapat ditemukan di profil game Anda.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serverId">Server ID (Opsional)</Label>
                    <Input 
                      id="serverId" 
                      placeholder="Masukkan Server ID" 
                      value={serverId}
                      onChange={(e) => setServerId(e.target.value)}
                    />
                  </div>
                </div>
              </InputCard>

              <InputCard number={2} title="Pilih Nominal">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 ${
                        selectedItem?.id === item.id 
                          ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.2)]" 
                          : "border-border/50 bg-secondary/20 hover:bg-secondary/50 hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold text-sm mb-1 text-foreground">{item.name}</p>
                      <p className="text-xs font-medium text-primary">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <p className="col-span-full text-sm text-muted-foreground py-4 text-center">Belum ada item tersedia.</p>
                  )}
                </div>
              </InputCard>

              <InputCard number={3} title="Kontak & Checkout">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Nomor WhatsApp</Label>
                    <Input 
                      id="contact" 
                      placeholder="Contoh: 081234567890" 
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Kode pesanan dan instruksi pembayaran akan dikirim ke nomor ini.</p>
                  </div>
                  <div className="pt-4 border-t border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                      <p className="text-2xl font-bold text-primary">
                        Rp {selectedItem ? selectedItem.price.toLocaleString('id-ID') : "0"}
                      </p>
                    </div>
                    <Button 
                      onClick={handleCheckout} 
                      size="lg" 
                      disabled={loading}
                      className="w-full md:w-auto font-bold text-base px-8 py-6"
                    >
                      {loading ? "Memproses..." : "Pesan Sekarang"}
                    </Button>
                  </div>
                </div>
              </InputCard>
            </TabsContent>
            
            <TabsContent value="keterangan" className="space-y-6">
              <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Deskripsi Produk</h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                  {game.description}
                </p>
                
                <h3 className="text-lg font-semibold mt-8 mb-4">Catatan Transaksi</h3>
                <div className="text-sm text-muted-foreground space-y-2 whitespace-pre-wrap">
                  {game.notes || (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Pastikan User ID yang dimasukkan sudah benar.</li>
                      <li>Kesalahan input User ID bukan tanggung jawab kami.</li>
                      <li>Proses memakan waktu 1-5 menit setelah pembayaran dikonfirmasi.</li>
                      <li>Simpan bukti pembayaran jika terjadi kendala.</li>
                    </ul>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
