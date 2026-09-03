
"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const images = [
  "/heavenHero.jpg",
  "/heavenHero.jpg",
  "/heavenHero.jpg",
];

export default function ImageStackSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const orderRef = useRef([0, 1, 2]);

  useLayoutEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const cards = cardsRef.current;

    let isDragging = false;
    let startX = 0;
    let dragX = 0;
    let activeCard: HTMLDivElement | null = null;

    /*
    =====================================================
    STACK POSITIONS
    =====================================================
    */

    const positions = [
      {
        x: -32,
        y: 0,
        scale: 1,
        rotation: -3,
        zIndex: 30,
      },
      {
        x: 0,
        y: 20,
        scale: 0.96,
        rotation: 1,
        zIndex: 20,
      },
      {
        x: 32,
        y: 40,
        scale: 0.92,
        rotation: 3,
        zIndex: 10,
      },
    ];

    /*
    =====================================================
    APPLY STACK
    =====================================================
    */

    const updateStack = (animate = true) => {
      orderRef.current.forEach((cardIndex, positionIndex) => {
        const card = cards[cardIndex];

        if (!card) return;

        const position = positions[positionIndex];

        if (animate) {
          gsap.to(card, {
            x: position.x,
            y: position.y,
            scale: position.scale,
            rotation: position.rotation,
            zIndex: position.zIndex,
            duration: 0.5,
            ease: "power3.out",
          });
        } else {
          gsap.set(card, {
            x: position.x,
            y: position.y,
            scale: position.scale,
            rotation: position.rotation,
            zIndex: position.zIndex,
          });
        }
      });
    };

    updateStack(false);

    /*
    =====================================================
    FRONT CARD
    =====================================================
    */

    const getFrontCard = () => {
      const frontIndex = orderRef.current[0];

      return cards[frontIndex] || null;
    };

    /*
    =====================================================
    POINTER DOWN
    =====================================================
    */

    const onPointerDown = (event: PointerEvent) => {
      const card = getFrontCard();

      if (!card) return;

      activeCard = card;
      isDragging = true;
      startX = event.clientX;
      dragX = 0;

      card.setPointerCapture(event.pointerId);

      gsap.killTweensOf(card);

      gsap.to(card, {
        scale: 1.02,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    /*
    =====================================================
    POINTER MOVE
    =====================================================
    */

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging || !activeCard) return;

      dragX = event.clientX - startX;

      /*
      FRONT CARD
      */

      gsap.set(activeCard, {
        x: -32 + dragX,
        y: 0,
        rotation: -3 + dragX * 0.035,
        scale: 1.02,
      });

      /*
      SECOND CARD REVEAL
      */

      const secondCardIndex = orderRef.current[1];
      const secondCard = cards[secondCardIndex];

      if (!secondCard) return;

      const progress = Math.min(
        Math.abs(dragX) / 160,
        1
      );

      gsap.set(secondCard, {
        x: -progress * 32,
        y: 20 - progress * 20,
        scale: 0.96 + progress * 0.04,
        rotation: 1 - progress * 4,
      });
    };

    /*
    =====================================================
    POINTER UP
    =====================================================
    */

    const onPointerUp = () => {
      if (!isDragging || !activeCard) return;

      isDragging = false;

      const card = activeCard;

      /*
      ===================================================
      SWIPE
      ===================================================
      */

      if (Math.abs(dragX) > 100) {
        const direction = dragX > 0 ? 1 : -1;

        gsap.to(card, {
          x: direction * 700,
          rotation: direction * 25,
          scale: 0.95,
          duration: 0.45,
          ease: "power3.in",
          onComplete: () => {
            /*
            MOVE FRONT CARD TO BACK
            */

            const currentOrder = orderRef.current;

            orderRef.current = [
              currentOrder[1],
              currentOrder[2],
              currentOrder[0],
            ];

            /*
            RESET CARD
            */

            gsap.set(card, {
              x: 32,
              y: 40,
              scale: 0.92,
              rotation: 3,
              zIndex: 10,
            });

            /*
            ANIMATE NEW STACK
            */

            updateStack(true);
          },
        });
      } else {
        /*
        =================================================
        SNAP BACK
        =================================================
        */

        gsap.to(card, {
          x: -32,
          y: 0,
          scale: 1,
          rotation: -3,
          duration: 0.45,
          ease: "power3.out",
        });

        const secondCard =
          cards[orderRef.current[1]];

        if (secondCard) {
          gsap.to(secondCard, {
            x: 0,
            y: 20,
            scale: 0.96,
            rotation: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        }
      }

      activeCard = null;
      dragX = 0;
    };

    /*
    =====================================================
    EVENTS
    =====================================================
    */

    slider.addEventListener(
      "pointerdown",
      onPointerDown
    );

    slider.addEventListener(
      "pointermove",
      onPointerMove
    );

    slider.addEventListener(
      "pointerup",
      onPointerUp
    );

    slider.addEventListener(
      "pointercancel",
      onPointerUp
    );

    return () => {
      slider.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      slider.removeEventListener(
        "pointermove",
        onPointerMove
      );

      slider.removeEventListener(
        "pointerup",
        onPointerUp
      );

      slider.removeEventListener(
        "pointercancel",
        onPointerUp
      );

      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="
        relative
        z-30
        mx-auto
        my-[-60px]
        h-[430px]
        w-full
        max-w-[560px]
        touch-none
        select-none
        md:my-[-90px]
        md:h-[500px]
        lg:my-[-120px]
        lg:h-[560px]
      "
    >
      {images.map((src, index) => (
        <div
          key={`image-card-${index}`}
          ref={(element) => {
            if (element) {
              cardsRef.current[index] = element;
            }
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[310px]
            w-[235px]
            -translate-x-1/2
            -translate-y-1/2
            overflow-hidden
            rounded-[24px]
            shadow-[0_25px_70px_rgba(0,0,0,0.18)]
            md:h-[400px]
            md:w-[300px]
            lg:h-[460px]
            lg:w-[350px]
          "
        >
          <Image
            src={src}
            alt={`Heaven furniture ${index + 1}`}
            fill
            priority={index === 0}
            draggable={false}
            sizes="350px"
            className="
              pointer-events-none
              select-none
              object-cover
            "
          />
        </div>
      ))}
    </div>
  );
}

