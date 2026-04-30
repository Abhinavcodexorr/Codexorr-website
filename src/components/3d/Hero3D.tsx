"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

/**
 * Single mesh · soft ambient fill. Fast continuous spin (Y + slight X/Z tumble) + gentle float.
 */
function FloatingForm({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    if (reducedMotion) {
      mesh.rotation.y += delta * 0.04;
      return;
    }

    /* Fast main rotation + secondary tumble (reads like a turning globe) */
    mesh.rotation.y += delta * 0.22;
    mesh.rotation.x += delta * 0.072;
    mesh.rotation.z += delta * 0.034;

    const breath = Math.sin(t * 0.21);
    const swayX = Math.sin(t * 0.13 + 0.75);
    mesh.position.y = breath * 0.11;
    mesh.position.x = swayX * 0.034;

    const s = 1 + Math.sin(t * 0.145) * 0.017;
    mesh.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.84, 0.24, 32, 10]} />
      <meshStandardMaterial
        color="#73eecb"
        emissive="#9298f8"
        emissiveIntensity={0.4}
        roughness={0.52}
        metalness={0.12}
      />
    </mesh>
  );
}

function SceneBody({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={2.05} />
      <FloatingForm reducedMotion={reducedMotion} />
    </>
  );
}

/** Default export — import with dynamic(() => import('./Hero3D'), { ssr: false }). */
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
    <div className="relative h-full min-h-[280px] w-full lg:min-h-[400px]" data-hero-canvas="">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
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
