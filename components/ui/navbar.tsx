"use client";

import { Search, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearchOverlay(false);
      setQuery("");
    }
  };

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";

  return (
    <>
      <nav className="bg-card sticky top-0 z-50 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo, Search, Button */}
          <div className="flex justify-between items-center py-3 gap-4 md:gap-8">
            <div className="flex-shrink-0">
              <Link href="/">
                <img src="/logo.png" className="w-14" alt="Logo" />
              </Link>
            </div>

            {/* Desktop Search - Full Area */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 relative"
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari game favoritmu..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-10"
                />
              </div>
            </form>

            {/* Desktop Action Button */}
            <div className="hidden md:block">
              <Link href="/admin/login">
                <Button variant="default" className="font-semibold px-6">
                  Login
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex gap-2 md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSearchOverlay(!showSearchOverlay)}
              >
                {showSearchOverlay ? <X /> : <Search />}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    <Link
                      href="/"
                      className="text-base font-medium p-2 hover:bg-secondary rounded-md"
                    >
                      Home
                    </Link>
                    <Link
                      href="/lacak"
                      className="text-base font-medium p-2 hover:bg-secondary rounded-md"
                    >
                      Lacak Pesanan
                    </Link>
                    <div className="pt-4 border-t">
                       <Link href="/admin/login">
                        <Button className="w-full">Login</Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Bottom Row: Links and Contact Info (Desktop Only) */}
          <div className="hidden md:flex justify-between items-center py-2 border-t border-border/10 text-sm font-medium">
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/lacak" className="hover:text-primary transition-colors">
                Lacak Pesanan
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              <Phone className="w-4 h-4" />
              <span>WhatsApp: {waNumber}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {showSearchOverlay && (
        <div className="md:hidden absolute top-[70px] left-0 w-full p-4 bg-card border-b border-border/40 z-40 shadow-lg animate-in slide-in-from-top-2">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari game..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full pl-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </form>
        </div>
      )}
    </>
  );
}

export default Navbar;
