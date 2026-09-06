"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedButton from "./shared/AnimatedButton";
import SectionHeading from "./shared/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const bespokeItems = [
  {
    text: "Every piece begins with your space, your lifestyle, and the way you actually live. We create furniture that feels naturally at home.",
    image: "/be1.jpg",
  },
  {
    text: "From material selection to the smallest detail, every element is thoughtfully considered to create furniture with character and purpose.",
    image: "/be2.png",
  },
  {
    text: "Timeless proportions, carefully selected materials, and refined craftsmanship come together to create pieces made for years of living.",
    image: "/be3.jpg",
  },
];

export default function Bespoke() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =================================
         BESPOKE TEXT WORD REVEAL
      ================================= */

      textRefs.current.forEach((text) => {
        if (!text) return;

        const words = text.textContent?.trim().split(/\s+/) || [];

        text.innerHTML = "";

        words.forEach((word, index) => {
          const span = document.createElement("span");

          span.className =
            "bespoke-word inline-block will-change-transform";

          span.textContent = word;

          text.appendChild(span);

          if (index < words.length - 1) {
            text.appendChild(document.createTextNode(" "));
          }
        });

        const wordSpans =
          text.querySelectorAll<HTMLElement>(".bespoke-word");

        /* Initial state */

        gsap.set(wordSpans, {
          y: 35,
          opacity: 0.12,
        });

        /* Reveal on scroll */

        gsap.to(wordSpans, {
          y: 0,
          opacity: 1,
          stagger: 0.025,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 82%",
            end: "top 35%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      /* =================================
         IMAGE PARALLAX
      ================================= */

      const images =
        gsap.utils.toArray<HTMLElement>(".bespoke-image");

      images.forEach((image) => {
        gsap.fromTo(
          image,
          {
            y: 50,
          },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      /* =================================
         REFRESH
      ================================= */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="bespoke"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#171715]
        px-6
        pb-28
        md:px-10
        lg:px-20
      "
    >
      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-10 md:mb-16">
        <SectionHeading
          label="Bespoke"
          heading={
            <>
              Designed Around You
            </>
          }
          headingColor="#F7F5F1"
        />
      </div>

      {/* =================================
          BESPOKE ITEMS
      ================================= */}

      <div className="w-full">
        {bespokeItems.map((item, index) => {
          const imageLeft = index % 2 === 0;

          return (
            <div
              key={index}
             className="
  mb-20
  last:mb-0
  md:mb-28
  lg:mb-32
"
            >
              <div
                className={`
                  flex
                  w-full
                  flex-col
                  items-center
                  gap-14
                  md:flex-row
                  md:gap-16
                  lg:gap-20
                  ${
                    imageLeft
                      ? ""
                      : "md:flex-row-reverse"
                  }
                `}
              >
                {/* =================================
                    IMAGE
                ================================= */}

                <div
                  className="
                    relative
                    w-full
                    overflow-hidden
                    md:w-[42%]
                    lg:w-[40%]
                  "
                >
                  <div
                    className="
                      relative
                      h-[260px]
                      w-full
                      overflow-hidden
                      sm:h-[300px]
                      md:h-[380px]
                      lg:h-[450px]
                    "
                  >
                    <Image
                      src={item.image}
                      alt="Heaven bespoke furniture"
                      fill
                      sizes="
                        (max-width: 767px) 100vw,
                        (max-width: 1023px) 42vw,
                        40vw
                      "
                      className="
                        bespoke-image
                        scale-[1.12]
                        object-cover
                        will-change-transform
                      "
                    />
                  </div>
                </div>

                {/* =================================
                    TEXT
                ================================= */}

                <div
                  className="
                    w-full
                    md:w-[58%]
                    lg:w-[60%]
                  "
                >
                  <p
                    ref={(el) => {
                      textRefs.current[index] = el;
                    }}
                    className="
                      bespoke-text
                      w-full
                      break-words
                      text-[clamp(22px,6vw,58px)]
                      font-medium
                      leading-[1.15]
                      tracking-[-0.02em]
                      text-[#F7F5F1]
                      sm:leading-[1.1]
                      md:text-[clamp(30px,3.45vw,58px)]
                      md:leading-[1.08]
                      md:tracking-[-0.038em]
                    "
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =================================
          CTA
      ================================= */}

      <div
        className="
          mt-28
          flex
          justify-center
          md:mt-36
          lg:mt-44
        "
      >
        <AnimatedButton
          text="Request Free Quote"
          href="/#contact"
        />
      </div>
    </section>
  );
}