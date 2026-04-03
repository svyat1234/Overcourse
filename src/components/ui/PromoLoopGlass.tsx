"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./PromoLoopGlass.scss";

/** Макс. смещение параллакса (полуамплитуда от центра) */
const LOOP_PARALLAX_MAX_PX = 40;
const LOOP_PARALLAX_GSAP_DURATION = 0.5;
const LOOP_PARALLAX_GSAP_EASE = "power2.out" as const;

export default function PromoLoopGlass() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      const normalizedX = Math.min(Math.max(relativeX / rect.width, 0), 1);
      const normalizedY = Math.min(Math.max(relativeY / rect.height, 0), 1);
      const offsetX = (0.5 - normalizedX) * LOOP_PARALLAX_MAX_PX * 2;
      const offsetY = (0.5 - normalizedY) * LOOP_PARALLAX_MAX_PX * 2;

      gsap.to(el, {
        duration: LOOP_PARALLAX_GSAP_DURATION,
        x: offsetX,
        y: offsetY,
        ease: LOOP_PARALLAX_GSAP_EASE,
        overwrite: "auto",
      });
    };

    document.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
    };
  }, []);

  return (
    <div className="promo__img-loop-wrap" ref={wrapRef}>
      <Image
        src="/images/loop.png"
        alt="Loop"
        className="promo__img-loop"
        fill
      />

      <div className="promo__glass liquidGlass-wrapper">
        <div className="liquidGlass-effect" aria-hidden />
        <div className="liquidGlass-tint" aria-hidden />
        <div className="liquidGlass-shine" aria-hidden />
        <div className="liquidGlass-text" aria-hidden />
      </div>
    </div>
  );
}
