export type Plan = {
  id: string;
  name: string;
  blurb: string;
  yearly: number | null;
  monthly: number | null;
  recommended?: boolean;
  note?: string;
  includes: string;
  points: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    blurb: "For a pair still finding the shape of the product.",
    yearly: 0,
    monthly: 0,
    includes: "Enough to tell if Keel fits.",
    points: [
      "Up to 3 people",
      "250 active issues",
      "One team",
      "Cycles and projects",
    ],
    cta: "Start free",
  },
  {
    id: "field",
    name: "Field",
    blurb: "For a product team that already ships every week.",
    yearly: 10,
    monthly: 12,
    includes: "The whole tracker, without the extras.",
    points: [
      "Unlimited people",
      "Unlimited issues",
      "A team per product",
      "Slack and email intake",
    ],
    cta: "Choose Field",
  },
  {
    id: "yard",
    name: "Yard",
    blurb: "Most teams who have shipped for a year end up here.",
    yearly: 16,
    monthly: 20,
    recommended: true,
    note: "Most teams who have shipped for a year end up here.",
    includes: "Field, plus the pieces that show up around team ten.",
    points: [
      "Triage rules you can see firing",
      "Guest accounts on a project",
      "Cycle time, without a second tool",
      "Priority support on weekdays",
    ],
    cta: "Choose Yard",
  },
  {
    id: "company",
    name: "Company",
    blurb: "For security review, procurement, and more than one org.",
    yearly: null,
    monthly: null,
    includes: "Yard, plus the things a security review asks for.",
    points: [
      "SAML and SCIM",
      "Audit log",
      "A shared channel with us",
      "A named onboarding",
    ],
    cta: "Talk with us",
  },
];

export function findPlan(id: string | undefined) {
  return plans.find((plan) => plan.id === id) ?? plans[0];
}
