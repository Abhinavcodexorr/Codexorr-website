import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web, mobile, cloud, AI automation, and UX — flagship-grade delivery from architecture to launch.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
