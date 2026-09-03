
"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("Collections");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-28 items-center justify-between px-6 md:px-10 lg:px-20">

        {/* Logo */}
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label="Heaven Furniture Mart"
        >
          <span className="font-serif text-[27px] font-medium tracking-normal text-[#E8E5DE] md:text-[31px]">
            HEAVEN
          </span>

          <span className="mt-1.5 text-[10px] font-medium tracking-[0.08em] text-[#B9B5AC]">
            FURNITURE MART
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-9 md:flex lg:gap-11"
          onMouseLeave={() => setHovered(null)}
        >
          {navItems.map((item) => {
            const isActive = active === item.label;
            const isHovered = hovered === item.label;
            const isMuted = hovered !== null && !isHovered;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.label)}
                onMouseEnter={() => setHovered(item.label)}
                className={`flex items-center gap-2.5 text-[15px] font-medium tracking-normal transition-all duration-300 lg:text-[16px] ${
                  isMuted
                    ? "text-[#77746E]"
                    : "text-[#D8D5CE]"
                }`}
              >
                {/* Active / Hover Dot */}
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[#B9A477] transition-all duration-300 ${
                    isActive || isHovered
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Open menu"
        >
          <span className="flex w-6 flex-col gap-1.5">
            <span className="h-[1.5px] w-full bg-[#E0DDD6]" />
            <span className="ml-auto h-[1.5px] w-3/4 bg-[#E0DDD6]" />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

