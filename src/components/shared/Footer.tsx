
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FooterLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      className={`
        group
        relative
        flex
        items-center
        text-[15px]
        font-medium
        text-[#F7F5F1]/70
        transition-colors
        duration-300
        hover:text-[#F7F5F1]
        sm:text-[16px]
        lg:text-[17px]
        ${className}
      `}
    >
      <span
        className="
          absolute
          left-0
          h-1.5
          w-1.5
          -translate-x-3
          rounded-full
          bg-[#B79B67]
          opacity-0
          transition-all
          duration-300
          group-hover:translate-x-0
          group-hover:opacity-100
        "
      />

      <span
        className="
          transition-transform
          duration-300
          group-hover:translate-x-4
        "
      >
        {children}
      </span>
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(contentRef.current, {
        y: 70,
        opacity: 0,
      });

      gsap.set(brandRef.current, {
        yPercent: 100,
        opacity: 0,
      });

      // Main footer reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: 1.2,
        },
      });

      tl.to(contentRef.current, {
        y: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 1,
      }).to(
        brandRef.current,
        {
          yPercent: 0,
          opacity: 1,
          ease: "power4.out",
          duration: 1.2,
        },
        "-=0.55"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={footerRef}
      className="
        overflow-hidden
        bg-[#171715]
        px-5
        py-16
        sm:px-8
        sm:py-20
        md:px-10
        md:py-24
        lg:px-20
        lg:py-28
      "
    >
      {/* =====================================================
          FOOTER CONTENT
      ===================================================== */}

      <div ref={contentRef}>
        {/* MAIN FOOTER GRID */}
        <div
          className="
            grid
            grid-cols-1
            gap-16
            sm:gap-20
            lg:grid-cols-3
            lg:gap-28
          "
        >
          {/* =====================================================
              QUOTE
          ===================================================== */}

          <div className="lg:col-span-1">
            <p
              className="
                max-w-[700px]
                text-[22px]
                font-bold
                uppercase
                leading-[1.1]
                tracking-[-0.02em]
                text-[#F7F5F1]
                sm:text-[26px]
                md:text-[28px]
                lg:text-[30px]
                lg:leading-[1.06]
                lg:tracking-[-0.035em]
              "
            >
              Every piece we create is designed to bring
              lasting elegance into the homes of our clients.
            </p>

            <p
              className="
                mt-6
                text-[15px]
                font-medium
                leading-[1.5]
                tracking-[-0.02em]
                text-[#F7F5F1]/40
                sm:mt-8
                sm:text-[17px]
                lg:mt-10
                lg:text-[18px]
                lg:tracking-[-0.035em]
              "
            >
              © 2026 Heaven Furniture Mart
            </p>
          </div>

          {/* =====================================================
              CONTACT / LINKS / SOCIAL
          ===================================================== */}

          <div
            className="
              border-b
              border-[#F7F5F1]/10
              lg:col-span-2
            "
          >
            <div
              className="
                flex
                flex-col
                justify-between
                gap-10
                pb-12
                sm:gap-12
                sm:pb-14
                md:flex-row
                md:gap-8
                lg:pb-16
              "
            >
              {/* =================================================
                  CONTACT
              ================================================= */}

              <div className="flex flex-col">
                <span
                  className="
                    mb-4
                    text-[10px]
                    font-semibold
                    uppercase
                    text-[#B79B67]
                    sm:mb-5
                    sm:text-[11px]
                  "
                >
                  Contact
                </span>

                <FooterLink href="tel:+8801960481983">
                  +880 1960-481983
                </FooterLink>

                <FooterLink
                  href="mailto:heavenfurnituremart@gmail.com"
                  className="mt-3"
                >
                  heavenfurnituremart@gmail.com
                </FooterLink>

                <p
                  className="
                    mt-6
                    text-[13px]
                    leading-[1.5]
                    text-[#F7F5F1]/35
                    sm:text-[14px]
                  "
                >
                  Agrabad Access Road
                  <br />
                  Chattogram, Bangladesh
                </p>
              </div>

              {/* =================================================
                  LINKS
              ================================================= */}

              <div className="flex flex-col">
                <span
                  className="
                    mb-4
                    text-[10px]
                    font-semibold
                    uppercase
                    text-[#B79B67]
                    sm:mb-5
                    sm:text-[11px]
                  "
                >
                  Explore
                </span>

                <FooterLink href="#collections">
                  Collections
                </FooterLink>

                <FooterLink href="#bespoke" className="mt-3">
                  Bespoke
                </FooterLink>

                <FooterLink href="#about" className="mt-3">
                  About
                </FooterLink>
              </div>

              {/* =================================================
                  SOCIAL
              ================================================= */}

              <div className="flex flex-col">
                <span
                  className="
                    mb-4
                    text-[10px]
                    font-semibold
                    uppercase
                    text-[#B79B67]
                    sm:mb-5
                    sm:text-[11px]
                  "
                >
                  Follow
                </span>

                <FooterLink
                  href="https://www.facebook.com/HeavenFurnitureMart"
                  external
                >
                  Facebook
                </FooterLink>

                <FooterLink
                  href="https://www.instagram.com/heaven_furniture_ltd"
                  external
                  className="mt-3"
                >
                  Instagram
                </FooterLink>

                <FooterLink
                  href="https://www.youtube.com/@HeavenFurnitureMart"
                  external
                  className="mt-3"
                >
                  YouTube
                </FooterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          HUGE BRAND
      ===================================================== */}

      <h1
     
  ref={brandRef}
  className="
    mt-14
    -mb-6
    whitespace-nowrap
    font-serif
    text-[80px]
    font-bold
    uppercase
    leading-[0.7]
    tracking-normal
    text-[#fff]

    sm:text-[110px]
    sm:mt-16
    sm:-mb-10

    md:text-[180px]

    lg:mt-20
    lg:-mb-14
    lg:text-[clamp(180px,24vw,430px)]
  "
>
  HEAVEN
</h1>
    </div>
  );
}

