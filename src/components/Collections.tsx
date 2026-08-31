"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Collection = {
  name: string;
  description: string;
  image: string;
  href: string;
};

const collections: Collection[] = [
  {
    name: "Living Room",
    description: "Sofas, coffee tables, TV units and consoles.",
    image: "/heavenHero.jpg",
    href: "/collections/living-room",
  },
  {
    name: "Bedroom",
    description: "Beds, wardrobes, dressing tables and bedside tables.",
    image: "/heavenHero.jpg",
    href: "/collections/bedroom",
  },
  {
    name: "Dining",
    description: "Dining tables, dining chairs and cabinets.",
    image: "/heavenHero.jpg",
    href: "/collections/dining",
  },

  {
    name: "Bespoke / Custom",
    description: "Built to your own space, size and taste.",
    image: "/heavenHero.jpg",
    href: "/collections/bespoke",
  },
];

/* =====================================================
   COLLECTION CARD — the whole card is the link.
   Hovering anywhere on it triggers the CTA swap-text
   animation (refs live here now, not on a separate Link).
===================================================== */

function CollectionCard({ item }: { item: Collection }) {
  const ctaDefaultRef = useRef<HTMLSpanElement>(null);
  const ctaHoverRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    const ctaDefault = ctaDefaultRef.current;
    const ctaHover = ctaHoverRef.current;
    if (!ctaDefault || !ctaHover) return;

    gsap.killTweensOf([ctaDefault, ctaHover]);

    gsap.to(ctaDefault, { x: 20, opacity: 0, duration: 0.4, ease: "power3.out" });
    gsap.fromTo(
      ctaHover,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
    );
  };

  const handleMouseLeave = () => {
    const ctaDefault = ctaDefaultRef.current;
    const ctaHover = ctaHoverRef.current;
    if (!ctaDefault || !ctaHover) return;

    gsap.killTweensOf([ctaDefault, ctaHover]);

    gsap.to(ctaHover, { x: -20, opacity: 0, duration: 0.35, ease: "power3.inOut" });
    gsap.to(ctaDefault, { x: 0, opacity: 1, duration: 0.4, ease: "power3.inOut" });
  };

  return (
    <Link
      href={item.href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="collection-card group relative block aspect-[4/5] overflow-hidden bg-[#171715] md:aspect-auto md:h-[560px]"
    >
      <div className="collection-image absolute inset-0 h-full w-full overflow-hidden will-change-transform">
        <div className="collection-image-inner absolute inset-x-0 -inset-y-[15%] will-change-transform">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/15 transition-colors duration-500 group-hover:bg-black/35" />
      </div>

      <div className="collection-curtain absolute inset-0 z-10 bg-[#F7F5F1] will-change-transform" />

      <div className="collection-caption absolute bottom-0 left-0 right-0 z-20 flex flex-col gap-3 p-6 md:p-7">
        <div>
          <h3 className="text-[24px] font-bold uppercase leading-none tracking-[-0.02em] text-white md:text-[28px]">
            {item.name}
          </h3>
          <p className="mt-2 max-w-[30ch] text-[13px] leading-snug text-white/75 md:text-[14px]">
            {item.description}
          </p>
        </div>

        {/* CTA — no longer its own Link (the whole card already is one);
            hover state is driven by the card's onMouseEnter/onMouseLeave above */}
        <span className="relative inline-flex h-6 items-center overflow-hidden">
          <span ref={ctaDefaultRef} className="absolute inline-flex items-center gap-3">
            <span className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.04em] text-white">
              Explore
            </span>
            <span className="text-[15px] leading-none text-white">⟶</span>
          </span>

          <span ref={ctaHoverRef} className="absolute inline-flex items-center gap-3 opacity-0">
            <span className="text-[15px] leading-none text-[#D9A441]">⟶</span>
            <span className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.04em] text-[#D9A441]">
              Explore
            </span>
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const label = labelRef.current;
      const heading = headingRef.current;
      if (!section || !label || !heading) return;

      /* ---- heading entrance (same device as BrandIntro) ---- */
      gsap.set(label, { y: 30, opacity: 0 });
      gsap.set(heading, { y: 30, opacity: 0 });

      gsap.to(label, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* ---- continued parallax on label + heading while scrolling
             (same device as BrandIntro's label/paragraph parallax) ---- */
      gsap.to(label, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(heading, {
        y: -34,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });

      /* ---- cards ---- */
      const cards = section.querySelectorAll<HTMLElement>(".collection-card");

      cards.forEach((card, index) => {
        const imageWrap = card.querySelector<HTMLElement>(".collection-image");
        const imageInner = card.querySelector<HTMLElement>(".collection-image-inner");
        const curtain = card.querySelector<HTMLElement>(".collection-curtain");
        const caption = card.querySelector<HTMLElement>(".collection-caption");

        if (!imageWrap || !imageInner || !curtain || !caption) return;

        gsap.set(imageWrap, { scale: 1.15 });
        gsap.set(caption, { y: 16, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(curtain, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 1.1,
          ease: "power4.inOut",
        })
          .to(imageWrap, { scale: 1, duration: 1.4, ease: "power3.out" }, 0)
          .to(caption, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.5");

        gsap.fromTo(
          imageInner,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        /* ---- card itself drifts as you scroll — left column and
               right column move at slightly different rates, so the
               grid gains depth instead of moving as one flat block ---- */
        const isLeftColumn = index % 2 === 0;
        gsap.fromTo(
          card,
          { y: isLeftColumn ? 30 : 55 },
          {
            y: isLeftColumn ? -30 : -55,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-10
        bg-[#F7F5F1]
        px-8
        pb-24
        md:px-12
        md:pb-28
        lg:px-20
        lg:pb-32
      "
    >
      {/* Section heading */}
      <div className="mb-14 md:mb-16">
        <span
          ref={labelRef}
          className="mb-6 block text-[20px] font-semibold uppercase text-[#8A837A]"
        >
          Our Collections
        </span>

        <h2
          ref={headingRef}
          className="
            w-full
            max-w-[1200px]
            text-[110px]
            font-bold
            uppercase
            leading-[1.08]
            tracking-[-0.03em]
            text-[#171715]
          "
        >
          Every room, furnished around
        </h2>
      </div>

      {/* Cards — two per row, all five the same size */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
        {collections.map((item) => (
          <CollectionCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}