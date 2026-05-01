"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

/**
 * Single icosahedron · ambient only · smooth premium motion (slow yaw, sin float, soft “breath”).
 */
function FloatingCore({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    if (reducedMotion) {
      mesh.rotation.y += delta * 0.028;
      mesh.position.y = Math.sin(t * 0.18) * 0.04;
      return;
    }

    mesh.rotation.y += delta * 0.09;
    mesh.rotation.x = Math.sin(t * 0.11) * 0.065;
    mesh.rotation.z = Math.sin(t * 0.085 + 1.1) * 0.032;

    mesh.position.y = Math.sin(t * 0.42) * 0.1;
    mesh.position.x = Math.sin(t * 0.17) * 0.028;

    const s = 1 + Math.sin(t * 0.22) * 0.022;
    mesh.scale.setScalar(s);
  });

  return (
      <mesh ref={ref}>
      <icosahedronGeometry args={[0.95, 2]} />
      <meshStandardMaterial
        color="#4fd4d0"
        emissive="#8b93f9"
        emissiveIntensity={0.42}
        roughness={0.42}
        metalness={0.16}
      />
    </mesh>
  );
}

function SceneBody({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={2.55} />
      <FloatingCore reducedMotion={reducedMotion} />
    </>
  );
}

export default function Hero3D() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div
      className="relative w-full min-h-[inherit] aspect-square max-w-full lg:aspect-auto lg:min-h-[min(420px,52vh)]"
      data-hero-canvas=""
    >
      <Canvas
        className="!absolute inset-0 h-full !w-full touch-none"
        camera={{ position: [0, 0, 5.1], fov: 40 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={[1, 1.2]}
      >
        <SceneBody reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
