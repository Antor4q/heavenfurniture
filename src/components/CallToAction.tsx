"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedButton from "./shared/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLAnchorElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const line = lineRef.current;
      const label = labelRef.current;
      const heading = headingRef.current;
      const content = contentRef.current;
      const secondary = secondaryRef.current;
      const bottom = bottomRef.current;

      if (
        !section ||
        !line ||
        !label ||
        !heading ||
        !content ||
        !secondary ||
        !bottom
      ) {
        return;
      }

      /* =====================================================
         INITIAL STATE
      ===================================================== */

      gsap.set(line, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(label, {
        y: 30,
        opacity: 0,
      });

      gsap.set(heading, {
        y: 100,
        opacity: 0,
      });

      gsap.set(content, {
        y: 50,
        opacity: 0,
      });

      gsap.set(secondary, {
        y: 25,
        opacity: 0,
      });

      gsap.set(bottom, {
        y: 30,
        opacity: 0,
      });

      /* =====================================================
         ENTRANCE
      ===================================================== */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "top 35%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        line,
        {
          scaleX: 1,
          ease: "power3.out",
        },
        0
      )
        .to(
          label,
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
          },
          0.02
        )
        .to(
          heading,
          {
            y: 0,
            opacity: 1,
            ease: "power4.out",
          },
          0.08
        )
        .to(
          content,
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
          },
          0.18
        )
        .to(
          secondary,
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
          },
          0.26
        )
        .to(
          bottom,
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
          },
          0.34
        );

      /* =====================================================
         SUBTLE EDITORIAL PARALLAX
      ===================================================== */

      gsap.to(heading, {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(content, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.7,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[#F1EEE8]
        px-6
        py-32
        md:px-12
        md:py-44
        lg:px-20
        lg:py-56
      "
    >
      <div className="mx-auto w-full max-w-[1800px]">

        {/* =================================================
            TOP LINE
        ================================================= */}

        <div
          ref={lineRef}
          className="
            mb-10
            h-px
            w-full
            bg-[#171715]/15
            md:mb-14
          "
        />

        {/* =================================================
            LABEL
        ================================================= */}

        <span
          ref={labelRef}
          className="
            block
            text-[18px]
            font-semibold
            uppercase
            text-[#8A837A]
            md:text-[20px]
          "
        >
          05 / Begin
        </span>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-16
            lg:mt-20
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:gap-24
          "
        >

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="overflow-hidden">
            <h2
              ref={headingRef}
              className="
                max-w-[1200px]
                text-[clamp(58px,9vw,140px)]
                font-bold
                uppercase
                leading-[0.84]
                tracking-[-0.06em]
                text-[#171715]
                will-change-transform
              "
            >
              Make Space
              <br />
              For What
              <br />
              Matters.
            </h2>
          </div>

          {/* =================================================
              CTA CONTENT
          ================================================= */}

          <div
            ref={contentRef}
            className="
              flex
              flex-col
              justify-end
              lg:pb-2
            "
          >
            <p
              className="
                max-w-[330px]
                text-[16px]
                font-medium
                leading-[1.6]
                text-[#171715]
                md:text-[18px]
              "
            >
              Begin with a conversation. Tell us about
              your space, taste and vision.
            </p>

            {/* PRIMARY CTA */}

            <div className="mt-9">
              <AnimatedButton
                href="#quote"
                text="Request a Quote"
              />
            </div>

            {/* SECONDARY CTA */}

            <a
              ref={secondaryRef}
              href="https://wa.me/8801960481983"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-6
                inline-flex
                w-fit
                items-center
                gap-3
                border-b
                border-[#171715]/20
                pb-2
                text-[13px]
                font-semibold
                uppercase
                text-[#171715]
                transition-colors
                duration-300
                hover:border-[#A58B5B]
                hover:text-[#A58B5B]
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

        {/* =================================================
            BOTTOM DETAILS
        ================================================= */}

        <div
          ref={bottomRef}
          className="
            mt-28
            flex
            flex-col
            gap-5
            border-t
            border-[#171715]/10
            pt-6
            text-[11px]
            font-medium
            uppercase
            text-[#8A837A]
            md:mt-40
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <span>
            Free Design Consultation
          </span>

          <span>
            Delivery & Installation
          </span>

          <span>
            Agrabad · Chattogram
          </span>

          <span>
            +880 1960-481983
          </span>
        </div>

      </div>
    </section>
  );
}