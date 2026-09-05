"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OVERLAP_PX = 120;

export default function Brand() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const labelWrap = labelWrapRef.current;
      const label = labelRef.current;
      const text = textRef.current;
      const imageWrap = imageWrapRef.current;
      const image = imageRef.current;

      if (!section || !labelWrap || !label || !text || !imageWrap || !image) {
        return;
      }

      const words = text.textContent?.trim().split(/\s+/) || [];
      text.innerHTML = "";

      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.className = "brand-word inline-block will-change-transform";
        span.textContent = word;
        text.appendChild(span);

        if (index < words.length - 1) {
          text.appendChild(document.createTextNode(" "));
        }
      });

      const textWords = text.querySelectorAll<HTMLElement>(".brand-word");

      /* =====================================================
         RESPONSIVE ANIMATION SETUP (matchMedia)
         Desktop/tablet: full parallax + overlap
         Mobile: lighter movement, no overlap jump risk
      ===================================================== */
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions as {
            isMobile: boolean;
          };

          const sectionShift = isMobile ? OVERLAP_PX * 0.4 : OVERLAP_PX;
          const labelParallax = isMobile ? -4 : -8;
          const textParallax = isMobile ? -8 : -18;
          const imageParallaxY = isMobile ? -12 : -35;

          /* -------- INITIAL STATES -------- */
          gsap.set(section, { marginBottom: -sectionShift });
          gsap.set(labelWrap, { y: 30, opacity: 0 });
          gsap.set(textWords, { y: 28, opacity: 0.12 });
          gsap.set(image, {
            y: 70,
            opacity: 0,
            rotate: 12,
          });
          gsap.set(imageWrap, { y: 0, rotate: 0 });

          /* -------- SECTION OVERLAP SHIFT -------- */
          gsap.to(section, {
            y: -sectionShift,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 65%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          /* -------- LABEL: ENTRANCE (on inner labelWrap) -------- */
          gsap.to(labelWrap, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });

          /* -------- LABEL: PARALLAX (on outer, no conflict) -------- */
          gsap.to(label, {
            y: labelParallax,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          });

          /* -------- TEXT WORDS: ENTRANCE -------- */
          gsap.to(textWords, {
            y: 0,
            opacity: 1,
            stagger: 0.035,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          /* -------- TEXT: PARALLAX (targets text itself — no conflict, words handle reveal) -------- */
          gsap.to(text, {
            y: textParallax,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          /* -------- IMAGE: ENTRANCE (on inner image) -------- */
          gsap.to(image, {
            y: 0,
            opacity: 1,
            rotate: 8,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });

          /* -------- IMAGE: PARALLAX (on outer wrap — no conflict) -------- */
          gsap.to(imageWrap, {
            y: imageParallaxY,
            rotate: 4,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            // matchMedia cleanup handled by gsap.context revert
          };
        }
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-20
        overflow-visible
        bg-[#F7F5F1]
        px-6
        py-20
        md:px-12
        md:py-28
        lg:px-20
        lg:py-32
      "
    >
      {/* =====================================================
          LABEL
          Outer (labelWrap) = entrance animation
          Inner (label span) = parallax animation
      ===================================================== */}
      <div ref={labelWrapRef} className="mb-5 md:mb-7">
        <span
          ref={labelRef}
          className="
            block
            text-[13px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-[#8A837A]
            sm:text-[14px]
            md:text-[16px]
            lg:text-[18px]
          "
        >
          The Heaven Approach
        </span>
      </div>

      {/* =====================================================
          MAIN TEXT
      ===================================================== */}
      <p
        ref={textRef}
        className="
          relative
          z-20
          w-full
          max-w-[1320px]
          text-[clamp(32px,7vw,78px)]
          font-bold
          uppercase
          leading-[1.08]
          tracking-[-0.02em]
          text-[#171715]
          md:leading-[1.04]
          md:tracking-[-0.04em]
        "
      >
        Bespoke furniture and interior styling, handcrafted
        in Chattogram — every piece designed around how you
        actually live, not the other way around.
      </p>

      {/* =====================================================
          IMAGE
          Mobile: normal flow, centered, below text
          md+: absolute, overlapping (original design)
          Outer (imageWrap) = parallax animation
          Inner (image) = entrance animation
      ===================================================== */}
      <div
        ref={imageWrapRef}
        className="
          pointer-events-none
          relative
          z-30
          mt-10
          flex
          w-full
          justify-center
          md:absolute
          md:right-[8%]
          md:top-[30%]
          md:mt-0
          md:block
          md:w-[330px]
          md:justify-start
          lg:right-[9%]
          lg:top-[27%]
          lg:w-[420px]
        "
      >
        <div
          ref={imageRef}
          className="w-[180px] sm:w-[220px] md:w-full"
        >
          <Image
            src="/showroom.png"
            alt="Heaven furniture interior"
            width={900}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}