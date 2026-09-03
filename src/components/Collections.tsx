"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./shared/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

type Collection = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  accent: string;
};

const collections: Collection[] = [
  {
    number: "01",
    title: "LIVING ROOM",
    eyebrow: "CRAFTED FOR GATHERING",
    description:
      "Refined silhouettes, tactile materials, and considered proportions made for everyday living.",
    image: "/heavenHero.jpg",
    accent: "#34494A",
  },
  {
    number: "02",
    title: "BEDROOM",
    eyebrow: "MADE FOR REST",
    description:
      "Quiet forms and natural textures designed to bring warmth, comfort, and calm into your space.",
    image: "/heavenHero.jpg",
    accent: "#34494A",
  },
  {
    number: "03",
    title: "DINING",
    eyebrow: "DESIGNED TO CONNECT",
    description:
      "Timeless dining pieces created around long conversations, shared meals, and meaningful moments.",
    image: "/heavenHero.jpg",
    accent: "#34494A",
  },
  {
    number: "04",
    title: "BESPOKE",
    eyebrow: "TAILORED TO YOU",
    description:
      "Made-to-measure furniture where craftsmanship, material, and proportion come together.",
    image: "/heavenHero.jpg",
    accent: "#34494A",
  },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".collection-card");

      const isMobile = window.innerWidth < 768;

      cards.forEach((card) => {
        const image = card.querySelector<HTMLElement>(
          ".collection-image"
        );

        const imageWrap = card.querySelector<HTMLElement>(
          ".collection-image-wrap"
        );

        const hoverPanel = card.querySelector<HTMLElement>(
          ".collection-hover-panel"
        );

        const hoverContent = card.querySelector<HTMLElement>(
          ".collection-hover-content"
        );

        if (!image || !imageWrap || !hoverPanel || !hoverContent) return;

        /*
        |--------------------------------------------------------------------------
        | INITIAL CARD WIDTH
        |--------------------------------------------------------------------------
        |
        | Important:
        | The parent wrapper already has px-20 on desktop.
        |
        | So we DON'T add margin-left/right here.
        |
        | Card starts narrower and expands to width: 100%.
        |
        */

        gsap.set(card, {
          width: isMobile
            ? "calc(100% - 60px)"
            : "calc(100% - 220px)",
          marginLeft: "auto",
          marginRight: "auto",
        });

        /*
        |--------------------------------------------------------------------------
        | CARD WIDTH EXPANSION
        |--------------------------------------------------------------------------
        |
        | Final width = 100% of the px-20 container.
        |
        | Therefore final viewport spacing is exactly:
        |
        | 80px left
        | 80px right
        |
        | No additional 80px margin.
        |
        */

        gsap.to(card, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 42%",
            scrub: 1.2,
          },
        });

        /*
        |--------------------------------------------------------------------------
        | IMAGE PARALLAX
        |--------------------------------------------------------------------------
        */

        gsap.fromTo(
          image,
          {
            scale: 1.14,
            yPercent: 8,
          },
          {
            scale: 1,
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );

        /*
        |--------------------------------------------------------------------------
        | IMAGE MASK REVEAL
        |--------------------------------------------------------------------------
        */

        gsap.fromTo(
          imageWrap,
          {
            clipPath: "inset(5% 0% 5% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 45%",
              scrub: 1.2,
            },
          }
        );

        /*
        |--------------------------------------------------------------------------
        | HOVER PANEL INITIAL STATE
        |--------------------------------------------------------------------------
        */

        gsap.set(hoverPanel, {
          yPercent: 100,
        });

        gsap.set(hoverContent, {
          y: 35,
          opacity: 0,
        });

        /*
        |--------------------------------------------------------------------------
        | HOVER ANIMATION
        |--------------------------------------------------------------------------
        */

        const enter = () => {
          gsap.killTweensOf([hoverPanel, hoverContent]);

          gsap.to(hoverPanel, {
            yPercent: 0,
            duration: 0.65,
            ease: "power3.out",
          });

          gsap.to(hoverContent, {
            y: 0,
            opacity: 1,
            duration: 0.55,
            delay: 0.08,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.killTweensOf([hoverPanel, hoverContent]);

          gsap.to(hoverContent, {
            y: 35,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });

          gsap.to(hoverPanel, {
            yPercent: 100,
            duration: 0.5,
            delay: 0.04,
            ease: "power3.inOut",
          });
        };

        imageWrap.addEventListener("mouseenter", enter);
        imageWrap.addEventListener("mouseleave", leave);

        /*
        |--------------------------------------------------------------------------
        | CLEANUP
        |--------------------------------------------------------------------------
        */

        return () => {
          imageWrap.removeEventListener("mouseenter", enter);
          imageWrap.removeEventListener("mouseleave", leave);
        };
      });

      /*
      |--------------------------------------------------------------------------
      | REFRESH SCROLLTRIGGER
      |--------------------------------------------------------------------------
      */

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#111111] py-28"
    >
      {/* ================================================================
          HEADER
      ================================================================= */}

      <div className="w-full px-5 md:px-20">
        <div className="w-full">
          <span
            className="
               mb-5
          block
          text-[14px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-[#B79B67]
          md:text-[16px]
          lg:text-[18px]
            "
          >
            Why Customers Choose Them
          </span>

          <h2
            className="
              w-full
              max-w-[1200px]
              text-[54px]
              font-bold
              uppercase
              leading-[1.08]
              tracking-[-0.03em]
              text-[#F7F5F1]
              md:text-[76px]
              lg:text-[110px]
            "
          >
            Built around what matters
          </h2>
        </div>
      </div>

      {/* ================================================================
          COLLECTION CARDS
      ================================================================= */}

      <div className="mt-24 w-full px-5 md:px-20">
        <div className="flex flex-col gap-10">
          {collections.map((collection) => (
            <article
              key={collection.number}
              className="
                collection-card
                relative
                mx-auto
                w-full
              "
            >
              {/* ========================================================
                  IMAGE CARD
              ========================================================= */}

              <div
                className="
                  collection-image-wrap
                  group
                  relative
                  h-[58vh]
                  min-h-[430px]
                  w-full
                  overflow-hidden
                  bg-[#493B35]
                  md:h-[64vh]
                  lg:h-[72vh]
                  lg:min-h-[580px]
                "
              >
                {/* ======================================================
                    IMAGE
                ======================================================= */}

                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="
                      collection-image
                      object-cover
                      will-change-transform
                    "
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>

                {/* ======================================================
                    DARK IMAGE OVERLAY
                ======================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/55
                    via-black/10
                    to-transparent
                  "
                />

                {/* ======================================================
                    DEFAULT CARD CONTENT
                ======================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    z-10
                    flex
                    items-end
                    justify-between
                    p-6
                    md:p-10
                    lg:p-12
                  "
                >
                  <div>
                   

                    <h3
                      className="
                        text-[38px]
                        font-semibold
                        leading-none
                        tracking-[-0.03em]
                        text-white
                        md:text-[56px]
                        lg:text-[72px]
                      "
                    >
                      {collection.title}
                    </h3>
                  </div>

                 {/* if */}
                </div>

                {/* ======================================================
                    HOVER PANEL
                    INSIDE IMAGE
                ======================================================= */}

                <div
                  className="
                    collection-hover-panel
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    min-h-[42%]
                    overflow-hidden
                    will-change-transform
                  "
                  style={{
                    backgroundColor: collection.accent,
                  }}
                >
                  <div
                    className="
                      collection-hover-content
                      flex
                      h-full
                      min-h-[260px]
                      flex-col
                      justify-between
                      p-6
                      md:min-h-[280px]
                      md:p-10
                      lg:min-h-[320px]
                      lg:p-12
                    "
                  >
                    {/* TOP */}

                    <div className="flex items-start justify-between gap-8">
                      <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/65">
                        {collection.eyebrow}
                      </span>

                     
                    </div>

                    {/* BOTTOM */}

                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                      <div className="max-w-[720px]">
                        <h3
                          className="
                            text-[42px]
                            font-semibold
                            uppercase
                            leading-[0.95]
                            tracking-[-0.035em]
                            text-[#F7F5F1]
                            md:text-[58px]
                            lg:text-[76px]
                          "
                        >
                          {collection.title}
                        </h3>

                        <p
                          className="
                            mt-5
                            max-w-[580px]
                            text-[15px]
                          
                          
                            md:text-[18px]
                            font-medium leading-[1.35] text-[#F7F5F1]
                          "
                        >
                          {collection.description}
                        </p>
                      </div>

                      {/* ARROW / LINK */}

                     <AnimatedButton
              href="/"
              text="Explore The Collection"
            />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}