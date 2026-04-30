import type { Metadata } from "next";
import { PortfolioGallery } from "./PortfolioGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real apps and platforms built by CodeXorr — from on-demand cleaning services and social discovery apps to food delivery, music streaming, and ride-hailing solutions.",
};

export default function PortfolioPage() {
  return <PortfolioGallery />;
}
