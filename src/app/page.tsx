import Authority from "@/components/Authority";
import Hero from "@/components/Hero";
import HowToOrder from "@/components/HowToOrder";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import Tradition from "@/components/Tradition";

export default function Home() {
  return (
    <main>
      <Hero />
      <Authority />
      <Tradition />
      <HowToOrder />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
