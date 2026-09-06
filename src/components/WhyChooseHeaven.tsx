"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import SectionHeading from "./shared/SectionHeading";

const trustPoints = [
  {
    number: "01",
    title: "FREE DESIGN CONSULTATION",
    description:
      "Get expert guidance from our design team to create furniture that fits your space, style, and everyday needs.",
    image: "/gall4.webp",
  },
  {
    number: "02",
    title: "FULLY BESPOKE",
    description:
      "Every piece is made specifically for your space — never mass-produced, never designed to simply fit a standard room.",
    image: "/bespoke.jpg",
  },
  {
    number: "03",
    title: "PREMIUM MATERIALS & CRAFTSMANSHIP",
    description:
      "We use premium wood and carefully selected materials, brought together by skilled in-house craftsmen.",
    image: "/fur6.jpg",
  },
  {
    number: "04",
    title: "LARGE PHYSICAL SHOWROOM",
    description:
      "Visit our large showroom in Agrabad, Chattogram and experience the quality, materials, finishes, and craftsmanship in person.",
    image: "/showroom.png",
  },
  {
    number: "05",
    title: "DELIVERY & INSTALLATION INCLUDED",
    description:
      "From our workshop to your home, we take care of delivery and installation so everything arrives ready for your space.",
    image: "/fur4.jpg",
  },
  {
    number: "06",
    title: "EASY PAYMENT OPTIONS",
    description:
      "Flexible and convenient payment options make it easier to bring your custom furniture vision to life.",
    image: "/gall3.webp",
  },
  {
    number: "07",
    title: "TRUSTED BY HUNDREDS OF HAPPY HOMEOWNERS",
    description:
      "Hundreds of homeowners have trusted us to create furniture that feels personal, lasting, and made for their home.",
    image: "/fur3.jpg",
  },
];

export default function WhyChooseHeaven() {
  const [active, setActive] = useState(0);

  const currentImageRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const current = trustPoints[active];

  const changeContent = (index: number) => {
    if (index === active) return;

    const currentImage = currentImageRef.current;
    const nextImage = nextImageRef.current;
    const content = contentRef.current;

    if (!currentImage || !nextImage || !content) {
      setActive(index);
      return;
    }

    const direction = index > active ? 1 : -1;

    setActive(index);

    gsap.killTweensOf([currentImage, nextImage, content]);

    gsap.set(nextImage, {
      clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      scale: 1.045,
      zIndex: 2,
    });

    gsap.to(nextImage, {
      clipPath: "inset(0 0 0 0)",
      scale: 1,
      duration: 0.42,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(currentImage, { zIndex: 0 });
        gsap.set(nextImage, { zIndex: 1 });
      },
    });

    gsap.fromTo(
      content,
      { y: direction > 0 ? 10 : -10 },
      { y: 0, duration: 0.28, ease: "power3.out" }
    );
  };

  return (
    <section
      id="why-customers-choose-them"
      className="
        w-full
        overflow-hidden
        bg-[#F4F2ED]
        px-6
        py-24
        md:px-10
        lg:px-20
        lg:py-32
      "
    >
      {/* =========================================
          HEADER
      ========================================== */}

      <div className="w-full">
        <SectionHeading
          label="why us"
          heading={
            <>
              Built around <br/>
what matters
            </>
          }
         
        />
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <div
        className="
          mt-20
          grid
          w-full
          grid-cols-1
          gap-16
          lg:mt-28
          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-24
        "
      >
        {/* =======================================
            LEFT SIDE
        ======================================== */}

        <div className="w-full">
          {trustPoints.map((item, index) => {
            const isActive = active === index;

            return (
              <button
                key={item.number}
                type="button"
                onMouseEnter={() => changeContent(index)}
                onFocus={() => changeContent(index)}
                onClick={() => changeContent(index)}
                className={`
                  group
                  flex
                  w-full
                  items-start
                  gap-3
                  border-b
                  border-[#171715]/10
                  py-6
                  text-left
                  outline-none
                  first:border-t
                  sm:gap-4
                  md:py-8

                  transition-transform
                  duration-200
                  ease-out

                  ${isActive ? "translate-x-2 md:translate-x-4" : "translate-x-0"}
                `}
              >
                {/* ACTIVE DOT */}

                <span
                  className={`
                    mt-[10px]
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    transition-colors
                    duration-200

                    ${isActive ? "bg-[#C9A227]" : "bg-transparent"}
                  `}
                />

                {/* NUMBER */}

                <span
                  className={`
                    mt-1
                    w-[30px]
                    shrink-0
                    font-sans
                    text-[12px]
                    tracking-[0.1em]
                    font-semibold
                    transition-colors
                    duration-150

                    sm:w-[36px]
                    sm:text-[13px]
                    md:text-[16px]

                    ${isActive ? "text-[#C9A227]" : "text-[#AAA49B]"}
                  `}
                >
                  {item.number}
                </span>

                {/* TITLE */}

                <span
                  className={`
                    max-w-[500px]
                    break-words
                    text-[19px]
                    font-sans
                    uppercase
                    leading-[1.15]
                    tracking-[-0.015em]

                    transition-colors
                    duration-150
                    font-bold
                    sm:text-[22px]
                    sm:leading-[1.1]
                    sm:tracking-[-0.02em]
                    md:text-[27px]
                    lg:text-[30px]

                    ${isActive ? "text-[#171715]" : "text-[#8A837A]"}
                  `}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* =======================================
            RIGHT SIDE
        ======================================== */}

        <div className="w-full">
          {/* =====================================
              IMAGE
          ====================================== */}

          <div
            className="
              relative
              h-[280px]
              w-full
              overflow-hidden
              bg-[#DDD9D1]
              sm:h-[360px]
              md:h-[440px]
              lg:h-[500px]
            "
          >
            {/* CURRENT IMAGE */}

            <div
              ref={currentImageRef}
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: 1 }}
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                priority={active === 0}
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />

              {/* subtle overlay to match Collections image treatment */}
              <div className="pointer-events-none absolute inset-0 bg-black/[0.06]" />
            </div>

            {/* NEXT IMAGE */}

            <div
              ref={nextImageRef}
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: 0, clipPath: "inset(0 0 0 100%)" }}
            >
              <Image
                src={current.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/[0.06]" />
            </div>

            {/* GOLD CORNER ACCENT — number tag, echoes Collections card meta */}
          </div>

          {/* =====================================
              RIGHT CONTENT
          ====================================== */}

          <div ref={contentRef} className="mt-8 w-full md:mt-10">
            {/* DESCRIPTION */}

            <p
              className="
                max-w-[760px]
                break-words
                text-[19px]
                font-medium
                font-sans
                leading-[1.4]
                tracking-[-0.01em]
                text-[#171715]
                sm:text-[24px]
                sm:leading-[1.35]
                sm:tracking-[-0.02em]
                md:text-[29px]
                lg:text-[32px]
              "
            >
              {current.description}
            </p>

            {/* SUPPORTING TEXT */}

            <p
              className="
                mt-7
                max-w-[600px]
                border-t
                border-[#171715]/10
                pt-6
                text-[13px]
                leading-[1.8]
                text-[#413f3e]
                font-medium
                font-sans
                md:text-[16px]
              "
            >
              Thoughtfully considered from the first conversation
              to the final installation, every detail is created
              with your home in mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}