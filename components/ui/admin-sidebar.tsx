"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Gamepad2, Package, LogOut, Menu, Settings, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Produk (Game)", href: "/admin/games", icon: Gamepad2 },
  { title: "Item (Produk)", href: "/admin/items", icon: Package },
  { title: "Pesanan", href: "/admin/orders", icon: ShoppingBag },
  { title: "Pengaturan", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-border/40 w-64">
      <div className="p-6">
        <Link href="/admin">
          <img src="/logo.png" alt="Logo" className="w-24 mb-2" />
        </Link>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Admin Panel</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          // exact match for /admin
          const isExactActive = pathname === "/admin" && item.href === "/admin";
          const actuallyActive = item.href === "/admin" ? isExactActive : isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                actuallyActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/40">
        <form action={async () => {
          const { logout } = await import("@/app/actions/auth");
          await logout();
        }}>
          <Button variant="ghost" type="submit" className="w-full justify-start text-muted-foreground hover:text-destructive">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </div>

      {/* Mobile Topbar & Sheet */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between p-4 bg-card border-b border-border/40">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
