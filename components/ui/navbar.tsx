"use client";

import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
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

  return (
    <>
      <div className="bg-card sticky top-0 z-50 flex justify-between items-center px-5 py-3 border-b border-border/40">
        <div>
          <Link href="/">
            <img src="/logo.png" className="w-14" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Cari game..." 
              className="w-full pl-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="#" className="hover:text-primary transition-colors">Lacak Pesanan</Link>
          <Button variant="default" className="font-semibold">Login</Button>
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
                <Link href="/" className="text-base font-medium p-2 hover:bg-secondary rounded-md">Home</Link>
                <Link href="#" className="text-base font-medium p-2 hover:bg-secondary rounded-md">Lacak Pesanan</Link>
                <div className="mt-4 border-t pt-4">
                  <Button className="w-full">Login</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showSearchOverlay && (
        <div className="md:hidden absolute top-[70px] left-0 w-full p-4 bg-card border-b border-border/40 z-40 shadow-lg animate-in slide-in-from-top-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Cari game..." 
              className="w-full pl-9 bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
