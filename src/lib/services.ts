import {
  Brain,
  Cloud,
  Code2,
  Layers,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type ServiceSlug = "web" | "mobile" | "cloud" | "ai" | "ux";

export interface ServiceDefinition {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  glow: string;
  accent: string; // tailwind text color
  iconBg: string; // tailwind classes for icon container
  bullets: string[];
  capabilities: { title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  stack: string[];
  outcomes: { value: string; label: string }[];
  faq: { q: string; a: string }[];
}

export const services: ServiceDefinition[] = [
  {
    slug: "web",
    title: "Web development",
    eyebrow: "Platforms",
    tagline: "Composable Next.js frontends that ship measurable results.",
    description:
      "We build composable Next.js platforms with edge-aware routing, resilient API layers, and design systems that scale across product surfaces — tuned for Core Web Vitals, accessibility, and conversion lift.",
    icon: Code2,
    glow: "34,211,238",
    accent: "text-cyan-700",
    iconBg: "bg-cyan-50 border-cyan-200 text-cyan-600",
    bullets: [
      "Design systems codified in Storybook · tokens · accessibility audits.",
      "SSR / ISR strategies aligned with SEO and personalization requirements.",
      "Observability hooks from day one — OpenTelemetry, structured logs, traces.",
    ],
    capabilities: [
      {
        title: "Composable frontends",
        body: "Next.js App Router, React Server Components, and edge runtimes — modular, testable, and aligned to design tokens.",
      },
      {
        title: "API layer architecture",
        body: "GraphQL gateways, tRPC contracts, and REST migrations done right — with strong typing and tracing baked in.",
      },
      {
        title: "Performance engineering",
        body: "Lighthouse 90+ targets, hydration budgets, image pipeline tuning, and CDN/Edge caching strategies.",
      },
      {
        title: "Accessibility & UX",
        body: "WCAG-aligned interactions, keyboard-first navigation, screen reader-tested components.",
      },
    ],
    process: [
      { step: "01", title: "Discovery", body: "Architecture spike, baseline metrics, accessibility audit, and goal alignment." },
      { step: "02", title: "Design system", body: "Tokens, primitives, and a deployable component library before page work." },
      { step: "03", title: "Build & ship", body: "Sprint cadence with weekly demos, observability, and feature flags from day one." },
      { step: "04", title: "Optimize", body: "CWV tuning, regression alerts, conversion experiments — handed off with playbooks." },
    ],
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind", "tRPC / GraphQL", "Vercel / Edge", "Playwright", "Storybook"],
    outcomes: [
      { value: "92+", label: "Lighthouse perf" },
      { value: "−45%", label: "Bundle size" },
      { value: "+38%", label: "Conversion lift" },
      { value: "WCAG AA", label: "Accessibility" },
    ],
    faq: [
      {
        q: "Do you support legacy migrations?",
        a: "Yes — we run staged strangler-fig migrations from React/Vue/SPA codebases into modern Next.js without freezing roadmap delivery.",
      },
      {
        q: "Can you embed with our team?",
        a: "Absolutely. Our pods plug into your Slack, GitHub, and stand-ups, and most engagements pair our seniors with your engineers for knowledge transfer.",
      },
    ],
  },
  {
    slug: "mobile",
    title: "Mobile apps",
    eyebrow: "Product-grade",
    tagline: "Native-grade experiences that feel inevitable on every device.",
    description:
      "We design and engineer mobile apps with realtime sync, resilient offline modes, and analytics instrumentation aligned with privacy commitments — from iOS and Android to cross-platform React Native deliveries.",
    icon: Smartphone,
    glow: "167,139,250",
    accent: "text-violet-700",
    iconBg: "bg-violet-50 border-violet-200 text-violet-600",
    bullets: [
      "React Native / Kotlin / Swift — pragmatic picks per surface criticality.",
      "Push · deeplinks · feature flags baked into release trains.",
      "Crash analytics + performance budgets enforced in CI.",
    ],
    capabilities: [
      { title: "Cross-platform delivery", body: "React Native + native modules where it matters — fluid 60fps interactions, predictable release trains." },
      { title: "Realtime & offline", body: "WebSocket pipelines, offline-first stores, conflict-free sync — proven in delivery, finance, and social apps." },
      { title: "Native modules", body: "Camera, payments, biometrics, BLE, and AR integrations engineered with Swift / Kotlin where required." },
      { title: "Release & QA", body: "Crash analytics, automated UI tests, internal track betas, App Store / Play Store launch playbooks." },
    ],
    process: [
      { step: "01", title: "Concept & scope", body: "User flows, wireframes, native vs cross-platform call, store readiness audit." },
      { step: "02", title: "Foundation", body: "Design system on mobile, auth, telemetry, payments, and CI for both platforms." },
      { step: "03", title: "Feature waves", body: "Vertical slices shipped behind feature flags with TestFlight / internal beta loops." },
      { step: "04", title: "Launch & iterate", body: "Store submission, ASO support, crash triage, and cohort-driven roadmap iteration." },
    ],
    stack: ["React Native", "Swift", "Kotlin", "Expo / EAS", "Firebase", "Sentry", "Detox", "Fastlane"],
    outcomes: [
      { value: "4.7★", label: "Avg app rating" },
      { value: "<0.3%", label: "Crash-free hit" },
      { value: "60fps", label: "Sustained UI" },
      { value: "−60%", label: "Time to launch" },
    ],
    faq: [
      {
        q: "iOS and Android together or separate?",
        a: "We default to React Native + native bridges for shared surfaces, falling back to fully native where the product requires it (rich AR, high-frequency BLE, gaming).",
      },
      {
        q: "Do you handle App Store submission?",
        a: "Yes — review prep, ASO, screenshots, in-app purchase configuration, and post-launch crash triage are part of the engagement.",
      },
    ],
  },
  {
    slug: "cloud",
    title: "Cloud foundations",
    eyebrow: "Infrastructure",
    tagline: "Kubernetes-grade infra without the operational drag.",
    description:
      "Kubernetes platforms with Terraform-driven infra, progressive delivery, and FinOps-aware scaling policies — boring where it counts, sharp where it matters.",
    icon: Cloud,
    glow: "56,189,248",
    accent: "text-sky-700",
    iconBg: "bg-sky-50 border-sky-200 text-sky-600",
    bullets: [
      "Multi-account hygiene · IAM least-privilege · secrets rotation.",
      "Golden paths for services — templates, paved-road CI/CD.",
      "Incident tooling — SLOs, paging policies, blameless reviews.",
    ],
    capabilities: [
      { title: "Platform engineering", body: "Kubernetes baselines, service templates, golden paths, and paved-road CI/CD pipelines." },
      { title: "Infrastructure as code", body: "Terraform modules, OpenTofu, environment promotions, and review-driven infra change." },
      { title: "Reliability", body: "SLO frameworks, paging hygiene, runbooks, blameless postmortems, and chaos drills." },
      { title: "FinOps", body: "Cost dashboards, autoscaling policy reviews, savings plans, and engineering-friendly budgets." },
    ],
    process: [
      { step: "01", title: "Discover", body: "Account hygiene audit, IAM review, infra baseline, and capacity headroom check." },
      { step: "02", title: "Foundation", body: "Multi-account setup, central observability, and service template paved roads." },
      { step: "03", title: "Migrate", body: "Workload-by-workload migration with progressive delivery, canaries, and rollback." },
      { step: "04", title: "Operate", body: "On-call rotations, SLO reporting, monthly FinOps reviews, knowledge transfer." },
    ],
    stack: ["Kubernetes", "Terraform", "AWS / GCP / Azure", "Argo CD", "Helm", "Prometheus", "Grafana", "OpenTelemetry"],
    outcomes: [
      { value: "99.95%", label: "SLO target" },
      { value: "−42%", label: "Cloud spend" },
      { value: "<10m", label: "MTTR" },
      { value: "30+", label: "Services landed" },
    ],
    faq: [
      {
        q: "Are you cloud-agnostic?",
        a: "We deliver on AWS, GCP, and Azure. Decisions are driven by your existing footprint, compliance, and developer experience — not vendor preference.",
      },
      {
        q: "Do you do platform-as-product?",
        a: "Yes — internal developer platforms with golden paths, scorecards, and paved roads are a core service line.",
      },
    ],
  },
  {
    slug: "ai",
    title: "AI & automation",
    eyebrow: "Operational intelligence",
    tagline: "AI workflows with eval harnesses, governance, and grounded UX.",
    description:
      "Retrieval pipelines, AI copilots, and workflow automation that integrate cleanly with governance — eval harnesses, red-teaming, audit trails, and grounded UX without mystery hallucinations.",
    icon: Brain,
    glow: "236,72,153",
    accent: "text-pink-700",
    iconBg: "bg-pink-50 border-pink-200 text-pink-600",
    bullets: [
      "Grounded answers with citation-aware UX — no mystery hallucinations in prod.",
      "Human-in-the-loop workflows where stakes demand oversight.",
      "Batch + realtime inference patterns sized for cost envelopes.",
    ],
    capabilities: [
      { title: "RAG pipelines", body: "Embedding strategies, hybrid retrieval, reranking, and grounded generation with citations." },
      { title: "Agents & automation", body: "Tool-using agents with structured outputs, eval harnesses, and human-in-the-loop guardrails." },
      { title: "Eval & governance", body: "Offline eval suites, red-teaming, audit trails, model gateways, and policy controls." },
      { title: "Inference architecture", body: "Hosted vs on-prem trade-offs, GPU autoscaling, batched inference, and cost dashboards." },
    ],
    process: [
      { step: "01", title: "Use case fit", body: "Audit candidate workflows for AI fit, ROI, and governance requirements." },
      { step: "02", title: "Pilot", body: "Build a guarded MVP with eval harness, observability, and a human-in-the-loop UX." },
      { step: "03", title: "Hardening", body: "Red-team, eval-driven prompt and pipeline tuning, latency and cost reductions." },
      { step: "04", title: "Scale", body: "Multi-region inference, audit trails, on-call playbooks, knowledge transfer." },
    ],
    stack: ["OpenAI", "Anthropic", "Llama", "LangChain / LangGraph", "Pinecone / pgvector", "Ragas", "Promptfoo", "Sentry"],
    outcomes: [
      { value: "+62%", label: "Workflow speed" },
      { value: ">95%", label: "Eval accuracy" },
      { value: "−38%", label: "Inference cost" },
      { value: "0", label: "Audit findings" },
    ],
    faq: [
      {
        q: "Can you work with our self-hosted models?",
        a: "Yes — we deliver on top of vLLM, Ollama, and managed Llama / Mistral deployments where data residency or cost demand it.",
      },
      {
        q: "How do you handle hallucinations?",
        a: "Citation-aware UX, retrieval grounding, structured outputs, eval harnesses, and human-in-the-loop checkpoints on high-stakes workflows.",
      },
    ],
  },
  {
    slug: "ux",
    title: "UI / UX",
    eyebrow: "Signature craft",
    tagline: "Cinematic interfaces that respect your users and your stack.",
    description:
      "Interfaces that feel cinematic yet restrained — motion systems, keyboard-first flows, and WCAG-aligned patterns shipped alongside engineering, not handed over the wall.",
    icon: Layers,
    glow: "52,211,153",
    accent: "text-emerald-700",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    bullets: [
      "UX research slices embedded into weekly demos.",
      "Interaction prototypes — code-first where possible.",
      "Brand systems translated into resilient components.",
    ],
    capabilities: [
      { title: "Product strategy", body: "Jobs-to-be-done framing, user research, and roadmap shaping with engineering trade-offs front and center." },
      { title: "Design systems", body: "Token-driven libraries, motion systems, and accessibility patterns codified in code, not just Figma." },
      { title: "Motion & interaction", body: "GPU-friendly animation, scroll storytelling, and keyboard-first interaction patterns." },
      { title: "Brand systems", body: "Cinematic visual language scaled into resilient components and marketing surfaces." },
    ],
    process: [
      { step: "01", title: "Research", body: "Stakeholder interviews, user research, journey mapping, accessibility baselines." },
      { step: "02", title: "Design system", body: "Tokens, primitives, and code-first prototypes that engineering can ship from." },
      { step: "03", title: "Surface design", body: "Interaction-rich screens, motion specs, and content strategy." },
      { step: "04", title: "Co-build", body: "Pair-shipping with engineers — design QA in PRs, not handoff docs." },
    ],
    stack: ["Figma", "Framer Motion", "Tailwind", "Storybook", "GSAP", "Lottie", "Maze", "Hotjar"],
    outcomes: [
      { value: "+45%", label: "Activation rate" },
      { value: "−30%", label: "Time to task" },
      { value: "WCAG AA", label: "Accessibility" },
      { value: "4.8★", label: "Usability score" },
    ],
    faq: [
      {
        q: "Do you do brand work too?",
        a: "We extend existing brands into product systems and can collaborate with brand studios — but pure logo / identity work isn't our specialty.",
      },
      {
        q: "Can you ship without our engineers?",
        a: "Yes. We have full-stack pods and ship production code alongside design, including production-grade Tailwind / React components.",
      },
    ],
  },
];

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}
