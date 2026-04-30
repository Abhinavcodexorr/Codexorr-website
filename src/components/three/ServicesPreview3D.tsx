"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type ShapeProps = {
  position: [number, number, number];
  href: string;
  accent: string;
  kind: "box" | "torus" | "octa" | "cone" | "icosa";
};

function Shape({
  position,
  href,
  accent,
  kind,
}: ShapeProps & { label?: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  useFrame((_s, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += dt * (hovered ? 0.85 : 0.45);
    mesh.current.rotation.x += dt * 0.08;
    const target = hovered ? 1.12 : 1;
    const m = mesh.current.scale;
    const k = 0.12;
    m.x = THREE.MathUtils.lerp(m.x, target, k);
    m.y = THREE.MathUtils.lerp(m.y, target, k);
    m.z = THREE.MathUtils.lerp(m.z, target, k);
  });

  const geometry = useMemo(() => {
    switch (kind) {
      case "box":
        return <boxGeometry args={[1.05, 1.05, 1.05]} />;
      case "torus":
        return <torusGeometry args={[0.72, 0.26, 22, 48]} />;
      case "octa":
        return <octahedronGeometry args={[0.92, 0]} />;
      case "cone":
        return <coneGeometry args={[0.72, 1.05, 28]} />;
      case "icosa":
        return <icosahedronGeometry args={[0.82, 0]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [kind]);

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.65}>
      <mesh
        ref={mesh}
        position={position}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => router.push(href)}
      >
        {geometry}
        <MeshDistortMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={hovered ? 0.65 : 0.35}
          roughness={0.25}
          metalness={0.85}
          distort={hovered ? 0.45 : 0.22}
          speed={hovered ? 3.2 : 2}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} color="#f8fafc" />
      <pointLight position={[-6, -2, 6]} intensity={55} color="#22d3ee" />
      <pointLight position={[6, 2, -4]} intensity={45} color="#c084fc" />

      <PerspectiveCamera makeDefault position={[0, 0.2, 9.2]} fov={42} />

      <Shape
        kind="box"
        position={[-4.2, 0.2, 0]}
        href="/services#web"
        accent="#67e8f9"
      />
      <Shape
        kind="torus"
        position={[-2.1, -0.1, 0]}
        href="/services#mobile"
        accent="#c084fc"
      />
      <Shape
        kind="octa"
        position={[0, 0.25, 0]}
        href="/services#cloud"
        accent="#38bdf8"
      />
      <Shape
        kind="icosa"
        position={[2.1, -0.05, 0]}
        href="/services#ai"
        accent="#f472b6"
      />
      <Shape
        kind="cone"
        position={[4.2, 0.15, 0]}
        href="/services#ux"
        accent="#34d399"
      />
    </>
  );
}

export function ServicesPreview3D() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[960px] overflow-hidden rounded-3xl border border-white/[0.12] bg-slate-950/40 shadow-[0_0_80px_-30px_rgba(34,211,238,0.35)] sm:h-[340px] md:h-[380px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
      <Canvas shadows gl={{ antialias: true }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
      <p className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 text-center text-xs text-slate-500">
        Hover to glow · Click to explore services
      </p>
    </div>
  );
}
