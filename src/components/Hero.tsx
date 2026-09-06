"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img from "../../public/her.png";
import AnimatedButton from "./shared/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(headingRef.current, {
        y: isMobile ? 50 : 120,
      });

      gsap.set(bgImageRef.current, {
        scale: 1.12,
      });

      /* =====================================================
         ENTRANCE
      ===================================================== */

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.05,
      });

      tl.to(headingRef.current, {
        y: 0,
        duration: 1.1,
      }).to(
        bgImageRef.current,
        {
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8"
      );

      /* =====================================================
         SCROLL PARALLAX
         Reduced on mobile
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
        .to(
          headingRef.current,
          {
            y: isMobile ? -20 : -70,
            ease: "none",
          },
          0
        )
        .to(
          contentRef.current,
          {
            y: isMobile ? -10 : -35,
            ease: "none",
          },
          0
        )
        .to(
          bgImageRef.current,
          {
            yPercent: -10,
            scale: isMobile ? 1.03 : 1.06,
            ease: "none",
          },
          0
        );

      /* =====================================================
         RESIZE HANDLING
      ===================================================== */

      const handleResize = () => ScrollTrigger.refresh();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[70svh] overflow-hidden px-5 pt-20 text-white sm:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 lg:px-16 lg:pt-32 xl:px-20 xl:pt-36"
    >
      {/* =====================================================
          FULL BACKGROUND IMAGE
      ===================================================== */}

      <div
        ref={bgImageRef}
        className="absolute inset-[-6%] z-0 will-change-transform"
      >
        <Image
          src={img}
          alt="Luxury furniture interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* =====================================================
          SCRIM / OVERLAY
      ===================================================== */}

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,10,5,0.8) 0%, rgba(15,10,5,0.55) 40%, rgba(15,10,5,0.25) 70%, rgba(15,10,5,0.05) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 h-[40%] bg-gradient-to-t from-black/60 to-transparent md:h-[32%]" />

      {/* Top overlay */}
      <div className="absolute inset-x-0 top-0 z-10 h-[120px] bg-gradient-to-b from-black/60 via-black/25 to-transparent sm:h-[150px] md:h-[180px]" />

      {/* =====================================================
          CONTENT LAYOUT
          Mobile: 70svh + content slightly higher
          Tablet/Desktop: Original layout
      ===================================================== */}

      <div className="relative z-20 flex h-full flex-col justify-end gap-4 pb-14 sm:min-h-[calc(100svh-7rem)] sm:gap-8 sm:pb-14 lg:min-h-0 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pb-0">
        {/* ===================================================
            LEFT SIDE — HEADING
        =================================================== */}

        <div className="flex flex-col justify-end lg:justify-center">
          <h1
            ref={headingRef}
            className="font-serif text-[38px] font-bold uppercase leading-[1.02] tracking-normal text-[#F4EEE3] sm:text-[64px] md:text-[88px] lg:text-[90px] lg:leading-[0.95] xl:text-[180px] xl:leading-40"
            style={{
              textShadow: "0 4px 30px rgba(0,0,0,0.35)",
            }}
          >
            Elevate the way you live.
          </h1>
        </div>

        {/* ===================================================
            RIGHT SIDE — COPY + CTA
        =================================================== */}

        <div className="w-full lg:w-auto">
          {/* Desktop spacer */}
          <div className="hidden lg:block lg:h-[400px] lg:w-[420px]" />

          <div
            ref={contentRef}
            className="max-w-full sm:max-w-[440px] lg:max-w-[500px]"
          >
            <p
              className="my-3 text-[15px] font-medium leading-[1.4] text-[#F4EEE3] sm:my-4 sm:text-[16px] md:my-5 md:text-[18px] lg:text-[20px] lg:leading-[1.35]"
            >
              Bespoke furniture for living, bedroom, dining, office, and
              every space in between — designed around your taste, space,
              and lifestyle.
            </p>

            <AnimatedButton href="/#contact" text="Get A Quote" />
          </div>
        </div>
      </div>
    </section>
  );
}