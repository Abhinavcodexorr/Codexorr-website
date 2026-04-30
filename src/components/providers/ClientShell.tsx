"use client";

import dynamic from "next/dynamic";

const CursorFollower = dynamic(
  () => import("@/components/ui/CursorFollower").then((m) => m.CursorFollower),
  { ssr: false },
);

export function ClientShell() {
  return <CursorFollower />;
}
