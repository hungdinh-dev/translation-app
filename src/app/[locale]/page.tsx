import { AnimatedBeamDemo } from "@/components/home/home-animate-beam";
import { AboutWebSite } from "@/components/home/home-about-website";
import Hero from "@/components/home/home-hero";
import { OrbitingCirclesDemo } from "@/components/home/orbiting-circles";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutWebSite />
      <AnimatedBeamDemo />
      <OrbitingCirclesDemo />
    </div>
  );
}
