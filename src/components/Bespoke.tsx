"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./shared/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

const bespokeItems = [
  {
    text: "Every piece begins with your space, your lifestyle, and the way you actually live. We create furniture that feels naturally at home.",
    image: "/heavenHero.jpg",
  },
  {
    text: "From material selection to the smallest detail, every element is thoughtfully considered to create furniture with character and purpose.",
    image: "/heavenHero.jpg",
  },
  {
    text: "Timeless proportions, carefully selected materials, and refined craftsmanship come together to create pieces made for years of living.",
    image: "/heavenHero.jpg",
  },
];

export default function Bespoke() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =================================
         MAIN HEADING WORD REVEAL
      ================================= */

      const heading = headingRef.current;

      if (!heading) return;

      const headingWords =
        heading.textContent?.trim().split(/\s+/) || [];

      heading.innerHTML = "";

      headingWords.forEach((word, index) => {
        const span = document.createElement("span");

        span.className =
          "bespoke-heading-word inline-block will-change-transform";

        span.textContent = word;

        heading.appendChild(span);

        if (index < headingWords.length - 1) {
          heading.appendChild(document.createTextNode(" "));
        }
      });

      const headingSpans =
        heading.querySelectorAll<HTMLElement>(
          ".bespoke-heading-word"
        );

      gsap.set(headingSpans, {
        y: 60,
        opacity: 0.08,
      });

      gsap.to(headingSpans, {
        y: 0,
        opacity: 1,
        stagger: 0.045,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          end: "top 35%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      /* =================================
         BESPOKE TEXT WORD REVEAL
      ================================= */

      const textBlocks =
        gsap.utils.toArray<HTMLElement>(
          ".bespoke-text"
        );

      textBlocks.forEach((text) => {
        const words =
          text.textContent?.trim().split(/\s+/) || [];

        text.innerHTML = "";

        words.forEach((word, index) => {
          const span = document.createElement("span");

          span.className =
            "bespoke-word inline-block will-change-transform";

          span.textContent = word;

          text.appendChild(span);

          if (index < words.length - 1) {
            text.appendChild(
              document.createTextNode(" ")
            );
          }
        });

        const wordSpans =
          text.querySelectorAll<HTMLElement>(
            ".bespoke-word"
          );

        gsap.set(wordSpans, {
          y: 35,
          opacity: 0.12,
        });

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
        gsap.utils.toArray<HTMLElement>(
          ".bespoke-image"
        );

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

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
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
        pb-28
        md:px-10
        lg:px-20
      "
    >
      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-10 md:mb-16">
        <span
          className="
            mb-6
            block
            text-[14px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-[#9B958C]
            md:text-[16px]
            lg:text-[18px]
          "
        >
          BESPOKE LIVING
        </span>

        <h2
          ref={headingRef}
          className="
            w-full
            break-words
            text-[clamp(38px,10vw,110px)]
            font-bold
            uppercase
            leading-[0.95]
            tracking-[-0.03em]
            text-[#F7F5F1]
            sm:leading-[0.9]
            md:leading-[0.88]
            md:tracking-[-0.055em]
          "
        >
          Designed Around You
        </h2>
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
                mb-32
                last:mb-0
                md:mb-44
                lg:mb-52
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
                {/* IMAGE */}

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
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 42vw, 40vw"
                      className="
                        bespoke-image
                        scale-[1.12]
                        object-cover
                        will-change-transform
                      "
                    />
                  </div>
                </div>

                {/* TEXT */}

                <div
                  className="
                    w-full
                    md:w-[58%]
                    lg:w-[60%]
                  "
                >
                  <p
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
        <AnimatedButton text="Request A Free Quote" href="/" />
      </div>
    </section>
  );
}