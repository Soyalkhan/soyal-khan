import { SmoothScroll } from "@/components/SmoothScroll";
import { Background } from "@/components/Background";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Activity } from "@/components/sections/Activity";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative">
      <Loader />
      <SmoothScroll />
      <Background />
      <Nav />
      <Hero />
      <CaseStudies />
      <Projects />
      <Services />
      <About />
      <Activity />
      <Timeline />
      <Contact />
    </main>
  );
}
