"use client";
import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";    
import Particles from "@/components/magicui/particles";

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[rgb(17,24,39)]">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <LandingNavbar />
      <div className="flex flex-1 flex-col items-center justify-center">
        <LandingHero />
        <LandingContent />
      </div>
    </div>
  );
}
export default LandingPage;