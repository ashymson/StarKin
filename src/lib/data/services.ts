import type { Condition, Service, ServiceGroup } from "../types";

export const SERVICE_GROUPS: Record<ServiceGroup, { name: string; blurb: string }> = {
  therapy: {
    name: "Therapies",
    blurb: "Weekly therapies that build communication, movement and daily-living skills.",
  },
  medical: {
    name: "Doctors & evaluations",
    blurb: "Specialists who diagnose, prescribe and coordinate medical care.",
  },
  complementary: {
    name: "Complementary & alternative care",
    blurb:
      "Other approaches families use alongside traditional care. Talk with your child's doctor about what fits.",
  },
  support: {
    name: "Family support",
    blurb: "Help for the grown-ups: respite, advocacy and navigating school.",
  },
};

export const SERVICES: Service[] = [
  { slug: "speech-therapy", name: "Speech therapy", group: "therapy", blurb: "Talking, understanding language, and other ways to communicate (including AAC devices)." },
  { slug: "occupational-therapy", name: "Occupational therapy", group: "therapy", blurb: "Fine motor skills, sensory needs and everyday tasks like dressing and eating." },
  { slug: "physical-therapy", name: "Physical therapy", group: "therapy", blurb: "Strength, balance, walking and gross motor skills." },
  { slug: "aba-therapy", name: "ABA therapy", group: "therapy", blurb: "Applied behavior analysis: structured skill-building, often for autistic children." },
  { slug: "feeding-therapy", name: "Feeding therapy", group: "therapy", blurb: "Picky or restricted eating, chewing and swallowing." },
  { slug: "counseling", name: "Counseling & mental health", group: "therapy", blurb: "Emotional support, anxiety and coping skills for children and teens." },
  { slug: "social-skills", name: "Social skills groups", group: "therapy", blurb: "Small groups for practicing play, conversation and friendships." },

  { slug: "diagnostic-evaluation", name: "Diagnostic evaluation", group: "medical", blurb: "Psychological or developmental testing that can lead to a diagnosis." },
  { slug: "developmental-pediatrics", name: "Developmental pediatrician", group: "medical", blurb: "Pediatricians who specialize in development, behavior and learning." },
  { slug: "pediatric-neurology", name: "Pediatric neurology", group: "medical", blurb: "Seizures, muscle tone and other brain and nerve concerns." },
  { slug: "child-psychiatry", name: "Child psychiatry", group: "medical", blurb: "Medical doctors for mental health, including medication." },

  { slug: "music-therapy", name: "Music therapy", group: "complementary", blurb: "Board-certified therapists using music to work on communication and regulation." },
  { slug: "hippotherapy", name: "Equine-assisted therapy", group: "complementary", blurb: "Therapy sessions that use horseback riding and horse care." },
  { slug: "aquatic-therapy", name: "Aquatic therapy", group: "complementary", blurb: "Therapy and swim instruction in the water." },
  { slug: "nutrition", name: "Nutrition & dietitian", group: "complementary", blurb: "Registered dietitians for restricted diets, supplements and growth." },

  { slug: "respite-care", name: "Respite care", group: "support", blurb: "Trained caregivers so parents can rest, work or run errands." },
  { slug: "iep-advocacy", name: "IEP & school advocacy", group: "support", blurb: "Advocates who help with IEPs, 504 plans and school meetings." },
];

export const CONDITIONS: Condition[] = [
  { slug: "autism", name: "Autism" },
  { slug: "adhd", name: "ADHD" },
  { slug: "speech-language-delay", name: "Speech or language delay" },
  { slug: "developmental-delay", name: "Developmental delay" },
  { slug: "sensory-processing", name: "Sensory processing differences" },
  { slug: "down-syndrome", name: "Down syndrome" },
  { slug: "cerebral-palsy", name: "Cerebral palsy" },
  { slug: "intellectual-disability", name: "Intellectual disability" },
  { slug: "anxiety", name: "Anxiety" },
  { slug: "genetic-conditions", name: "Rare & genetic conditions" },
];

export const serviceBySlug = new Map(SERVICES.map((s) => [s.slug, s]));
export const conditionBySlug = new Map(CONDITIONS.map((c) => [c.slug, c]));
