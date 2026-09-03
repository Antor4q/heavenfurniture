"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Reason = {
  number: string;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    number: "01",
    title: "Local Craftsmanship",
    description:
      "Skilled hands and careful making, right here in Chattogram. Every piece carries the character of thoughtful, local craftsmanship.",
  },
  {
    number: "02",
    title: "Quality Materials",
    description:
      "Selected materials and finishes chosen for their natural beauty, durability and ability to age beautifully over time.",
  },
  {
    number: "03",
    title: "Made For Your Space",
    description:
      "Furniture designed around your home, your style and the way you actually live — never simply taken from a template.",
  },
  {
    number: "04",
    title: "Attention To Detail",
    description:
      "Every proportion, finish and small detail is thoughtfully considered to create something that feels right in your space.",
  },
];

const TOTAL = String(reasons.length).padStart(2, "0");

export default function WhyChooseHeaven() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftColumn = leftColumnRef.current;
    const heading = headingRef.current;

    if (!section || !leftColumn || !heading) return;

    const ctx = gsap.context(() => {
      // =====================================================
      // LEFT HEADING — ENTRANCE
      // =====================================================

      gsap.fromTo(
        heading,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // =====================================================
      // TOP → CENTER PARALLAX
      // =====================================================

      const getCenterTravel = () => {
        const prevY = gsap.getProperty(heading, "y") as number;

        gsap.set(heading, {
          y: 0,
        });

        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY;

        const headingRect = heading.getBoundingClientRect();

        const naturalOffsetInSection =
          headingRect.top + window.scrollY - sectionTop;

        const headingHeight = headingRect.height;

        gsap.set(heading, {
          y: prevY,
        });

        const desiredTop =
          window.innerHeight / 2 - headingHeight / 2;

        return desiredTop - naturalOffsetInSection;
      };

      gsap.fromTo(
        heading,
        {
          y: 0,
        },
        {
          y: () => getCenterTravel(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // =====================================================
      // LEFT COLUMN PIN
      // =====================================================

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: leftColumn,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // =====================================================
      // RIGHT SIDE ITEMS
      // =====================================================

      const items =
        gsap.utils.toArray<HTMLElement>(".why-item");

      items.forEach((item) => {
        const number =
          item.querySelector<HTMLElement>(".why-number");

        const numberTotal =
          item.querySelector<HTMLElement>(".why-number-total");

        const title =
          item.querySelector<HTMLElement>(".why-title");

        const description =
          item.querySelector<HTMLElement>(".why-description");

        const line =
          item.querySelector<HTMLElement>(".why-line");

        const imageWrap =
          item.querySelector<HTMLElement>(".why-image-wrap");

        const image =
          item.querySelector<HTMLElement>(".why-image");

        if (
          !number ||
          !numberTotal ||
          !title ||
          !description ||
          !line ||
          !imageWrap ||
          !image
        ) {
          return;
        }

        // =================================================
        // INITIAL STATES
        // =================================================

        gsap.set(item, {
          opacity: 0.3,
        });

        gsap.set(description, {
          opacity: 0,
          y: 25,
        });

        gsap.set(imageWrap, {
          opacity: 0,
          y: 35,
        });

        gsap.set(image, {
          scale: 1.08,
        });

        gsap.set(line, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        // =================================================
        // REVEAL
        // =================================================

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        reveal.to(
          item,
          {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          0
        );

        reveal.to(
          number,
          {
            opacity: 1,
            color: "#D9A441",
            duration: 0.35,
          },
          0
        );

        reveal.to(
          numberTotal,
          {
            opacity: 1,
            duration: 0.35,
          },
          0
        );

        reveal.to(
          title,
          {
            color: "#F7F5F1",
            duration: 0.4,
          },
          0
        );

        reveal.to(
          line,
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power3.inOut",
          },
          0
        );

        reveal.to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0.08
        );

        reveal.to(
          imageWrap,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          0.12
        );

        reveal.to(
          image,
          {
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          0.12
        );

        // =================================================
        // CONTENT PARALLAX
        // =================================================

        gsap.fromTo(
          item,
          {
            y: 35,
          },
          {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        // =================================================
        // IMAGE PARALLAX
        // =================================================

        gsap.fromTo(
          image,
          {
            yPercent: -8,
          },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );

        // =================================================
        // IMAGE HOVER
        // =================================================

        const handleEnter = () => {
          gsap.to(image, {
            scale: 1.06,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        const handleLeave = () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        imageWrap.addEventListener(
          "mouseenter",
          handleEnter
        );

        imageWrap.addEventListener(
          "mouseleave",
          handleLeave
        );
      });

      // =====================================================
      // REFRESH
      // =====================================================

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
      className="
        relative
        z-10
        w-full
        bg-[#34494A]
        px-5
        py-28
        text-[#F7F5F1]

        md:px-[4.15vw]
        md:py-[12vw]
      "
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1800px]
          grid-cols-1
          gap-16

          md:grid-cols-[0.85fr_1.15fr]
          md:items-start
          md:gap-[7vw]
        "
      >
        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div
          ref={leftColumnRef}
          className="
            relative
            hidden
            md:block
          "
        >
          <div
            ref={headingRef}
            className="
              w-full
              will-change-transform
            "
          >
            <span
              className="
                mb-7
                block
                text-[20px]
                font-semibold
                uppercase
                tracking-[-0.01em]
                text-[#D9A441]
              "
            >
              Why Choose Heaven
            </span>

            <h2
              className="
                max-w-[900px]
                text-[110px]
                font-bold
                uppercase
                leading-[0.91]
                tracking-[-0.05em]
                text-[#F7F5F1]
              "
            >
              Thoughtfully
              <br />
              made for
              <br />
              living.
            </h2>
          </div>
        </div>

        {/* =================================================
            MOBILE HEADING
        ================================================= */}

        <div className="md:hidden">
          <span
            className="
              mb-6
              block
              text-[14px]
              font-semibold
              uppercase
              text-[#D9A441]
            "
          >
            Why Choose Heaven
          </span>

          <h2
            className="
              text-[52px]
              font-bold
              uppercase
              leading-[0.94]
              tracking-[-0.045em]
              text-[#F7F5F1]
            "
          >
            Thoughtfully
            <br />
            made for
            <br />
            living.
          </h2>
        </div>

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div className="w-full">
          {reasons.map((reason) => (
            <article
              key={reason.number}
              className="
                why-item
                relative
                border-t
                border-[#F7F5F1]/15
                py-12
                will-change-transform

                md:py-16
              "
            >
              {/* -----------------------------------------
                  TOP LINE
              ----------------------------------------- */}

              <div
                className="
                  why-line
                  absolute
                  left-0
                  top-[-1px]
                  h-px
                  w-full
                  bg-[#D9A441]
                "
              />

              {/* -----------------------------------------
                  NUMBER
              ----------------------------------------- */}

              <div
                className="
                  mb-6
                  flex
                  items-baseline
                  gap-2
                "
              >
                <span
                  className="
                    why-number
                    text-[15px]
                    font-bold
                    tracking-[0.05em]
                    text-[#F7F5F1]/60
                  "
                >
                  {reason.number}
                </span>

                <span
                  className="
                    why-number-total
                    text-[13px]
                    font-medium
                    tracking-[0.05em]
                    text-[#F7F5F1]/30
                    opacity-0
                  "
                >
                  / {TOTAL}
                </span>
              </div>

              {/* -----------------------------------------
                  TITLE
              ----------------------------------------- */}

              <h3
                className="
                  why-title
                  max-w-[900px]
                  text-[clamp(30px,3.4vw,52px)]
                  font-bold
                  uppercase
                  leading-[0.96]
                  tracking-[-0.035em]
                  text-[#F7F5F1]
                "
              >
                {reason.title}
              </h3>

              {/* -----------------------------------------
                  DESCRIPTION
              ----------------------------------------- */}

              <p
                className="
                  why-description
                  mt-7
                  max-w-[560px]
                  text-[18px]
                  leading-[1.5]
                  text-[#F7F5F1]/60

                  md:text-[21px]
                  md:leading-[1.45]
                "
              >
                {reason.description}
              </p>

              {/* -----------------------------------------
                  LARGE IMAGE
              ----------------------------------------- */}

              <div
                className="
                  why-image-wrap
                  group
                  relative
                  mt-12
                  h-[65vw]
                  max-h-[650px]
                  w-full
                  cursor-pointer
                  overflow-hidden

                  md:mt-14
                  md:h-[34vw]
                  md:min-h-[430px]
                "
              >
                <div
                  className="
                    why-image
                    relative
                    h-[116%]
                    w-full
                    -translate-y-[8%]
                    will-change-transform
                  "
                >
                  {/*
                    IMPORTANT FIX:
                    1. priority removed
                    2. sizes is now a single-line string

                    This prevents Next/Image from generating
                    the problematic preload selector.
                  */}

                  <Image
                    src="/heavenHero.jpg"
                    alt={reason.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="
                      object-cover
                      object-center
                    "
                  />
                </div>

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-1/3
                    bg-gradient-to-t
                    from-black/30
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-500

                    group-hover:opacity-100
                  "
                />
              </div>
            </article>
          ))}

          <div
            className="
              h-px
              w-full
              bg-[#F7F5F1]/15
            "
          />
        </div>
      </div>
    </section>
  );
}