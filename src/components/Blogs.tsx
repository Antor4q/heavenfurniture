"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./shared/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type Blog = {
  category: string;
  title: string;
  meta: string;
  image: string;
  href: string;
};

const blogs: Blog[] = [
  {
    category: "Interior",
    title: "Designing a Living Room That Feels Like Home",
    meta: "5 min read",
    image: "/liv.jpg",
    href: "/blog/designing-a-living-room-that-feels-like-home",
  },
  {
    category: "Materials",
    title: "The Beauty of Natural Wood",
    meta: "4 min read",
    image: "/fur4.jpg",
    href: "/blog/the-beauty-of-natural-wood",
  },
  {
    category: "Bespoke",
    title: "Why Custom Furniture Matters",
    meta: "6 min read",
    image: "/bespoke.jpg",
    href: "/blog/why-custom-furniture-matters",
  },
  {
    category: "Craft",
    title: "Inside Our Workshop: How a Piece Is Made",
    meta: "5 min read",
    image: "/be2.png",
    href: "/blog/inside-our-workshop-how-a-piece-is-made",
  },
];

export default function Blogs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".journal-reveal"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      imageRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const topBlogs = blogs.slice(0, 2);
  const bottomBlogs = blogs.slice(2, 4);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#171715] px-6 py-16 text-[#F1EEE8] sm:py-20 md:px-12 md:py-36 lg:px-20"
    >
      {/* HEADER */}
      <div className="w-full">
        <SectionHeading label="the journal
"
          heading={
    <>
     Notes on       <br />
     Notes on living well with
    </>
  }
  headingColor="#F7F5F1"
        />
      </div>

      {/* TOP ROW — featured (big, 60%) + small (40%), inside container */}
      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:mt-16 sm:gap-y-12 md:mt-28 md:grid-cols-5 lg:gap-x-20">
        {topBlogs.map((blog, index) => {
          const isFeatured = index === 0;

          return (
            <Link
              key={blog.href}
              href={blog.href}
              className={`journal-reveal group flex flex-col ${
                isFeatured ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  isFeatured ? "aspect-[16/9]" : "aspect-[16/10]"
                }`}
              >
                <Image
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes={
                    isFeatured
                      ? "(max-width: 767px) 100vw, 60vw"
                      : "(max-width: 767px) 100vw, 40vw"
                  }
                  className="absolute inset-[-6%] h-[112%] w-full object-cover transition-transform duration-[1.2s] ease-out will-change-transform group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-4 flex flex-col sm:mt-5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#F1EEE8]/45 sm:text-[11px] sm:tracking-[0.18em]">
                  {blog.category}
                </span>
                <h3
                  className={`mt-2 break-words uppercase leading-[1.15] tracking-[-0.015em] transition-transform duration-500 ease-out group-hover:translate-x-1 ${
                    isFeatured
                      ? "text-[clamp(19px,4.5vw,26px)] font-semibold"
                      : "text-[clamp(18px,4vw,24px)] font-medium"
                  }`}
                >
                  {blog.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 sm:mt-4">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#F1EEE8]/55 sm:text-[11px] sm:tracking-[0.18em]">
                    {blog.meta}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* BOTTOM ROW — full-bleed, exactly 50/50 */}
      <div className="mt-10 grid grid-cols-1 sm:mt-12 md:mt-20 md:grid-cols-2 md:gap-0 -mx-6 md:-mx-12 lg:-mx-20">
        {bottomBlogs.map((blog, i) => {
          const realIndex = i + 2;

          return (
            <Link
              key={blog.href}
              href={blog.href}
              className="journal-reveal group flex flex-col px-6 pt-6 sm:pt-8 md:px-12 md:pt-10 lg:px-20"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  ref={(el) => {
                    imageRefs.current[realIndex] = el;
                  }}
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="absolute inset-[-6%] h-[112%] w-full object-cover transition-transform duration-[1.2s] ease-out will-change-transform group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-4 flex flex-col pb-6 sm:mt-5 sm:pb-8 md:pb-10">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#F1EEE8]/45 sm:text-[11px] sm:tracking-[0.18em]">
                  {blog.category}
                </span>
                <h3 className="mt-2 break-words text-[clamp(18px,4vw,24px)] font-medium uppercase leading-[1.15] tracking-[-0.015em] transition-transform duration-500 ease-out group-hover:translate-x-1">
                  {blog.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 sm:mt-4">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#F1EEE8]/55 sm:text-[11px] sm:tracking-[0.18em]">
                    {blog.meta}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}