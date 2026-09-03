"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    furnitureImage: "/heavenHero.jpg",
    furnitureImageAlt: "Custom living room set delivered to Rezwana Karim",
    clientImage: "/gall1.webp",
    clientName: "Rezwana Karim",
    productName: "Custom Oak Living Set",
    quote:
      "The furniture feels like it was made specifically for our home.",
    quoteAuthorRole: "Homeowner, Gulshan",
  },
  {
    furnitureImage: "/heavenHero.jpg",
    furnitureImageAlt: "Bespoke dining set delivered to Farhan Ahmed",
    clientImage: "/gall2.webp",
    clientName: "Farhan Ahmed",
    productName: "Bespoke Walnut Dining Set",
    quote: "It feels like it was always meant to be in this room.",
    quoteAuthorRole: "Homeowner, Baridhara",
  },
  {
    furnitureImage: "/heavenHero.jpg",
    furnitureImageAlt: "Custom bedroom suite delivered to Nusrat Jahan",
    clientImage: "/gall3.webp",
    clientName: "Nusrat Jahan",
    productName: "Custom Bedroom Suite",
    quote: "Still looks new, months later. That's rare in this market.",
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
  // SLIDER CROSSFADE — left (image + client card) and
  // right (quote + author) transition together, in sync.
  // =====================================================

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const targets = [
      imageInnerRef.current,
      clientCreditRef.current,
      quoteRef.current,
      authorRef.current,
    ].filter(Boolean);

    if (!targets.length) return;

    const tl = gsap.timeline();

    tl.to(targets, {
      opacity: 0,
      y: -8,
      duration: 0.3,
      ease: "power2.in",
    })
      .set(targets, { y: 8 })
      .to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.03,
      });

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  // =====================================================
  // AUTOPLAY — silent timer, no visible progress/controls.
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_CLIENTS.length);
    }, AUTOPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [activeIndex]);

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
        !heading ||
        !image ||
        !imageInner ||
        !rightContent ||
        !stat ||
        !count ||
        !quoteCard
      ) {
        return;
      }

      gsap.set(count, {
        textContent: "0",
      });

      // =====================================================
      // SCROLL-TRIGGERED COUNTER
      //
      // Ei section-e scroll kore ashle 0 -> 300 count hobe
      // (ekbar, scrub noy). Upore chole gele reverse hobe.
      // =====================================================

      const counter = {
        value: 0,
      };

      gsap.to(counter, {
        value: 300,

        duration: 2,
        ease: "power2.out",

        scrollTrigger: {
          trigger: section,

          start: "top 75%",

          toggleActions: "play none none reverse",
        },

        onUpdate: () => {
          count.textContent = Math.round(counter.value).toString();
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

      image.addEventListener("mouseenter", handleMouseEnter);
      image.addEventListener("mouseleave", handleMouseLeave);

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
        py-24

        md:px-[4.15vw]
       
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
            mb-14
            max-w-[1250px]

            md:mb-[6vw]
          "
        >
          <span
            ref={labelRef}
            className="
              mb-6
              block
              text-[20px]
              font-semibold
              uppercase
              tracking-[-0.01em]
              text-[#8A837A]
            "
          >
            Social Proof
          </span>

          <h2
            ref={headingRef}
            className="
              w-full
              text-[clamp(60px,8vw,110px)]
              font-bold
              uppercase
              leading-[0.88]
              tracking-[-0.055em]
              text-[#171715]
            "
          >
            Homes That
            <br />
            Chose Heaven.
          </h2>
        </div>

        {/* =================================================
            MAIN GRID — both columns share the same height
            ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-12

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
            <div
              ref={imageRef}
              className="
                relative
                h-[320px]
                w-full
                shrink-0
                overflow-hidden

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
                  
                  className="
                  h-[400px]
                    object-cover
                    object-center
                  "
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

            {/* Client card — who this piece was made for */}

            <div
              ref={clientCreditRef}
              className="
                mt-6
                flex
                h-[104px]
                shrink-0
                items-center
                gap-5
                border
                border-[#171715]/10
                bg-white
                p-5
              "
            >
              <div
                className="
                  relative
                  h-16
                  w-16
                  shrink-0
                  overflow-hidden
                  rounded-full
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
                    text-[19px]
                    font-bold
                    leading-tight
                    tracking-[-0.015em]
                    text-[#171715]
                  "
                >
                  {featured.clientName}
                </p>

                <p
                  className="
                    mt-2
                    text-[13px]
                    font-bold
                    uppercase
                    tracking-[0.07em]
                    text-[#B79B67]
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
                mb-10
                overflow-hidden

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
                    text-[clamp(90px,9vw,140px)]
                    font-bold
                    leading-[0.75]
                    tracking-[-0.07em]
                    text-[#171715]
                  "
                >
                  0
                </span>

                <span
                  className="
                    text-[clamp(45px,4vw,70px)]
                    font-bold
                    leading-none
                    tracking-[-0.06em]
                    text-[#171715]
                  "
                >
                  +
                </span>
              </div>

              <span
                className="
                  mt-5
                  block
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.07em]
                  text-[#8A837A]
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
                mt-12
                flex
                min-h-[400px]
                w-full
                flex-col
                justify-between
                bg-[#171715]
                p-9

                md:absolute
                md:bottom-0
                md:left-0
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
                    mb-7
                    block
                    text-[54px]
                    font-bold
                    leading-[0.5]
                    text-[#D9A441]
                  "
                >
                  “
                </span>

                <p
                  ref={quoteRef}
                  className="
                    max-w-[700px]
                    text-[clamp(26px,2.8vw,42px)]
                    font-bold
                    uppercase
                    leading-[1.1]
                    tracking-[-0.03em]
                    text-[#F7F5F1]
                  "
                >
                  {featured.quote}
                </p>
              </div>

              {/* Author */}

              <div
                ref={authorRef}
                className="
                  mt-10
                  flex
                  items-center
                  gap-4
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