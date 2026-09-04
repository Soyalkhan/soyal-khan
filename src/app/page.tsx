import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Apps } from "@/components/sections/Apps";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative">
      <SmoothScroll />
      <Nav />
      <Hero />
      <Apps />
      <Work />
      <Services />
      <About />
      <Contact />
    </main>
  );
}
