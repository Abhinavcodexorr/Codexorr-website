import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "./ServiceDetail";
import { getService, services, type ServiceSlug } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug as ServiceSlug);
  if (!s) return { title: "Service not found" };
  return {
    title: `${s.title} — Services`,
    description: s.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug as ServiceSlug);
  if (!service) notFound();
  return <ServiceDetail slug={service.slug} />;
}
