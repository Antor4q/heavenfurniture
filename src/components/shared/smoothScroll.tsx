"use client";

import { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wrap your app (or just the pages that use GSAP scroll effects) with
 * this. It replaces native scroll with Lenis's eased scroll and keeps
 * ScrollTrigger perfectly in sync every frame — this is what turns
 * the Hero/BrandIntro overlap from "steppy" into the smooth glide you
 * see in the reference video.
 *
 * Usage (in app/layout.tsx):
 *   <SmoothScroll>{children}</SmoothScroll>
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Tell ScrollTrigger to use Lenis's scroll position instead of
    // the native one, and re-check its measurements whenever Lenis
    // scrolls.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's own ticker so both stay on the same
    // frame clock (avoids the double-rAF drift that causes jitter).
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}