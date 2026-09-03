"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageStackSlider from "./shared/ImageStackSlider";

gsap.registerPlugin(ScrollTrigger);

const OVERLAP_PX = 120;

export default function BrandIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const firstTextRef = useRef<HTMLParagraphElement>(null);
  const secondTextRef = useRef<HTMLParagraphElement>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const label = labelRef.current;
      const firstText = firstTextRef.current;
      const secondText = secondTextRef.current;
      const slider = sliderRef.current;

      if (
        !section ||
        !label ||
        !firstText ||
        !secondText ||
        !slider
      ) {
        return;
      }

      /* =====================================================
         SPLIT TEXT INTO WORDS
      ===================================================== */

      const paragraphs = [firstText, secondText];

      paragraphs.forEach((paragraph) => {
        const words =
          paragraph.textContent?.trim().split(/\s+/) || [];

        paragraph.innerHTML = "";

        words.forEach((word, index) => {
          const span = document.createElement("span");

          span.className =
            "brand-word inline-block will-change-transform";

          span.textContent = word;

          paragraph.appendChild(span);

          if (index < words.length - 1) {
            paragraph.appendChild(
              document.createTextNode(" ")
            );
          }
        });
      });

      const firstWords =
        firstText.querySelectorAll<HTMLElement>(
          ".brand-word"
        );

      const secondWords =
        secondText.querySelectorAll<HTMLElement>(
          ".brand-word"
        );

      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(section, {
        marginBottom: -OVERLAP_PX,
      });

      gsap.set(label, {
        y: 30,
        opacity: 0,
      });

      gsap.set([...firstWords, ...secondWords], {
        y: 28,
        opacity: 0.12,
      });

      gsap.set(slider, {
        y: 25,
        opacity: 0,
      });

      /* =====================================================
         SECTION OVERLAP
      ===================================================== */

      gsap.to(section, {
        y: -OVERLAP_PX,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 65%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         LABEL ENTRANCE
      ===================================================== */

      gsap.to(label, {
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

      /* =====================================================
         FIRST TEXT REVEAL
      ===================================================== */

      gsap.to(firstWords, {
        y: 0,
        opacity: 1,
        stagger: 0.035,
        ease: "power2.out",

        scrollTrigger: {
          trigger: firstText,
          start: "top 85%",
          end: "top 35%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         SLIDER ENTRANCE
         
         Small movement only.
         This prevents the slider from jumping into
         the second paragraph during scroll.
      ===================================================== */

      gsap.to(slider, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: slider,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      });

      /* =====================================================
         SECOND TEXT REVEAL
      ===================================================== */

      gsap.to(secondWords, {
        y: 0,
        opacity: 1,
        stagger: 0.035,
        ease: "power2.out",

        scrollTrigger: {
          trigger: secondText,
          start: "top 85%",
          end: "top 35%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         FIRST TEXT PARALLAX
      ===================================================== */

      gsap.to(firstText, {
        y: -12,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         SECOND TEXT PARALLAX
      ===================================================== */

      gsap.to(secondText, {
        y: -18,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.25,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         SLIDER PARALLAX
         
         IMPORTANT:
         Previously this was -25px.
         Now only -6px so the slider doesn't drift
         aggressively into the second paragraph.
      ===================================================== */

      gsap.to(slider, {
        y: -6,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         LABEL PARALLAX
      ===================================================== */

      gsap.to(label, {
        y: -8,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         REFRESH
      ===================================================== */

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
        py-24
        md:px-12
        md:py-28
        lg:px-20
        lg:py-32
      "
    >
      {/* =====================================================
          LABEL
      ===================================================== */}

      <span
        ref={labelRef}
        className="
          mb-7
          block
          text-[14px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-[#8A837A]
          md:text-[16px]
          lg:text-[18px]
        "
      >
        The Heaven Approach
      </span>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div>
        {/* ===================================================
            FIRST PARAGRAPH
        =================================================== */}

        <p
          ref={firstTextRef}
          className="
            relative
            z-20
            w-full
            max-w-[1320px]
            text-[clamp(42px,5.2vw,78px)]
            font-bold
            uppercase
            leading-[1.04]
            tracking-[-0.04em]
            text-[#171715]
          "
        >
          Bespoke furniture and interior styling, handcrafted
          in Chattogram —
        </p>

        {/* ===================================================
            IMAGE SLIDER
        =================================================== */}

        <div
          ref={sliderRef}
          className="
            relative
            z-30
            -my-3
            md:-my-5
            lg:-my-6
          "
        >
          <ImageStackSlider />
        </div>

        {/* ===================================================
            SECOND PARAGRAPH
        =================================================== */}

        <p
          ref={secondTextRef}
          className="
            relative
            z-10
            mx-auto
            mt-[-15px]
            w-full
            max-w-[1320px]
            text-left
            text-[clamp(42px,5.2vw,78px)]
            font-bold
            uppercase
            leading-[1.04]
            tracking-[-0.04em]
            text-[#171715]
            md:mt-[-25px]
            lg:mt-[-32px]
          "
        >
          every piece designed around how you actually live,
          not the other way around.
        </p>
      </div>
    </section>
  );
}