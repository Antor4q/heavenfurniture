"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";

interface AnimatedButtonProps {
  href: string;
  text: string;
}

const AnimatedButton = ({ href, text }: AnimatedButtonProps) => {
  const defaultStateRef = useRef<HTMLSpanElement>(null);
  const hoverStateRef = useRef<HTMLSpanElement>(null);

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
      },
    );
  };

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

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        inline-flex
     
        min-w-[250px]
        items-center
        justify-center
        overflow-hidden
        bg-[#2C241D]
        px-6
        py-7
        text-[#F5F2EC]
      "
    >
      {/* Initial */}
      <span
        ref={defaultStateRef}
        className="absolute inline-flex items-center gap-5"
      >
        <span className="whitespace-nowrap text-[17px] font-bold">
          {text}
        </span>

        <span className="text-[23px] leading-none">
          ⟶
        </span>
      </span>

      {/* Hover */}
      <span
        ref={hoverStateRef}
        className="absolute inline-flex items-center gap-5 opacity-0"
      >
        <span className="text-[23px] leading-none">
          ⟶
        </span>

        <span className="whitespace-nowrap text-[17px] font-bold">
          {text}
        </span>
      </span>
    </Link>
  );
};

export default AnimatedButton;