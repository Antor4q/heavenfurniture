"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import image2020 from "../../public/heavenHero.jpg";
import image2021 from "../../public/heavenHero.jpg";
import image2024 from "../../public/heavenHero.jpg";
import image2025 from "../../public/heavenHero.jpg";
import image2026 from "../../public/heavenHero.jpg";

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "Heaven Furniture Mart was founded by Abul Kalam Bhuiyan with a vision to bring timeless furniture and refined living spaces to Chattogram.",
    image: image2020,
  },
  {
    year: "2021",
    title: "A Place to Experience",
    description:
      "The Agrabad showroom opened its doors, giving clients a dedicated space to experience our furniture, materials, and craftsmanship.",
    image: image2021,
  },
  {
    year: "2024–25",
    title: "International Furniture Fair",
    description:
      "Heaven Furniture Mart exhibited at the International Furniture Fair, Chattogram, connecting our work with a wider furniture community.",
    image: image2024,
  },
  {
    year: "2025",
    title: "Growing Recognition",
    description:
      "Heaven Furniture Mart became a member of the Chamber of Commerce, marking another step in our journey as a growing furniture brand.",
    image: image2025,
  },
  {
    year: "2026",
    title: "A New Milestone",
    description:
      "Received nationwide BFIOA recognition, reflecting the continued growth and presence of Heaven Furniture Mart.",
    image: image2026,
  },
];

export default function Milestones() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  /*
   * -------------------------------------------------------
   * INITIAL STATE
   * -------------------------------------------------------
   */

  useLayoutEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;
    const imageInner = imageInnerRef.current;

    if (!content || !image || !imageInner) return;

    gsap.set(content, {
      y: 0,
      opacity: 1,
    });

    gsap.set(image, {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
    });

    gsap.set(imageInner, {
      scale: 1,
      yPercent: 0,
    });
  }, []);

  /*
   * -------------------------------------------------------
   * CHANGE ACTIVE MILESTONE
   * -------------------------------------------------------
   */

  const changeMilestone = (index: number) => {
    if (index === activeIndexRef.current) return;
    if (isAnimatingRef.current) return;

    const content = contentRef.current;
    const image = imageRef.current;
    const imageInner = imageInnerRef.current;

    if (!content || !image || !imageInner) return;

    const previousIndex = activeIndexRef.current;

    activeIndexRef.current = index;
    setActiveIndex(index);

    isAnimatingRef.current = true;

    /*
     * ---------------------------------------------------
     * CONTENT ANIMATION
     * ---------------------------------------------------
     */

    const direction = index > previousIndex ? -1 : 1;

    gsap.killTweensOf(content);

    gsap.to(content, {
      y: direction * -20,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      overwrite: true,

      onComplete: () => {
        gsap.fromTo(
          content,
          {
            y: direction * 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            overwrite: true,
          }
        );
      },
    });

    /*
     * ---------------------------------------------------
     * IMAGE ANIMATION
     * ---------------------------------------------------
     */

    gsap.killTweensOf(image);
    gsap.killTweensOf(imageInner);

    gsap.to(image, {
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      overwrite: true,

      onComplete: () => {
        /*
         * New image starts from bottom
         */

        gsap.set(image, {
          clipPath: "inset(100% 0% 0% 0%)",
          opacity: 1,
        });

        gsap.set(imageInner, {
          scale: 1.06,
          yPercent: 3,
        });

        /*
         * Image reveal
         */

        gsap.to(image, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.75,
          ease: "power4.inOut",
          overwrite: true,
        });

        /*
         * Image zoom
         */

        gsap.to(imageInner, {
          scale: 1,
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,

          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      },
    });
  };

  const active = milestones[activeIndex];

  return (
    <section
      className="
        relative
        bg-[#F7F5F1]
        px-6
        py-24
        md:px-10
        lg:px-20
        lg:py-32
      "
    >
      <div className="mx-auto w-full max-w-[1800px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>
          <span
            className="
              text-[20px]
              font-semibold
              uppercase
              tracking-[-0.01em]
              text-[#8A837A]
            "
          >
            Our Journey
          </span>

          <h2
            className="
              mt-6
              max-w-[1000px]
              text-[clamp(60px,8vw,110px)]
              font-bold
              uppercase
              leading-[0.86]
              tracking-[-0.055em]
              text-[#171715]
            "
          >
            A Legacy
            <br />
            Built Over Time.
          </h2>
        </div>

        {/* =================================================
            MAIN AREA
        ================================================= */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-12

            lg:mt-20
            lg:grid-cols-12
            lg:items-center
            lg:gap-0
          "
        >

          {/* =================================================
              LEFT — YEARS
          ================================================= */}

          <div className="lg:col-span-3">
            <div className="flex flex-col">

              {milestones.map((milestone, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    key={milestone.year}
                    type="button"
                    onMouseEnter={() => changeMilestone(index)}
                    onClick={() => changeMilestone(index)}
                    className="
                      group
                      flex
                      w-fit
                      cursor-pointer
                      items-center
                      py-4
                      text-left
                      outline-none
                    "
                  >

                    {/* ACTIVE DOT */}

                    <span
                      className={`
                        mr-5
                        h-[7px]
                        w-[7px]
                        shrink-0
                        rounded-full
                        bg-[#B79B67]

                        transition-all
                        duration-500
                        ease-[cubic-bezier(0.16,1,0.3,1)]

                        ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0"
                        }
                      `}
                    />

                    {/* YEAR */}

                    <span
                      className={`
                        text-[clamp(48px,5vw,82px)]
                        font-serif
                        leading-none
                        tracking-[-0.045em]

                        transition-all
                        duration-500
                        ease-[cubic-bezier(0.16,1,0.3,1)]

                        ${
                          isActive
                            ? "translate-x-1 text-[#171715]"
                            : "translate-x-0 text-[#171715]/20"
                        }

                        group-hover:translate-x-1
                        group-hover:text-[#171715]
                      `}
                    >
                      {milestone.year}
                    </span>

                  </button>
                );
              })}

            </div>
          </div>

          {/* =================================================
              CENTER — ACTIVE CONTENT
          ================================================= */}

          <div
            ref={contentRef}
            className="
              lg:col-span-4
              lg:col-start-4
              lg:pt-2
              will-change-transform
            "
          >
            <div className="max-w-[480px]">

              {/* YEAR LABEL */}

              <span
                className="
                  text-[13px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-[#B79B67]
                "
              >
                {active.year}
              </span>

              {/* TITLE */}

              <h3
                className="
                  mt-6
                  text-[clamp(40px,4vw,64px)]
                  font-bold
                  uppercase
                  leading-[0.9]
                  tracking-[-0.045em]
                  text-[#171715]
                "
              >
                {active.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-8
                  max-w-[450px]
                  text-[19px]
                  font-medium
                  leading-[1.5]
                  tracking-[-0.015em]
                  text-[#171715]/55
                "
              >
                {active.description}
              </p>

            </div>
          </div>

          {/* =================================================
              RIGHT — ACTIVE IMAGE
          ================================================= */}

          <div
            className="
              lg:col-span-5
              lg:col-start-8
              lg:flex
              lg:justify-end
            "
          >
            <div
              ref={imageRef}
              className="
                relative
                h-[360px]
                w-full
                max-w-[600px]
                overflow-hidden

                lg:h-[480px]

                will-change-[clip-path,opacity]
              "
            >

              <div
                ref={imageInnerRef}
                className="
                  absolute
                  inset-[-6%]
                  will-change-transform
                "
              >
                <Image
                  key={active.year}
                  src={active.image}
                  alt={`${active.title} — Heaven Furniture Mart`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={activeIndex === 0}
                />
              </div>

              {/* IMAGE FOOTER */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6

                  flex
                  items-center
                  justify-between

                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-white
                "
              >
                <span>
                  Heaven Furniture Mart
                </span>

                <span>
                  {String(activeIndex + 1).padStart(2, "0")} / 05
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}