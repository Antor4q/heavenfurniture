"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Share your space",
    description: "Send us photos, a floor plan, or just an idea of the room.",
  },
  {
    number: "02",
    title: "We design around it",
    description: "A piece sized, shaped and finished for that exact space.",
  },
  {
    number: "03",
    title: "Handcrafted and delivered",
    description: "Built in our Chattogram workshop, then installed at yours.",
  },
];

export default function Bespoke() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaDefaultRef = useRef<HTMLSpanElement>(null);
  const ctaHoverRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const label = labelRef.current;
      const heading = headingRef.current;
      const imageWrap = imageWrapRef.current;
      const imageInner = imageInnerRef.current;
      const stepItems = stepsRef.current?.querySelectorAll<HTMLElement>(".bespoke-step");

      if (!section || !label || !heading || !imageWrap || !imageInner || !stepItems) return;

      /* ---- entrance: label + heading ---- */
      gsap.set(label, { y: 24, opacity: 0 });
      gsap.set(heading, { y: 24, opacity: 0 });
      gsap.set(stepItems, { y: 20, opacity: 0 });

      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      entrance
        .to(label, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
        .to(heading, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.5")
        .to(
          stepItems,
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
          "-=0.4"
        );

      /* ---- signature moment: image reveals from behind a
             closed aperture as the section comes into view,
             instead of repeating the grid cards' curtain wipe ---- */
      gsap.set(imageWrap, { clipPath: "inset(8% 8% 8% 8%)" });
      gsap.set(imageInner, { scale: 1.25 });

      gsap.to(imageWrap, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(imageInner, {
        scale: 1,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      /* ---- continued parallax on the image, consistent with
             the rest of the site's scroll language ---- */
      gsap.fromTo(
        imageInner,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaEnter = () => {
    const ctaDefault = ctaDefaultRef.current;
    const ctaHover = ctaHoverRef.current;
    if (!ctaDefault || !ctaHover) return;

    gsap.killTweensOf([ctaDefault, ctaHover]);

    gsap.to(ctaDefault, { x: 24, opacity: 0, duration: 0.4, ease: "power3.out" });
    gsap.fromTo(
      ctaHover,
      { x: -24, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
    );
  };

  const handleCtaLeave = () => {
    const ctaDefault = ctaDefaultRef.current;
    const ctaHover = ctaHoverRef.current;
    if (!ctaDefault || !ctaHover) return;

    gsap.killTweensOf([ctaDefault, ctaHover]);

    gsap.to(ctaHover, { x: -24, opacity: 0, duration: 0.35, ease: "power3.inOut" });
    gsap.to(ctaDefault, { x: 0, opacity: 1, duration: 0.4, ease: "power3.inOut" });
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-10
        bg-[#171715]
        px-8
        py-24
        md:px-12
        md:py-28
        lg:px-20
        lg:py-32
      "
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Image */}
        <div
          ref={imageWrapRef}
          className="relative aspect-[4/5] overflow-hidden will-change-transform lg:aspect-auto lg:h-[620px]"
        >
          <div
            ref={imageInnerRef}
            className="absolute inset-x-0 -inset-y-[15%] will-change-transform"
          >
            <img
              src="/heavenHero.jpg"
              alt="A bespoke piece made for a customer's own space"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Content */}
        <div>
          <span
            ref={labelRef}
            className="mb-6 block text-[20px] font-semibold uppercase text-[#D9A441]"
          >
            Bespoke / Custom
          </span>

          <h2
            ref={headingRef}
            className="
              max-w-[16ch]
              text-[clamp(36px,4.4vw,58px)]
              font-bold
              uppercase
              leading-[1.08]
              tracking-[-0.03em]
              text-[#F7F5F1]
            "
          >
            Every home is different. So is every piece we make for it.
          </h2>

          <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-[#F7F5F1]/70">
            Most of what leaves our workshop was never on a shelf. It was
            drawn up for one room, one set of measurements, one person's
            taste — and built once.
          </p>

          <div ref={stepsRef} className="mt-12 flex flex-col gap-8">
            {steps.map((step) => (
              <div key={step.number} className="bespoke-step flex gap-5">
                <span className="text-[15px] font-semibold text-[#D9A441]">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-[#F7F5F1]">
                    {step.title}
                  </h3>
                  <p className="mt-1 max-w-[38ch] text-[14px] leading-snug text-[#F7F5F1]/60">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/bespoke"
            onMouseEnter={handleCtaEnter}
            onMouseLeave={handleCtaLeave}
            className="relative mt-12 inline-flex h-7 items-center overflow-hidden"
          >
            <span
              ref={ctaDefaultRef}
              className="absolute inline-flex items-center gap-3"
            >
              <span className="whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.04em] text-[#F7F5F1]">
                Start Your Bespoke Piece
              </span>
              <span className="text-[17px] leading-none text-[#F7F5F1]">⟶</span>
            </span>

            <span
              ref={ctaHoverRef}
              className="absolute inline-flex items-center gap-3 opacity-0"
            >
              <span className="text-[17px] leading-none text-[#D9A441]">⟶</span>
              <span className="whitespace-nowrap text-[14px] font-semibold uppercase tracking-[0.04em] text-[#D9A441]">
                Start Your Bespoke Piece
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}