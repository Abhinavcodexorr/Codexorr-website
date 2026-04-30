import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mission, vision, and timeline — how CodeXorr engineers flagship-grade platforms.",
};

export default function AboutPage() {
  return <AboutContent />;
}
