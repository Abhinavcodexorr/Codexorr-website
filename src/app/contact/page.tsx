import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a discovery session — architecture outline, timeline bands, and collaboration models tailored to your roadmap.",
};

export default function ContactPage() {
  return <ContactContent />;
}
