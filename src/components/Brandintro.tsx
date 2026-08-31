"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OVERLAP_PX = 120;

export default function BrandIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const label = labelRef.current;
      const paragraph = paraRef.current;

      if (!section || !label || !paragraph) return;

      /* =====================================================
         SPLIT PARAGRAPH INTO WORDS
      ===================================================== */

      const text = paragraph.textContent?.trim() || "";

      const words = text.split(/\s+/);

      paragraph.innerHTML = words
        .map(
          (word) =>
            `<span class="brand-word inline-block opacity-20 will-change-transform">${word}</span>`
        )
        .join(" ");

      const wordElements =
        paragraph.querySelectorAll<HTMLElement>(".brand-word");

      /* =====================================================
         INITIAL STATES
      ===================================================== */

      gsap.set(section, {
        y: 0,
        // 👇 FIX: static negative margin so the section's own
        // reserved layout space shrinks by the same amount the
        // transform will visually move it up. This removes the
        // white gap that appears below the section, because
        // `y` (transform) never affects document flow — only
        // margin/height changes do.
        marginBottom: -OVERLAP_PX,
      });

      gsap.set(label, {
        y: 30,
        opacity: 0,
      });

      gsap.set(wordElements, {
        y: 25,
        opacity: 0.15,
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
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      /* =====================================================
         WORD-BY-WORD TEXT REVEAL
      ===================================================== */

      gsap.to(wordElements, {
        y: 0,
        opacity: 1,
        stagger: 0.035,
        ease: "power2.out",

        scrollTrigger: {
          trigger: paragraph,
          start: "top 85%",
          end: "top 30%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         CONTINUED TEXT PARALLAX
      ===================================================== */

      gsap.to(paragraph, {
        y: -25,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      /* =====================================================
         LABEL PARALLAX
      ===================================================== */

      gsap.to(label, {
        y: -12,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-20
        will-change-transform
        bg-[#F7F5F1]
        px-8
        py-24
        md:px-12
        md:py-28
        lg:px-20
        lg:py-32
      "
    >
      {/* Small Label */}

      <span
        ref={labelRef}
        className="
          mb-6
          block
          text-[20px]
          font-semibold
          uppercase
          text-[#8A837A]
        "
      >
        The Heaven Approach
      </span>

      {/* Main Statement */}

      <p
        ref={paraRef}
        className="
          w-full
          max-w-[1500px]
          text-[clamp(42px,5.2vw,78px)]
          font-bold
          uppercase
          leading-[1.08]
          tracking-[-0.035em]
          text-[#171715]
        "
      >
        Bespoke furniture and interior styling, handcrafted in
        Chattogram — every piece designed around how you actually
        live, not the other way around.
      </p>
    </section>
  );
}