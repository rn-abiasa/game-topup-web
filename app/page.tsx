import Navbar from "@/components/ui/navbar";
import Hero from "@/components/sections/hero";
import Popular from "@/components/sections/popular";
import Products from "@/components/sections/products";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Popular />
        <Products />
      </main>
      <Footer />
    </>
  );
}
