"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Quote() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const lineDesktopRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;

      if (!section) return;

      // Common scrub-linked scroll config — animation progress is
      // directly tied to scroll position (no entrance/reveal-on-view).
      const scrollConfig = {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      };

      // PORTRAIT — moves slowest (background-depth layer)
      gsap.fromTo(
        imageRef.current,
        { y: -60 },
        { y: 60, ease: "none", scrollTrigger: scrollConfig }
      );

      // TOP LINE (desktop + mobile) — subtle horizontal drift as it scrolls past
      const lines = [lineDesktopRef.current, lineMobileRef.current].filter(
        Boolean
      );

      if (lines.length) {
        gsap.fromTo(
          lines,
          { xPercent: -6 },
          { xPercent: 6, ease: "none", scrollTrigger: scrollConfig }
        );
      }

      // LABEL CHIP — light vertical drift, opposite-ish direction
      gsap.fromTo(
        labelRef.current,
        { y: 25 },
        { y: -25, ease: "none", scrollTrigger: scrollConfig }
      );

      // QUOTE MARK — moves a bit faster than the image (mid layer)
      gsap.fromTo(
        quoteMarkRef.current,
        { y: -35 },
        { y: 35, ease: "none", scrollTrigger: scrollConfig }
      );

      // QUOTE TEXT — foreground layer, largest travel distance
      gsap.fromTo(
        quoteRef.current,
        { y: -90 },
        { y: 90, ease: "none", scrollTrigger: scrollConfig }
      );

      // AUTHOR — moves fastest, opposite direction for extra depth
      gsap.fromTo(
        authorRef.current,
        { y: 45 },
        { y: -45, ease: "none", scrollTrigger: scrollConfig }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#171715]
        px-6
        py-14
        text-[#F7F5F1]
        sm:py-16
        md:px-10
        md:py-24
        lg:px-16
        lg:py-32
        xl:px-20
      "
    >
      <div className="relative mx-auto max-w-[1500px]">
        {/* =====================================================
            TOP STRUCTURE
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">
          {/* PORTRAIT */}
          <div
            ref={imageRef}
            className="
              relative
              h-[170px]
              w-[145px]
              overflow-hidden
              sm:h-[210px]
              sm:w-[180px]
              md:h-[235px]
              md:w-[205px]
              lg:h-[230px]
              lg:w-[220px]
            "
          >
            <Image
              src="/abulkalam.jpg"
              alt="Abul Kalam Bhuiyan, Managing Director"
              fill
              sizes="(max-width: 640px) 145px, (max-width: 768px) 180px, 220px"
              className="
                object-cover
                grayscale
                transition-all
                duration-700
                hover:scale-[1.04]
                hover:grayscale-0
              "
            />
          </div>

          {/* TOP LINE + LABEL (desktop) */}
          <div className="hidden lg:block">
            <div
              ref={lineDesktopRef}
              className="
                mt-0
                h-px
                w-full
                bg-[#F7F5F1]/25
              "
            />

            <div className="mt-[195px] flex justify-end">
              <span
                ref={labelRef}
                className="
                  border
                  border-[#F7F5F1]/30
                  px-3
                  py-1.5
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-[#A8A39B]
                "
              >
                + &nbsp; Quote
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE TOP LINE */}
        <div
          ref={lineMobileRef}
          className="
            mt-6
            h-px
            w-full
            origin-left
            bg-[#F7F5F1]/25
            sm:mt-8
            lg:hidden
          "
        />

        {/* =====================================================
            QUOTE AREA
        ===================================================== */}

        <div
          className="
            mt-10
            ml-0
            sm:mt-16
            md:mt-20
            md:ml-[12%]
            lg:mt-[-55px]
            lg:ml-[28%]
            xl:ml-[30%]
          "
        >
          {/* QUOTE MARK */}
          <div
            ref={quoteMarkRef}
            className="
              mb-5
              font-serif
              text-[48px]
              leading-[0.55]
              text-[#B79B67]
              sm:mb-7
              sm:text-[68px]
              md:text-[78px]
            "
          >
            “
          </div>

          {/* QUOTE */}
          <div
            ref={quoteRef}
            className="
              max-w-[1080px]
            "
          >
            <blockquote
              className="
                break-words
                text-[clamp(24px,6.5vw,58px)]
                font-medium
                leading-[1.15]
                tracking-[-0.02em]
                sm:text-[clamp(30px,3.45vw,58px)]
                sm:leading-[1.08]
                sm:tracking-[-0.038em]
              "
            >
              <span className="text-[#F7F5F1]">
                At Heaven Furniture Mart, we believe furniture is more than
                just function; it is a reflection of lifestyle, taste, and
                comfort.
              </span>{" "}

              <span className="text-[#817D76]">
                Every piece we create is designed to bring lasting elegance
                into the homes of our clients.
              </span>
            </blockquote>

            {/* AUTHOR */}
            <div
              ref={authorRef}
              className="
                mt-8
                flex
                flex-col
                gap-1
                sm:mt-10
                md:mt-12
                md:flex-row
                md:items-center
                md:gap-5
              "
            >
              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.05em]
                  text-[#F7F5F1]
                  md:text-[12px]
                "
              >
                Abul Kalam Bhuiyan
              </p>

              <span
                className="
                  hidden
                  text-[#B79B67]
                  md:block
                "
              >
                ·
              </span>

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.13em]
                  text-[#8A837A]
                  md:text-[10px]
                "
              >
                Managing Director
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM META
        ===================================================== */}

        <div
          className="
            mt-14
            flex
            items-center
            gap-5
            sm:mt-20
            md:mt-28
            lg:mt-32
          "
        >
          <span
            className="
              whitespace-nowrap
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-[#8A837A]
            "
          >
            Craft · Comfort · Character
          </span>

          <div className="h-px flex-1 bg-[#F7F5F1]/10" />

          <span
            className="
              hidden
              text-[8px]
              uppercase
              tracking-[0.16em]
              text-[#8A837A]
              sm:block
            "
          >
            The Thought Behind Heaven
          </span>
        </div>
      </div>
    </section>
  );
}