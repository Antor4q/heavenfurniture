
"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface AnimatedButtonProps {
  href: string;
  text: string;
}

const AnimatedButton = ({ href, text }: AnimatedButtonProps) => {
  const defaultStateRef = useRef<HTMLSpanElement>(null);
  const hoverStateRef = useRef<HTMLSpanElement>(null);

  // =====================================================
  // HOVER IN
  // =====================================================

  const handleMouseEnter = () => {
    const defaultState = defaultStateRef.current;
    const hoverState = hoverStateRef.current;

    if (!defaultState || !hoverState) return;

    gsap.killTweensOf([defaultState, hoverState]);

    gsap.to(defaultState, {
      x: 30,
      opacity: 0,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.fromTo(
      hoverState,
      {
        x: -30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      }
    );
  };

  // =====================================================
  // HOVER OUT
  // =====================================================

  const handleMouseLeave = () => {
    const defaultState = defaultStateRef.current;
    const hoverState = hoverStateRef.current;

    if (!defaultState || !hoverState) return;

    gsap.killTweensOf([defaultState, hoverState]);

    gsap.to(hoverState, {
      x: -30,
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });

    gsap.to(defaultState, {
      x: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power3.inOut",
    });
  };

  // =====================================================
  // SMOOTH SECTION NAVIGATION
  // =====================================================

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle same-page hash links
    if (!href.startsWith("#")) return;

    const target = document.querySelector(href);

    if (!target) return;

    e.preventDefault();

    // Stop any previous scroll animation
    gsap.killTweensOf(window);

    // Update URL without jumping
    window.history.pushState(null, "", href);

    // Smooth cinematic scroll
    gsap.to(window, {
      duration: 2.2,
      scrollTo: {
        y: target,
        offsetY: 0,
      },
      ease: "power2.inOut",
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        inline-flex
        w-full
        max-w-[250px]
        min-w-0
        items-center
        justify-center
        overflow-hidden
        bg-[#2C241D]
        px-5
        py-5
        text-[#F5F2EC]

        sm:px-6
        sm:py-6

        md:min-w-[250px]
        md:px-6
        md:py-7
      "
    >
      {/* =================================================
          DEFAULT STATE
      ================================================= */}

      <span
        ref={defaultStateRef}
        className="
          absolute
          inline-flex
          items-center
          gap-3
          sm:gap-4
          md:gap-5
        "
      >
        <span
          className="
            whitespace-nowrap
            text-[14px]
            font-bold
            sm:text-[15px]
            md:text-[17px]
          "
        >
          {text}
        </span>

        <span
          className="
            text-[20px]
            leading-none
            sm:text-[21px]
            md:text-[23px]
          "
        >
          ⟶
        </span>
      </span>

      {/* =================================================
          HOVER STATE
      ================================================= */}

      <span
        ref={hoverStateRef}
        className="
          absolute
          inline-flex
          items-center
          gap-3
          opacity-0
          sm:gap-4
          md:gap-5
        "
      >
        <span
          className="
            text-[20px]
            leading-none
            sm:text-[21px]
            md:text-[23px]
          "
        >
          ⟶
        </span>

        <span
          className="
            whitespace-nowrap
            text-[14px]
            font-bold
            sm:text-[15px]
            md:text-[17px]
          "
        >
          {text}
        </span>
      </span>
    </Link>
  );
};

export default AnimatedButton;

