import {
  Blocks,
  Brain,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Layers,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ServiceSlug =
  | "web-development"
  | "mobile-apps"
  | "ai-solutions"
  | "automation"
  | "cloud-devops"
  | "ui-ux-design"
  | "data-intelligence"
  | "discovery-strategy";

export interface ServiceDefinition {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  glow: string;
  accent: string;
  iconBg: string;
  bullets: string[];
  capabilities: { title: string; body: string }[];
  whyChooseUs: { title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  stack: string[];
  outcomes: { value: string; label: string }[];
  faq: { q: string; a: string }[];
}

const baseFAQ = (): { q: string; a: string }[] => [
  {
    q: "Do you collaborate inside our tooling?",
    a: "Yes — we integrate with Slack, Teams, Linear, GitHub/GitLab and join your rituals by default.",
  },
  {
    q: "Can you augment an existing codebase?",
    a: "Most engagements augment — strangler-pattern refactors alongside feature lanes are our default posture.",
  },
];

export const services: ServiceDefinition[] = [
  {
    slug: "web-development",
    title: "Web development",
    eyebrow: "Platforms & portals",
    tagline: "Modern web stacks that ship fast — and stay coherent at scale.",
    summary:
      "Enterprise-grade web platforms, dashboards, portals, and customer-facing SaaS — tuned for conversions, resilience, and clear ownership.",
    description:
      "We architect composable interfaces on Next.js/React, pragmatic API tiers, resilient deployment patterns, and design systems aligned to WCAG-ready UX. Built for founders and engineering leaders who refuse fragile handoffs.",
    icon: Code2,
    glow: "34,211,238",
    accent: "text-cyan-700",
    iconBg: "bg-cyan-50 border-cyan-200 text-cyan-600",
    bullets: [
      "Composable frontends · edge-aware routing · strong typing end-to-end.",
      "SSR/ISR where it earns ROI · streaming · measured hydration budgets.",
      "Design-system-driven delivery — QA in PRs with automated accessibility audits.",
    ],
    capabilities: [
      { title: "Product shells & dashboards", body: "Auth, tenancy-aware layouts, realtime signals, resilient data fetching." },
      { title: "API & integrations", body: "Typed contracts · GraphQL/tRPC/Fast REST · third-party integrations with guarded retries." },
      { title: "Performance discipline", body: "CWV targets · intelligent caching · image/CDN pipelines that stay boring in prod." },
    ],
    whyChooseUs: [
      { title: "Velocity without chaos", body: "Opinionated patterns that keep juniors safe and principals effective." },
      { title: "Conversion-aware craft", body: "UX instrumentation & funnel clarity — shipped alongside feature work." },
      { title: "Observable by default", body: "Traces/logs/metrics stubs from day zero — not glued on after launch." },
    ],
    process: [
      { step: "01", title: "Design", body: "Jobs-to-done mapping, UX flows, system boundaries, KPI alignment." },
      { step: "02", title: "Architecture", body: "Composable modules, infra sketch, rollout & rollback strategy." },
      { step: "03", title: "Develop", body: "Sprint slices with previews, guarded PRs, design-QA checkpoints." },
      { step: "04", title: "Deploy & measure", body: "Progressive rollout, alerting, regressions chased with owners." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "tRPC · GraphQL", "Vercel / AWS", "Playwright"],
    outcomes: [{ value: "90+", label: "CWV ambition" }, { value: "+28%", label: "Conv uplift" }, { value: "-40%", label: "Time-to-route" }],
    faq: baseFAQ(),
  },
  {
    slug: "mobile-apps",
    title: "Mobile applications",
    eyebrow: "iOS · Android · cross-platform",
    tagline: "Native-polish experiences your users feel in the first swipe.",
    summary:
      "Consumer and enterprise-grade mobile — React Native-first with native escalation paths for camera, wallets, realtime, offline.",
    description:
      "We pair product strategy with pragmatic mobile architecture: push + deeplink reliability, disciplined release cadence, Sentry-grade observability — so store reviews and KPIs compound instead of regress.",
    icon: Smartphone,
    glow: "167,139,250",
    accent: "text-violet-700",
    iconBg: "bg-violet-50 border-violet-200 text-violet-600",
    bullets: [
      "Realtime + offline-conscious data paths where product stakes demand.",
      "Store readiness — ASO, crash triage loops, phased rollouts.",
      "Security-first onboarding — biometric, token rotation, attestations.",
    ],
    capabilities: [
      { title: "Shipping cadence", body: "EAS/Fastlane · internal tracks · phased rollouts guarded by telemetry." },
      { title: "Realtime surfaces", body: "Chat/market UX with conflict-friendly sync paths & battery-aware backoff." },
      { title: "Native bridges", body: "Wallet, maps, peripherals — Swift/Kotlin only where payoff is unmistakable." },
    ],
    whyChooseUs: [
      { title: "Shared front-end ethos", body: "One mental model bridging web/mobile — lowers translation tax." },
      { title: "Quality bars in CI", body: "UI tests + perf budgets gated before merge promotion." },
      { title: "Launch partnership", body: "We stay through stabilization — not disappearing at v1 badge." },
    ],
    process: [
      { step: "01", title: "Design", body: "Flows, fidelity targets, entitlement model, instrumentation plan." },
      { step: "02", title: "Foundations", body: "Navigation shell, CI, telemetry, staging distribution." },
      { step: "03", title: "Build", body: "Features behind flags · weekly playable builds · design QA parity." },
      { step: "04", title: "Deploy", body: "Store submission, phased rollout observability & guardrails." },
    ],
    stack: ["React Native", "Swift", "Kotlin", "Expo/EAS", "Firebase", "Sentry", "Detox"],
    outcomes: [{ value: "60fps", label: "UI target" }, { value: "<0.3%", label: "Crash goal" }, { value: "<6wk", label: "MVP band" }],
    faq: baseFAQ(),
  },
  {
    slug: "ai-solutions",
    title: "AI solutions",
    eyebrow: "Strategy · copilots · ML",
    tagline: "AI that ships responsibly — evaluations, grounding, observable UX.",
    summary:
      "Generative workflows, retrieval copilots, ML features with eval harnesses, human-in-loop paths, governance-friendly logging.",
    description:
      "We pair business outcomes with pragmatic model choices: grounding, structured outputs, cost controls, rollback safety nets — bridging product, security, and platform teams.",
    icon: Brain,
    glow: "236,72,153",
    accent: "text-pink-700",
    iconBg: "bg-pink-50 border-pink-200 text-pink-600",
    bullets: [
      "Citation-aware retrieval UX · eval suites before scale.",
      "Model routing + failover strategies sized to cost envelopes.",
      "Audit trails aligned to enterprise security expectations.",
    ],
    capabilities: [
      { title: "Generative workflows", body: "Tool-use patterns with guardrails, structured summaries, multilingual surfaces." },
      { title: "Retrieval pipelines", body: "Hybrid retrieval, reranking, chunked ingestion pipelines with versioning." },
      { title: "Governance toolkit", body: "Red-team harnesses · policy gateways · anomaly alerts & kill switches." },
    ],
    whyChooseUs: [
      { title: "Outcome-first experimentation", body: "We tie LLM UX to KPIs pilots — avoiding science-fair POCs." },
      { title: "Deployable—not slide-deck AI", body: "Shipping patterns with SLAs operators can own." },
      { title: "Vendor-agnostic pragmatism", body: "OpenAI · Anthropic · OSS — chosen by constraints, not hype." },
    ],
    process: [
      { step: "01", title: "Design", body: "Use-case fit scoring, ROI sketch, governance constraints mapping." },
      { step: "02", title: "Prototype", body: "Guarded MVP with eval harness · shadow traffic · human escalation." },
      { step: "03", title: "Harden", body: "Latency/cost optimisation · safety regression suite · playbook." },
      { step: "04", title: "Deploy", body: "Progressive rollout, audit logs, alerting + training for operators." },
    ],
    stack: ["OpenAI", "Anthropic", "LangGraph", "Llama · vLLM", "pgvector", "Ragas", "Promptfoo"],
    outcomes: [{ value: ">93%", label: "Pilot accuracy" }, { value: "-32%", label: "Infer cost band" }, { value: "<400ms", label: "Tail targets" }],
    faq: baseFAQ(),
  },
  {
    slug: "automation",
    title: "Workflow automation",
    eyebrow: "Integrations · RPA-lite",
    tagline: "Replace repetitive drag with deterministic, observable pipelines.",
    summary:
      "API orchestrations, Zapier/Make alternatives for serious loads, alerting & replay — connecting CRMs, finance, fulfillment, ticketing.",
    description:
      "Automations designed with idempotency, partial-failure ergonomics and operator dashboards — so teams trust the machinery instead of muting Slack noise.",
    icon: Zap,
    glow: "52,211,153",
    accent: "text-emerald-700",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    bullets: [
      "Stateful orchestration diagrams your team can read — not mystical DAGs.",
      "Dead-letter queues, replay knobs, alerting that routes to owning squads.",
      "Security partitioning for tokens & tenancy boundaries.",
    ],
    capabilities: [
      { title: "Integration meshes", body: "Salesforce · HubSpot · NetSuite adapters with schema drift detection." },
      { title: "Human approvals", body: "Slack/email checkpoints with SLA timers & escalation paths." },
      { title: "Ops visibility", body: "Runbooks + structured logs so L1 resolves without escalating blind." },
    ],
    whyChooseUs: [
      { title: "Reliability realism", body: "We bake retries & backoff — not brittle happy-path scripting." },
      { title: "Documentation as code", body: "Runbooks versioned beside automation definitions." },
      { title: "Business-language OKRs", body: "Finance/ops KPIs surfaced — engineers never guessing impact." },
    ],
    process: [
      { step: "01", title: "Design", body: "Process mining interviews, SLA definition, RACI clarification." },
      { step: "02", title: "Blueprint", body: "Architecture diagram, resilience strategy, test data contracts." },
      { step: "03", title: "Develop", body: "Dry-run simulations · shadow mode · alerting calibration." },
      { step: "04", title: "Deploy", body: "Canary traffic · operator training · improvement backlog." },
    ],
    stack: ["Temporal · Inngest", "Node/Python", "Postgres · Redis", "OpenTelemetry"],
    outcomes: [{ value: "-62%", label: "Manual hrs" }, { value: ">99%", label: "Replay success" }, { value: "<5m", label: "Incident triage" }],
    faq: baseFAQ(),
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    eyebrow: "Infra foundations",
    tagline: "Kubernetes-grade reliability without needless ceremony.",
    summary:
      "Platform engineering, IaC, progressive delivery patterns, FinOps-informed scaling — bridging AWS/GCP/Azure with golden paths engineers enjoy.",
    description:
      "We meet you where infra debt lives — untangle accounts, carve paved roads with templates, instrumentation that answers 'why slow' faster than guesses.",
    icon: Cloud,
    glow: "56,189,248",
    accent: "text-sky-700",
    iconBg: "bg-sky-50 border-sky-200 text-sky-600",
    bullets: [
      "Golden service templates trimming Days-to-first-deploy.",
      "Progressive rollout & canarying with automated rollback thresholds.",
      "SLO-aligned paging — human stress tested before incident season.",
    ],
    capabilities: [
      { title: "Platform product", body: "IDPs, backstage-style catalogs, templated scaffold & ownership metadata." },
      { title: "IaC discipline", body: "Terraform/OpenTofu modules with drift detection & PR reviews." },
      { title: "FinOps coupling", body: "Unit economics surfaced to engineering — not spreadsheet theatre." },
    ],
    whyChooseUs: [
      { title: "Teach-forward posture", body: "We leave runbooks tribal knowledge can't hide behind." },
      { title: "Multicloud pragmatism", body: "Picks anchored in existing footprint + regulated constraints." },
      { title: "Incident empathy", body: "On-call humane paging & blameless retrospective templates." },
    ],
    process: [
      { step: "01", title: "Design", body: "Account topology survey, IAM posture, risk hotspots." },
      { step: "02", title: "Foundations", body: "Network & secrets posture, pipelines, backbone observability." },
      { step: "03", title: "Develop", body: "Workloads ported in waves · progressive safeguards." },
      { step: "04", title: "Deploy & operate", body: "SLO dashboards · incident drills · KT sessions." },
    ],
    stack: ["Kubernetes · EKS/GKE", "Terraform", "Argo/Harness", "Prometheus/Grafana"],
    outcomes: [{ value: "−38%", label: "Spend band" }, { value: ">99.9%", label: "Avail goal" }, { value: "-45%", label: "Lead deploy" }],
    faq: baseFAQ(),
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX design",
    eyebrow: "Product interfaces",
    tagline: "Interfaces that clarify decisions — powered by pragmatic motion.",
    summary:
      "Research-backed UX, cinematic yet restrained visuals, scalable design systems bridging Figma ↔ production components.",
    description:
      "We embed with engineering — prototyping in code-first flows where ROI demands it — closing the gap between 'looks great in design' and 'feels inevitable in prod'.",
    icon: Layers,
    glow: "52,211,153",
    accent: "text-emerald-700",
    iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600",
    bullets: [
      "JTBD-aligned flows — fewer novelties, more completions.",
      "Motion systems respecting reduced-motion & GPU budgets.",
      "Accessibility baked into components — audits not panic retrofits.",
    ],
    capabilities: [
      { title: "Systems & tokens", body: "Semantic tokens → React/Tailwind alignments shrinking drift." },
      { title: "Interaction craft", body: "Micro-motion + scroll choreography without jank regressions." },
      { title: "Research pulses", body: "Targeted usability studies · funnel diagnostics · instrumentation glue." },
    ],
    whyChooseUs: [
      { title: "Engineering bilingual", body: "Designers who read stack traces shorten iteration loops." },
      { title: "Brand-respectful", body: "We extend existing palettes — novelty where it earns attention." },
      { title: "Measurable uplift", body: "We instrument before & after deltas — convictions aren’t vibes-only." },
    ],
    process: [
      { step: "01", title: "Design", body: "Discovery workshops, prototyping sprints, success metrics pinning." },
      { step: "02", title: "System definition", body: "Token scaffolding, primitives, motion language." },
      { step: "03", title: "Develop-ready spec", body: "Edge cases enumerated · responsive logic · QA sign-off." },
      { step: "04", title: "Ship support", body: "PR design QA partnering until acceptance metrics stabilize." },
    ],
    stack: ["Figma", "Framer Motion · GSAP", "Storybook", "Maze/Hotjar"],
    outcomes: [{ value: "+40%", label: "Activation uplift" }, { value: "-30%", label: "Task completion" }],
    faq: baseFAQ(),
  },
  {
    slug: "data-intelligence",
    title: "Data intelligence",
    eyebrow: "Analytics · warehousing",
    tagline: "Turn fragmented events into narratives operators trust.",
    summary:
      "Modern data stacks — ingestion, modeling, dashboards that leadership actually opens — pragmatic privacy & lineage baked in.",
    description:
      "We avoid ivory-tower warehousing: each model ties to actionable decisions — with clarity on freshness, lineage, ownership & cost knobs.",
    icon: Database,
    glow: "99,102,241",
    accent: "text-indigo-700",
    iconBg: "bg-indigo-50 border-indigo-200 text-indigo-600",
    bullets: [
      "Warehouse modeling patterns your analysts won’t secretly fork around.",
      "Reverse ETL guarded with SLA contracts & observability.",
      "Executive narratives tied to reproducible dashboards.",
    ],
    capabilities: [
      { title: "Ingest & model", body: "dbt-style modeling + streaming where latency demands." },
      { title: "Activation", body: "Reverse ETL syncing CRM/marketing responsibly." },
      { title: "Governance basics", body: "PII tagging lineage · access reviews quarterly hooks." },
    ],
    whyChooseUs: [
      { title: "Outcome dashboards", body: "We tie metrics to verbs — activate, retain, expand — never vanity-only." },
      { title: "Cost transparency", body: "Surprise warehouse bills extinguished proactively." },
      { title: "Teach analytical muscle", body: "Your team learns patterns — dependency doesn’t inflate." },
    ],
    process: [
      { step: "01", title: "Design", body: "Metric tree workshop, stakeholder alignment, SLA definitions." },
      { step: "02", title: "Foundations", body: "Ingest contracts, lineage baseline, POC dashboard." },
      { step: "03", title: "Develop", body: "Incremental model layers · validation harnesses · UX iteration." },
      { step: "04", title: "Deploy & educate", body: "Enablement labs · monitoring · iteration backlog." },
    ],
    stack: ["Snowflake · BigQuery", "dbt", "Airbyte · Fivetran", "Metabase · Looker"],
    outcomes: [{ value: "+3x", label: "Trusted usage" }, { value: "-25%", label: "Ad-hoc rework" }],
    faq: baseFAQ(),
  },
  {
    slug: "discovery-strategy",
    title: "Discovery & strategy",
    eyebrow: "Product clarity",
    tagline: "De-risk roadmap bets before capital catches fire.",
    summary:
      "Architecture spikes, feasibility packs, stakeholder alignment canvases — condensing ambiguity into phased delivery maps.",
    description:
      "Ideal pre-build or reboot checkpoint: techno-commercial clarity, sequencing trade-offs surfaced, KPI instrumentation defined — so downstream execution isn’t hostage to silent assumptions.",
    icon: BriefcaseBusiness,
    glow: "244,114,182",
    accent: "text-fuchsia-700",
    iconBg: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700",
    bullets: [
      "Decision logs — dissent captured, assumptions versioned.",
      "Parallel technical spikes — cheap invalidation before capex spikes.",
      "Pilot budgets matched to falsifiable hypotheses.",
    ],
    capabilities: [
      { title: "Opportunity sizing", body: "TAM/SAM realism, wedge identification, phased betting narrative." },
      { title: "Architecture options", body: "2–3 road-mapped forks with Capex/Opex deltas explicit." },
      { title: "Org readiness mapping", body: "Skills gap + hiring/invest recommendations sequenced pragmatically." },
    ],
    whyChooseUs: [
      { title: "Honest dissent", body: "We surface uncomfortable trade-offs — sugar-coating wastes quarters." },
      { title: "Bridge functions", body: "We translate CFO/CPO/CTO dialects — misalignment surfaced early." },
      { title: "Velocity unlock", body: "Clarity trims thrash churn — backlog stops thrashing blindly." },
    ],
    process: [
      { step: "01", title: "Design", body: "Stakeholder constellation map, KPI hypothesis capture." },
      { step: "02", title: "Research spikes", body: "Parallel technical validations + comparative scans." },
      { step: "03", title: "Synthesize", body: "Option trees, sequencing model, capex glidepath." },
      { step: "04", title: "Hand-off", body: "Readout deck + prioritized epic breakdown + KPI instrumentation plan." },
    ],
    stack: ["FigJam · Miro", "Notion/Confluence", "Linear/Jira hybrids", "Loom/async rituals"],
    outcomes: [
      { value: "−41%", label: "Thrashing cut" },
      { value: ">85%", label: "Exec alignment" },
    ],
    faq: baseFAQ(),
  },
];

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}
