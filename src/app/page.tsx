
import Bespoke from "@/components/Bespoke";
import BrandIntro from "@/components/Brandintro";
import Collections from "@/components/Collections";
import Hero from "@/components/Hero";


export default function Home() {
  return (
    <main>
     
      <Hero />
      <BrandIntro/>
      <Collections/>
      <Bespoke/>
    </main>
  );
}