"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img from "../../public/gall4.webp";
import AnimatedButton from "./shared/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(headingRef.current, {
        y: 120,
      });

      gsap.set(bgImageRef.current, {
        scale: 1.12,
      });

      gsap.set(contentRef.current, {
        y: 50,
      });

      /* =====================================================
         ENTRANCE
      ===================================================== */

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
        delay: 0.05,
      });

      tl.to(headingRef.current, {
        y: 0,
        duration: 1.1,
      })
        .to(
          bgImageRef.current,
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          contentRef.current,
          {
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55"
        );

      /* =====================================================
         SCROLL PARALLAX
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
            y: -70,
            ease: "none",
          },
          0
        )
        .to(
          contentRef.current,
          {
            y: -35,
            ease: "none",
          },
          0
        )
        .to(
          bgImageRef.current,
          {
            yPercent: -10,
            scale: 1.06,
            ease: "none",
          },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-20 pt-40 text-white"
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
          DARK OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* =====================================================
          BOTTOM GRADIENT
      ===================================================== */}

      <div className="absolute inset-x-0 bottom-0 z-10 h-[45%] bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

      {/* =====================================================
          ORIGINAL CONTENT LAYOUT
      ===================================================== */}

      <div className="relative z-20 flex">
        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div className="flex flex-col justify-center">
          <h1
            ref={headingRef}
            className="text-[160px] font-bold uppercase leading-36 tracking-normal text-white"
          >
            Elevate the way you live.
          </h1>
        </div>

        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div>
          {/* Keeps the original right-side spacing */}
          <div className="h-[400px] w-[420px]" />

          <div ref={contentRef}>
            <p className="my-5 w-[500px] text-[20px] font-medium leading-[1.35] text-white">
              Bespoke furniture for living, bedroom, dining, office, and
              every space in between — designed around your taste, space,
              and lifestyle.
            </p>

            <AnimatedButton
              href="/"
              text="Explore The Collection"
            />
          </div>
        </div>
      </div>
    </section>
  );
}