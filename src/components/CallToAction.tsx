"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedButton from "./shared/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const imageWrap = imageWrapRef.current;
      const image = imageRef.current;
      const title = titleRef.current;

      const content = contentRef.current;
      const description = descriptionRef.current;
      const buttons = buttonsRef.current;

      if (
        !section ||
        !sticky ||
        !imageWrap ||
        !image ||
        !title ||
        !content ||
        !description ||
        !buttons
      ) {
        return;
      }

      /*
      |--------------------------------------------------------------------------
      | INITIAL STATE
      |--------------------------------------------------------------------------
      |
      | Height is FIXED at 500px — it never changes, not at the start,
      | not at the end. Only width + clip-path move. "Consultation"
      | overlaps the image, centered, and sits ABOVE the image (z-index
      | explicitly higher than everything else in the box).
      |
      */

      gsap.set(imageWrap, {
        width: "min(76vw, 960px)",
        height: "500px",
        clipPath: "inset(5% 0% 5% 0%)",
      });

      gsap.set(image, {
        scale: 1.14,
        yPercent: 6,
      });

      gsap.set(title, {
        opacity: 1,
        scale: 1,
        y: 0,
      });

      gsap.set(content, {
        opacity: 0,
      });

      gsap.set(description, {
        opacity: 0,
        y: 20,
      });

      gsap.set(buttons, {
        opacity: 0,
        y: 20,
      });

      /*
      |--------------------------------------------------------------------------
      | EXPAND EFFECT
      |--------------------------------------------------------------------------
      |
      | Only WIDTH and the clip-path mask animate. Height is left
      | completely alone at 500px the whole time — it is not part
      | of this tween at all.
      |
      */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        imageWrap,
        {
          width: "100vw",
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power3.inOut",
          duration: 2,
        },
        0
      );

      /* Parallax on the image */

      tl.to(
        image,
        {
          scale: 1.02,
          yPercent: -4,
          ease: "power2.inOut",
          duration: 2,
        },
        0
      );

      /* "Consultation" overlap text hides as the image expands */

      tl.to(
        title,
        {
          opacity: 0,
          scale: 0.94,
          y: -20,
          ease: "power3.inOut",
          duration: 0.9,
        },
        0.5
      );

      /* Other content (description + buttons) shows only after expand finishes */

      tl.to(
        content,
        {
          opacity: 1,
          duration: 0.5,
          ease: "none",
        },
        1.1
      );

      tl.to(
        description,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        1.2
      );

      tl.to(
        buttons,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        1.34
      );

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
      id="contact"
      className="
        relative
        h-[220vh]
        w-full
        bg-[#F1EEE8]
      "
    >
      {/* =========================================
          STICKY VIEWPORT
      ========================================= */}

      <div
        ref={stickyRef}
        className="
          sticky
          top-0
          flex
          h-screen
          w-full
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* =========================================
            IMAGE BOX — height fixed 500px always
        ========================================= */}

        <div
          ref={imageWrapRef}
          className="
            absolute
            left-1/2
            top-1/2
            z-0
            -translate-x-1/2
            -translate-y-1/2
            overflow-hidden
            will-change-[width,clip-path]
          "
        >
          {/* IMAGE — sits at the back */}

          <img
            ref={imageRef}
            src="/heavenHero.jpg"
            alt="Heaven Furniture"
            onLoad={() => ScrollTrigger.refresh()}
            className="
              absolute
              inset-0
              z-0
              h-full
              w-full
              object-cover
              will-change-transform
            "
          />

          {/* SUBTLE IMAGE OVERLAY — above image, below text */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              bg-black/[0.06]
            "
          />

          {/* =======================================
              CONSULTATION — always ON TOP of the
              image (z-20), centered horizontally
              + vertically over it. Fades out as
              the image expands.
          ======================================= */}

          <h2
            ref={titleRef}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              z-20
              w-max
              -translate-x-1/2
              -translate-y-1/2
              whitespace-nowrap
              text-center
              text-[clamp(52px,9vw,145px)]
              font-medium
              uppercase
              leading-none
              tracking-[-0.055em]
              text-[#F1EEE8]/70
              will-change-transform
            "
          >
            Consultation
          </h2>

          {/* =======================================
              EXPANDED-STATE CONTENT — shows only
              after the expand finishes. Description
              (2 lines) + buttons, px-20, vertically
              centered inside the fixed 500px band.
          ======================================= */}

          <div
            ref={contentRef}
            className="
              absolute
              inset-0
              z-30
              flex
              items-center
              px-20
            "
          >
            <div className="max-w-[560px]">
              {/* DESCRIPTION */}

              <p
                ref={descriptionRef}
                className="
                  text-[15px]
                  leading-[1.7]
                  text-white/80
                  md:text-[16px]
                "
              >
                Every piece begins with your space, your taste, and the way
                you live. Let&apos;s create something considered, personal.
              </p>

              {/* BUTTONS */}

              <div
                ref={buttonsRef}
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  gap-4
                "
              >
                {/* REQUEST QUOTE */}

                <AnimatedButton
                  href="#quote"
                  text="Request a Free Quote"
                />

                {/* WHATSAPP */}

                <a
                  href="https://wa.me/8801960481983"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    inline-flex
                    h-[50px]
                    items-center
                    justify-center
                    gap-3
                    border
                    border-white
                    bg-white
                    px-7
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-[#171715]
                    transition-all
                    duration-500
                    hover:bg-transparent
                    hover:text-white
                  "
                >
                  WhatsApp Us

                  <span
                    className="
                      text-[16px]
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  >
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}