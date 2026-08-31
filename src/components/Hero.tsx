"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img from "../../public/heavenHero.jpg";
import img2 from "../../public/sofa.png";
import AnimatedButton from "./shared/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  const leftImageWrapRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);

  const rightImageWrapRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================================
         ENTRANCE (plays once on mount, no ScrollTrigger here)
      ===================================================== */

      gsap.set(headingRef.current, { y: 120 });

      gsap.set(leftImageWrapRef.current, {
        y: 90,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap.set(rightImageWrapRef.current, {
        y: 70,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap.set(contentRef.current, { y: 50 });

      gsap.set(leftImageRef.current, { scale: 1.12 });
      gsap.set(rightImageRef.current, { scale: 1.1 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        // Wait one tick so layout/images have settled before we
        // measure anything — avoids the "already visible" snap.
        delay: 0.05,
      });

      tl.to(headingRef.current, { y: 0, duration: 1.1 })
        .to(
          leftImageWrapRef.current,
          { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.15 },
          "-=0.75"
        )
        .to(
          leftImageRef.current,
          // Settles at 1.15, not 1 — gives the parallax below room to
          // translate the image without exposing empty space at the
          // wrapper's bottom edge.
          { scale: 1.15, duration: 1.5, ease: "power3.out" },
          "<"
        )
        .to(
          rightImageWrapRef.current,
          { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
          "-=0.85"
        )
        .to(
          rightImageRef.current,
          { scale: 1, duration: 1.35, ease: "power3.out" },
          "<"
        )
        .to(
          contentRef.current,
          { y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.55"
        );

      /* =====================================================
         SCROLL PARALLAX
         Single shared ScrollTrigger driving one timeline —
         avoids multiple independent scrubs fighting each other.
      ===================================================== */

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(headingRef.current, { y: -70, ease: "none" }, 0)
        .to(contentRef.current, { y: -35, ease: "none" }, 0)
        .to(rightImageRef.current, { yPercent: -8, ease: "none" }, 0);

      /* =====================================================
         LEFT IMAGE — dedicated parallax
         Tied to the image's OWN viewport journey (not the section's),
         so it keeps drifting the whole time it's on screen — this is
         what makes a parallax read as a parallax instead of a small
         nudge tied to the hero's limited scroll range.
      ===================================================== */

      gsap.to(leftImageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: leftImageWrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Note: no Hero pin here anymore — see BrandIntro.tsx for how
      // the small bottom-edge overlap with the next section works.
      // Pinning the whole Hero for a full viewport of scroll (what
      // was here before) is what made it feel like the entire hero
      // was "taken over" instead of just its bottom edge peeking
      // under the next section, like in the reference video.

      // No manual ScrollTrigger.refresh() here — GSAP handles the
      // initial refresh itself once fonts/images are ready. Calling
      // it manually right after setup is what was causing the
      // instant-snap-to-final-state you saw in the recording.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-cover bg-center bg-no-repeat px-20 pt-40"
    >
      <div className="flex">
        <div>
          <h1
            ref={headingRef}
            className="text-[160px] font-bold uppercase tracking-normal leading-36 text-[#171715]"
          >
            Elevate the way you live.
          </h1>

          <div ref={leftImageWrapRef} className="mt-7 overflow-hidden">
            <div ref={leftImageRef} className="will-change-transform">
              <Image
                alt="hero1"
                src={img}
                width={600}
                height={300}
                priority
                className="mt-0 w-[900px] h-[400px] bg-cover bg-center"
              />
            </div>
          </div>
        </div>

        <div>
          <div ref={rightImageWrapRef} className="overflow-visible">
            <div ref={rightImageRef} className="will-change-transform">
              <Image
                alt="chair"
                src={img2}
                width={300}
                height={400}
                priority
                // Transparent PNG cutout — object-contain keeps the
                // chair's real proportions instead of stretching it
                // into a box, and no bg-cover since there's no photo
                // background to fill. Drop-shadow adds a bit of
                // grounding since it'll sit directly on the page bg.
                className="w-[420px] h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <div ref={contentRef}>
            <p className="text-[20px] w-[500px] font-medium my-5">
              Bespoke furniture for living, bedroom, dining, office, and
              every space in between — designed around your taste, space,
              and lifestyle.
            </p>

            <AnimatedButton href="/" text="Explore The Collection" />
          </div>
        </div>
      </div>
    </section>
  );
}