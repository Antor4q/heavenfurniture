
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const logo = logoRef.current;

    if (!loader || !logo) return;

    const alreadyLoaded = sessionStorage.getItem(
      "heaven-preloader"
    );

    if (alreadyLoaded) {
      loader.style.display = "none";
      return;
    }

    sessionStorage.setItem("heaven-preloader", "true");

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(logo, {
        scale: 0.75,
        opacity: 0,
      });

      const tl = gsap.timeline();

      // Logo entrance
      tl.to(logo, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });

      // Continuous subtle animation while loading
      tl.to(logo, {
        scale: 1.06,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // This timeline is intentionally interrupted
      // when the page is ready below.
    }, loaderRef);

    // Wait until the page and assets are ready
    const finishLoader = () => {
      const finishTl = gsap.timeline();

      finishTl.to(logo, {
        scale: 1.08,
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });

      finishTl.to(
        loader,
        {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        },
        "-=0.15"
      );

      finishTl.set(loader, {
        display: "none",
      });

      finishTl.call(() => {
        window.dispatchEvent(new Event("resize"));
      });
    };

    if (document.readyState === "complete") {
      setTimeout(finishLoader, 300);
    } else {
      window.addEventListener("load", finishLoader, {
        once: true,
      });
    }

    return () => {
      window.removeEventListener("load", finishLoader);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#171715]
      "
    >
      <div
        ref={logoRef}
        className="
          flex
          items-center
          justify-center
        "
      >
        <Image
          src="/logo.png"
          alt="Heaven Furniture Mart"
          width={180}
          height={180}
          priority
          className="
            h-auto
            w-[80px]
            sm:w-[100px]
            md:w-[130px]
            lg:w-[160px]
            xl:w-[180px]
          "
        />
      </div>
    </div>
  );
}

