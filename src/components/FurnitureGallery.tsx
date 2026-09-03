"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type GalleryItem = {
  image: string;
  text: string;
};

type FurnitureGalleryProps = {
  items: GalleryItem[];
};

const imageRatios = [
  "portrait",
  "landscape",
  "portrait",
  "landscape",
  "portrait",
  "landscape",
];

export default function FurnitureGallery({
  items,
}: FurnitureGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const xRef = useRef(0);
  const lastTimeRef = useRef(0);

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startDragXRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let animationFrame: number;

    const speed = 30;

    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const delta =
        (time - lastTimeRef.current) / 1000;

      lastTimeRef.current = time;

      if (!draggingRef.current) {
        xRef.current -= speed * delta;
      }

      const firstSetWidth =
        track.scrollWidth / 3;

      if (
        Math.abs(xRef.current) >=
        firstSetWidth
      ) {
        xRef.current += firstSetWidth;
      }

      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const track = trackRef.current;

    if (!track) return;

    draggingRef.current = true;

    startXRef.current = e.clientX;
    startDragXRef.current = xRef.current;

    track.setPointerCapture(e.pointerId);

    track.style.cursor = "grabbing";
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!draggingRef.current) return;

    const movement =
      e.clientX - startXRef.current;

    xRef.current =
      startDragXRef.current + movement;
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const track = trackRef.current;

    if (!track) return;

    draggingRef.current = false;

    track.releasePointerCapture(e.pointerId);

    track.style.cursor = "grab";
  };

  const repeatedItems = [
    ...items,
    ...items,
    ...items,
  ];

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="
          flex
          w-full
          items-end
          gap-3
          px-4
          md:gap-4
          md:px-6
          lg:gap-5
          lg:px-10
        "
        style={{
          width: "max-content",
          touchAction: "pan-y",
          willChange: "transform",
          cursor: "grab",
        }}
      >
        {repeatedItems.map((item, index) => {
          const ratio =
            imageRatios[index % imageRatios.length];

          return (
            <div
              key={`${item.text}-${index}`}
              className="
                group
                shrink-0
              "
              style={{
                width:
                  "calc((100vw - 80px - 60px) / 4)",
              }}
            >
              {/* IMAGE */}

              <div
                className={`
                  relative
                  w-full
                  overflow-hidden
                  rounded-[2px]
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-[1.035]
                  ${
                    ratio === "portrait"
                      ? "aspect-[4/5]"
                      : "aspect-[5/4]"
                  }
                `}
              >
                <Image
                  src={item.image}
                  alt={item.text}
                  fill
                  draggable={false}
                  sizes="25vw"
                  className="
                    pointer-events-none
                    select-none
                    object-cover
                  "
                />
              </div>

              {/* LABEL */}

              <div className="mt-3">
                <span
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[#171715]
                    md:text-[11px]
                  "
                >
                  {item.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}