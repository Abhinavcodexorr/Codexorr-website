"use client";

import { useEffect, useRef } from "react";

export function CursorFollower() {
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const isHovering = useRef(false);

  useEffect(() => {
    // Only show on pointer-fine devices (desktops)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let mx = -200;
    let my = -200;
    let rx = -200;
    let ry = -200;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        ringRef.current?.classList.remove("opacity-0");
      }
    }

    function onLeave() {
      isVisible.current = false;
      ringRef.current?.classList.add("opacity-0");
    }

    // Expand ring on interactive elements
    function onPointerOver(e: PointerEvent) {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        if (!isHovering.current) {
          isHovering.current = true;
          ringRef.current?.classList.add("scale-[2.2]", "border-teal-400/55", "bg-emerald-400/[0.05]");
        }
      } else {
        if (isHovering.current) {
          isHovering.current = false;
          ringRef.current?.classList.remove("scale-[2.2]", "border-teal-400/55", "bg-emerald-400/[0.05]");
        }
      }
    }

    function animate() {
      rx += (mx - rx) * 0.085;
      ry += (my - ry) * 0.085;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("pointermove", onPointerOver as EventListener);
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onPointerOver as EventListener);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border border-teal-500/45 opacity-0 transition-[border-color,background-color,scale] duration-300 will-change-transform"
    />
  );
}
