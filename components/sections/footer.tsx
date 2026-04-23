import Link from "next/link";
import { games } from "@/lib/data";

function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col justify-between md:flex-row">
          <div>
            <div className="mb-4">
              <img src="/logo.png" className="w-16" alt="Logo" />
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              Platform top up game termurah, tercepat, dan terpercaya di
              Indonesia. Buka 24 Jam.
            </p>
          </div>
          <div className="flex gap-10">
            <div>
              <h3 className="font-bold text-sm mb-4">Game Populer</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {games.slice(0, 4).map((game) => (
                  <li key={game.id}>
                    <Link
                      href={`/game/${game.id}`}
                      className="text-xs hover:text-primary transition-colors"
                    >
                      {game.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-4">Hubungi Kami</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>Email: support@topupgame.com</li>
                <li>WhatsApp: +62 812-3456-7890</li>
                <li>Jam Kerja: 08:00 - 22:00 WIB</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Game Top-up Web. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
