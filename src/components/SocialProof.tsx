"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./shared/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// =====================================================
// DYNAMIC CONTENT
//
// 3 (or more) entries — slider cycles through these.
// Notun client feature korte hole shudhu ekta entry
// add korle hobe, component code touch lagbe na.
// =====================================================

type FeaturedClient = {
  furnitureImage: string;
  furnitureImageAlt: string;
  clientImage: string;
  clientName: string;
  productName: string;
  quote: string;
  quoteAuthorRole: string;
};

const FEATURED_CLIENTS: FeaturedClient[] = [
  {
    furnitureImage: "/social1.jpg",
    furnitureImageAlt:
      "Custom living room set delivered to Rezwana Karim",
    clientImage: "/gall1.webp",
    clientName: "Rezwana Karim",
    productName: "Custom Oak Living Set",
    quote:
      "The furniture feels like it was made specifically for our home. Every detail, from the proportions to the finish, feels thoughtfully considered.",
    quoteAuthorRole: "Homeowner, Gulshan",
  },
  {
    furnitureImage: "/social2.jpg",
    furnitureImageAlt:
      "Bespoke dining set delivered to Farhan Ahmed",
    clientImage: "/gall2.webp",
    clientName: "Farhan Ahmed",
    productName: "Bespoke Walnut Dining Set",
    quote:
      "It feels like it was always meant to be in this room. The craftsmanship, finish, and attention to detail are exceptional.",
    quoteAuthorRole: "Homeowner, Baridhara",
  },
  {
    furnitureImage: "/social3.jpg",
    furnitureImageAlt:
      "Custom bedroom suite delivered to Nusrat Jahan",
    clientImage: "/gall3.webp",
    clientName: "Nusrat Jahan",
    productName: "Custom Bedroom Suite",
    quote:
      "Still looks new, months later. The quality is exceptional, and you can genuinely feel the care that went into every piece.",
    quoteAuthorRole: "Homeowner, Banani",
  },
];

const AUTOPLAY_DURATION_MS = 6000;

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const leftColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const clientCreditRef = useRef<HTMLDivElement>(null);

  const rightContentRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const quoteCardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const isFirstRender = useRef(true);

  const featured = FEATURED_CLIENTS[activeIndex];

  // =====================================================
  // SLIDER TRANSITION
  //
  // No opacity fade / flash.
  // Image uses smooth slide + scale.
  // Text/card moves upward into position.
  // =====================================================

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const image = imageInnerRef.current;
    const client = clientCreditRef.current;
    const quote = quoteRef.current;
    const author = authorRef.current;

    if (!image || !client || !quote || !author) return;

    const tl = gsap.timeline();

    // Make sure nothing fades/blinks
    gsap.set([image, client, quote, author], {
      opacity: 1,
    });

    // -----------------------------------------------------
    // IMAGE
    // Smooth movement + subtle scale
    // -----------------------------------------------------

    tl.fromTo(
      image,
      {
        y: 35,
        scale: 1.06,
      },
      {
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    )

      // ---------------------------------------------------
      // CLIENT CARD
      // ---------------------------------------------------

      .fromTo(
        client,
        {
          y: 20,
        },
        {
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.6"
      )

      // ---------------------------------------------------
      // QUOTE
      // ---------------------------------------------------

      .fromTo(
        quote,
        {
          y: 25,
        },
        {
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5"
      )

      // ---------------------------------------------------
      // AUTHOR
      // ---------------------------------------------------

      .fromTo(
        author,
        {
          y: 15,
        },
        {
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  // =====================================================
  // AUTOPLAY
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(
        (prev) => (prev + 1) % FEATURED_CLIENTS.length
      );
    }, AUTOPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  // =====================================================
  // SCROLL / PARALLAX / COUNTER
  // =====================================================

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = headingRef.current;

      const image = imageRef.current;
      const imageInner = imageInnerRef.current;

      const rightContent = rightContentRef.current;
      const stat = statRef.current;
      const count = countRef.current;

      const quoteCard = quoteCardRef.current;

      if (
        !image ||
        !imageInner ||
        !rightContent ||
        !stat ||
        !count ||
        !quoteCard
      ) {
        return;
      }

      // =====================================================
      // COUNTER
      // =====================================================

      count.textContent = "0";

      const counter = {
        value: 0,
      };

      gsap.to(counter, {
        value: 100,

        duration: 2,

        ease: "power2.out",

        scrollTrigger: {
          trigger: section,

          start: "top 75%",

          toggleActions: "play none none reverse",
        },

        onUpdate: () => {
          count.textContent = Math.round(
            counter.value
          ).toString();
        },
      });

      // =====================================================
      // IMAGE PARALLAX
      // =====================================================

      gsap.fromTo(
        imageInner,
        {
          yPercent: -7,
        },
        {
          yPercent: 7,

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

      // =====================================================
      // HEADING PARALLAX
      // =====================================================

      if (heading) {
        gsap.fromTo(
          heading,
          {
            y: 20,
          },
          {
            y: -25,

            ease: "none",

            scrollTrigger: {
              trigger: section,

              start: "top bottom",
              end: "bottom top",

              scrub: 1.2,

              invalidateOnRefresh: true,
            },
          }
        );
      }

      // =====================================================
      // STAT PARALLAX
      // =====================================================

      gsap.fromTo(
        stat,
        {
          y: 25,
        },
        {
          y: -25,

          ease: "none",

          scrollTrigger: {
            trigger: rightContent,

            start: "top bottom",
            end: "bottom top",

            scrub: 1.1,

            invalidateOnRefresh: true,
          },
        }
      );

      // =====================================================
      // QUOTE PARALLAX
      // =====================================================

      gsap.fromTo(
        quoteCard,
        {
          y: 25,
        },
        {
          y: -25,

          ease: "none",

          scrollTrigger: {
            trigger: quoteCard,

            start: "top bottom",
            end: "bottom top",

            scrub: 1.1,

            invalidateOnRefresh: true,
          },
        }
      );

      // =====================================================
      // IMAGE HOVER
      // =====================================================

      const handleMouseEnter = () => {
        gsap.to(imageInnerRef.current, {
          scale: 1.035,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imageInnerRef.current, {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      image.addEventListener(
        "mouseenter",
        handleMouseEnter
      );

      image.addEventListener(
        "mouseleave",
        handleMouseLeave
      );

      // =====================================================
      // REFRESH
      // =====================================================

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      // =====================================================
      // CLEANUP
      // =====================================================

      return () => {
        image.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );

        image.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      };
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
        overflow-hidden
        bg-[#F7F5F1]
        px-5
        py-14
        sm:py-16
        md:px-[4.15vw]
        md:py-24
        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1800px]
        "
      >
        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <div
          className="
            mb-9
            max-w-[1250px]
            sm:mb-10
            md:mb-[6vw]
          "
        >
        <SectionHeading
          label="Social Proof
"
          heading={
            <>
              Homes That
 <br/>
Chose Heaven.
            </>
          }
         
        />
        </div>

        {/* =================================================
            MAIN GRID
            ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-8
            sm:gap-10
            md:grid-cols-[1fr_1.15fr]
            md:items-stretch
            md:gap-[4vw]
          "
        >
          {/* =================================================
              LEFT — FEATURED FURNITURE + CLIENT CARD
              ================================================= */}

          <div
            ref={leftColRef}
            className="
              flex
              flex-col
              md:min-h-[600px]
              lg:min-h-[650px]
            "
          >
            {/* =================================================
                IMAGE
                ================================================= */}

            <div
              ref={imageRef}
              className="
                relative
                h-[220px]
                w-full
                shrink-0
                overflow-hidden
                sm:h-[280px]
                md:h-[400px]
                lg:h-[440px]
              "
            >
              <div
                ref={imageInnerRef}
                className="
                  absolute
                  inset-[-10%]
                  will-change-transform
                "
              >
                <Image
                  src={featured.furnitureImage}
                  alt={featured.furnitureImageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Subtle image overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-black/10
                "
              />
            </div>

            {/* =================================================
                CLIENT CARD
                ================================================= */}

            <div
              ref={clientCreditRef}
              className="
                mt-4
                flex
                h-[84px]
                shrink-0
                items-center
                gap-4
                border
                border-[#171715]/10
                bg-white
                p-4
                sm:mt-6
                sm:h-[104px]
                sm:gap-5
                sm:p-5
              "
            >
              <div
                className="
                  relative
                  h-12
                  w-12
                  shrink-0
                  overflow-hidden
                  rounded-full
                  sm:h-16
                  sm:w-16
                "
              >
                <Image
                  src={featured.clientImage}
                  alt={featured.clientName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div>
                <p
                  className="
                    text-[16px]
                    font-bold
                    leading-tight
                    tracking-[-0.01em]
                    text-[#171715]
                    sm:text-[19px]
                    sm:tracking-[-0.015em]
                  "
                >
                  {featured.clientName}
                </p>

                <p
                  className="
                    mt-1.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.06em]
                    text-[#B79B67]
                    sm:mt-2
                    sm:text-[13px]
                    sm:tracking-[0.07em]
                  "
                >
                  {featured.productName}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
              ================================================= */}

          <div
            ref={rightContentRef}
            className="
              relative
              flex
              flex-col
              md:min-h-[600px]
              lg:min-h-[650px]
            "
          >
            {/* =================================================
                COUNTER
                ================================================= */}

            <div
              ref={statRef}
              className="
                mb-6
                overflow-hidden
                sm:mb-8
                md:mb-0
              "
            >
              <div
                className="
                  flex
                  items-baseline
                  gap-2
                "
              >
                <span
                  ref={countRef}
                  className="
                    block
                    font-serif
                    text-[clamp(56px,17vw,140px)]
                    font-bold
                    leading-[0.75]
                    tracking-[-0.04em]
                    text-[#171715]
                    sm:text-[clamp(90px,9vw,140px)]
                    sm:tracking-[-0.07em]
                  "
                >
                  0
                </span>

                <span
                  className="
                  font-serif
                    text-[clamp(28px,9vw,70px)]
                    font-bold
                    leading-none
                    tracking-[-0.04em]
                    text-[#171715]
                    sm:text-[clamp(45px,4vw,70px)]
                    sm:tracking-[-0.06em]
                  "
                >
                  +
                </span>
              </div>

              <span
                className="
                  mt-3
                  block
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.06em]
                  text-[#8A837A]
                  sm:mt-5
                  sm:text-[12px]
                  sm:tracking-[0.07em]
                "
              >
                Happy Homeowners
              </span>
            </div>

            {/* =================================================
                QUOTE CARD
                ================================================= */}

            <div
              ref={quoteCardRef}
              className="
                relative
                mt-2
                flex
                min-h-[260px]
                w-full
                flex-col
                justify-between
                bg-[#171715]
                p-6
                sm:min-h-[320px]
                sm:p-8
                md:absolute
                md:bottom-0
                md:left-0
                md:mt-0
                md:min-h-[440px]
                md:p-11
                lg:min-h-[470px]
                lg:p-12
              "
            >
              {/* Quote */}

              <div>
                <span
                  className="
                    mb-4
                    block
                    text-[38px]
                    font-bold
                    leading-[0.5]
                    text-[#D9A441]
                    sm:mb-7
                    sm:text-[54px]
                  "
                >
                  “
                </span>

                <p
                  ref={quoteRef}
                  className="
                    max-w-[700px]
                    break-words
                    text-[clamp(20px,6vw,42px)]
                    font-bold
                    uppercase
                    leading-[1.15]
                    tracking-[-0.015em]
                    text-[#F7F5F1]
                    sm:text-[clamp(26px,2.8vw,42px)]
                    sm:leading-[1.1]
                    sm:tracking-[-0.03em]
                  "
                >
                  {featured.quote}
                </p>
              </div>

              {/* Author */}

              <div
                ref={authorRef}
                className="
                  mt-6
                  flex
                  items-center
                  gap-4
                  sm:mt-10
                "
              >
                <span
                  className="
                    h-px
                    w-10
                    bg-[#F7F5F1]/40
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.06em]
                    text-[#F7F5F1]/60
                  "
                >
                  {featured.quoteAuthorRole}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}