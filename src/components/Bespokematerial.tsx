"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * BespokeProcessScroll
 * ------------------------------------------------------------------
 * "The Bespoke Process" — pinned horizontal panel scroll.
 * Same underlying mechanic as your collection gallery (horizontal
 * track pinned in place while the page scrolls vertically), but
 * paced slower and used for narrative/process content instead of a
 * product grid.
 *
 * Drop-in usage:
 *   <BespokeProcessScroll />
 *
 * Tailwind config — reuses the same tokens as the material showcase:
 *   colors: {
 *     "heaven-olive": "#5B6144",
 *     "heaven-cream": "#F4F1EA",
 *     "heaven-dark":  "#15140F",
 *     "heaven-brass": "#C9A45C",
 *   }
 * ------------------------------------------------------------------
 */

type Step = {
  number: string; // "01"
  title: string;
  description: string;
  media: {
    type: "image" | "video";
    src: string;
  };
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Consult",
    description:
      "A conversation about how you actually live in the space — not a catalogue browse. We take measurements, references, and constraints.",
    media: { type: "image", src: "/gall1.webp" },
  },
  {
    number: "02",
    title: "Design & Sketch",
    description:
      "Your piece is drawn and proportioned by hand before it's built — frame lines, dimensions, and finish pairings confirmed with you.",
    media: { type: "image", src: "/gall2.webp" },
  },
  {
    number: "03",
    title: "Handcrafted in Chattogram",
    description:
      "Frame, upholstery, and finishing work happen in our own workshop, by hand — the same joinery and stitching methods on every piece.",
    media: { type: "image", src: "/gall3.webp" },
  },
  {
    number: "04",
    title: "Delivered & Styled",
    description:
      "We deliver, assemble, and set the piece in place — styled in the room the way it was designed to sit, not left in a box.",
    media: { type: "image", src: "/gall4.webp" },
  },
];

export default function BespokeProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Below lg, panels stack and scroll normally — pinning a horizontal
    // track on narrow viewports fights with touch scroll far more than
    // it adds. Reduced-motion users get the same plain stack.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (reducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const distance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance * 1.4}`, // slower pace than a product grid
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-heaven-dark text-heaven-cream lg:h-screen"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-16 px-6 py-20 lg:h-full lg:flex-row lg:items-stretch lg:gap-0 lg:py-0"
      >
        {/* Section label — sits inside the track's first panel on mobile,
            pinned as a fixed intro column on desktop via its own width */}
        <div className="flex flex-shrink-0 flex-col justify-center lg:w-[28vw] lg:px-16">
          <p className="mb-4 text-sm text-heaven-cream/60">
            How a piece gets made
          </p>
          <h2 className="text-4xl font-bold leading-[1.05] lg:text-5xl">
            The Bespoke Process
          </h2>
        </div>

        {STEPS.map((step) => (
          <article
            key={step.number}
            className="relative flex flex-shrink-0 flex-col justify-end overflow-hidden lg:h-full lg:w-[70vw] lg:border-l lg:border-heaven-cream/10"
          >
            <div className="absolute inset-0">
              {step.media.type === "video" ? (
                <video
                  className="h-full w-full object-cover opacity-40"
                  src={step.media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center opacity-40"
                  style={{ backgroundImage: `url(${step.media.src})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark via-heaven-dark/40 to-heaven-dark/10" />
            </div>

            <span
              aria-hidden
              className="pointer-events-none relative select-none text-[26vw] font-bold leading-none text-transparent lg:text-[16vw]"
              style={{
                WebkitTextStroke: "1.5px rgba(244, 241, 234, 0.18)",
              }}
            >
              {step.number}
            </span>

            <div className="relative max-w-md px-2 pb-10 lg:px-16 lg:pb-20">
              <h3 className="mb-4 text-3xl font-bold lg:text-4xl">
                {step.title}
              </h3>
              <p className="text-base text-heaven-cream/75 lg:text-lg">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}