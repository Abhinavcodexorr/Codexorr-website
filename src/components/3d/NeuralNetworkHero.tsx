"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function randomSphere(r: number): THREE.Vector3 {
  const theta = 2 * Math.PI * Math.random();
  const phi = Math.acos(2 * Math.random() - 1);
  const rad = r * (0.6 + Math.random() * 0.4);
  return new THREE.Vector3(
    rad * Math.sin(phi) * Math.cos(theta),
    rad * Math.sin(phi) * Math.sin(theta),
    rad * Math.cos(phi),
  );
}

function buildEdges(points: THREE.Vector3[], k: number): [number, number][] {
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < points.length; i++) {
    points
      .map((p, j) => ({ j, d: p.distanceToSquared(points[i]) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .forEach(({ j }) => {
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([Math.min(i, j), Math.max(i, j)]);
        }
      });
  }
  return edges;
}

function NeuralScene() {
  const { pointer, camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const torus2Ref = useRef<THREE.Mesh>(null);
  const nodeRef = useRef<THREE.InstancedMesh>(null);
  const pulseRef = useRef<THREE.InstancedMesh>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const fn = () => {
      scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nodeCount = 24;
  const { positions, edges, pulseMeta } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) pts.push(randomSphere(4.5));
    const e = buildEdges(pts, 3);
    const m = e.map(() => ({ offset: Math.random(), speed: 0.15 + Math.random() * 0.2 }));
    return { positions: pts, edges: e, pulseMeta: m };
  }, [nodeCount]);

  const edgeGeo = useMemo(() => {
    const verts: number[] = [];
    edges.forEach(([a, b]) => {
      verts.push(
        positions[a].x,
        positions[a].y,
        positions[a].z,
        positions[b].x,
        positions[b].y,
        positions[b].z,
      );
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, [positions, edges]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.5, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.25, 0.03);
      groupRef.current.rotation.z = Math.sin(t * 0.05) * 0.03;
    }

    const cam = camera as THREE.PerspectiveCamera;
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, 14 + scrollRef.current * 6, 0.04);

    if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t * 1.3) * 0.055);
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.y = t * 0.35;
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.x = -t * 0.15;
      torus2Ref.current.rotation.z = t * 0.25;
    }

    if (nodeRef.current) {
      positions.forEach((pos, i) => {
        const s = 1 + Math.sin(t * 1.1 + i * 0.4) * 0.07;
        dummy.position.copy(pos);
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        nodeRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodeRef.current.instanceMatrix.needsUpdate = true;
    }

    if (pulseRef.current) {
      edges.forEach(([a, b], i) => {
        const phase = (pulseMeta[i].offset + t * pulseMeta[i].speed) % 1;
        dummy.position.lerpVectors(positions[a], positions[b], phase);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        pulseRef.current!.setMatrixAt(i, dummy.matrix);
      });
      pulseRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.4} />
      <pointLight position={[8, 10, 6]} intensity={50} color="#0891b2" />
      <pointLight position={[-8, -6, -4]} intensity={30} color="#7c3aed" />

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.65, 20, 20]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#0891b2"
          emissiveIntensity={1.4}
          metalness={0.85}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={torusRef}>
        <torusGeometry args={[1.5, 0.025, 10, 64]} />
        <meshBasicMaterial color="#0891b2" transparent opacity={0.65} toneMapped={false} />
      </mesh>
      <mesh ref={torus2Ref}>
        <torusGeometry args={[1.85, 0.016, 8, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.45} toneMapped={false} />
      </mesh>

      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color="#94a3b8" transparent opacity={0.2} toneMapped={false} />
      </lineSegments>

      <instancedMesh ref={nodeRef} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[0.1, 7, 7]} />
        <meshStandardMaterial
          color="#0369a1"
          emissive="#0891b2"
          emissiveIntensity={0.7}
          metalness={0.4}
          roughness={0.35}
        />
      </instancedMesh>

      <instancedMesh ref={pulseRef} args={[undefined, undefined, edges.length]}>
        <sphereGeometry args={[0.065, 4, 4]} />
        <meshBasicMaterial color="#0891b2" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export function NeuralNetworkHero() {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return (
      <div className="h-full w-full min-h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(34,211,238,0.14),transparent),radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(15,23,42,0.95),#020617)]" />
    );
  }

  return (
    <div className="h-full w-full min-h-[680px]">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.25]}
      >
        <color attach="background" args={["transparent"]} />
        <NeuralScene />
      </Canvas>
    </div>
  );
}
