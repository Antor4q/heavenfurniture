"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "./shared/AnimatedButton";
import SectionHeading from "./shared/SectionHeading";

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
    image: "/living.jpg",
    accent: "#34494A",
  },
  {
    number: "02",
    title: "BEDROOM",
    eyebrow: "MADE FOR REST",
    description:
      "Quiet forms and natural textures designed to bring warmth, comfort, and calm into your space.",
    image: "/bedroom.jpg",
    accent: "#34494A",
  },
  {
    number: "03",
    title: "DINING",
    eyebrow: "DESIGNED TO CONNECT",
    description:
      "Timeless dining pieces created around long conversations, shared meals, and meaningful moments.",
    image: "/diningtab.jpg",
    accent: "#34494A",
  },
  {
    number: "04",
    title: "BESPOKE",
    eyebrow: "TAILORED TO YOU",
    description:
      "Made-to-measure furniture where craftsmanship, material, and proportion come together.",
    image: "/bespoke.jpg",
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

      // Detect real hover capability (mouse/trackpad) vs touch-only devices
      const canHover =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      const cleanups: Array<() => void> = [];

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

        /* =====================================================
           CARD WIDTH REVEAL (responsive)
        ===================================================== */
        gsap.set(card, {
          width: isMobile
            ? "calc(100% - 24px)"
            : window.innerWidth < 1024
            ? "calc(100% - 120px)"
            : "calc(100% - 220px)",
          marginLeft: "auto",
          marginRight: "auto",
        });

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

        /* =====================================================
           IMAGE PARALLAX
        ===================================================== */
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

        /* =====================================================
           IMAGE MASK REVEAL
        ===================================================== */
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

        /* =====================================================
           HOVER PANEL — behavior depends on device capability
        ===================================================== */
        if (canHover) {
          // Desktop / mouse devices: hidden by default, reveal on hover
          gsap.set(hoverPanel, { yPercent: 100 });
          gsap.set(hoverContent, { y: 35, opacity: 0 });

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

          cleanups.push(() => {
            imageWrap.removeEventListener("mouseenter", enter);
            imageWrap.removeEventListener("mouseleave", leave);
          });
        } else {
          // Touch devices: panel always visible — no hover interaction exists,
          // so content (description, button) must be reachable without a hover gesture
          gsap.set(hoverPanel, { yPercent: 0 });
          gsap.set(hoverContent, { y: 0, opacity: 1 });
        }
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        cleanups.forEach((fn) => fn());
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
    id="collections"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#171715] py-16 md:py-24 lg:py-28"
    >
      {/* ================================================================
          HEADER
      ================================================================= */}

      <div className="w-full px-5 sm:px-8 md:px-20">
        <SectionHeading label="Our Collection"
          heading={
    <>
     Pieces with a 
      <br />
     lasting presence.
    </>
  }
  headingColor="#F7F5F1"
        />
      </div>

      {/* ================================================================
          COLLECTION CARDS
      ================================================================= */}

      <div className="mt-14 w-full px-5 sm:px-8 md:mt-24 md:px-20">
        <div className="flex flex-col gap-6 md:gap-10">
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
                  h-[70vh]
                  min-h-[380px]
                  w-full
                  overflow-hidden
                  bg-[#493B35]
                  sm:h-[64vh]
                  md:h-[68vh]
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
                    (hidden on touch devices when hover panel is
                    always shown, to avoid duplicate title stacking)
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
                    p-5
                    sm:p-6
                    md:p-10
                    lg:p-12
                  "
                >
                  <div>
                    <h3
                      className="
                      font-serif
                        text-[30px]
                        font-semibold
                        leading-none
                        tracking-[-0.02em]
                        text-white
                        sm:text-[38px]
                        md:text-[56px]
                        lg:text-[72px]
                      "
                    >
                      {collection.title}
                    </h3>
                  </div>
                </div>

                {/* ======================================================
                    HOVER PANEL
                    Desktop: reveals on hover (JS-controlled)
                    Touch devices: always visible (set via JS above)
                ======================================================= */}

                <div
                  className="
                    collection-hover-panel
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    min-h-[55%]
                    overflow-hidden
                    will-change-transform
                    sm:min-h-[46%]
                    md:min-h-[42%]
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
                      min-h-[230px]
                      flex-col
                      justify-between
                      gap-6
                      p-5
                      sm:min-h-[260px]
                      sm:p-6
                      md:min-h-[280px]
                      md:p-10
                      lg:min-h-[320px]
                      lg:p-12
                    "
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-8">
                      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/65 sm:text-[12px] sm:tracking-[0.18em]">
                        {collection.eyebrow}
                      </span>
                    </div>

                    {/* BOTTOM */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
                      <div className="max-w-[720px]">
                        <h3
                          className="
                            text-[30px]
                            font-serif
                            font-semibold
                            uppercase
                            leading-[1]
                            tracking-[-0.02em]
                            text-[#F7F5F1]
                            sm:text-[42px]
                            md:text-[58px]
                            lg:text-[76px]
                            lg:leading-[0.95]
                            lg:tracking-[-0.035em]
                          "
                        >
                          {collection.title}
                        </h3>

                        <p
                          className="
                            mt-3
                            max-w-[580px]
                            text-[14px]
                            font-medium
                            leading-[1.4]
                            text-[#F7F5F1]
                            sm:mt-5
                            sm:text-[15px]
                            md:text-[18px]
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