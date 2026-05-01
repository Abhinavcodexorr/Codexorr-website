import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile, AI, automation, cloud, UX, analytics, and strategic discovery — flagship delivery from feasibility to production operations.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
