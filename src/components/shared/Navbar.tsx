
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const featuredProducts = [
  {
    name: "Aria Lounge Chair",
    
    image: "/fur1.jpg",
    href: "/#collections",
  },
  {
    name: "Solstice Dining Table",
  
    image: "/fur2.jpg",
    href: "/#collections",
  },
];

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // =====================================================
  // MOBILE BODY SCROLL LOCK
  // =====================================================

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // =====================================================
  // ACTIVE SECTION DETECTION
  // =====================================================

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const viewportMiddle = scrollPosition + window.innerHeight * 0.35;

      // At the very top → nothing active
      if (scrollPosition < 100) {
        setActive(null);
        return;
      }

      let currentSection: string | null = null;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
          viewportMiddle >= sectionTop &&
          viewportMiddle < sectionBottom
        ) {
          currentSection = section.id;
        }
      });

      // If no section is currently active,
      // keep the previous state instead of forcing one.
      if (currentSection) {
        const matchedItem = navItems.find(
          (item) => item.href === `#${currentSection}`
        );

        setActive(matchedItem?.label ?? null);
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  // =====================================================
  // MOBILE NAV CLICK
  // =====================================================

  const handleMobileClick = (label: string) => {
    setActive(label);
    setMenuOpen(false);
  };

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div
        className="
          mx-auto
          flex
          h-24
          items-center
          justify-between
          px-6
          md:h-28
          md:px-10
          lg:px-20
        "
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          className="relative flex items-center"
          aria-label="Heaven Furniture Mart"
          onClick={() => {
            setActive(null);
            setMenuOpen(false);
          }}
        >
          <Image
            src="/logo.png"
            alt="Heaven Furniture Mart"
            width={160}
            height={48}
            priority
            className="
              h-9
              w-auto
              object-contain
              sm:h-10
              md:h-12
            "
          />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav
          className="
            hidden
            items-center
            gap-9
            md:flex
            lg:gap-11
          "
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
                className={`
                  flex
                  items-center
                  gap-2.5
                  text-[15px]
                  font-medium
                  tracking-normal
                  transition-all
                  duration-300
                  lg:text-[16px]
                  ${
                    isMuted
                      ? "text-[#cfccc7]"
                      : "text-[#f2f0e9]"
                  }
                `}
              >
                <span
                  className={`
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-[#B9A477]
                    transition-all
                    duration-300
                    ${
                      isActive || isHovered
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }
                  `}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* =================================================
            MOBILE MENU TOGGLE
        ================================================= */}

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            relative
            z-[60]
            flex
            h-10
            w-10
            items-center
            justify-center
            md:hidden
          "
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="flex w-6 flex-col items-end gap-1.5">
            <span
              className={`
                h-[1.5px]
                w-full
                bg-[#E0DDD6]
                transition-all
                duration-300
                ${
                  menuOpen
                    ? "translate-y-[7px] rotate-45"
                    : ""
                }
              `}
            />

            <span
              className={`
                h-[1.5px]
                bg-[#E0DDD6]
                transition-all
                duration-300
                ${
                  menuOpen
                    ? "w-full -translate-y-[7px] -rotate-45"
                    : "w-3/4"
                }
              `}
            />
          </span>
        </button>
      </div>

      {/* =====================================================
          FULL-SCREEN MOBILE MENU
      ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-50
          flex
          h-[100dvh]
          w-screen
          flex-col
          justify-between
          overflow-y-auto
          bg-[#111110]
          px-8
          pb-10
          pt-28
          transition-all
          duration-500
          ease-in-out
          md:hidden
          ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      >
        {/* =================================================
            NAV LINKS
        ================================================= */}

        <nav className="flex flex-col gap-6">
          {navItems.map((item, index) => {
            const isActive = active === item.label;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleMobileClick(item.label)}
                style={{
                  transitionDelay: menuOpen
                    ? `${index * 60 + 100}ms`
                    : "0ms",
                }}
                className={`
                  flex
                  items-center
                  gap-3
                  text-[6vw]
                  font-serif
                  transition-all
                  duration-500
                  ease-out
                  xs:text-[11vw]
                  sm:text-[64px]
                  ${
                    menuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }
                  ${
                    isActive
                      ? "text-[#E8E5DE]"
                      : "text-[#77746E]"
                  }
                `}
              >
                <span
                  className={`
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    bg-[#B9A477]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }
                  `}
                />

                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* =================================================
            FEATURED PRODUCTS
        ================================================= */}

        <div
          style={{
            transitionDelay: menuOpen
              ? `${navItems.length * 60 + 150}ms`
              : "0ms",
          }}
          className={`
            mt-10
            border-t
            border-[#2A2A28]
            pt-6
            transition-all
            duration-500
            ease-out
            ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }
          `}
        >
          <p
            className="
              mb-4
              text-[10px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#77746E]
            "
          >
            Featured
          </p>

          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                onClick={() => setMenuOpen(false)}
                className="group flex flex-col gap-2.5"
              >
                <div
                  className="
                    relative
                    aspect-[4/5]
                    w-full
                    overflow-hidden
                    bg-[#1A1A18]
                  "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="45vw"
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-active:scale-105
                    "
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <span
                    className="
                      text-[13px]
                      font-medium
                      leading-tight
                      text-[#D8D5CE]
                    "
                  >
                    {product.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

