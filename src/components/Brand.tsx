"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OVERLAP_PX = 120;

export default function Brand() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const label = labelRef.current;
      const text = textRef.current;
      const image = imageRef.current;

      if (!section || !label || !text || !image) {
        return;
      }

      const words = text.textContent?.trim().split(/\s+/) || [];

      text.innerHTML = "";

      words.forEach((word, index) => {
        const span = document.createElement("span");

        span.className =
          "brand-word inline-block will-change-transform";

        span.textContent = word;

        text.appendChild(span);

        if (index < words.length - 1) {
          text.appendChild(document.createTextNode(" "));
        }
      });

      const textWords =
        text.querySelectorAll<HTMLElement>(".brand-word");

      gsap.set(section, {
        marginBottom: -OVERLAP_PX,
      });

      gsap.set(label, {
        y: 30,
        opacity: 0,
      });

      gsap.set(textWords, {
        y: 28,
        opacity: 0.12,
      });

      gsap.set(image, {
        y: 70,
        opacity: 0,
        rotate: 12,
      });

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

      gsap.to(text, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

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

      gsap.to(image, {
        y: -35,
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

      <p
        ref={textRef}
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
        in Chattogram — every piece designed around how you
        actually live, not the other way around.
      </p>

      {/* Overlapping Image */}
      <div
        ref={imageRef}
        className="
          pointer-events-none
          absolute
          right-[6%]
          top-[34%]
          z-30
          w-[240px]
          rotate-[8deg]
          md:right-[8%]
          md:top-[30%]
          md:w-[330px]
          lg:right-[9%]
          lg:top-[27%]
          lg:w-[420px]
        "
      >
        <Image
          src="/heavenHero.jpg"
          alt="Heaven furniture interior"
          width={900}
          height={600}
          className="
            h-auto
            w-full
            object-cover
          "
        />
      </div>
    </section>
  );
}