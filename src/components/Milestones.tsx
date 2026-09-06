"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./shared/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "Heaven Furniture Mart was founded by Abul Kalam Bhuiyan with a vision to bring timeless furniture and refined living spaces to Chattogram.",
  },
  {
    year: "2021",
    title: "A Place to Experience",
    description:
      "The Agrabad showroom opened its doors, giving clients a dedicated space to experience our furniture, materials, and craftsmanship.",
  },
  {
    year: "2024–25",
    title: "International Furniture Fair",
    description:
      "Heaven Furniture Mart exhibited at the International Furniture Fair, Chattogram, connecting our work with a wider furniture community.",
  },
  {
    year: "2025",
    title: "Growing Recognition",
    description:
      "Heaven Furniture Mart became a member of the Chamber of Commerce, marking another step in our journey as a growing furniture brand.",
  },
  {
    year: "2026",
    title: "A New Milestone",
    description:
      "Received nationwide BFIOA recognition, reflecting the continued growth and presence of Heaven Furniture Mart.",
  },
];

export default function Milestones() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ---------------------------------
         Heading entrance
      --------------------------------- */
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      /* ---------------------------------
         Cards entrance
      --------------------------------- */
      const cards = gsap.utils.toArray<HTMLElement>(".milestone-card");

      gsap.fromTo(
        cards,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      /* ---------------------------------
         Parallax
      --------------------------------- */
      gsap.to(headingRef.current, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.to(card, {
          y: direction * 35,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      /* ---------------------------------
         Hover animations (with proper cleanup)
      --------------------------------- */
      const cleanups: Array<() => void> = [];

      cards.forEach((card) => {
        const year = card.querySelector<HTMLElement>(".milestone-year");
        const line = card.querySelector<HTMLElement>(".milestone-line");
        const title = card.querySelector<HTMLElement>(".milestone-title");

        const targets = [
          { el: card, enter: { x: 8 }, leave: { x: 0 } },
          { el: year, enter: { x: 6, scale: 1.04 }, leave: { x: 0, scale: 1 } },
          { el: line, enter: { width: "100%" }, leave: { width: "45%" } },
          { el: title, enter: { x: 5 }, leave: { x: 0 } },
        ];

        const enter = () => {
          targets.forEach(({ el, enter }) => {
            if (el) gsap.to(el, { ...enter, duration: 0.5, ease: "power3.out" });
          });
        };

        const leave = () => {
          targets.forEach(({ el, leave }) => {
            if (el) gsap.to(el, { ...leave, duration: 0.5, ease: "power3.out" });
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
      });

      return () => {
        cleanups.forEach((fn) => fn());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F5F1] py-28 md:py-36 lg:py-44"
    >
      <div className="w-full px-6 md:px-10 lg:px-20">
        {/* =================================
            HEADER
        ================================= */}
        <div  className="mb-20">
          <SectionHeading
          label="OUR JOURNEY
"
          heading={
            <>
              A Legacy
<br/>
Built Over Time 
            </>
          }
         
        />
        </div>

        {/* =================================
            MILESTONE CARDS
        ================================= */}
        <div ref={cardsRef} className="border-t border-[#171715]/15">
          {milestones.map((milestone) => (
            <div
              key={milestone.year}
              className="
                milestone-card
                group
                relative
                border-b
                border-[#171715]/15
                py-8
                md:py-10
                lg:py-12
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  gap-7
                  md:grid-cols-12
                  md:items-center
                  md:gap-10
                "
              >
                {/* YEAR */}
                <div className="md:col-span-3">
                  <span
                    className="
                      milestone-year
                      block
                      font-sans
                      text-[22px]
                      font-bold
                      uppercase
                      leading-[1.1]
                      tracking-[-0.02em]
                      text-[#171715]
                      transition-colors
                      duration-150
                      md:text-[27px]
                      lg:text-[80px]
                    "
                  >
                    {milestone.year}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="md:col-span-7">
                  <h3
                    className="
                    font-serif
                    uppercase
                      milestone-title
                      text-[clamp(25px,3vw,42px)]
                      font-semibold
                      leading-[1.05]
                      tracking-[-0.035em]
                      text-[#171715]
                    "
                  >
                    {milestone.title}
                  </h3>

                  <div
                    className="
                      milestone-line
                      mt-6
                      h-px
                      w-[45%]
                      bg-[#B79B67]/70
                    "
                  />

                  <p
                    className="
                      mt-6
                      max-w-[650px]
                      text-[14px]
                      font-medium
                      leading-[1.8]
                      text-[#716B63]
                      md:text-[18px]
                    "
                  >
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* subtle hover background */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-0
                  h-0
                  bg-[#171715]/[0.025]
                  transition-all
                  duration-500
                  group-hover:h-full
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}